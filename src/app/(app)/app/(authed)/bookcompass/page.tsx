import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'BookCompass',
  robots: { index: false },
};

const APP_STORE_URL =
  'https://apps.apple.com/us/app/bookcompass-%E8%AA%AD%E6%9B%B8%E7%9F%A5%E8%AD%98%E3%83%9E%E3%83%83%E3%83%97/id6760604663';

const PLANNED_FEATURES = [
  {
    title: '本棚の Web 閲覧',
    description:
      'iOS で登録した本を Web ブラウザからも確認できるビュー。しおり・進捗も同期。',
  },
  {
    title: 'AI 要約・感想メモ',
    description:
      '読書中に取ったメモを AI が要約し、DoubleHub の ToDo/メモに送れる導線。',
  },
  {
    title: 'ハイライト共有',
    description:
      '気に入った一節を X / SNS にカード画像で書き出して共有。',
  },
];

/**
 * /app/bookcompass/ — Web 連携は Coming Soon。
 *
 * iOS 側が匿名認証のみで Apple Sign In UI を未公開のため、Web からの
 * プロバイダ非依存連携（`external_source_accounts` への書き込み）が
 * 現時点で技術的に成立しない。iOS 側の Apple Sign In 公開後に復活予定。
 *
 * UI 的には `theme-bookcompass` スコープを当てることで、`accent-product`
 * トークンが BookCompass のブランドカラーに差し替わる。CTA や装飾に
 * そのトークンを用いることで「いまは BookCompass ページにいる」という
 * 視覚的コンテキストを与える。
 */
export default function AppBookCompassPage() {
  return (
    <div className="theme-bookcompass space-y-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold">BookCompass</h1>
          <Badge
            variant="outline"
            className="text-accent-product"
            style={{ borderColor: 'var(--color-accent-product)' }}
          >
            Coming Soon
          </Badge>
        </div>
        <p className="text-sm text-text-muted">
          読書記録アプリ BookCompass の Web 連携機能を準備しています。
        </p>
      </header>

      {/* ヒーローカード。`bg-accent-product/8` などの opacity modifier は
          CSS 変数ベースだと効かないため、ソフトレイヤーは半透明の overlay で擬似的に作る。 */}
      <section
        aria-labelledby="bc-hero-title"
        className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, var(--color-accent-product), transparent)',
            opacity: 0.18,
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
              📚
            </div>
            <h2
              id="bc-hero-title"
              className="mt-4 font-display text-xl font-semibold"
            >
              あなたの本棚を、Web からも。
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              BookCompass は読んだ本・積読・感想を iCloud で永続管理する
              読書記録アプリです。Web 連携では、iOS で記録した本棚を
              ブラウザからも閲覧・共有できるようにします。
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
                {/* (marketing) レイアウトのヘッダーに載る「ログイン」リンクが
                    セッション切れと誤解される懸念から、新タブで開く。 */}
                <Link
                  href="/products/bookcompass/"
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
                  <span>📚</span>
                  <span>BookCompass</span>
                </div>
                <div className="space-y-2 p-3">
                  {[0.9, 0.7, 0.85, 0.6].map((w, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-md bg-bg p-2"
                    >
                      <div
                        className="h-10 w-7 rounded-sm"
                        style={{
                          background: 'var(--color-accent-product)',
                          opacity: 0.75,
                        }}
                      />
                      <div className="flex-1 space-y-1.5">
                        <div
                          className="h-2 rounded bg-text-muted/30"
                          style={{ width: `${w * 100}%` }}
                        />
                        <div className="h-1.5 w-1/2 rounded bg-text-muted/20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 計画中機能 */}
      <section
        aria-labelledby="bc-plan-title"
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 id="bc-plan-title" className="font-display text-base font-semibold">
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
          公開時期は iOS 側の Apple Sign In 対応後を予定しています。
        </p>
      </section>
    </div>
  );
}
