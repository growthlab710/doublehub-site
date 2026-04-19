import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'TrainNote',
  robots: { index: false },
};

/**
 * /app/trainnote/ — v1 では Web 版は Coming Soon。
 */
export default function AppTrainNotePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">TrainNote</h1>
        <p className="mt-2 text-sm text-text-muted">
          筋トレ記録 TrainNote の Web 版は準備中です。
        </p>
      </header>
      <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center">
        <div className="text-3xl" aria-hidden>
          🏋️
        </div>
        <h2 className="mt-3 font-display text-lg font-semibold">
          Web 版は準備中です
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
          TrainNote は現在 iOS アプリでご利用いただけます。Web 版は AI Coach
          機能の整備後にリリース予定です。
        </p>
        <Button asChild className="mt-5" size="sm">
          <Link href="/products/trainnote/">TrainNote の詳細を見る</Link>
        </Button>
      </div>
    </div>
  );
}
