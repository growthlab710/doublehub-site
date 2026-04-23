import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'TrainNote',
  robots: { index: false },
};

const APP_STORE_URL =
  'https://apps.apple.com/us/app/trainnote/id6759539755?itscg=30200&itsct=apps_box_artwork&mttnsubad=6759539755';
const APP_STORE_BADGE =
  'https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/ja-jp?releaseDate=1774224000';

const HERO_SCREEN = '/images/trainnote-peak.jpg';
const HIGHLIGHT_SCREENS = [
  {
    src: '/images/trainnote-training.jpg',
    alt: 'トレーニング記録画面',
    caption: '記録',
  },
  {
    src: '/images/trainnote-coaches-list.jpg',
    alt: '5名のAIコーチ一覧',
    caption: 'AI コーチ',
  },
  {
    src: '/images/trainnote-graph.jpg',
    alt: 'グラフ画面',
    caption: 'グラフ',
  },
];

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
 * UI 的には `theme-trainnote` スコープで `accent-product` トークンを
 * TrainNote のブランドカラー（シアン）に切り替え、マーケティングページと同じ
 * アプリアイコン・スクリーンショット・App Store バッジを使って統一感を出す。
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
        className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 md:p-8"
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
        <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2">
              <Image
                src="/images/trainnote-app-icon.jpg"
                alt="TrainNote アプリアイコン"
                width={44}
                height={44}
                className="h-10 w-10 rounded-lg border border-border object-cover shadow-sm"
              />
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-accent-product"
                style={{
                  borderWidth: 1,
                  borderColor: 'var(--color-accent-product)',
                  backgroundColor: 'transparent',
                }}
              >
                TrainNote
              </span>
            </div>
            <h2
              id="tn-hero-title"
              className="mt-4 font-display text-xl font-semibold leading-snug md:text-2xl"
            >
              強くなる過程を、AI と一緒に。
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              TrainNote はセット数・重量・調子を手早く記録する筋トレアプリです。
              Web 版では AI コーチとの対話や進捗グラフをブラウザから利用できるようにします。
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex transition-transform hover:scale-[1.02]"
                aria-label="App Store で TrainNote をダウンロード"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={APP_STORE_BADGE}
                  alt="App Store でダウンロード"
                  style={{ height: 40, objectFit: 'contain' }}
                />
              </a>
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

          {/* 実機スクリーンショット */}
          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-lg">
              <Image
                src={HERO_SCREEN}
                alt="TrainNote ホーム画面 — PEAK バッジと AI Coach"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 280px, 70vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ハイライトスクリーン 3 枚 */}
      <section
        aria-labelledby="tn-screens-title"
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2
          id="tn-screens-title"
          className="font-display text-base font-semibold"
        >
          主な画面
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {HIGHLIGHT_SCREENS.map((s) => (
            <li key={s.src} className="space-y-2">
              <div className="relative aspect-[9/16] overflow-hidden rounded-xl border border-border bg-bg">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 70vw"
                />
              </div>
              <p className="text-center text-xs text-text-muted">
                {s.caption}
              </p>
            </li>
          ))}
        </ul>
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
