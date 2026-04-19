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
  title?: string | null;
  body: string;
  tags?: string[] | null;
}): Promise<Memo> {
  const supabase = getBrowserDoubleHub();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('ログインが必要です');

  const payload = {
    user_id: user.user.id,
    title: input.title ?? null,
    body: input.body,
    tags: input.tags ?? null,
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
  patch: Partial<Pick<Memo, 'title' | 'body' | 'tags'>>
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
  const { error } = await supabase
    .from('memos')
    .update({ deleted_at: new Date().toISOString() } as never)
    .eq('id', id);
  if (error) throw error;
}
