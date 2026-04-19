'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Skeleton } from '@/components/ui/Skeleton';
import { supabaseConfig } from '@/lib/env';
import type { Memo } from '@/lib/supabase/types-doublehub';
import {
  listMemos,
  createMemo,
  softDeleteMemo,
} from '@/lib/repositories/memos';

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export function MemoSection() {
  const [items, setItems] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
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
      const data = await listMemos({ limit: 50 });
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [envOk]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await createMemo({
        title: title.trim() || null,
        body: body.trim(),
      });
      setTitle('');
      setBody('');
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : '追加に失敗しました');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id: string) => {
    setItems((prev) => prev.filter((m) => m.id !== id));
    try {
      await softDeleteMemo(id);
    } catch (e) {
      setError(e instanceof Error ? e.message : '削除に失敗しました');
      await refresh();
    }
  };

  return (
    <section
      aria-labelledby="memo-heading"
      className="rounded-xl border border-border bg-surface p-5"
    >
      <div className="flex items-center justify-between">
        <h2 id="memo-heading" className="font-display text-lg font-semibold">
          メモ
        </h2>
        <span className="text-xs text-text-faint">{items.length} 件</span>
      </div>

      {envOk ? (
        <form onSubmit={handleAdd} className="mt-4 space-y-2">
          <Input
            placeholder="タイトル（任意）"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={busy}
          />
          <Textarea
            placeholder="本文を入力…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={busy}
            rows={3}
          />
          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={busy || !body.trim()}>
              保存
            </Button>
          </div>
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
          [0, 1].map((i) => <Skeleton key={i} className="h-20 w-full" />)
        ) : items.length === 0 ? (
          <li className="rounded-lg border border-dashed border-border bg-bg/40 p-4 text-center text-sm text-text-muted">
            メモがまだありません
          </li>
        ) : (
          items.map((m) => (
            <li
              key={m.id}
              className="group rounded-lg border border-border bg-bg/40 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  {m.title && (
                    <h3 className="truncate font-medium">{m.title}</h3>
                  )}
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm text-text-muted">
                    {m.body}
                  </p>
                  <p className="mt-2 text-[10px] text-text-faint">
                    {formatDate(m.updated_at)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(m.id)}
                  className="shrink-0 rounded-md border border-transparent px-2 py-1 text-xs text-text-faint opacity-0 transition hover:border-border hover:bg-surface-2 hover:text-text group-hover:opacity-100"
                  aria-label="このメモを削除"
                >
                  削除
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
