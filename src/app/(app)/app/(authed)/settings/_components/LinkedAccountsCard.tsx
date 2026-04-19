'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { supabaseConfig } from '@/lib/env';
import type { ExternalSourceAccount } from '@/lib/supabase/types-doublehub';
import {
  listExternalSources,
  revokeExternalSource,
} from '@/lib/repositories/external-sources';

const LABELS: Record<string, string> = {
  bookcompass: 'BookCompass',
  trainnote: 'TrainNote',
};

const STATUS_VARIANT: Record<
  string,
  'default' | 'outline' | 'success' | 'muted'
> = {
  active: 'success',
  pending: 'outline',
  revoked: 'muted',
};

const STATUS_LABEL: Record<string, string> = {
  active: '連携中',
  pending: '保留',
  revoked: '解除済み',
};

export function LinkedAccountsCard() {
  const [items, setItems] = useState<ExternalSourceAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const envOk = supabaseConfig.doublehub.ok;

  const refresh = useCallback(async () => {
    if (!envOk) {
      setLoading(false);
      return;
    }
    setError(null);
    try {
      const data = await listExternalSources();
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

  const handleRevoke = async (id: string) => {
    if (!window.confirm('この連携を解除しますか？')) return;
    try {
      await revokeExternalSource(id);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : '解除に失敗しました');
    }
  };

  return (
    <section
      aria-labelledby="linked-heading"
      className="rounded-xl border border-border bg-surface p-6"
    >
      <div className="flex items-center justify-between">
        <h2 id="linked-heading" className="font-display text-base font-semibold">
          連携アカウント
        </h2>
        <Button asChild size="sm" variant="secondary">
          <Link href="/app/bookcompass/">BookCompass を連携</Link>
        </Button>
      </div>
      <p className="mt-2 text-sm text-text-muted">
        BookCompass や TrainNote のアカウントは DoubleHub と別です。ここから
        連携状況を確認・解除できます。
      </p>

      {!envOk && (
        <p className="mt-4 rounded-lg border border-dashed border-border bg-bg/40 p-3 text-xs text-text-faint">
          Supabase 環境変数が未設定のため、連携情報は取得できません。
        </p>
      )}

      {error && (
        <p className="mt-3 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}

      <ul className="mt-4 space-y-2">
        {loading ? (
          [0, 1].map((i) => <Skeleton key={i} className="h-12 w-full" />)
        ) : items.length === 0 ? (
          <li className="rounded-lg border border-dashed border-border bg-bg/40 p-4 text-sm text-text-muted">
            連携はまだありません
          </li>
        ) : (
          items.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-bg/40 px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {LABELS[a.source_type] ?? a.source_type}
                  </span>
                  <Badge
                    variant={STATUS_VARIANT[a.link_status] ?? 'outline'}
                    className="text-[10px]"
                  >
                    {STATUS_LABEL[a.link_status] ?? a.link_status}
                  </Badge>
                </div>
                <p className="truncate text-xs text-text-faint">
                  キー: {a.external_user_key}
                </p>
              </div>
              {a.link_status === 'active' && (
                <button
                  type="button"
                  onClick={() => handleRevoke(a.id)}
                  className="shrink-0 rounded-md border border-border px-2 py-1 text-xs text-text-muted hover:bg-surface-2 hover:text-text"
                >
                  解除
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
