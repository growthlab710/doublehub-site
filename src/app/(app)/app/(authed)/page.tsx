import Image from 'next/image';
import Link from 'next/link';
import { appNavItems } from '@/components/app/AppNav';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { DashboardGreeting } from './_components/DashboardGreeting';
import { DashboardWidgets } from './_components/DashboardWidgets';

export const metadata = {
  title: 'ダッシュボード',
  robots: { index: false },
};

/**
 * /app/ ダッシュボード。
 *
 * 構成:
 *  1. パーソナル挨拶ヘッダー（ユーザー名・日付・アプリの位置づけ説明）
 *  2. サマリグリッド（未完了 ToDo / 最新メモ / BookCompass 本棚プレビュー）
 *  3. プロダクトハブカード（DoubleHub / BookCompass / TrainNote / 設定）
 *
 * iOS 側のタブ分離（プライベート / 仕事）はここでは混在表示し、各アイテムの
 * カテゴリは CategoryBadge で区別する。各プロダクト詳細ページで切り替える。
 */
export default function AppDashboardPage() {
  // 現在地のダッシュボード自身は除外。
  const products = appNavItems.filter((n) => n.href !== '/app/');

  return (
    <div className="space-y-10">
      <DashboardGreeting />

      <DashboardWidgets />

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-semibold">プロダクト</h2>
            <p className="mt-1 text-xs text-text-muted">
              3 つのプロダクトを一つのハブから行き来できます。
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductHubCard key={p.href} {...p} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* プロダクトハブカード                                                       */
/* -------------------------------------------------------------------------- */

interface ProductHubCardProps {
  href: string;
  label: string;
  icon: string;
  description?: string;
  comingSoon?: boolean;
}

/**
 * プロダクトごとにテーマカラーをアクセント帯として出すハブカード。
 *
 * - DoubleHub: primary (teal)
 * - BookCompass: amber (iOS アクセント色)
 * - TrainNote: cyan (iOS HUD 色)
 * - 設定: neutral
 */
function ProductHubCard({
  href,
  label,
  icon,
  description,
  comingSoon,
}: ProductHubCardProps) {
  const accent = getAccentFor(href);

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-sm',
        'transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md'
      )}
    >
      {/* 上端アクセントバー */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r to-transparent',
          accent.gradient
        )}
        aria-hidden
      />
      <div className="flex items-start gap-3">
        <ProductIcon icon={icon} label={label} accentBg={accent.iconBg} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display text-base font-semibold">
              {label}
            </h3>
            {comingSoon && (
              <Badge variant="outline" className="shrink-0 text-[10px]">
                準備中
              </Badge>
            )}
          </div>
          {description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-text-muted">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-text-muted transition-colors group-hover:text-primary">
        開く
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </Link>
  );
}

/**
 * アイコン描画。AppNavItem.icon が `/images/...` パスなら next/image で
 * アプリアイコン（squircle）として描画し、それ以外は絵文字テキストとして
 * 従来通り表示する。サイドバーの NavIcon と同じ分岐ロジック。
 */
function ProductIcon({
  icon,
  label,
  accentBg,
}: {
  icon: string;
  label: string;
  accentBg: string;
}) {
  const isImage = icon.startsWith('/');

  if (isImage) {
    return (
      <span
        className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-2"
        aria-hidden
      >
        <Image
          src={icon}
          alt={`${label} アプリアイコン`}
          width={40}
          height={40}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl',
        accentBg
      )}
      aria-hidden
    >
      {icon}
    </span>
  );
}

function getAccentFor(href: string): { gradient: string; iconBg: string } {
  if (href.startsWith('/app/bookcompass')) {
    return {
      gradient: 'from-[var(--bc-accent)]/70 via-[var(--bc-accent)]/15',
      iconBg: 'bg-[var(--bc-accent)]/10 text-[var(--bc-primary)]',
    };
  }
  if (href.startsWith('/app/trainnote')) {
    return {
      gradient: 'from-[var(--tn-cyan)]/70 via-[var(--tn-cyan)]/15',
      iconBg: 'bg-[var(--tn-cyan)]/10 text-[var(--tn-cyan)]',
    };
  }
  if (href.startsWith('/app/settings')) {
    return {
      gradient: 'from-text-faint/40 via-text-faint/10',
      iconBg: 'bg-surface-2 text-text-muted',
    };
  }
  // DoubleHub 本体 / デフォルト
  return {
    gradient: 'from-primary/70 via-primary/15',
    iconBg: 'bg-primary-soft text-primary',
  };
}
