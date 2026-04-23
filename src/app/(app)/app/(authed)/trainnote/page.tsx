import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'TrainNote',
  robots: { index: false },
};

const APP_STORE_URL =
  'https://apps.apple.com/us/app/trainnote/id6759539755';

const PLANNED_FEATURES = [
  {
    title: 'ワークアウト履歴',
    description:
      'iOS で記録したセット・レップ・負荷を Web ブラウザから一覧・検索。',
  },
  {
    title: 'AI コーチの対話',
    description:
      '次のメニュー提案や怪我予防のチェックを AI コーチと Web でも相談。',
  },
  {
    title: '進捗グラフ',
    description:
      '部位別の総挙上量・1RM 推移を美しいグラフで可視化。',
  },
];

/**
 * /app/trainnote/ — Web 版は Coming Soon。
 *
 * UI 的には `theme-trainnote` スコープを当てることで、`accent-product`
 * トークンが TrainNote のブランドカラー（シアン）に差し替わる。CTA や
 * 装飾にそのトークンを用いて「いまは TrainNote ページにいる」という
 * 視覚的コンテキストを与える。
 */
export default function AppTrainNotePage() {
  return (
    <div className="theme-trainnote space-y-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold">TrainNote</h1>
          <Badge
            variant="outline"
            className="text-accent-product"
            style={{ borderColor: 'var(--color-accent-product)' }}
          >
            Coming Soon
          </Badge>
        </div>
        <p className="text-sm text-text-muted">
          筋トレ記録アプリ TrainNote の Web 版は AI コーチ機能の整備後に公開予定です。
        </p>
      </header>

      <section
        aria-labelledby="tn-hero-title"
        className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, var(--color-accent-product), transparent)',
            opacity: 0.2,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, var(--color-accent-product), transparent)',
            opacity: 0.1,
          }}
        />
        <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center">
            <div
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
              style={{
                background: 'var(--color-accent-product)',
                color: 'var(--color-accent-product-fg)',
              }}
              aria-hidden
            >
              🏋️
            </div>
            <h2
              id="tn-hero-title"
              className="mt-4 font-display text-xl font-semibold"
            >
              強くなる過程を、AI と一緒に。
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              TrainNote はセット数・重量・調子を手早く記録する筋トレアプリです。
              Web 版では AI コーチとの対話や進捗グラフをブラウザから利用できるようにします。
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="sm"
                className="border-0"
                style={{
                  background: 'var(--color-accent-product)',
                  color: 'var(--color-accent-product-fg)',
                }}
              >
                <Link
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  App Store で入手
                </Link>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <Link
                  href="/products/trainnote/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  詳細ページへ
                </Link>
              </Button>
            </div>
          </div>

          {/* モックスクリーン（CSS のみ） */}
          <div className="relative hidden md:block">
            <div
              className="mx-auto aspect-[9/16] w-44 rounded-[28px] border border-border bg-bg p-2 shadow-lg"
              aria-hidden
            >
              <div className="h-full w-full overflow-hidden rounded-[22px] bg-surface-2">
                <div
                  className="flex h-14 items-center gap-2 px-3 text-xs font-semibold"
                  style={{
                    background: 'var(--color-accent-product)',
                    color: 'var(--color-accent-product-fg)',
                  }}
                >
                  <span>🏋️</span>
                  <span>TrainNote</span>
                </div>
                <div className="space-y-2 p-3">
                  {/* ダミーのグラフ */}
                  <div className="flex h-20 items-end gap-1 rounded-md bg-bg p-2">
                    {[0.35, 0.5, 0.45, 0.7, 0.6, 0.85, 0.95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h * 100}%`,
                          background: 'var(--color-accent-product)',
                        }}
                      />
                    ))}
                  </div>
                  {[0.9, 0.7, 0.8].map((w, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-md bg-bg p-2"
                    >
                      <div
                        className="h-6 w-6 rounded-full"
                        style={{
                          background: 'var(--color-accent-product)',
                          opacity: 0.75,
                        }}
                      />
                      <div className="flex-1 space-y-1">
                        <div
                          className="h-2 rounded bg-text-muted/30"
                          style={{ width: `${w * 100}%` }}
                        />
                        <div className="h-1.5 w-1/3 rounded bg-text-muted/20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="tn-plan-title"
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 id="tn-plan-title" className="font-display text-base font-semibold">
          Web 版で計画中の機能
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {PLANNED_FEATURES.map((f) => (
            <li
              key={f.title}
              className="rounded-lg border border-border bg-bg/40 p-4"
            >
              <div className="font-display text-sm font-semibold">
                {f.title}
              </div>
              <p className="mt-1 text-xs text-text-muted">{f.description}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-text-faint">
          AI コーチ機能の整備完了後に段階的に公開予定です。
        </p>
      </section>
    </div>
  );
}
