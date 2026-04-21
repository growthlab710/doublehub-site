/**
 * 表示用フォーマッタ。
 *
 * `due_date` など timestamptz カラムは UTC の ISO 文字列で返るため、
 * ブラウザの実行時タイムゾーンに依存せず、常に JST (Asia/Tokyo) で
 * 整形して iOS アプリ側の表示と一致させる。
 */

/** ISO 文字列を「M月D日 HH:mm」の Asia/Tokyo 表示に整形する（不正値なら null） */
export function formatDueDateJST(
  iso: string | null | undefined
): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  // `ja-JP` のデフォルトは `4/25 23:00` 形式なので、parts を組み替えて
  // iOS 表記に揃えた「4月25日 23:00」を生成する。
  const parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(d);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  return `${Number(get('month'))}月${Number(get('day'))}日 ${get('hour')}:${get('minute')}`;
}
