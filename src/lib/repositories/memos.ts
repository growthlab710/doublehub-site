/**
 * DoubleHub メモリポジトリ（ブラウザ側）。
 */
'use client';

import { getBrowserDoubleHub } from '@/lib/supabase/client';
import type { Memo, MemoCategory } from '@/lib/supabase/types-doublehub';
import { DEFAULT_CATEGORY } from '@/lib/supabase/types-doublehub';

export interface ListMemosOptions {
  /**
   * iOS 側と同じ「タブ」を Web でも表現する。
   * - MemoCategory 文字列を渡すと該当タブのみ
   * - 'all' / 未指定 は全カテゴリを混ぜて返す（ダッシュボード用途）
   */
  category?: MemoCategory | 'all';
  limit?: number;
}

export async function listMemos({
  category = 'all',
  limit = 100,
}: ListMemosOptions = {}): Promise<Memo[]> {
  const supabase = getBrowserDoubleHub();
  const query = supabase
    .from('memos')
    .select('*')
    .is('deleted_at', null)
    .order('updated_at', { ascending: false })
    .limit(limit);
  // todos と同じ理由で、カテゴリフィルタはクライアント側で行う。

  const { data, error } = await query;
  if (error) throw error;
  const rows = (data ?? []) as Memo[];

  // 開発時の一時デバッグ（確認後に削除）。
  if (typeof window !== 'undefined') {
    const dist = new Map<string, number>();
    for (const r of rows) {
      const k = r.category === null || r.category === undefined ? '(null)' : JSON.stringify(r.category);
      dist.set(k, (dist.get(k) ?? 0) + 1);
    }
    // eslint-disable-next-line no-console
    console.debug('[DoubleHub] memos listed', {
      requested: { category, limit },
      rowsBeforeCategoryFilter: rows.length,
      categoryDistribution: Object.fromEntries(dist),
    });
  }

  if (category === 'all') return rows;
  return rows.filter((r) => matchMemoCategory(r.category, category));
}

function matchMemoCategory(
  rowCategory: string | null | undefined,
  selected: MemoCategory
): boolean {
  const normalized = (rowCategory ?? '').trim();
  if (normalized === selected) return true;
  if (selected === DEFAULT_CATEGORY) {
    if (normalized === '') return true;
    const known = new Set(['private', 'work']);
    if (!known.has(normalized.toLowerCase())) return true;
  }
  if (normalized.toLowerCase() === selected) return true;
  return false;
}

export async function createMemo(input: {
  content: string;
  category?: MemoCategory;
}): Promise<Memo> {
  const supabase = getBrowserDoubleHub();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('ログインが必要です');

  const payload = {
    user_id: user.user.id,
    content: input.content,
    deleted_at: null,
    // iOS 側と同じ日本語文字列をそのまま保存する。
    category: input.category ?? DEFAULT_CATEGORY,
  };
  const { data, error } = await supabase
    .from('memos')
    // Supabase v2 の型推論の互換性回避（Insert が never に解決されるため）。
    .insert(payload as never)
    .select('*')
    .single();
  if (error) throw error;
  return data as Memo;
}

export async function updateMemo(
  id: string,
  patch: Partial<Pick<Memo, 'content'>>
): Promise<Memo> {
  const supabase = getBrowserDoubleHub();
  const { data, error } = await supabase
    .from('memos')
    .update(patch as never)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as Memo;
}

export async function softDeleteMemo(id: string): Promise<void> {
  const supabase = getBrowserDoubleHub();
  // RLS は deleted_at への直接 UPDATE を許可しないため、iOS と同じ RPC を経由する。
  // Supabase v2 の型推論が自前の Database スタブから Functions の Args を拾えず
  // never に解決されるので、既存の insert/update 同様に as never でキャストする。
  const { error } = await supabase.rpc(
    'soft_delete_own_memo',
    { target_memo_id: id } as never
  );
  if (error) throw error;
}
