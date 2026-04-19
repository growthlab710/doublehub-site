'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { supabaseConfig } from '@/lib/env';
import type { Todo, Memo } from '@/lib/supabase/types-doublehub';
import { listTodos } from '@/lib/repositories/todos';
import { listMemos } from '@/lib/repositories/memos';

export function DashboardWidgets() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const envOk = supabaseConfig.doublehub.ok;

  useEffect(() => {
    if (!envOk) {
      setLoading(false);
      return;
    }
    let mounted = true;
    (async () => {
      try {
        const [t, m] = await Promise.all([
          listTodos({ filter: 'active', limit: 5 }),
          listMemos({ limit: 3 }),
        ]);
        if (!mounted) return;
        setTodos(t);
        setMemos(m);
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : '読込に失敗しました');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [envOk]);

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold">未完了の ToDo</h2>
          <Link
            href="/app/doublehub/"
            className="text-xs text-text-muted hover:text-text"
          >
            一覧へ →
          </Link>
        </div>
        <ul className="mt-3 space-y-2">
          {!envOk ? (
            <li className="rounded-lg border border-dashed border-border bg-bg/40 p-3 text-xs text-text-faint">
              Supabase 環境変数が未設定です。
            </li>
          ) : loading ? (
            [0, 1, 2].map((i) => <Skeleton key={i} className="h-8 w-full" />)
          ) : todos.length === 0 ? (
            <li className="rounded-lg border border-dashed border-border bg-bg/40 p-3 text-xs text-text-muted">
              未完了の ToDo はありません
            </li>
          ) : (
            todos.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-2 rounded-lg border border-border bg-bg/40 px-3 py-2 text-sm"
              >
                <span className="truncate flex-1">{t.title}</span>
                {t.due_date && (
                  <Badge variant="outline" className="text-[10px]">
                    {t.due_date}
                  </Badge>
                )}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold">最新のメモ</h2>
          <Link
            href="/app/doublehub/"
            className="text-xs text-text-muted hover:text-text"
          >
            メモへ →
          </Link>
        </div>
        <ul className="mt-3 space-y-2">
          {!envOk ? (
            <li className="rounded-lg border border-dashed border-border bg-bg/40 p-3 text-xs text-text-faint">
              Supabase 環境変数が未設定です。
            </li>
          ) : loading ? (
            [0, 1].map((i) => <Skeleton key={i} className="h-14 w-full" />)
          ) : memos.length === 0 ? (
            <li className="rounded-lg border border-dashed border-border bg-bg/40 p-3 text-xs text-text-muted">
              メモはまだありません
            </li>
          ) : (
            memos.map((m) => (
              <li
                key={m.id}
                className="rounded-lg border border-border bg-bg/40 px-3 py-2"
              >
                {m.title && (
                  <p className="truncate text-sm font-medium">{m.title}</p>
                )}
                <p className="line-clamp-2 text-xs text-text-muted">{m.body}</p>
              </li>
            ))
          )}
        </ul>
      </div>

      {error && (
        <p
          role="alert"
          className="col-span-full text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </section>
  );
}
