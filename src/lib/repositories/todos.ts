/**
 * DoubleHub ToDo リポジトリ（ブラウザ側）。
 *
 * RLS 前提: Supabase 側で `todos` テーブルは `user_id = auth.uid()` の
 * RLS が掛かっていることを前提にする（スキーマ変更禁止のため既存前提）。
 */
'use client';

import { getBrowserDoubleHub } from '@/lib/supabase/client';
import type { Todo } from '@/lib/supabase/types-doublehub';

type ActiveFilter = 'active' | 'done' | 'all';

export interface ListTodosOptions {
  filter?: ActiveFilter;
  limit?: number;
}

export async function listTodos({ filter = 'active', limit = 100 }: ListTodosOptions = {}): Promise<Todo[]> {
  const supabase = getBrowserDoubleHub();
  let query = supabase
    .from('todos')
    .select('*')
    .is('deleted_at', null)
    .order('order_index', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (filter === 'active') query = query.eq('is_done', false);
  if (filter === 'done') query = query.eq('is_done', true);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Todo[];
}

export async function createTodo(input: {
  title: string;
  note?: string | null;
  due_date?: string | null;
}): Promise<Todo> {
  const supabase = getBrowserDoubleHub();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('ログインが必要です');

  const payload = {
    user_id: user.user.id,
    title: input.title.trim(),
    note: input.note ?? null,
    due_date: input.due_date ?? null,
    is_done: false,
    completed_at: null,
    deleted_at: null,
    order_index: null,
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
    is_done: done,
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
  patch: Partial<Pick<Todo, 'title' | 'note' | 'due_date' | 'order_index'>>
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
  const { error } = await supabase
    .from('todos')
    .update({ deleted_at: new Date().toISOString() } as never)
    .eq('id', id);
  if (error) throw error;
}
