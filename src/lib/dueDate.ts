/**
 * ToDo の期限（due_date）に関する JST 基準のユーティリティ。
 *
 * iOS アプリ側の仕様に合わせて、以下の 4 つの「状態」を計算・整形する。
 *
 *   - completed : 完了済み（呼び出し側で判定）
 *   - overdue   : 期限切れ（現在時刻 > 期限）
 *   - urgent    : 緊急（残り 24h 以内。時刻指定なしなら翌日までが urgent）
 *   - normal    : 通常（期限あり・上記以外）
 *   - none      : 期限なし
 *
 * タブやフォーマッタは常に Asia/Tokyo で計算する。実行環境の TZ に
 * 依存しないように、日付の「今日 / 明日 / 今週末（次の日曜日）」を出す
 * ヘルパーでは一度 JST の Y-M-D に分解して再構築する。
 */

const JST_TZ = 'Asia/Tokyo';

/** JST の「今」を表現する `{year, month, day, hour, minute}` を取り出す。 */
function nowPartsJST(reference: Date = new Date()): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
} {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: JST_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(reference);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? '0');
  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour') === 24 ? 0 : get('hour'),
    minute: get('minute'),
  };
}

/** 与えられた JST 日時の ISO（UTC）文字列を返す。 */
function jstToIso(
  year: number,
  month: number,
  day: number,
  hour = 23,
  minute = 59,
  second = 0
): string {
  // JST は UTC+9。UTC で表現する時刻から 9 時間引く。
  const utcMs = Date.UTC(year, month - 1, day, hour - 9, minute, second);
  return new Date(utcMs).toISOString();
}

/** JST での「今日の日付」を YYYY-MM-DD 文字列で返す。 */
export function todayLocalDateJST(reference: Date = new Date()): string {
  const { year, month, day } = nowPartsJST(reference);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/** JST 基準で N 日後の日付を YYYY-MM-DD で返す。 */
export function addDaysJST(
  days: number,
  reference: Date = new Date()
): string {
  const { year, month, day } = nowPartsJST(reference);
  // UTC 正午をアンカーに加減算して DST 等のズレを避ける。
  const utcNoon = Date.UTC(year, month - 1, day, 12, 0, 0);
  const shifted = new Date(utcNoon + days * 86400000);
  const y = shifted.getUTCFullYear();
  const m = shifted.getUTCMonth() + 1;
  const d = shifted.getUTCDate();
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

/**
 * 「今週末（次の日曜日）」の JST 日付を YYYY-MM-DD で返す。
 * ユーザー指定仕様：週末 = 日曜日。今日が日曜日なら今日を返す。
 */
export function nextSundayJST(reference: Date = new Date()): string {
  const { year, month, day } = nowPartsJST(reference);
  // 曜日を JST で判定する（Intl の weekday で week day を取る）。
  const weekdayStr = new Intl.DateTimeFormat('en-US', {
    timeZone: JST_TZ,
    weekday: 'short',
  }).format(reference);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const dow = map[weekdayStr] ?? 0;
  const delta = (7 - dow) % 7; // 日曜=0 なら 0 日、それ以外は次の日曜日までの日数
  return addDaysJST(delta, new Date(Date.UTC(year, month - 1, day, 12)));
}

/**
 * YYYY-MM-DD の「その日の終わり（23:59 JST）」を UTC ISO 文字列にして返す。
 * quick chip 選択時に `due_date`（timestamptz）カラムへ入れる値として使う。
 */
export function endOfDayJstIso(localDate: string): string {
  const [y, m, d] = localDate.split('-').map(Number);
  if (!y || !m || !d) return new Date().toISOString();
  return jstToIso(y, m, d, 23, 59, 0);
}

// ---------------------------------------------------------------------------
// 状態判定
// ---------------------------------------------------------------------------

export type DueStatus = 'completed' | 'overdue' | 'urgent' | 'normal' | 'none';

export interface DueStatusInput {
  isCompleted: boolean;
  dueDateIso: string | null | undefined;
  /**
   * 「時刻指定なし」のレコードかどうか（iOS の `is_all_day`）。
   * true の場合、緊急判定は「翌日まで」=「48 時間未満」まで広げる。
   */
  isAllDay?: boolean;
  /** テスト用に現在時刻を差し込む。 */
  now?: Date;
}

/**
 * iOS 仕様に沿った期限状態を返す。
 *
 * 仕様（添付画像、優先度順）:
 *   1. 完了済み (isCompleted=true) → completed
 *   2. 現在時刻を過ぎている        → overdue
 *   3. 残り 24h 以内               → urgent
 *      ・時刻指定なしなら「翌日まで」= 48h 未満まで urgent 扱い
 *   4. それ以外の期限あり          → normal
 *   5. 期限なし                    → none
 */
export function getDueStatus(input: DueStatusInput): DueStatus {
  if (input.isCompleted) return 'completed';
  if (!input.dueDateIso) return 'none';
  const due = new Date(input.dueDateIso).getTime();
  if (Number.isNaN(due)) return 'none';
  const now = (input.now ?? new Date()).getTime();
  if (due <= now) return 'overdue';
  const diffMs = due - now;
  const urgentWindowMs = input.isAllDay ? 48 * 3600_000 : 24 * 3600_000;
  if (diffMs <= urgentWindowMs) return 'urgent';
  return 'normal';
}
