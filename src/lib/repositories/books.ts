/**
 * BookCompass 書籍リポジトリ（ブラウザ側・BookCompass Supabase）。
 *
 * 書籍検索は Edge Function `search-books` (NDL/openBD) 経由のみ。
 * 楽天 API は使用しない。
 */
'use client';

import { getBrowserBookCompass } from '@/lib/supabase/client';
import type { Book, BookStatus, Mutter } from '@/lib/supabase/types-bookcompass';

export interface ListBooksOptions {
  status?: BookStatus | 'all';
  limit?: number;
}

export async function listBooks({ status = 'all', limit = 100 }: ListBooksOptions = {}): Promise<Book[]> {
  const supabase = getBrowserBookCompass();
  let query = supabase
    .from('books')
    .select('*')
    .is('deleted_at', null)
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (status !== 'all') query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Book[];
}

export async function listMuttersForBook(bookId: string): Promise<Mutter[]> {
  const supabase = getBrowserBookCompass();
  const { data, error } = await supabase
    .from('mutters')
    .select('*')
    .eq('book_id', bookId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Mutter[];
}

/**
 * Edge Function 経由の書籍検索（NDL / openBD）。
 * 戻り値は Edge Function の実装に依存するため unknown。
 */
export async function searchBooksViaEdge(query: string): Promise<unknown> {
  const supabase = getBrowserBookCompass();
  const { data, error } = await supabase.functions.invoke('search-books', {
    body: { q: query },
  });
  if (error) throw error;
  return data;
}
