'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { supabaseConfig } from '@/lib/env';
import type {
  ExternalSourceAccount,
  ExternalSourceType,
} from '@/lib/supabase/types-doublehub';
import {
  listExternalSources,
  revokeExternalSource,
} from '@/lib/repositories/external-sources';

/**
 * 連携対象のプロダクト定義。連携済みでも未連携でも同じタイルを描画する。
 */
interface ProductMeta {
  key: ExternalSourceType;
  name: string;
  description: string;
  icon: string;
  /** プロダクトテーマクラス（`accent-product` を差し替える） */
  themeClass: string;
  /** 詳細ページへのリンク */
  detailHref: string;
}

const PRODUCTS: ProductMeta[] = [
  {
    key: 'bookcompass',
    name: 'BookCompass',
    description: '読書記録と感想メモを DoubleHub と連携',
    icon: '/images/bookcompass-app-icon.jpg',
    themeClass: 'theme-bookcompass',
    detailHref: '/app/bookcompass/',
  },
  {
    key: 'trainnote',
    name: 'TrainNote',
    description: 'ワークアウト記録と AI コーチを DoubleHub と連携',
    icon: '/images/trainnote-app-icon.jpg',
    themeClass: 'theme-trainnote',
    detailHref: '/app/trainnote/',
  },
];

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

  // source_type ごとに最新の（active 優先）連携レコードを 1 件に集約。
  const byType = new Map<ExternalSourceType, ExternalSourceAccount>();
  for (const it of items) {
    const existing = byType.get(it.source_type as ExternalSourceType);
    if (!existing || (existing.link_status !== 'active' && it.link_status === 'active')) {
      byType.set(it.source_type as ExternalSourceType, it);
    }
  }

  return (
    <section
      aria-labelledby="linked-heading"
      className="rounded-xl border border-border bg-surface p-6"
    >
      <div className="flex items-center justify-between gap-2">
        <h2
          id="linked-heading"
          className="font-display text-base font-semibold"
        >
          連携アカウント
        </h2>
      </div>
      <p className="mt-2 text-sm text-text-muted">
        BookCompass や TrainNote のアカウントは DoubleHub と別です。各プロダクトの
        iOS アプリで認証したあと、ここから連携状況を確認・解除できます。
      </p>

      {!envOk && (
        <p className="mt-4 rounded-lg border border-dashed border-border bg-bg/40 p-3 text-xs text-text-faint">
          Supabase 環境変数が未設定のため、連携情報は取得できません。
        </p>
      )}

      {error && (
        <p className="mt-3 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {PRODUCTS.map((p) => {
          const account = byType.get(p.key);
          return (
            <ProductTile
              key={p.key}
              product={p}
              account={account}
              loading={loading}
              onRevoke={handleRevoke}
            />
          );
        })}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// プロダクト連携タイル
// ---------------------------------------------------------------------------

interface ProductTileProps {
  product: ProductMeta;
  account: ExternalSourceAccount | undefined;
  loading: boolean;
  onRevoke: (id: string) => void;
}

function ProductTile({ product, account, loading, onRevoke }: ProductTileProps) {
  if (loading) {
    return (
      <li>
        <Skeleton className="h-28 w-full rounded-lg" />
      </li>
    );
  }

  const isActive = account?.link_status === 'active';
  const statusKey = account?.link_status ?? 'none';

  return (
    <li
      className={cn(
        product.themeClass,
        'relative overflow-hidden rounded-lg border border-border bg-bg/40 p-4'
      )}
    >
      {/* アクセントの帯（アクティブ時のみ色味を強める） */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full w-1"
        style={{
          background: 'var(--color-accent-product)',
          opacity: isActive ? 1 : 0.3,
        }}
      />
      <div className="flex items-start gap-3">
        <Image
          src={product.icon}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-lg border border-border object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-sm font-semibold">
              {product.name}
            </span>
            {account ? (
              <Badge
                variant={STATUS_VARIANT[statusKey] ?? 'outline'}
                className="text-[10px]"
              >
                {STATUS_LABEL[statusKey] ?? statusKey}
              </Badge>
            ) : (
              <Badge variant="muted" className="text-[10px]">
                未連携
              </Badge>
            )}
          </div>
          <p className="mt-1 text-xs text-text-muted">{product.description}</p>
          {account && (
            <p className="mt-1 truncate text-[11px] text-text-faint">
              キー: {account.external_user_key}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <Button asChild size="sm" variant="ghost">
          <Link href={product.detailHref}>詳細</Link>
        </Button>
        {isActive && account && (
          <button
            type="button"
            onClick={() => onRevoke(account.id)}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            解除
          </button>
        )}
      </div>
    </li>
  );
}
