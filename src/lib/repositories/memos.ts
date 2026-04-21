/**
 * DoubleHub メモリポジトリ（ブラウザ側）。
 */
'use client';

import { getBrowserDoubleHub } from '@/lib/supabase/client';
import type { Memo } from '@/lib/supabase/types-doublehub';

export interface ListMemosOptions {
  limit?: number;
}

export async function listMemos({ limit = 100 }: ListMemosOptions = {}): Promise<Memo[]> {
  const supabase = getBrowserDoubleHub();
  const { data, error } = await supabase
    .from('memos')
    .select('*')
    .is('deleted_at', null)
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Memo[];
}

export async function createMemo(input: {
  content: string;
}): Promise<Memo> {
  const supabase = getBrowserDoubleHub();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('ログインが必要です');

  const payload = {
    user_id: user.user.id,
    content: input.content,
    deleted_at: null,
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
  const { error } = await supabase.rpc('soft_delete_memo', { memo_id: id } as never);
  if (error) throw error;
}
