import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'BookCompass',
  robots: { index: false },
};

// マーケティング（/products/bookcompass/）で使っている公式アセットを
// そのまま流用する。アイコン・スクショ・App Store バッジは public/images/ 配下。
const APP_STORE_URL =
  'https://apps.apple.com/us/app/bookcompass-%E8%AA%AD%E6%9B%B8%E7%9F%A5%E8%AD%98%E3%83%9E%E3%83%83%E3%83%97/id6760604663?itscg=30200&itsct=apps_box_badge&mttnsubad=6760604663';
const APP_STORE_BADGE =
  'https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/ja-jp?releaseDate=1774224000';

const HERO_SCREEN = '/images/bookcompass-hero.jpg';
const HIGHLIGHT_SCREENS = [
  {
    src: '/images/bookcompass-screen-01.jpg',
    alt: 'ナレッジ・コンパス — 知識マップと称号',
    caption: 'ナレッジ・コンパス',
  },
  {
    src: '/images/bookcompass-screen-05.jpg',
    alt: '知的ポジション TRAIT MAP / AXIS VIEW',
    caption: '知的ポジション',
  },
  {
    src: '/images/bookcompass-screen-10.jpg',
    alt: '3人の読書パートナー',
    caption: '読書パートナー',
  },
];

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
 * UI 的には `theme-bookcompass` スコープで `accent-product` トークンを
 * BookCompass のブランドカラーに切り替え、マーケティングページと同じ
 * アプリアイコン・スクリーンショット・App Store バッジを使って統一感を出す。
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

      {/* ヒーロー。アイコン + タイトル + 説明 + CTA を左、実機スクショを右に配置。 */}
      <section
        aria-labelledby="bc-hero-title"
        className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 md:p-8"
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
        <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2">
              <Image
                src="/images/bookcompass-app-icon.jpg"
                alt="BookCompass アプリアイコン"
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
                BookCompass
              </span>
            </div>
            <h2
              id="bc-hero-title"
              className="mt-4 font-display text-xl font-semibold leading-snug md:text-2xl"
            >
              あなたの本棚を、Web からも。
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              BookCompass は読んだ本・積読・感想を iCloud で永続管理する
              読書記録アプリです。Web 連携では、iOS で記録した本棚を
              ブラウザからも閲覧・共有できるようにします。
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex transition-transform hover:scale-[1.02]"
                aria-label="App Store で BookCompass をダウンロード"
              >
                {/* マーケと同じ Apple 提供の動的バッジ画像を使用。
                    外部ホストの画像は next/image では事前設定が必要なので、通常の img で。
                    eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={APP_STORE_BADGE}
                  alt="App Store でダウンロード"
                  style={{ height: 40, objectFit: 'contain' }}
                />
              </a>
              <Button asChild size="sm" variant="secondary">
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

          {/* 実機スクリーンショット */}
          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={HERO_SCREEN}
                alt="BookCompass ナレッジ・コンパス画面"
                fill
                className="object-contain"
                sizes="(min-width: 768px) 280px, 70vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ハイライトスクリーン 3 枚 */}
      <section
        aria-labelledby="bc-screens-title"
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2
          id="bc-screens-title"
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
