'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { appNavItems, matchAppNav, type AppNavItem } from './AppNav';
import { Badge } from '@/components/ui/Badge';

interface AppSidebarProps {
  className?: string;
  onNavigate?: () => void;
}

/**
 * Web アプリ用サイドバー。
 * デスクトップでは固定表示、モバイルでは `AppHeader` の Sheet 内で表示する。
 *
 * アクティブ項目は、左端のアクセントバー + 背景トーン + アイコンの色付きチップで
 * 「今どこにいるか」を視覚的に明示する。アクセントカラーは `item.accent` により
 * プロダクト別（DoubleHub=primary, BookCompass=bookcompass, TrainNote=trainnote）で
 * 出し分ける。
 */
export function AppSidebar({ className, onNavigate }: AppSidebarProps) {
  const pathname = usePathname();
  const active = matchAppNav(pathname);

  return (
    <aside
      className={cn(
        'flex h-full w-64 flex-col border-r border-border bg-surface',
        className
      )}
      aria-label="メインナビゲーション"
    >
      <div className="flex h-16 items-center gap-2 border-b border-border px-5">
        <Link
          href="/app/"
          className="font-display text-base font-semibold tracking-tight"
          onClick={onNavigate}
        >
          DoubleHub
        </Link>
        <Badge variant="muted" className="ml-auto">
          Web v0.1
        </Badge>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {appNavItems.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
            isActive={active?.href === item.href}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/"
          className="block rounded-lg px-3 py-2 text-xs text-text-faint transition-colors hover:bg-surface-2 hover:text-text"
          onClick={onNavigate}
        >
          ← サイトに戻る
        </Link>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Sidebar 1 行
// ---------------------------------------------------------------------------

interface SidebarItemProps {
  item: AppNavItem;
  isActive: boolean;
  onNavigate?: () => void;
}

function SidebarItem({ item, isActive, onNavigate }: SidebarItemProps) {
  // アクセントカラー。Tailwind の arbitrary class を避け、事前定義クラスにマップする。
  const accent = accentClasses(item.accent ?? 'neutral');

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        // 左側にアクセントバーを描くため relative。
        'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? cn('bg-surface-2 text-text', accent.activeText)
          : 'text-text-muted hover:bg-surface-2 hover:text-text'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* 左側アクセントバー（アクティブ時のみ） */}
      <span
        aria-hidden
        className={cn(
          'absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full transition-opacity',
          isActive ? cn('opacity-100', accent.bar) : 'opacity-0'
        )}
      />
      <NavIcon item={item} isActive={isActive} accentIconBg={accent.iconBg} />
      <span className="flex-1 truncate">{item.label}</span>
      {item.comingSoon && (
        <Badge variant="outline" className="shrink-0 text-[10px]">
          準備中
        </Badge>
      )}
    </Link>
  );
}

/**
 * プロダクト別のアクセント色クラスを返す。
 *
 * Tailwind の JIT が検出できるよう、可能性のあるクラス名を静的文字列として
 * 返す（動的補間は使わない）。
 */
// ---------------------------------------------------------------------------
// アイコン描画。絵文字とアプリアイコン画像の両方に対応。
// ---------------------------------------------------------------------------

interface NavIconProps {
  item: AppNavItem;
  isActive: boolean;
  accentIconBg: string;
}

function NavIcon({ item, isActive, accentIconBg }: NavIconProps) {
  const isImage = item.icon.startsWith('/');

  if (isImage) {
    // アプリアイコン画像。角は「app-icon squircle」近い見た目にするため
    // rounded-md ～rounded-lg ぐらいに押さえ、サイズは絵文字時と揃える（20x20）。
    return (
      <span
        aria-hidden
        className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-surface-2"
      >
        <Image
          src={item.icon}
          alt=""
          width={24}
          height={24}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  // 絵文字は従来通りアクティブ時に色付きチップ、他は faint に。
  return (
    <span
      aria-hidden
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-md text-base leading-none transition-colors',
        isActive ? accentIconBg : 'text-text-muted'
      )}
    >
      {item.icon}
    </span>
  );
}

function accentClasses(accent: NonNullable<AppNavItem['accent']>): {
  bar: string;
  activeText: string;
  iconBg: string;
} {
  switch (accent) {
    case 'primary':
      return {
        bar: 'bg-primary',
        activeText: 'text-primary',
        iconBg: 'bg-primary/10 text-primary',
      };
    case 'bookcompass':
      // BookCompass のアクセントカラーは theme-bookcompass でのみ `--bc-*` が
      // 設定されるが、サイドバーは未テーマのプレーンな文脈で出る。
      // 暫定的に primary 寄りの色で見やすさを確保し、Coming Soon ページ側で
      // プロダクトテーマを切替える（次フェーズのテーマ化で調整）。
      return {
        bar: 'bg-amber-500',
        activeText: 'text-amber-600 dark:text-amber-400',
        iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      };
    case 'trainnote':
      return {
        bar: 'bg-cyan-500',
        activeText: 'text-cyan-600 dark:text-cyan-400',
        iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
      };
    case 'neutral':
    default:
      return {
        bar: 'bg-text-muted',
        activeText: 'text-text',
        iconBg: 'bg-surface text-text',
      };
  }
}
