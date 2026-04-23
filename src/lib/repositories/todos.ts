/**
 * DoubleHub ToDo リポジトリ（ブラウザ側）。
 *
 * RLS 前提: Supabase 側で `todos` テーブルは `user_id = auth.uid()` の
 * RLS が掛かっていることを前提にする（スキーマ変更禁止のため既存前提）。
 */
'use client';

import { getBrowserDoubleHub } from '@/lib/supabase/client';
import type { Todo, TodoCategory } from '@/lib/supabase/types-doublehub';
import { DEFAULT_CATEGORY } from '@/lib/supabase/types-doublehub';

type ActiveFilter = 'active' | 'done' | 'all';

export interface ListTodosOptions {
  filter?: ActiveFilter;
  /**
   * iOS 側と同じ「タブ」を Web でも表現する。
   * - TodoCategory 文字列を渡すと該当タブのみ
   * - 'all' / 未指定 は全カテゴリを混ぜて返す（ダッシュボード用途）
   */
  category?: TodoCategory | 'all';
  limit?: number;
}

export async function listTodos({
  filter = 'active',
  category = 'all',
  limit = 100,
}: ListTodosOptions = {}): Promise<Todo[]> {
  const supabase = getBrowserDoubleHub();
  let query = supabase
    .from('todos')
    .select('*')
    .is('deleted_at', null)
    .order('position', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (filter === 'active') query = query.eq('is_completed', false);
  if (filter === 'done') query = query.eq('is_completed', true);
  if (category !== 'all') query = query.eq('category', category);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Todo[];
}

export async function createTodo(input: {
  title: string;
  due_date?: string | null;
  category?: TodoCategory;
}): Promise<Todo> {
  const supabase = getBrowserDoubleHub();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('ログインが必要です');

  const payload = {
    user_id: user.user.id,
    title: input.title.trim(),
    due_date: input.due_date ?? null,
    is_completed: false,
    completed_at: null,
    deleted_at: null,
    position: null,
    // iOS 側と同じ日本語文字列をそのまま保存する。
    category: input.category ?? DEFAULT_CATEGORY,
  };

  const { data, error } = await supabase
    .from('todos')
    // Supabase v2 の型推論が自前の Database スタブだと Insert 引数を `never` に解決してしまうため、
    // 書き込みのペイロードだけランタイム安全性を担保した上でキャスト。
    .insert(payload as never)
    .select('*')
    .single();
  if (error) throw error;
  return data as Todo;
}

export async function toggleTodo(id: string, done: boolean): Promise<Todo> {
  const supabase = getBrowserDoubleHub();
  const patch = {
    is_completed: done,
    completed_at: done ? new Date().toISOString() : null,
  };
  const { data, error } = await supabase
    .from('todos')
    .update(patch as never)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as Todo;
}

export async function updateTodo(
  id: string,
  patch: Partial<Pick<Todo, 'title' | 'due_date' | 'position'>>
): Promise<Todo> {
  const supabase = getBrowserDoubleHub();
  const { data, error } = await supabase
    .from('todos')
    .update(patch as never)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as Todo;
}

export async function softDeleteTodo(id: string): Promise<void> {
  const supabase = getBrowserDoubleHub();
  // RLS は deleted_at への直接 UPDATE を許可しないため、iOS と同じ RPC を経由する。
  // Supabase v2 の型推論が自前の Database スタブから Functions の Args を拾えず
  // never に解決されるので、既存の insert/update 同様に as never でキャストする。
  const { error } = await supabase.rpc(
    'soft_delete_own_todo',
    { target_todo_id: id } as never
  );
  if (error) throw error;
}
