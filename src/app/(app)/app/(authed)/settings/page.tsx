import { ProfileCard } from './_components/ProfileCard';
import { LinkedAccountsCard } from './_components/LinkedAccountsCard';

export const metadata = {
  title: '設定',
  robots: { index: false },
};

/**
 * /app/settings/
 * - プロフィール編集
 * - 連携アカウント一覧 / 解除
 * - （Day 5 以降）アカウント削除 / データエクスポート
 */
export default function AppSettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">設定</h1>
        <p className="mt-2 text-sm text-text-muted">
          プロフィールと連携アカウントを管理します。
        </p>
      </header>
      <ProfileCard />
      <LinkedAccountsCard />
      <section className="rounded-xl border border-dashed border-border bg-surface p-6 text-sm text-text-muted">
        <h2 className="font-display text-base font-semibold text-text">
          アカウント削除
        </h2>
        <p className="mt-2">
          アカウント削除機能は Day 5 以降でサーバ側 Route Handler を
          追加して実装します。現時点ではサポートからの依頼となります。
        </p>
      </section>
    </div>
  );
}
