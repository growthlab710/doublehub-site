'use client';

import { useCallback, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { Book, BookStatus } from '@/lib/supabase/types-bookcompass';
import { listBooks } from '@/lib/repositories/books';

const STATUS_LABEL: Record<BookStatus, string> = {
  want: '読みたい',
  reading: '読書中',
  done: '読了',
  dropped: '中断',
};

type Filter = BookStatus | 'all';

export function BookShelf({ linked }: { linked: boolean }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState<Filter>('reading');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!linked) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await listBooks({ status: filter, limit: 60 });
      setBooks(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '読込に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [linked, filter]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  if (!linked) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface p-6 text-sm text-text-muted">
        BookCompass と連携すると、ここに本棚が表示されます。
      </div>
    );
  }

  return (
    <section
      aria-labelledby="shelf-heading"
      className="rounded-xl border border-border bg-surface p-5"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 id="shelf-heading" className="font-display text-lg font-semibold">
          本棚
        </h2>
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border p-1 text-xs">
          {(['reading', 'want', 'done', 'dropped', 'all'] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-md px-2.5 py-1 font-medium',
                filter === f
                  ? 'bg-surface-2 text-text'
                  : 'text-text-muted hover:text-text'
              )}
            >
              {f === 'all' ? '全て' : STATUS_LABEL[f]}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-3 rounded-lg border border-red-400/40 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300"
        >
          {error}
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-28 w-full" />)
        ) : books.length === 0 ? (
          <div className="col-span-full rounded-lg border border-dashed border-border bg-bg/40 p-6 text-center text-sm text-text-muted">
            該当する本がまだありません
          </div>
        ) : (
          books.map((b) => (
            <article
              key={b.id}
              className="flex gap-3 rounded-lg border border-border bg-bg/40 p-3"
            >
              {b.cover_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={b.cover_url}
                  alt=""
                  className="h-20 w-14 shrink-0 rounded border border-border object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-20 w-14 shrink-0 items-center justify-center rounded border border-border bg-surface-2 text-xs text-text-faint">
                  📖
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold">{b.title}</h3>
                {b.author && (
                  <p className="truncate text-xs text-text-muted">{b.author}</p>
                )}
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <Badge variant="muted" className="text-[10px]">
                    {STATUS_LABEL[b.status] ?? b.status}
                  </Badge>
                  {b.rating != null && (
                    <Badge variant="outline" className="text-[10px]">
                      ★ {b.rating}
                    </Badge>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
