export const metadata = {
  title: 'BookCompass',
  robots: { index: false },
};

/**
 * /app/bookcompass/ プレースホルダ。
 * Day 4 で本棚 / 読書中 / 最近の読書記録 / 連携案内を実装する。
 */
export default function AppBookCompassPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">BookCompass</h1>
        <p className="mt-2 text-sm text-text-muted">
          読書記録の本棚（Day 4 で BookCompass 連携と表示を実装）。
        </p>
      </header>
      <div className="rounded-xl border border-border bg-surface p-6 text-sm text-text-muted">
        <p>
          BookCompass 連携は DoubleHub アカウントとは別のログインが必要です。
          （Day 4 で連携フロー / 本棚表示を実装）
        </p>
      </div>
    </div>
  );
}
