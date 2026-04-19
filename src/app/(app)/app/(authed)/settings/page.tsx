export const metadata = {
  title: '設定',
  robots: { index: false },
};

/**
 * /app/settings/ プレースホルダ。
 * Day 4 でプロフィール / 連携 (external_source_accounts) / サブスクリプション
 * / データエクスポート / アカウント削除を実装する。
 */
export default function AppSettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">設定</h1>
        <p className="mt-2 text-sm text-text-muted">
          プロフィール / 連携アカウント / アカウント削除などを管理します。
        </p>
      </header>
      <div className="rounded-xl border border-border bg-surface p-6 text-sm text-text-muted">
        Day 4 で実装予定: プロフィール編集 / BookCompass 連携 / アカウント削除。
      </div>
    </div>
  );
}
