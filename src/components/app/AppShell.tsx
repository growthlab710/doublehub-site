import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

interface AppUser {
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
}

interface AppShellProps {
  user: AppUser | null;
  children: React.ReactNode;
}

/**
 * Web アプリ版共通シェル。
 * - 左: 固定サイドバー (desktop)
 * - 上: ヘッダー（モバイルはハンバーガー + ユーザーメニュー）
 * - メインコンテンツ: children
 *
 * user が null のときは未認証だが、実際の認証ガードは上位 `layout.tsx`
 * （dynamic モード）または `RequireAuth` クライアント（static モード）が行う。
 */
export function AppShell({ user, children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh bg-bg text-text">
      {/* Desktop サイドバー */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader user={user} />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
