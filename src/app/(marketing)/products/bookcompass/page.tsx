import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Book Compass — 読んだ本が、思考の地図になる | DoubleHub',
  description:
    'Book Compass は読書記録を整理し、思考や価値観の変化を見える化するサービスです。',
  alternates: { canonical: '/products/bookcompass/' },
  openGraph: {
    title: 'Book Compass — 読んだ本が、思考の地図になる | DoubleHub',
    description:
      'Book Compass は読書記録を整理し、思考や価値観の変化を見える化するサービスです。',
    url: 'https://doublehub.jp/products/bookcompass/',
    type: 'website',
    siteName: 'DoubleHub',
    locale: 'ja_JP',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

const appStoreUrl =
  'https://apps.apple.com/us/app/bookcompass-%E8%AA%AD%E6%9B%B8%E7%9F%A5%E8%AD%98%E3%83%9E%E3%83%83%E3%83%97/id6760604663?itscg=30200&itsct=apps_box_badge&mttnsubad=6760604663';
const appStoreBadge =
  'https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/ja-jp?releaseDate=1774224000';

const screenshots = [
  { src: '/images/bookcompass-map.jpg', alt: 'ナレッジ・コンパス — 領域マップ', caption: 'ナレッジ・コンパス — 読書の広がり' },
  { src: '/images/bookcompass-axis.jpg', alt: '偏りの見取り図', caption: '偏りの見取り図 — 傾向バランス' },
  { src: '/images/bookcompass-detail.jpg', alt: '本の詳細画面', caption: '本棚 — ステータスと知的ポジション' },
  { src: '/images/bookcompass-summary.jpg', alt: '読書サマリー', caption: '読書サマリー — AI による整理' },
  { src: '/images/bookcompass-notes.jpg', alt: '呟きメモ一覧', caption: '呟き — 読書中の気づき' },
  { src: '/images/bookcompass-explore.jpg', alt: '探す画面', caption: '探す — AI が理由つきで提案' },
];

const features = [
  {
    label: 'Knowledge Compass',
    title: '読書の広がりが地図になる。',
    body:
      '思想・哲学、社会・ビジネス、文学、科学など領域ごとの読書バランスを可視化。気になる領域をタップすると、傾向バランスを軸で見られます。',
  },
  {
    label: 'AI Reading Summary',
    title: '読んだ記録をAIが整理し、あとから意味のある形にする。',
    body:
      '読書中のつぶやきを保存するだけでなく、AIが「印象の要約」「繰り返し出ているテーマ」「行動につながった示唆」「未整理の論点」に整理。後から見返したとき、自分の思考の流れが追いやすい状態に。',
  },
  {
    label: 'Book Recommendation',
    title: '次に読む本を、"理由つき"で提案する。',
    body:
      '過去の呟きや読書傾向をもとに、「深める」と「広げる」の2軸で次の一冊を提案。なぜこの本が自分に合うのか、納得できる理由が見えるレコメンド。',
  },
];

const learns = [
  '最近どんなテーマに惹かれているか',
  '繰り返し悩む問いは何か',
  '価値観がどの方向へ動いているか',
  '言語化しきれていない思考の傾向',
];

const flows = [
  {
    label: 'サービス内で価値になること',
    desc: '読書の記録、メモ整理、興味テーマの可視化、理由つきの本の提案。',
  },
  {
    label: 'DoubleHub に入る情報',
    desc: '関心の変化、思考のクセ、心が動くトピック。構造化されたインサイトとして連携。',
  },
  {
    label: '将来返せる提案',
    desc: '次に読むべき一冊や、いまの課題に合う知的インプットの提案。他の生活データと合わせた総合的な判断。',
  },
];

export default function BookCompassPage() {
  return (
    <div className="theme-bookcompass">
      {/* ========== 1. Hero ========== */}
      <Container width="wide" className="relative pt-16 pb-14 md:pt-24 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-[-5%] top-[-10%] h-[480px] w-[480px] rounded-full bg-accent-product/15 blur-[120px]" />
        </div>
        <div className="mx-auto grid max-w-content-wide items-center gap-12 md:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2">
              <Image
                src="/images/bookcompass-app-icon.jpg"
                alt="Book Compass アプリアイコン"
                width={44}
                height={44}
                className="h-10 w-10 rounded-lg border border-border object-cover shadow-sm"
              />
              <span className="inline-flex items-center rounded-full border border-accent-product/30 bg-accent-product/10 px-3 py-1 text-xs font-semibold text-accent-product">
                Book Compass
              </span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(1.75rem,1rem+2.8vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              読んだ本が、
              <br />
              思考の地図になっていく。
            </h1>
            <p className="mt-5 max-w-lg text-text-muted">
              Book Compass は、読書記録を整理しながら、関心や価値観の変化を可視化するサービスです。DoubleHub につながると、その地図は「何を大事にしているか」の輪郭になります。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex transition-transform hover:scale-[1.02]"
                aria-label="App Store で Book Compass をダウンロード"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={appStoreBadge}
                  alt="App Storeでダウンロード"
                  style={{ height: 44, objectFit: 'contain' }}
                />
              </a>
              <Button asChild size="lg" variant="secondary">
                <Link href="/#ecosystem">全体構想に戻る</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-xl">
              <Image
                src="/images/bookcompass-map.jpg"
                alt="Book Compass ナレッジマップ画面"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 420px, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ========== 2. App Screenshots ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              App Screenshots
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              Book Compass の主な画面。
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {screenshots.map((s) => (
              <figure
                key={s.src}
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-surface-2">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs text-text-muted">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 3. What Book Compass Does ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Features
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              Book Compass でできること。
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {features.map((f) => (
              <article
                key={f.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-product/40 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  {f.label}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold leading-[1.3] tracking-[-0.01em]">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {f.body}
                </p>
              </article>
            ))}

            {/* What Double Learns (リスト付きカード) */}
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-product/40 hover:shadow-md md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                What Double Learns
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold leading-[1.3] tracking-[-0.01em]">
                ダブルが理解するのは、読了冊数ではなく思考の方向。
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {learns.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <Check /> {t}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </Section>

      {/* ========== 4. AI Chat ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              AI Chat
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              本について、もう一人の自分と対話する。
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            <p className="text-sm leading-relaxed text-text-muted md:text-base">
              Book Compass のチャットは「何でも答えてくれるAI先生」ではありません。あなたの読書記録を根拠にして、一緒に整理する読書パートナーです。上から教え込まない、それっぽいことを断定しない。自分の読書記録を起点に、考えを深める壁打ち相手。
            </p>
            <p className="text-sm leading-relaxed text-text-muted md:text-base">
              「あなたが以前こういうことを気にしていたから、今回もここが引っかかっているのかもしれない」「この本で残った問いは、前に読んだ別の本の気づきとつながるかもしれない」そういうふうに返せることを目指しています。
            </p>
          </div>
        </Container>
      </Section>

      {/* ========== 5. Flow Into DoubleHub ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Flow Into DoubleHub
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              Book Compass から、どんな入力が入るか。
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {flows.map((f) => (
              <article
                key={f.label}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  {f.label}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  {f.desc}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 6. Final CTA ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              本を、次の一歩に変えていこう。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              読書から生まれた気づきは、DoubleHub につながることで「あなたの輪郭」になります。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex transition-transform hover:scale-[1.02]"
                aria-label="App Store で Book Compass をダウンロード"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={appStoreBadge}
                  alt="App Storeでダウンロード"
                  style={{ height: 44, objectFit: 'contain' }}
                />
              </a>
              <Button asChild size="lg" variant="secondary">
                <Link href="/#ecosystem">DoubleHub 全体構想を見る</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function Check() {
  return (
    <span
      aria-hidden
      className="mt-[0.25rem] grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-accent-product/15"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-accent-product"
      >
        <path d="M2.5 6l2.5 2.5 4.5-5" />
      </svg>
    </span>
  );
}
