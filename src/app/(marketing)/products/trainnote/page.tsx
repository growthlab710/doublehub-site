import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { VideoSlot } from '@/components/marketing/VideoSlot';

/**
 * /products/trainnote/
 *
 * 2026-10-01: App Store で公開中の TrainNote 4.2.0（build 2・2026-09-29 公開）に合わせて改訂。
 *   事実の根拠は TrainNote リポジトリのタグ v4.2.0-build2（購入画面 PlanPaywallView・TrialManager・AppConfigStore など）。
 *   入口は伝達ブリーフの確定メッセージ「ジムで、音楽は止まらない。」。料金は 2026 年 10 月時点の日本の App Store の価格。
 *   変更の記録は _site-refresh-20261001/plans/trainnote.md の「変更記録」。
 */
export const metadata: Metadata = {
  title: 'TrainNote — 広告なしの筋トレ記録。前回の重量と伸びが見える',
  description:
    '広告を表示しない iOS の筋トレ記録アプリ。前回の重量が同じ画面に出て、ボリュームの伸びと部位ごとの回復がひと目でわかります。食事の写真から kcal・PFC の目安を推定する食事の記録、ボディフォト、トレーニング日誌、AI コーチ（Plus）にも対応。',
  alternates: { canonical: '/products/trainnote/' },
  openGraph: {
    title: 'TrainNote — 広告なしの筋トレ記録。前回の重量と伸びが見える',
    description:
      '広告を表示しない筋トレ記録アプリ。前回の重量と伸び、部位ごとの回復がひと目で。食事の記録・ボディフォト・トレーニング日誌も。',
    url: 'https://www.doublehub.jp/products/trainnote/',
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

const MEAL_VIDEO = '/videos/trainnote-meal-estimate-202610.mp4';
const MEAL_POSTER = '/images/trainnote-meal-result-202610.jpg';

const stats = [
  { number: '0', label: 'アプリ内に表示される広告' },
  { number: '6部位', label: '部位ごとの記録と回復の表示（有酸素も記録できます）' },
  { number: '30日', label: '購入前に記録を試せる体験期間' },
];

const recordPoints = [
  {
    tag: 'PREV',
    title: '前回の記録が、すぐ上に',
    desc: '種目を追加すると、前回の日付・重量・回数が入力欄のすぐ上に並びます。',
  },
  {
    tag: '×2',
    title: '両手モード',
    desc: 'ダンベル種目は、左右の合計でボリュームを数えます。',
  },
  {
    tag: 'BW%',
    title: '自重の負荷割合',
    desc: '懸垂やディップスも、体重の何％を負荷にするかを決めて記録できます。',
  },
  {
    tag: 'PR',
    title: 'ミニグラフと自己ベスト',
    desc: '直近 4 回と今日のボリュームを並べて表示。自己ベストを更新すると「更新」が付きます。',
  },
  {
    tag: '+1',
    title: '6 部位と有酸素',
    desc: '胸・背中・脚・肩・腕・腹筋に加えて、有酸素運動も記録できます。',
  },
];

const mealPoints = [
  '写真 1 枚で目安。品ごとの内訳つきで、食べた量やご飯・麺の量はタップで直せます。',
  'パッケージの成分表示を撮って記録。一緒に足したもの（割った豆乳など）も、一文で書けば推定します。',
  '体重とトレーニングの記録から、1 日の必要量の目安を計算（計算は端末の中だけ）。その日の合計とくらべられます。',
  'カロリーと PFC の推移を、7 日・30 日で振り返れます。',
];

const features = [
  {
    label: 'Muscle Status & PEAK',
    title: '部位ごとの回復が、一目でわかる。',
    body:
      '胸・背中・脚・肩・腕・腹筋の 6 部位について、前回からの経過日数と回復の進み具合を表示します。日数が十分に空いた部位には PEAK が付くので、次に鍛える部位を選びやすくなります。',
  },
  {
    label: 'Calendar',
    title: ['カレンダーで流れを見る。', '過去にも遡れる。'],
    body:
      '月のカレンダーに、部位ごとの色で通った日が並びます。日付を選ぶとその日の種目とボリュームを確認でき、過去の日付に記録を足すこともできます。',
  },
  {
    label: 'Condition',
    title: '調子と量を、同じ期間で。',
    body:
      'コンディションを 5 段階でさっと記録。トレーニングのボリュームと同じ期間で並べて見られるので、調子と量の関係に気づきやすくなります。',
  },
  {
    label: 'Body Photo',
    title: '体の変化は、写真と記録で。',
    body:
      'ボディフォトは撮影日と向き（正面・側面・背面）で整理され、2〜4 枚を選んで、切り替えながら見比べられます。写真は TrainNote のアプリ専用の領域に保存され、iOS の写真ライブラリには残りません。撮って見比べるだけなら、写真が外に送られることはありません（送るのは、ビジュアルスコアの採点、食事の推定や成分表示の読み取り、日誌の物語の生成を実行したときだけです）。体重・体脂肪率もさっと記録でき、ボディタブの TODAY カードに今日の状況がまとまります。',
  },
  {
    label: 'Visual Score（AI Coach Plus）',
    title: ['最初の写真を基準に、', '同じ軸で見比べる。'],
    body:
      'ボディフォトから、部位ごとの見た目の変化を自分専用のスコアとして記録します（月 30 枚まで）。推移グラフとレーダーチャートで、期間をまたいだ変化を振り返れます。スコアはあなただけの記録で、他のユーザーと比較されることはありません。見た目の変化の目安であって、測定でも診断でもありません。採点するときだけ、その写真と基準の写真が解析のために送信されます（解析後は保存されません。初回は確認画面が出ます）。',
  },
  {
    label: 'Training Journal',
    title: '記録が、1 ページずつ残る。',
    body:
      '記録は「章」としてたまり、決めた回数で章が閉じるたびに、その期間の量・通った日・自己ベストの更新が 1 ページにまとまります。いくつかの章が集まって「編」になり、起点と編末に写真を添えておけば、完成の日に並べて見返せます。AI Coach Plus では、編が完成するたびに短い物語を受け取れ、記録 3 回ごとに章の添え書きも付きます（最初の 1 編の物語は、契約前でもお試しできます）。',
  },
];

const coachPoints = [
  'ロードマップと 4 週間ごとのフェーズ（プランは作り直すこともできます）',
  '記録と回復をもとにした、今日のセッション提案',
  '毎日のコーチメッセージとチェックイン、週のはじめの微調整',
  '出典つきの知識ライブラリ（全 190 項目。Plus でなくても、記録に合わせた学びを毎週 3 つまで読めます）',
  '通信できないときは、記録をもとにした提案に自動で戻ります',
];

const screenshots = [
  { src: '/images/trainnote-record-top-202610.jpg', alt: '記録タブ — 今日の日付・コンディション・部位ごとの回復状態', caption: '記録 — 今日の状態と部位ごとの回復' },
  { src: '/images/trainnote-record-prev-202610.jpg', alt: '記録タブ — 前回の重量・ミニグラフ・自己ベスト、両手モードと自重の種目', caption: '記録 — 前回の重量・ミニグラフ・自己ベスト' },
  { src: '/images/trainnote-trends-202610.jpg', alt: '推移 — 種目ごとの最大重量と週ごとのボリューム', caption: '推移 — 最大重量と週ごとのボリューム' },
  { src: '/images/trainnote-calendar-202610.jpg', alt: 'カレンダー — 部位ごとの色で通った日と、選んだ日の記録', caption: 'カレンダー — 通った日とその日の記録' },
  { src: '/images/trainnote-meal-result-202610.jpg', alt: '食事の記録 — 写真から推定した kcal と PFC の目安、品ごとの内訳', caption: '食事 — 写真からの推定（目安）' },
  { src: '/images/trainnote-meal-trends-202610.jpg', alt: '栄養の推移 — PFC の 7 日間の推移と必要量の範囲', caption: '食事 — PFC の推移' },
  { src: '/images/trainnote-bodyphoto-compare-202610.jpg', alt: 'ボディフォト — 2 枚を選んで切り替えながら比較', caption: 'ボディフォト — 写真の比較' },
  { src: '/images/trainnote-visualscore-sample-202610.jpg', alt: 'ビジュアルスコアの見本画面 — スコアの推移と部位バランス', caption: 'ビジュアルスコア — 見本（Plus）' },
  { src: '/images/trainnote-coach-sample-202610.jpg', alt: 'AI コーチの見本 — 毎日のコーチメッセージの例', caption: 'AI コーチ — 見本（Plus）' },
];

const plans = [
  {
    eyebrow: 'One-time Purchase',
    name: 'TrainNote Pro',
    price: '¥800',
    unit: '／ 買い切り',
    tagline: '月額なしで、ずっと記録できる',
    items: [
      'トレーニングの記録・カレンダー・グラフを、ずっと',
      'トレーニング日誌（章と編）を積み続けられる',
      '追加の課金なし',
    ],
    note: undefined as string | undefined,
  },
  {
    eyebrow: 'Subscription',
    name: 'AI Coach Plus',
    price: '¥480',
    unit: '／ 月',
    tagline: 'AI コーチ＋記録',
    items: [
      'ロードマップ・4 週間フェーズ・今日のセッション提案',
      '毎日のコーチメッセージとチェックイン・週のはじめの微調整',
      '知識ライブラリの全件・プランの作り直し',
      'ビジュアルスコア（月 30 枚まで）',
      '日誌の物語・章の添え書き',
      'トレーニング仲間',
      '記録も、このプランで続けられる',
    ],
    note: undefined as string | undefined,
  },
  {
    eyebrow: 'Subscription',
    name: '栄養',
    price: '¥480',
    unit: '／ 月',
    tagline: '食事の AI 推定＋記録',
    items: [
      '食事の写真から kcal・PFC の目安を推定（1 日 15 回まで）',
      '成分表示の読み取り・足したものの推定',
      '記録も、このプランで続けられる',
    ],
    note: '食事の AI 推定は、契約前でも 21 回お試しできます。',
  },
  {
    eyebrow: 'Subscription',
    name: 'Plus＋栄養 セット',
    price: '¥680',
    unit: '／ 月',
    tagline: 'AI コーチと食事の AI 推定、どちらも',
    items: [
      'Plus のすべて（AI コーチ・ビジュアルスコア・日誌の物語）',
      '食事の AI 推定 1 日 15 回・成分表示の読み取り',
      '記録も、このプランだけで続けられる',
    ],
    note: undefined as string | undefined,
  },
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
              ジムで、
              <br />
              音楽は止まらない。
            </h1>
            <p className="mt-5 max-w-lg text-text-muted">
              TrainNote は、広告を表示しない筋トレ記録アプリです。セット間に開いても、音楽が止まったり、広告に手を止められたりしません。前回の重量が同じ画面に出るので、思い出さずに次のセットへ進めます。
            </p>
            <p className="mt-3 max-w-lg text-sm text-text-muted">
              食事の記録、ボディフォト、トレーニング日誌、AI コーチ（Plus）まで、ひとつのアプリで。
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
                src="/images/trainnote-hero-202610.jpg"
                alt="TrainNote の記録タブ — 今日の日付・コンディション・部位ごとの回復状態と振り返り"
                fill
                className="object-cover object-top"
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

      {/* ========== 3. Record ========== */}
      <Section spacing="md" surface="alt" id="features">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Record
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              前回の重量が、そのまま出る。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              セットを入れるだけでボリュームを自動で計算し、入力内容は自動で保存されます。ジムで迷わず、次のセットに進むための記録です。
            </p>
          </div>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              {recordPoints.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition hover:border-accent-product/60 hover:shadow-md"
                >
                  <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-accent-product/10 font-display text-[0.7rem] font-bold tracking-wider text-accent-product">
                    {p.tag}
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold">{p.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-text-muted">
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
                <Image
                  src="/images/trainnote-record-prev-202610.jpg"
                  alt="記録タブ — ベンチプレスの前回の記録・ミニグラフ・自己ベスト、両手モードのダンベルプレス、自重の懸垂"
                  width={1080}
                  height={1919}
                  sizes="(min-width: 1024px) 384px, 90vw"
                  className="h-auto w-full rounded-[1.5rem]"
                />
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-14 grid items-center gap-10 rounded-3xl border border-border bg-surface p-8 md:grid-cols-2 md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
                Progress
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.35rem,1rem+1.2vw,1.75rem)] font-semibold leading-[1.25] tracking-[-0.02em]">
                前回より、
                <br />
                伸びているか。
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
                記録タブの振り返りカードで、今週・今月のボリュームと、前の期間からの変化がわかります。過去の週や月も選んで見返せます。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
                カレンダーには部位ごとの色で通った日が並び、ボディタブの「推移を見る」では、種目ごとの最大重量や週ごとのボリューム、体重・体脂肪率の推移をグラフで振り返れます。
              </p>
            </div>
            <div className="mx-auto w-full max-w-xs">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface-2 p-3 shadow-lg">
                <Image
                  src="/images/trainnote-review-202610.jpg"
                  alt="振り返りカード — 9 月を選んだ月のボリュームと前月からの変化、ベンチプレスの前回比"
                  width={1080}
                  height={1105}
                  sizes="(min-width: 768px) 320px, 80vw"
                  className="h-auto w-full rounded-[1.5rem]"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========== 4. Meals ========== */}
      <Section spacing="md" id="meals">
        <Container width="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
                Meals
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
                食事も、
                <br />
                トレーニングと同じ日付で。
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
                食事の写真を撮ると、kcal と PFC（たんぱく質・脂質・炭水化物）の目安を AI が推定し、体重やトレーニングと同じ日付で残せます。
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                {mealPoints.map((m) => (
                  <li key={m} className="flex items-start gap-2">
                    <Check /> {m}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-border bg-surface p-5 text-xs leading-relaxed text-text-faint">
                食事の AI 推定は「栄養」または「Plus＋栄養 セット」で 1 日 15 回まで使えます。契約前でも 21 回お試しできます。写真は推定や成分表示の読み取りを実行したときだけ送られ、解析後はサーバーに保存されません（初回は送信内容の確認画面が出ます）。推定の結果は目安で、栄養の測定や、医学的な栄養指導・食事療法を目的とするものではありません。
              </div>
            </div>

            <div className="mx-auto w-full max-w-xs">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
                <div className="relative aspect-[720/1436] w-full overflow-hidden rounded-[1.5rem]">
                  <VideoSlot
                    videoSrc={MEAL_VIDEO}
                    posterSrc={MEAL_POSTER}
                    alt="食事の写真を選んで推定し、kcal と PFC の目安が出るまでの画面"
                    width={720}
                    height={1436}
                    sizes="(min-width: 1024px) 320px, 80vw"
                    mediaClassName="rounded-[1.5rem]"
                    className="absolute inset-0 rounded-[1.5rem]"
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-text-faint">
                <span className="inline-block">写真からの推定です。</span>
                <span className="inline-block">結果は食べた量やチップで直せます。</span>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========== 5. Features ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Features
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              体の変化も、積み上げも。
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {features.map((f) => (
              <article
                key={f.label}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-product/40 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  {f.label}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold leading-[1.3] tracking-[-0.01em]">
                  {/* 句読点の位置で折り返す（語の途中で切れないように） */}
                  {Array.isArray(f.title)
                    ? f.title.map((t) => (
                        <span key={t} className="inline-block">
                          {t}
                        </span>
                      ))
                    : f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {f.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 6. AI Coach Plus ========== */}
      <Section spacing="md" id="ai-coach">
        <Container width="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
                AI Coach Plus
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
                目標から、今日の 1 回まで。
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
                メインゴールを決めると、AI コーチが 3〜12 か月のロードマップを作り、4 週間ごとのフェーズに分けて進めます。記録をもとに今日のセッションを提案し、毎日のコーチメッセージで、その日の状況に合わせて声をかけます。
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                {coachPoints.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <Check /> {c}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-divider pt-4 text-xs leading-relaxed text-text-faint">
                AI コーチの提案は、トレーニングを続けるための一般的なものです。医療判断・診断・治療を目的とするものではありません。
              </p>
            </div>

            <div className="mx-auto w-full max-w-xs">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
                <Image
                  src="/images/trainnote-coach-sample-202610.jpg"
                  alt="AI コーチの見本 — 毎日のコーチメッセージの例（Plus に加入する前に表示される見本）"
                  width={1080}
                  height={1368}
                  sizes="(min-width: 1024px) 320px, 80vw"
                  className="h-auto w-full rounded-[1.5rem]"
                />
              </div>
              <p className="mt-3 text-center text-xs text-text-faint">
                Plus に加入する前に表示される見本（コーチタブ）
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========== 7. App Screenshots ========== */}
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

      {/* ========== 8. Plans ========== */}
      <Section spacing="md" id="plans">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Plans
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              記録は、どのプランでも。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              はじめの 30 日は体験期間で、購入しなくても記録を試せます。そのあとも記録を続けるには、買い切りの TrainNote Pro か、月額プラン（AI Coach Plus・栄養・Plus＋栄養 セット）のどれかを選びます。
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((p) => (
              <div
                key={p.name}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  {p.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold tracking-[-0.03em]">
                    {p.price}
                  </span>
                  <span className="text-sm text-text-muted">{p.unit}</span>
                </div>
                <p className="mt-3 text-xs text-text-muted">{p.tagline}</p>
                <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check /> {item}
                    </li>
                  ))}
                </ul>
                {p.note && (
                  <p className="mt-6 border-t border-divider pt-4 text-xs text-text-faint">
                    {p.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-accent-product/30 bg-accent-product/5 p-6 text-center">
            <p className="font-display text-base font-semibold">あとから取り上げません。</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              体験が終わっても、プランをやめても、これまでの記録・日誌のページ・写真はそのまま読めます。
            </p>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-text-faint">
            ※ 月額プラン（AI Coach Plus・栄養・Plus＋栄養 セット）は自動更新のサブスクリプションです。期間終了の 24 時間以上前に解約しない限り、自動で更新されます。解約は App Store のサブスクリプション設定からいつでも行えます。上限: 食事の AI 推定は 1 日 15 回、ビジュアルスコアは月 30 枚。価格は 2026 年 10 月時点の日本の App Store の価格です。最新の料金は App Store の表示をご確認ください。
          </p>
        </Container>
      </Section>

      {/* ========== 9. Final CTA ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              記録は、伸ばすためにある。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              前回の重量から、今日の 1 回へ。広告に止められない記録を、ジムで。
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
