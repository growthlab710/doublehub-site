import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Book Compass — 読書が、知識マップになる | DoubleHub',
  description:
    'Book Compass は読書記録を整理し、思考や価値観の変化を見える化するサービスです。3人の読書パートナーと一緒に、読書の学びを深めます。',
  alternates: { canonical: '/products/bookcompass/' },
  openGraph: {
    title: 'Book Compass — 読書が、知識マップになる | DoubleHub',
    description:
      'Book Compass は読書記録を整理し、思考や価値観の変化を見える化するサービスです。3人の読書パートナーと一緒に、読書の学びを深めます。',
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
  { src: '/images/bookcompass-screen-01.jpg', alt: 'ナレッジ・コンパス — 知識マップと称号', caption: 'ナレッジ・コンパス — 知識の広がりと深さ' },
  { src: '/images/bookcompass-screen-05.jpg', alt: '知的ポジション TRAIT MAP / AXIS VIEW', caption: '知的ポジション — TRAIT MAP / AXIS VIEW' },
  { src: '/images/bookcompass-screen-10.jpg', alt: '3人の読書パートナー', caption: '3人の読書パートナー' },
  { src: '/images/bookcompass-screen-06.jpg', alt: 'AIチャット THINK WITH BOOKS', caption: 'AIチャット — THINK WITH BOOKS' },
  { src: '/images/bookcompass-screen-03.jpg', alt: 'ひと言つぶやき一覧', caption: 'ひと言つぶやき — 気楽な非公開メモ' },
  { src: '/images/bookcompass-screen-04.jpg', alt: '読書サマリー 4セクション', caption: '読書サマリー — AIが4つの視点で整理' },
  { src: '/images/bookcompass-screen-02.jpg', alt: 'つぶやきをAIが自動要約', caption: 'つぶやきをAIが自動要約' },
  { src: '/images/bookcompass-screen-07.jpg', alt: '探す — 深める・広げる', caption: '探す — 深める / 広げる の2軸提案' },
  { src: '/images/bookcompass-screen-08.jpg', alt: 'シェア機能', caption: 'シェア — AIサマリー・冊数ログカード' },
  { src: '/images/bookcompass-screen-09.jpg', alt: 'ライブラリ 本棚', caption: 'ライブラリ — ステータス別の本棚' },
];

const partners = [
  {
    key: 'buddy',
    name: 'ブックバディ',
    role: '読書フレンド',
    tagline: '気軽に感想を話す相手',
    body: '読書の感想を気軽にシェアできる友達のような存在。気軽に話すだけで、自分がどこに惹かれたのかが見えてきて、読書がもっと楽しくなります。',
    accent: 'from-[#fca5a5] to-[#f59e0b]',
    icon: '/images/bookcompass-partner-buddy.jpg',
    iconBg: 'bg-[#fde4cf]',
  },
  {
    key: 'mentor',
    name: '読書メンター',
    role: '博識な教授',
    tagline: '読書の質を高める',
    body: '本の背景や読み方のコツを教えてくれる博識なアドバイザー。一冊から受け取れる学びと、記憶への定着が深まります。',
    accent: 'from-[#93c5fd] to-[#60a5fa]',
    icon: '/images/bookcompass-partner-mentor.jpg',
    iconBg: 'bg-[#dbeafe]',
  },
  {
    key: 'coach',
    name: '思考コーチ',
    role: '壁打ち深掘り',
    tagline: '問いかけで思考を拓く',
    body: '問いかけで思考を深め、新たな視点を拓いてくれるコーチ。自分の考えが整理され、新しい視点と次の一歩が見えてきます。',
    accent: 'from-[#86efac] to-[#4ade80]',
    icon: '/images/bookcompass-partner-coach.jpg',
    iconBg: 'bg-[#dcfce7]',
  },
];

const features = [
  {
    label: 'Knowledge Compass',
    title: '読書の広がりが、知識マップになる。',
    body:
      '思想・哲学、社会・ビジネス、文学、科学、歴史など、領域ごとの読書バランスを可視化。さらに「Lv.6 本に問いかける人」のような称号で、読書の"深さ"の成長も感じられるようにしています。どの領域をどこまで掘り下げてきたかが、一枚のマップで見渡せます。',
  },
  {
    label: 'Trait Map / Axis View',
    title: '読書中の"感じ方"が、知的ポジションになる。',
    body:
      '本の中で共感した部分や違和感を覚えた部分を手がかりに、あなたの思考傾向を複数の軸で可視化。個人努力↔環境設計、理論↔実践、感情↔論理 など、言語化しにくい"立ち位置"を見える化します。',
  },
  {
    label: 'ひと言つぶやき',
    title: '長い感想はいらない。ひと言でOK。',
    body:
      '気になった一文、感じたこと、ふと浮かんだ問い。それを"ひと言"残すだけで十分です。非公開メモだから人目を気にせず気楽に書けて、読書が続きます。',
  },
  {
    label: 'AI Reading Summary',
    title: 'つぶやきをAIが、意味のある形にまとめる。',
    body:
      '本の要約ではなく「あなたの読み方のまとめ」をAIが作成。印象の要約・繰り返しテーマ・感情の傾向・行動につながった示唆・未整理の論点の中から、つぶやきに応じた切り口が最大5つまで自動で表示されます。',
  },
  {
    label: 'Explore',
    title: '次の一冊を、"深める / 広げる"の2軸で提案。',
    body:
      '読書傾向とつぶやきをもとに、AIが「今のテーマを深める本」と「視野を広げる本」を理由つきで提案。楽天ブックス連携でそのまま購入ページへ進めます。',
  },
  {
    label: 'Share & Library',
    title: '本棚とシェアで、知識が自分のものになる。',
    body:
      '本棚は「すべて / お気に入り / 読みたい / 読書中 / 読了」でステータス管理。AIサマリーカードや冊数ログカードで、読書の積み重ねを仲間とシェアすることもできます。',
  },
];

const summaryHighlights = [
  {
    title: '繰り返し出ているテーマ',
    desc: '複数のつぶやきに繰り返し現れた論点をAIが抽出。',
    benefit: '「時間の使い方の本だと思って読んでいたけど、自分が一番引っかかっていたのは『他人と比べる癖』だった」——そういう、自分では見えていなかった関心の軸が、あとから言葉になります。',
  },
  {
    title: '感情の傾向',
    desc: '驚き・不安・抵抗感・納得感など、読んでいるときの感情の揺れを整理。',
    benefit: '「この章になんとなく引っかかっていたのは、自分の中でまだ結論が出ていない話だったから」——読書中の違和感の理由が言葉になり、「なんとなく感じた違和感」をそのまま通り過ぎさせません。',
  },
  {
    title: '未整理の論点',
    desc: '迷い、保留、割り切れないままの問いを、無理に整理せず"問い"のまま残します。',
    benefit: 'すぐに結論を出さないからこそ、次に同じテーマの本を読んだとき「あのとき残っていた問いと、ここがつながる」という瞬間が生まれます。読書が一冊で終わらず、点が線になっていく。',
  },
];

const summaryRest = [
  '印象の要約',
  '行動につながった示唆',
  '思考の断片（補足）',
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
              読書が、
              <br />
              知識マップになっていく。
            </h1>
            <p className="mt-5 max-w-lg text-text-muted">
              Book Compass は、読書記録を整理しながら、関心や価値観の変化を可視化するサービスです。3人の読書パートナーと一緒に学びを深め、DoubleHub につながると、その地図は「何を大事にしているか」の輪郭になります。
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
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/images/bookcompass-hero.jpg"
                alt="Book Compass ナレッジ・コンパス画面"
                fill
                className="object-contain"
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
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
                    sizes="(min-width: 1280px) 220px, (min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
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

      {/* ========== 3. 3人の読書パートナー ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Reading Partners
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              あなた専属の、3人の読書パートナー。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              役割の違う3人のAIが、あなたの読書に寄りそいます。気軽に感想を話したいとき、深く掘り下げたいとき、問いで考えを整理したいとき。目的に合わせてパートナーを選べます。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {partners.map((p) => (
              <article
                key={p.key}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-product/40 hover:shadow-md"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-2xl`}
                />
                <div
                  className={`relative mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl ${p.iconBg}`}
                >
                  <Image
                    src={p.icon}
                    alt={`${p.name} のアイコン`}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  {p.role}
                </p>
                <h3 className="mt-2 text-center font-display text-xl font-semibold leading-[1.3] tracking-[-0.01em]">
                  {p.name}
                </h3>
                <p className="mt-1 text-center text-sm font-medium text-text">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  {p.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-text-muted">
            3人のパートナーとの対話に加えて、自由に質問できる「フリーチャット」、これまでの会話を振り返れる「過去のチャット」も利用できます。
          </p>
        </Container>
      </Section>

      {/* ========== 4. Features ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Features
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              Book Compass でできること。
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* ========== 5. 読書サマリーの中身 ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Reading Summary
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              本の要約ではなく、あなたの読み方のまとめ。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              「この本に何が書いてあったか」ではなく、「自分がどこに引っかかり、何を持ち帰ろうとしていたか」をAIが整理します。たとえばこんな切り口が、読書に新しい気づきをもたらします。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl items-start gap-10 md:grid-cols-[0.85fr_1.15fr]">
            <div className="relative mx-auto w-full max-w-sm md:sticky md:top-24">
              <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-lg">
                <Image
                  src="/images/bookcompass-screen-04.jpg"
                  alt="読書サマリー表示例"
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 360px, 90vw"
                />
              </div>
            </div>

            <div>
              <ol className="grid gap-5">
                {summaryHighlights.map((s) => (
                  <li
                    key={s.title}
                    className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
                  >
                    <h3 className="font-display text-base font-semibold tracking-[-0.01em] md:text-lg">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {s.desc}
                    </p>
                    <div className="mt-4 rounded-xl bg-accent-product/8 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                        あなたに起きること
                      </p>
                      <p className="mt-2 text-sm leading-[1.7] text-text">
                        {s.benefit}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-6 text-xs leading-relaxed text-text-muted">
                ※ 上記に加え、つぶやきの内容に応じて 「{summaryRest.join('」「')}」 などの切り口が表示されます。主サマリは最大5つまで、その他に補足として「思考の断片」が1～3件付くこともあります。
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========== 6. What Double Learns ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-4xl">
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                What Double Learns
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold leading-[1.3] tracking-[-0.01em] md:text-2xl">
                ダブルが理解するのは、読了冊数ではなく思考の方向。
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
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

      {/* ========== 7. AI Chat ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Think With Books
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              本について、もう一人の自分と対話する。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              何でも答えるAI先生ではなく、あなたの読書記録を根拠に一緒に考える読書パートナーを目指しています。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl items-center gap-10 md:grid-cols-[0.85fr_1.15fr]">
            {/* 左カラム: 実際のチャット画面 */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-lg">
                <Image
                  src="/images/bookcompass-screen-06.jpg"
                  alt="Think With Books チャット画面"
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 360px, 90vw"
                />
              </div>
            </div>

            {/* 右カラム: 対比 + 擬似チャット */}
            <div className="space-y-6">
              {/* 対比ボックス */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                    こういうAIではない
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text-muted">
                    <li className="flex items-start gap-2">
                      <Cross /> 何でも答えてくれるAI先生
                    </li>
                    <li className="flex items-start gap-2">
                      <Cross /> 上から教え込んでくる存在
                    </li>
                    <li className="flex items-start gap-2">
                      <Cross /> それっぽいことを断定する存在
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-accent-product/30 bg-accent-product/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                    Book Compass が目指すもの
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text">
                    <li className="flex items-start gap-2">
                      <Check /> 読書記録を根拠に答える
                    </li>
                    <li className="flex items-start gap-2">
                      <Check /> 一緒に整理してくれる相手
                    </li>
                    <li className="flex items-start gap-2">
                      <Check /> 考えを深める壁打ち相手
                    </li>
                  </ul>
                </div>
              </div>

              {/* 擬似チャット */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  返ってくる、こんな言葉
                </p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-accent-product/15 text-xs font-semibold text-accent-product"
                    >
                      AI
                    </span>
                    <div className="relative max-w-[90%] rounded-2xl rounded-tl-sm bg-surface-2 px-4 py-3 text-sm leading-[1.7] text-text">
                      あなたが以前こういうことを気にしていたから、今回もここが引っかかっているのかもしれませんね。
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-accent-product/15 text-xs font-semibold text-accent-product"
                    >
                      AI
                    </span>
                    <div className="relative max-w-[90%] rounded-2xl rounded-tl-sm bg-surface-2 px-4 py-3 text-sm leading-[1.7] text-text">
                      この本で残った問いは、前に読んだ別の本の気づきとつながるかもしれません。
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-text-muted">
                  そういうふうに返せることを、Book Compass は目指しています。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========== 8. Flow Into DoubleHub ========== */}
      <Section spacing="md" surface="alt">
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

      {/* ========== 9. Final CTA ========== */}
      <Section spacing="md">
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

function Cross() {
  return (
    <span
      aria-hidden
      className="mt-[0.25rem] grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-text-muted/15"
    >
      <svg
        width="8"
        height="8"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-text-muted"
      >
        <path d="M3 3l6 6M9 3l-6 6" />
      </svg>
    </span>
  );
}
