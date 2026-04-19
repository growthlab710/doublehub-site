'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { appNavItems } from './AppNav';
import { Badge } from '@/components/ui/Badge';

interface AppSidebarProps {
  className?: string;
  onNavigate?: () => void;
}

/**
 * Web アプリ用サイドバー。
 * デスクトップでは固定表示、モバイルでは `AppHeader` の Sheet 内で表示する。
 */
export function AppSidebar({ className, onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

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
        {appNavItems.map((item) => {
          const active =
            item.href === '/app/'
              ? pathname === '/app' || pathname === '/app/'
              : pathname?.startsWith(item.href.replace(/\/$/, ''));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-surface-2 text-text'
                  : 'text-text-muted hover:bg-surface-2 hover:text-text'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <span className="text-base leading-none" aria-hidden>
                {item.icon}
              </span>
              <span className="flex-1 truncate">{item.label}</span>
              {item.comingSoon && (
                <Badge variant="outline" className="shrink-0 text-[10px]">
                  準備中
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/"
          className="block rounded-lg px-3 py-2 text-xs text-text-faint hover:bg-surface-2 hover:text-text"
          onClick={onNavigate}
        >
          ← サイトに戻る
        </Link>
      </div>
    </aside>
  );
}
