/**
 * `/app/` 以下の共通ラッパー。
 *
 * ログイン画面とダッシュボード系で UI が大きく違うため、ここでは
 * 認証ガード / AppShell を当てず、各子ルート (`(authed)` / `login`) に
 * 任せる。
 *
 * - `/app/login/`    : 公開（未認証向け）
 * - `/app/(authed)/*`: 認証必須。`(authed)/layout.tsx` でガード。
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
