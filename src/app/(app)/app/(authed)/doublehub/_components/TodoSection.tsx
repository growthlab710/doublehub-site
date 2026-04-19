'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { supabaseConfig } from '@/lib/env';
import type { Todo } from '@/lib/supabase/types-doublehub';
import {
  listTodos,
  createTodo,
  toggleTodo,
  softDeleteTodo,
} from '@/lib/repositories/todos';

type Filter = 'active' | 'done' | 'all';

export function TodoSection() {
  const [items, setItems] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('active');
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const envOk = supabaseConfig.doublehub.ok;

  const refresh = useCallback(async () => {
    if (!envOk) {
      setLoading(false);
      return;
    }
    setError(null);
    try {
      const data = await listTodos({ filter, limit: 200 });
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [envOk, filter]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await createTodo({ title: title.trim() });
      setTitle('');
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : '追加に失敗しました');
    } finally {
      setBusy(false);
    }
  };

  const handleToggle = async (id: string, done: boolean) => {
    // 楽観的更新
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_done: done } : t))
    );
    try {
      await toggleTodo(id, done);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : '更新に失敗しました');
      await refresh();
    }
  };

  const handleDelete = async (id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    try {
      await softDeleteTodo(id);
    } catch (e) {
      setError(e instanceof Error ? e.message : '削除に失敗しました');
      await refresh();
    }
  };

  return (
    <section
      aria-labelledby="todo-heading"
      className="rounded-xl border border-border bg-surface p-5"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 id="todo-heading" className="font-display text-lg font-semibold">
          ToDo
        </h2>
        <div className="flex items-center gap-1 rounded-lg border border-border p-1 text-xs">
          {(['active', 'done', 'all'] as Filter[]).map((f) => (
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
              {f === 'active' ? '未完了' : f === 'done' ? '完了' : '全て'}
            </button>
          ))}
        </div>
      </div>

      {envOk ? (
        <form onSubmit={handleAdd} className="mt-4 flex gap-2">
          <Input
            placeholder="新しい ToDo を追加"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={busy}
          />
          <Button type="submit" size="sm" disabled={busy || !title.trim()}>
            追加
          </Button>
        </form>
      ) : (
        <p className="mt-4 rounded-lg border border-dashed border-border bg-bg/40 p-3 text-xs text-text-faint">
          Supabase 環境変数が未設定のため、書き込みは無効化されています。
        </p>
      )}

      {error && (
        <div
          role="alert"
          className="mt-3 rounded-lg border border-red-400/40 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300"
        >
          {error}
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {loading ? (
          [0, 1, 2].map((i) => <Skeleton key={i} className="h-10 w-full" />)
        ) : items.length === 0 ? (
          <li className="rounded-lg border border-dashed border-border bg-bg/40 p-4 text-center text-sm text-text-muted">
            {filter === 'done'
              ? '完了した ToDo はまだありません'
              : '表示する ToDo がありません'}
          </li>
        ) : (
          items.map((t) => (
            <li
              key={t.id}
              className={cn(
                'group flex items-start gap-3 rounded-lg border border-border bg-bg/40 px-3 py-2.5',
                t.is_done && 'opacity-60'
              )}
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 accent-primary"
                checked={t.is_done}
                onChange={(e) => handleToggle(t.id, e.target.checked)}
                aria-label={`${t.title} を${t.is_done ? '未完了に' : '完了に'}する`}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'truncate text-sm font-medium',
                      t.is_done && 'line-through'
                    )}
                  >
                    {t.title}
                  </span>
                  {t.due_date && (
                    <Badge variant="outline" className="text-[10px]">
                      期限 {t.due_date}
                    </Badge>
                  )}
                </div>
                {t.note && (
                  <p className="mt-0.5 truncate text-xs text-text-muted">
                    {t.note}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(t.id)}
                className="shrink-0 rounded-md border border-transparent px-2 py-1 text-xs text-text-faint opacity-0 transition hover:border-border hover:bg-surface-2 hover:text-text group-hover:opacity-100"
                aria-label={`${t.title} を削除`}
              >
                削除
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
