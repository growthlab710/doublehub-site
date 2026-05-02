import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Book Compass — 読んだ本が、知識の地図になる | DoubleHub',
  description:
    '読みながら一言つぶやくだけ。AIがあなたの読書を「知識の地図」に整え、3人のAI読書パートナーと深めていく読書アプリ。冊数ではなく思考の方向を可視化します。',
  alternates: { canonical: '/products/bookcompass/' },
  openGraph: {
    title: 'Book Compass — 読んだ本が、知識の地図になる | DoubleHub',
    description:
      '読みながら一言つぶやくだけ。AIがあなたの読書を「知識の地図」に整え、3人のAI読書パートナーと深めていく読書アプリ。冊数ではなく思考の方向を可視化します。',
    url: 'https://www.doublehub.jp/products/bookcompass/',
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
    title: '読み終えてからではなく、読みながら呟く。',
    body:
      '気になった一文、湧いた違和感、ふと浮かんだ問い。Twitter感覚の280文字で、その瞬間に言葉にする。非公開メモだから人目を気にせず書けて、自分の言葉のまま記憶に残ります。',
  },
  {
    label: 'AI Reading Summary',
    title: 'つぶやきをAIが、意味のある形にまとめる。',
    body:
      '本の要約ではなく「あなたの読み方のまとめ」をAIが作成。印象の要約・繰り返しテーマ・感情の傾向・行動につながった示唆・未整理の論点の中から、つぶやきに応じた切り口が最大5つまで自動で表示されます。',
  },
  {
    label: 'Explore',
    title: 'ランキングではなく、理由つきの一冊を。',
    body:
      '読書傾向とつぶやきをもとに、AIが「今のテーマを深める本」と「視野を広げる本」の2軸で提案。「なぜ自分に合うのか」が見えるから、納得して次の一冊に手を伸ばせます。楽天ブックス連携でそのまま購入ページへ。',
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

const pains = [
  {
    pain: '「あの本良かった」で詰まる。',
    desc: '読み終えた直後は人生に残る一冊だったのに、半年後にはタイトルすら怪しい。',
    answer: '読みながら一言呟くだけで、自分の言葉として記憶に残る。',
  },
  {
    pain: '読書ノートが続かない。',
    desc: 'きれいな文章を書こうとして詰まる。読み終えてからまとめると、もう忘れている。',
    answer: '280文字の非公開メモ。完璧なレビューはいらない。',
  },
  {
    pain: '次に何を読めばいいかわからない。',
    desc: 'ランキングや「あなたへのおすすめ」を眺めても、どれもしっくりこない。',
    answer: '自分の読書地図をもとに、理由つきで次の一冊を提案。',
  },
  {
    pain: '読書を語れる相手がいない。',
    desc: '面白い本に出会っても、それを話せる相手が周りにいない。読書会はハードルが高い。',
    answer: 'あなたの読書を全部知っているAIが、いつでも壁打ち相手になる。',
  },
];

const concepts = [
  {
    step: '01',
    label: '入口',
    title: 'ひと言つぶやくだけ。',
    body: '読書中の気づき・違和感・問いを、Twitter感覚の280文字で残す。非公開メモだから、人目を気にせず思ったまま書ける。',
  },
  {
    step: '02',
    label: '中段',
    title: 'AIが「知識の地図」に整える。',
    body: '呟きと読書履歴を解析して、ジャンルバランス・思考の傾向・読み方の癖を可視化。冊数ではなく、思考の方向が見えてくる。',
  },
  {
    step: '03',
    label: '出口',
    title: 'もう一人の自分と対話する。',
    body: '過去の本とのつながりに気づき、まだ言葉にならない問いを整理し、次の一冊を理由つきで選ぶ。読書が「思考の道具」になる。',
  },
];

const differentiators = [
  {
    not: '要約',
    yes: '整理',
    body: '本の内容の要約ではなく、「あなたがどう読んだか」を整える。知識の代行ではなく、理解の補助。',
  },
  {
    not: 'ランキング',
    yes: '理由つきレコメンド',
    body: '他人の人気度ではなく、あなたの読書履歴と関心地図を根拠に、「なぜこの一冊が合うのか」とともに提案する。',
  },
  {
    not: '冊数',
    yes: '思考の方向',
    body: '「年間50冊」ではなく「あなたの思考はこの方向に向かっている」を見せる。読書の評価軸を、量から方向と深さへ。',
  },
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
              知識の地図になる。
            </h1>
            <p className="mt-5 max-w-lg text-text-muted">
              読みながら、ひと言つぶやくだけ。AIがあなたの呟きと読書履歴を整え、関心の広がり・思考の癖・次の一冊までを「あなたの読書地図」として育てていきます。読書を「消費」から「蓄積」へ、そして「思考の道具」へ。
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

      {/* ========== 1.5 Concept (入口 / 中段 / 出口) ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              How It Works
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              つぶやく。地図になる。対話する。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              長文の感想文も、完璧なレビューもいりません。読みながら一言残すだけで、AIがあなただけの読書地図を育てていきます。
            </p>
          </div>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {concepts.map((c) => (
              <li
                key={c.step}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-bold tracking-[-0.03em] text-accent-product">
                    {c.step}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                    {c.label}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-[1.3] tracking-[-0.01em]">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {c.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

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
          {/* スマホ: 横スクロールカルーセル / sm以上: グリッド */}
          {/* スマホ時は Container の px-4 を相殺して画面端までスクロール領域を廣げ、内側 padding でカードを中心にスナップ */}
          <div
            className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-12 sm:grid sm:snap-none sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 [&::-webkit-scrollbar]:hidden"
            aria-label="Book Compass の画面ギャラリー"
          >
            {screenshots.map((s) => (
              <figure
                key={s.src}
                className="flex-shrink-0 basis-[78%] snap-center overflow-hidden rounded-2xl border border-border bg-surface shadow-sm sm:flex-shrink sm:basis-auto sm:snap-align-none"
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-surface-2">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1280px) 220px, (min-width: 1024px) 300px, (min-width: 640px) 45vw, 78vw"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs text-text-muted">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* スマホのみ表示: 横スクロールヒント */}
          <div
            className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted sm:hidden"
            aria-hidden="true"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>スワイプして {screenshots.length} 枚の画面を見る</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </Container>
      </Section>

      {/* ========== 2.5 Pains × Solutions ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Why Book Compass
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              読書の「もったいない」を、解きほぐす。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              読んだのに思い出せない。ノートが続かない。次の一冊で迷子になる。語る相手がいない。Book Compass は、読書にまとわりつく4つの引っかかりに、それぞれの答えを用意しています。
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {pains.map((p) => (
              <article
                key={p.pain}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold leading-[1.3] tracking-[-0.01em]">
                  {p.pain}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {p.desc}
                </p>
                <div className="mt-4 rounded-xl bg-accent-product/8 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                    Book Compass の答え
                  </p>
                  <p className="mt-2 text-sm leading-[1.7] text-text">
                    {p.answer}
                  </p>
                </div>
              </article>
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
              ChatGPTのような汎用AIと違うのは、3人とも「あなたの読書記録を全部知っている」こと。気軽に話したいとき、深く掘り下げたいとき、問いで考えを整理したいとき、目的に合わせてパートナーを選べます。
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

      {/* ========== 6.5 Differentiators ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              What Makes It Different
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              読書アプリの「立て付け」を、組み替える。
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {differentiators.map((d) => (
              <article
                key={d.yes}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <p className="text-sm">
                  <span className="text-text-muted line-through">{d.not}</span>
                  <span className="mx-2 text-text-muted">ではなく</span>
                  <span className="font-display text-lg font-semibold tracking-[-0.01em] text-accent-product">
                    {d.yes}
                  </span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {d.body}
                </p>
              </article>
            ))}
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

          <div className="mx-auto mt-12 max-w-3xl">
            <div className="space-y-6">
              {/* 対比ボックス */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                    理解不足のAI
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
                  Book Compass からの応答例
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
                      前に読んだ本でも同じようなテーマに関心を持たれていましたね。今回のモヤモヤも、その延長線上にあるのかもしれません。
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
                      この本で残った問いは、以前読まれた別の本の気づきとつなげて考えてみると、新しい発見があるかもしれません。
                    </div>
                  </div>
                </div>
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

      {/* ========== 9. Plans ========== */}
      <Section spacing="md" id="plans">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Plans
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              まずは無料で、読書を整理する。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              無料でも本の登録・呟き・AIチャット（生涯30回）まで体験できます。がっつり使いたい方は Compass Pro へ。初回登録は最初の 3 ヶ月が ¥480 / 月でお試しいただけます。
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {/* 無料 */}
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                Free
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">無料プラン</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-[-0.03em]">¥0</span>
              </div>
              <p className="mt-3 text-xs text-text-muted">
                基本機能と AI チャットを生涯 30 回まで体験
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> 本の登録は無制限
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 呟き（読書メモ） 10 件 / 日
                </li>
                <li className="flex items-start gap-2">
                  <Check /> レーダーチャートは無制限
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 特性分析・読書サマリーは 10 冊まで
                </li>
                <li className="flex items-start gap-2">
                  <Check /> AI チャット 生涯 30 回まで
                </li>
              </ul>
              <p className="mt-6 border-t border-divider pt-4 text-xs text-text-faint">
                ※ 無料の 30 回はリセットなしの生涯枠です。消費しきると過去チャットの閲覧のみになります。
              </p>
            </div>

            {/* Compass Pro */}
            <div className="relative rounded-2xl border-2 border-accent-product bg-surface p-8 shadow-lg">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-accent-product px-4 py-1 text-xs font-bold text-white">
                おすすめ
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                Subscription
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">Compass Pro</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-[-0.03em]">¥880</span>
                <span className="text-sm text-text-muted">／ 月（税込）</span>
              </div>
              <div className="mt-2 inline-flex items-center rounded-full bg-accent-product/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent-product">
                初回登録は最初の 3 ヶ月 ¥480 / 月
              </div>
              <p className="mt-3 text-xs text-text-muted">
                読書記録を根拠にした AI 対話を毎日
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> <strong className="font-semibold text-text">AI チャット 30 件 / 日</strong>で読書を深掘り
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 呟きの日次上限を 30 件 / 日に拡張
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 全ての本の特性分析・読書サマリーを閲覧
                </li>
                <li className="flex items-start gap-2">
                  <Check /> いつでも解約可能・過去の記録は残る
                </li>
              </ul>
              <p className="mt-6 border-t border-divider pt-4 text-xs text-text-faint">
                ※ 初回 3 ヶ月割引は Apple の仕様により生涯 1 回限り。過去に解約・再登録された場合は割引対象外となります。
              </p>
            </div>
          </div>

          {/* 機能比較テーブル */}
          <div className="mx-auto mt-16 max-w-4xl">
            <h3 className="text-center font-display text-lg font-semibold">
              機能比較
            </h3>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-divider bg-surface-2">
                    <th className="px-4 py-3 text-left font-semibold text-text">機能</th>
                    <th className="px-4 py-3 text-center font-semibold text-text-muted">無料</th>
                    <th className="px-4 py-3 text-center font-semibold text-accent-product">
                      Compass Pro
                    </th>
                  </tr>
                </thead>
                <tbody className="[&>tr]:border-b [&>tr]:border-divider [&>tr:last-child]:border-0">
                  <tr>
                    <td className="px-4 py-3 text-text">本の登録</td>
                    <td className="px-4 py-3 text-center text-text-muted">無制限</td>
                    <td className="px-4 py-3 text-center text-text">無制限</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-text">呟き（読書メモ）</td>
                    <td className="px-4 py-3 text-center text-text-muted">10 件 / 日</td>
                    <td className="px-4 py-3 text-center text-text">30 件 / 日</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-text">レーダーチャート（知的ポジション）</td>
                    <td className="px-4 py-3 text-center text-text-muted">無制限</td>
                    <td className="px-4 py-3 text-center text-text">無制限</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-text">特性分析の閲覧</td>
                    <td className="px-4 py-3 text-center text-text-muted">10 冊まで</td>
                    <td className="px-4 py-3 text-center text-text">無制限</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-text">読書サマリー</td>
                    <td className="px-4 py-3 text-center text-text-muted">10 冊まで</td>
                    <td className="px-4 py-3 text-center text-text">無制限</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-text">Push 型レコメンド（探す）</td>
                    <td className="px-4 py-3 text-center text-text-muted">無制限</td>
                    <td className="px-4 py-3 text-center text-text">無制限</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-text">AI チャット</td>
                    <td className="px-4 py-3 text-center text-text-muted">生涯 30 回まで</td>
                    <td className="px-4 py-3 text-center text-text">30 件 / 日</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-text">AI チャットの参照範囲</td>
                    <td className="px-4 py-3 text-center text-text-muted">全冊 + 本をまたいだ接続</td>
                    <td className="px-4 py-3 text-center text-text">全冊 + 本をまたいだ接続</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-text">過去チャットの閲覧</td>
                    <td className="px-4 py-3 text-center text-text-muted">無制限</td>
                    <td className="px-4 py-3 text-center text-text">無制限</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="mt-6 space-y-2 text-xs text-text-muted">
              <li className="flex items-start gap-2">
                <Check /> AI チャットが参照する読書記録の深さは無料と Compass Pro で共通。回数だけが異なります。
              </li>
              <li className="flex items-start gap-2">
                <Check /> Compass Pro を解約された場合も、過去のチャット・記録は引き続き閲覧できます。
              </li>
            </ul>
          </div>

          {/* サブスクリプションについて */}
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border bg-surface-2 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              サブスクリプションについて
            </p>
            <dl className="mt-4 grid gap-3 text-sm text-text-muted sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-text">名称</dt>
                <dd className="mt-1">Compass Pro</dd>
              </div>
              <div>
                <dt className="font-semibold text-text">期間</dt>
                <dd className="mt-1">1 ヶ月（自動更新）</dd>
              </div>
              <div>
                <dt className="font-semibold text-text">価格</dt>
                <dd className="mt-1">¥880 / 月（税込）・初回登録は最初の 3 ヶ月 ¥480 / 月</dd>
              </div>
              <div>
                <dt className="font-semibold text-text">自動更新・解約</dt>
                <dd className="mt-1">
                  期間終了の 24 時間以上前に解約しない限り自動的に更新されます。解約は iOS の「設定 ＞ Apple ID ＞ サブスクリプション」からいつでも可能です。
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-text-faint">
              年額プランは初回リリースでは未提供です（今後追加予定）。価格は執筆時点のもので、最新の料金は App Store 上の表示をご確認ください。
            </p>
          </div>
        </Container>
      </Section>

      {/* ========== 10. Final CTA ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              あなたの読書地図を、今日から育てはじめる。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              読みながら一言つぶやくだけ。蓄積された気づきは、DoubleHub につながることで「あなたの輪郭」になっていきます。
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
