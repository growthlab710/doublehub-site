'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { AppSidebar } from './AppSidebar';
import { getBrowserDoubleHub } from '@/lib/supabase/client';
import { isDynamicHosting } from '@/lib/env';

interface AppUser {
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
}

interface AppHeaderProps {
  user: AppUser | null;
}

/**
 * Web アプリ版の上部ヘッダー。
 * - モバイルではハンバーガーメニューからサイドバーを開く。
 * - 右上にユーザーメニュー（ログアウト / 設定 / サイトへ戻る）。
 */
export function AppHeader({ user }: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    if (!isDynamicHosting) {
      // static モードでは Supabase 呼び出しを避ける
      router.push('/app/login/');
      return;
    }
    try {
      const supabase = getBrowserDoubleHub();
      await supabase.auth.signOut();
    } catch (err) {
      // 設定なしの開発環境など
      console.warn('signOut failed', err);
    }
    router.push('/app/login/');
    router.refresh();
  }, [router]);

  const initials =
    (user?.displayName || user?.email || '?')
      .trim()
      .charAt(0)
      .toUpperCase() || '?';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-bg/90 px-4 backdrop-blur-md md:px-6">
      {/* モバイル: ハンバーガー */}
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-text-muted hover:bg-surface-2 hover:text-text md:hidden'
        )}
        aria-label="メニューを開く"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <Link
        href="/app/"
        className="font-display text-base font-semibold tracking-tight md:hidden"
      >
        DoubleHub
      </Link>

      <div className="ml-auto flex items-center gap-2">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-border px-2 py-1 hover:bg-surface-2"
                aria-label="アカウントメニュー"
              >
                <Avatar className="h-7 w-7">
                  {user.avatarUrl ? (
                    <AvatarImage src={user.avatarUrl} alt="" />
                  ) : null}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="hidden max-w-[160px] truncate text-sm text-text-muted md:inline">
                  {user.displayName || user.email}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="truncate text-sm font-medium">
                  {user.displayName || 'ユーザー'}
                </div>
                {user.email && (
                  <div className="truncate text-xs text-text-faint">
                    {user.email}
                  </div>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/app/settings/">設定</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">サイトに戻る</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => {
                e.preventDefault();
                void handleSignOut();
              }}>
                ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild size="sm" variant="secondary">
            <Link href="/app/login/">ログイン</Link>
          </Button>
        )}
      </div>

      {/* モバイル用サイドバー Dialog */}
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="left-0 top-0 h-full w-[280px] max-w-[85vw] translate-x-0 translate-y-0 rounded-none border-y-0 border-l-0 p-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
          <DialogTitle className="sr-only">メインナビゲーション</DialogTitle>
          <AppSidebar onNavigate={() => setMenuOpen(false)} className="w-full" />
        </DialogContent>
      </Dialog>
    </header>
  );
}
