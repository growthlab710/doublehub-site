import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'TrainNote — 5人の専門AIコーチが、あなたの筋トレを変える',
  description:
    '190以上の科学論文を参照する5人の専門AIコーチが、記録・栄養・回復・計画・心理の6領域であなたの筋トレを個別サポート。iOS専用の筋トレ記録×AIコーチングアプリ。',
  alternates: { canonical: '/products/trainnote/' },
  openGraph: {
    title: 'TrainNote — 5人の専門AIコーチが、あなたの筋トレを変える',
    description:
      '190以上の科学論文を参照する5人の専門AIコーチが、記録・栄養・回復・計画・心理の6領域であなたの筋トレを個別サポート。',
    url: 'https://doublehub.jp/products/trainnote/',
    type: 'website',
    siteName: 'DoubleHub',
    locale: 'ja_JP',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

const appStoreUrl =
  'https://apps.apple.com/us/app/trainnote/id6759539755?itscg=30200&itsct=apps_box_artwork&mttnsubad=6759539755';
const appStoreBadge =
  'https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/ja-jp?releaseDate=1774224000';

const stats = [
  { number: '190+', label: '参照する科学論文・エビデンス' },
  { number: '5名', label: '専属のAIコーチ' },
  { number: '6領域', label: 'トレーニング / 栄養 / 休養 / 研究 / 計画 / 心理' },
];

const coaches = [
  {
    icon: '🎯',
    name: 'パーソナル メインコーチ',
    tag: 'MAIN',
    desc:
      '今日の提案と調整。種目・重量・フォームの具体的なアクションまで、あなたの記録をもとに毎日アドバイス。',
  },
  {
    icon: '📋',
    name: 'プランコーチ',
    desc:
      '週間・月間の組み立て。部位分け、頻度設計、長期的なプログレッションを設計。',
  },
  {
    icon: '🥗',
    name: '栄養・回復コーチ',
    desc:
      '食事・睡眠・回復のアドバイス。トレーニングに合わせた栄養と回復の最適化。',
  },
  {
    icon: '🔥',
    name: 'モチベーションコーチ',
    desc:
      '継続と成長の確認。心理面の伴走で、やる気が落ちたときも前に進める。',
  },
  {
    icon: '📚',
    name: '知識スペシャリストコーチ',
    desc:
      '信頼できるエビデンス。190以上の科学論文を参照し、実践に結びつける。',
  },
];

const features = [
  {
    label: 'Muscle Status & PEAK',
    title: '部位ごとの回復状態が一目でわかる。',
    body:
      '胸・背中・脚・肩・腕・腹筋の6部位をリアルタイムに追跡。前回からの経過日数をもとに、十分に回復した部位には PEAK バッジが表示。次に鍛えるべき部位が直感的にわかります。',
  },
  {
    label: 'Smart Logging',
    title: '前回の重量を見ながら、迷わず記録。',
    body:
      '前回データを常に確認しながら記録できるから、成長の実感がすぐ得られます。両手ダンベルの合計計算や、自重負荷割合の設定にも対応。実態に近い正確な記録が残せます。',
  },
  {
    label: 'Calendar & History',
    title: 'カレンダーで流れを見る。過去にも遡れる。',
    body:
      'カレンダー表示で部位ごとのトレーニング頻度と回復サイクルを可視化。日付カードをタップすれば過去の日付に遡って記録を入力・確認できます。',
  },
  {
    label: 'Review & Graph',
    title: 'ウィークリー/マンスリーで成長を実感。',
    body:
      'ホーム画面からチップを切り替えるだけで、今週と今月のレビューを即確認。ボリューム推移と変化率のグラフで、トレーニングの成長を直感的に把握できます。',
  },
];

const screenshots = [
  { src: '/images/trainnote-peak.jpg', alt: 'ホーム画面 — PEAK バッジとAI Coach', caption: 'ホーム — PEAK と AI コーチ' },
  { src: '/images/trainnote-training.jpg', alt: 'トレーニング記録画面', caption: '記録 — セット・レップ・重量' },
  { src: '/images/trainnote-coach-detail.jpg', alt: 'AI Coach 詳細画面', caption: 'AI Coach — 提案と根拠' },
  { src: '/images/trainnote-coaches-list.jpg', alt: '5名のAIコーチ一覧', caption: 'AI Coach — 5名の専門コーチ' },
  { src: '/images/trainnote-coach-chat.png', alt: 'AI Coach チャット画面', caption: 'チャット — 深掘り相談' },
  { src: '/images/trainnote-calendar.jpg', alt: 'カレンダー画面', caption: 'カレンダー — 継続の可視化' },
  { src: '/images/trainnote-graph.jpg', alt: 'グラフ画面', caption: 'グラフ — 重量・ボリューム推移' },
];

export default function TrainNotePage() {
  return (
    <div className="theme-trainnote">
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
                src="/images/trainnote-app-icon.jpg"
                alt="TrainNote アプリアイコン"
                width={44}
                height={44}
                className="h-10 w-10 rounded-lg border border-border object-cover shadow-sm"
              />
              <span className="inline-flex items-center rounded-full border border-accent-product/30 bg-accent-product/10 px-3 py-1 text-xs font-semibold text-accent-product">
                TrainNote
              </span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(1.75rem,1rem+2.8vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              5人の専門AIコーチが、
              <br />
              あなたの筋トレを変える。
            </h1>
            <p className="mt-5 max-w-lg text-text-muted">
              筋トレ記録とAIコーチングが一体化した iOS アプリ。190以上の科学論文をもとに、あなたの記録・傾向に合わせた個別提案を届けます。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex transition-transform hover:scale-[1.02]"
                aria-label="App Store で TrainNote をダウンロード"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={appStoreBadge}
                  alt="App Storeでダウンロード"
                  style={{ height: 44, objectFit: 'contain' }}
                />
              </a>
              <Button asChild size="lg" variant="secondary">
                <Link href="#features">機能を見る</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-xl">
              <Image
                src="/images/trainnote-peak.jpg"
                alt="TrainNote ホーム画面 — PEAK バッジと AI Coach"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 420px, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ========== 2. Stats Bar ========== */}
      <Section spacing="sm">
        <Container width="wide">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm"
              >
                <div className="font-display text-3xl font-bold tracking-[-0.03em] text-accent-product md:text-4xl">
                  {s.number}
                </div>
                <div className="mt-2 text-sm text-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 3. AI Coach Plus ========== */}
      <Section spacing="md" surface="alt" id="ai-coach">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              AI Coach Plus
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              専属の5名が、あなただけのチームに。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              それぞれ異なる専門領域を持つAIコーチが、あなたのトレーニング履歴と目標に合わせて連携。定型のアドバイスではなく、今のあなたに最適な提案を届けます。
            </p>
          </div>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              {coaches.map((c) => (
                <div
                  key={c.name}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition hover:border-accent-product/60 hover:shadow-md"
                >
                  <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-accent-product/10 text-xl">
                    {c.icon}
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold">
                      {c.name}
                      {c.tag && (
                        <span className="ml-2 inline-block rounded-full bg-accent-product/10 px-1.5 py-[1px] text-[0.625rem] font-semibold uppercase tracking-wider text-accent-product">
                          {c.tag}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs leading-relaxed text-text-muted">
                      {c.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
                <Image
                  src="/images/trainnote-coaches-list.jpg"
                  alt="5名のAIコーチ一覧"
                  width={800}
                  height={1400}
                  className="h-auto w-full rounded-[1.5rem]"
                />
              </div>
            </div>
          </div>

          {/* Chat Showcase */}
          <div className="mt-14 grid items-center gap-10 rounded-3xl border border-border bg-surface p-8 md:grid-cols-2 md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
                Chat
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.35rem,1rem+1.2vw,1.75rem)] font-semibold leading-[1.25] tracking-[-0.02em]">
                提案で終わらない。
                <br />
                チャットで深掘りできる。
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
                「なぜこの種目？」「重量を変えるべき？」「来週のプランは？」
                <br />
                気になったことをその場でコーチに相談。提案の理由から次のアクションまで、会話で整理できます。
              </p>
            </div>
            <div className="mx-auto w-full max-w-xs">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface-2 p-3 shadow-lg">
                <Image
                  src="/images/trainnote-coach-chat.png"
                  alt="AIコーチとのチャット画面"
                  width={800}
                  height={1400}
                  className="h-auto w-full rounded-[1.5rem]"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========== 4. Core Features ========== */}
      <Section spacing="md" id="features">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Features
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              記録も、振り返りも、直感的に。
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
          </div>
        </Container>
      </Section>

      {/* ========== 5. App Screenshots ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              App Screenshots
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              TrainNote の主な画面。
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

      {/* ========== 6. Plans ========== */}
      <Section spacing="md" id="plans">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Plans
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              まずは 30 日間、無料で試せる。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              どのプランでも使える機能は全部同じ。まずは 30 日間、すべての機能を無料で体験できます。その後は「買い切り 800 円」または「月額 480 円のサブスクリプション（初回 2 ヶ月 50% OFF）」から支払い方式を選べます。
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                Free Trial
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">30 日間無料体験</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-[-0.03em]">¥0
                </span>
                <span className="text-sm text-text-muted">／ 30 日間</span>
              </div>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> 全機能を 30 日間無料で利用
                </li>
                <li className="flex items-start gap-2">
                  <Check /> トレーニング記録 / PEAK / グラフ
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 5 名の AI コーチ・チャットもすべて使える
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 30 日経過後は有料プランを選択
                </li>
              </ul>
              <p className="mt-6 border-t border-divider pt-4 text-xs text-text-faint">
                アプリインストール後、最初に自動で有効になる体験期間です。
              </p>
            </div>

            {/* 買い切り（おすすめ） */}
            <div className="relative rounded-2xl border-2 border-accent-product bg-surface p-8 shadow-lg">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-accent-product px-4 py-1 text-xs font-bold text-white">
                おすすめ・追加課金なし
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                One-time Purchase
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">買い切りプラン</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-[-0.03em]">¥800
                </span>
                <span className="text-sm text-text-muted">／ 買い切り</span>
              </div>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> 一度の支払いでずっと使える
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 全機能（5 名の AI コーチ・チャット・6 領域カバー）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 月額・年額の継続課金なし
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 長く使うほどお得（約 1.7 ヶ月分のサブ価格）
                </li>
              </ul>
              <p className="mt-6 border-t border-divider pt-4 text-xs text-text-faint">
                一度購入すれば、それ以上の追加課金はありません。
              </p>
            </div>

            {/* サブスクリプション */}
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                Subscription
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">月額サブスクリプション</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-[-0.03em]">¥480
                </span>
                <span className="text-sm text-text-muted">／ 月</span>
              </div>
              <div className="mt-2 inline-flex items-center rounded-full bg-accent-product/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent-product">
                初回 2 ヶ月 50% OFF
              </div>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> 最初の 2 ヶ月は半額の ¥240 / 月
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 全機能（5 名の AI コーチ・チャット・6 領域カバー）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> まず小さく始めたい方に
                </li>
                <li className="flex items-start gap-2">
                  <Check /> いつでも解約可能
                </li>
              </ul>
              <p className="mt-6 border-t border-divider pt-4 text-xs text-text-faint">
                機能は買い切りプランと全く同じです。
              </p>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-text-faint">
            ※ すべてのプランで使える機能は同じです。価格は執筆時点のもので、最新の料金や課金サイクルは App Store 上の表示をご確認ください。
          </p>
        </Container>
      </Section>

      {/* ========== 7. Final CTA ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              記録するだけの筋トレは、もう終わりにしよう。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              AIコーチと一緒に、あなたのトレーニングを次のレベルへ。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex transition-transform hover:scale-[1.02]"
                aria-label="App Store で TrainNote をダウンロード"
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
