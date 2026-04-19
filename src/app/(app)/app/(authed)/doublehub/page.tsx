export const metadata = {
  title: 'DoubleHub',
  robots: { index: false },
};

/**
 * /app/doublehub/ プレースホルダ。
 * Day 4 で ToDo リスト / メモ / 完了ログ / タブ切替を実装する。
 */
export default function AppDoubleHubPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">DoubleHub</h1>
        <p className="mt-2 text-sm text-text-muted">
          ToDo とメモを横断して管理する画面（Day 4 で本実装）。
        </p>
      </header>
      <div className="rounded-xl border border-border bg-surface p-6 text-sm text-text-muted">
        タスクとメモのリストは Day 4 で追加されます。
      </div>
    </div>
  );
}
