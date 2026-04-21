import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'BookCompass',
  robots: { index: false },
};

/**
 * /app/bookcompass/ — v1 では Web 連携は Coming Soon。
 *
 * iOS 側が匿名認証のみで Apple Sign In UI を未公開のため、Web からの
 * プロバイダ非依存連携（`external_source_accounts` への書き込み）が
 * 現時点で技術的に成立しない。iOS 側の Apple Sign In 公開後に復活予定。
 *
 * 旧 Link / BookShelf 実装は `_components/` 配下に残してあり、復活時に
 * そのまま呼び出せるようにしている。
 */
export default function AppBookCompassPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">BookCompass</h1>
        <p className="mt-2 text-sm text-text-muted">
          読書記録 BookCompass の Web 連携は準備中です。
        </p>
      </header>
      <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center">
        <div className="text-3xl" aria-hidden>
          📚
        </div>
        <h2 className="mt-3 font-display text-lg font-semibold">
          Web 連携は準備中です
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
          BookCompass の Web 連携機能は準備中です。現在は iOS アプリでの
          ご利用をお願いします。
        </p>
        <Button asChild className="mt-5" size="sm">
          <Link href="/products/bookcompass/">BookCompass の詳細を見る</Link>
        </Button>
      </div>
    </div>
  );
}
