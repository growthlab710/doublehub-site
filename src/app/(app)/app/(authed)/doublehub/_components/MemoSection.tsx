'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { supabaseConfig } from '@/lib/env';
import type { Memo, MemoCategory } from '@/lib/supabase/types-doublehub';
import {
  DEFAULT_CATEGORY,
  CATEGORY_LABEL,
} from '@/lib/supabase/types-doublehub';
import { createMemo, softDeleteMemo } from '@/lib/repositories/memos';

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

interface MemoSectionProps {
  /** 現在選択中のカテゴリ。 */
  category?: MemoCategory;
  /** 親から払い下げられた「このカテゴリ分の」メモ一覧。 */
  items: Memo[];
  /** データが変わったときに親へ再取得を依頼するコールバック。 */
  onChanged?: () => void | Promise<void>;
}

export function MemoSection({
  category = DEFAULT_CATEGORY,
  items,
  onChanged,
}: MemoSectionProps) {
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const envOk = supabaseConfig.doublehub.ok;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setBusy(true);
    setError(null);
    try {
      // 作成時は現在選択中のカテゴリで保存する。
      await createMemo({ content: content.trim(), category });
      setContent('');
      await onChanged?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : '追加に失敗しました');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await softDeleteMemo(id);
      await onChanged?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : '削除に失敗しました');
    }
  };

  return (
    <section
      aria-labelledby="memo-heading"
      className="rounded-xl border border-border bg-surface p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 id="memo-heading" className="font-display text-lg font-semibold">
            メモ
          </h2>
          <span className="text-xs text-text-faint">{items.length} 件</span>
        </div>
      </div>

      {envOk ? (
        <form onSubmit={handleAdd} className="mt-4 space-y-2">
          <Textarea
            placeholder={`本文を入力…（${CATEGORY_LABEL[category]}）`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={busy}
            rows={3}
          />
          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={busy || !content.trim()}>
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
        {items.length === 0 ? (
          <li className="rounded-lg border border-dashed border-border bg-bg/40 p-4 text-center text-sm text-text-muted">
            {CATEGORY_LABEL[category]}のメモはまだありません
          </li>
        ) : (
          items.map((m) => (
            <li
              key={m.id}
              className="group rounded-lg border border-border bg-bg/40 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="whitespace-pre-wrap break-words text-sm text-text-muted">
                    {m.content}
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
