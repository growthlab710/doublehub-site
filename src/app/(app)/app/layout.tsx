/**
 * Web アプリエリア用レイアウト（placeholder）。
 * Day 3 で AppShell（サイドバー + ヘッダー）・認証ガード・Supabase セッション取得を実装する。
 *
 * 現状は最低限の中身のみ。dynamic モードのときはここでサーバーサイド認証ガードを行う予定。
 */
import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-text">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link href="/app/" className="font-display text-base font-semibold">
            DoubleHub Dashboard
          </Link>
          <span className="text-xs text-text-faint">Web アプリ骨格 v0.1 (Day 3 で本実装)</span>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
