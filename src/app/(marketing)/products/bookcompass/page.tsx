import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

// タイトルの末尾「— DoubleHub」はルートの metadata.title.template が付ける
const pageTitle = 'Book Compass — 読みながら一言、あとから読み返せる読書メモ';
const pageDescription =
  '読んだのに、頭に残らない——その手前で、読みながら一言だけ呟く読書メモアプリ。呟きは本ごとの「読みの現在地」や読書特集号として、あとから読み返せる形で返ってきます。呟きは他のユーザーに公開されず、広告も表示しません。';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/products/bookcompass/' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
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

// 画面はすべて 2.6.0。先頭の 3 枚は AI が主役でない画面にしている（入口で AI を主語にしない）
const screenshots = [
  {
    src: '/images/bookcompass-home-202610.jpg',
    alt: 'ホーム画面。今週の棚、今月と今週の記録、ナレッジ・コンパス',
    caption: 'ホーム — 今週の棚と、読書の広がり',
  },
  {
    src: '/images/bookcompass-first-book-202610.jpg',
    alt: 'はじめて起動したときの「最近、なに読んでる？」の画面',
    caption: 'はじめての一冊 — 「最近、なに読んでる？」',
  },
  {
    src: '/images/bookcompass-library-202610.jpg',
    alt: 'ライブラリ。本ごとにジャンルと「読みたい」「読書中」などの状態が並ぶ',
    caption: 'ライブラリ — 読みたい・読書中・読了',
  },
  {
    src: '/images/bookcompass-reply-202610.jpg',
    alt: '呟きを送った直後に、ブックバディの返事が入力欄の上に届いた画面',
    caption: '返事 — 呟くと、その場でひと言（AI が生成）',
  },
  {
    src: '/images/bookcompass-question-202610.jpg',
    alt: '本の詳細の上部。タグ、この本への問い、この本からの問いかけ',
    caption: '本からの問いかけ — タップで答えられる（AI が生成）',
  },
  {
    src: '/images/bookcompass-trait-202610.jpg',
    alt: '本ごとの知的ポジション。個人努力と環境設計、理論と実践の軸',
    caption: '知的ポジション — この本での読み方の傾き（AI が分析）',
  },
  {
    src: '/images/bookcompass-explore-202610.jpg',
    alt: '探すタブ。あなたの本棚に近い新刊などの棚が並ぶ',
    caption: '探す — あなたの本棚から、毎週の棚',
  },
  {
    src: '/images/bookcompass-shelf-sheet-202610.jpg',
    alt: '棚の本の詳細。この本について、なぜこの棚に、読みたいに追加',
    caption: 'なぜこの棚に — 選ばれた理由が読める',
  },
  {
    src: '/images/bookcompass-coach-202610.jpg',
    alt: '内省ノートで思考コーチから書き出しの問いを受け取った画面',
    caption: '内省ノート — 書けない日は、問いから（AI が生成）',
  },
  {
    src: '/images/bookcompass-widget-202610.jpg',
    alt: 'ホーム画面ウィジェット「いま読んでいる本」の中サイズ',
    caption: 'ウィジェット — いま読んでいる本をホーム画面に',
  },
];

const concepts = [
  {
    step: '01',
    label: '入口',
    title: '読みながら、一言だけ。',
    body: '気になった一文、引っかかったこと、ふと浮かんだ問いを、280字までで。声で話しかける音声入力も使えます。呟きは他のユーザーに公開されません。',
  },
  {
    step: '02',
    label: '中段',
    title: 'その場で、ひと言返ってくる。',
    body: '呟くと、読書パートナーのブックバディが内容に触れた返事を返します（AI が生成）。返事の頻度は「オフ／少なめ／ふつう／毎回」から選べます。',
  },
  {
    step: '03',
    label: '出口',
    title: 'あとから、読み返せる形に。',
    body: '呟きが溜まると、本ごとの「読みの現在地」が育ち、複数の本をまたいだ「読書特集号」も作れるようになります。',
  },
];

const pains = [
  {
    pain: '「あの本、良かった」で止まる。',
    desc: '読み終えた直後は残る気がしたのに、数ヶ月経つと「面白かった」しか思い出せない。',
    answer: '読みながら一言呟いておけば、あとから自分の言葉で読み返せます。',
  },
  {
    pain: '感想を書こうとして、手が止まる。',
    desc: 'きれいな文章にしようとして詰まる。読み終えてからまとめようとすると、もう細部を忘れている。',
    answer: '感想文は書かなくていい。280字までの一言と、音声入力で。',
  },
  {
    pain: '書けない日もある。',
    desc: '何を書けばいいか分からない日は、白紙の前で手が止まる。',
    answer: '思考コーチの問いに、一言だけ答えればいい（無料プランは月10回まで）。',
  },
  {
    pain: '次の一冊が決まらない。',
    desc: 'ランキングや「あなたへのおすすめ」を眺めても、しっくりこない。',
    answer: 'あなたの本棚をもとにした棚が、毎週「探す」に並びます。選ばれた理由も読めます。',
  },
];

const features = [
  {
    label: 'Notes',
    title: '読み終えてからではなく、読みながら呟く。',
    body:
      '気になった一文、湧いた違和感、ふと浮かんだ問い。280字までの一言を、その場で残せます。声で話しかける音声入力にも対応。呟きは他のユーザーに公開されず、フォローも、いいねもありません。',
  },
  {
    label: 'Reply',
    title: '呟くと、その場でひと言返ってくる。',
    body:
      '本を登録すると、ブックバディがその一冊についてひとこと話しかけます。呟けば内容に触れた返事が届き、日をあけて再開したときは「おかえり」の一言に。返事は AI が生成し、頻度は「オフ／少なめ／ふつう／毎回」から選べます。無料プランでは、じっくりした返事は月20回まで（短い相槌は回数に含みません）。',
  },
  {
    label: 'Reading Compass',
    title: 'いま、その本をどう読んでいるか。',
    body:
      '呟きが積み重なると、その本のページ「読みの現在地」が育ちます。読む前・読んでいる最中・読み終えたあとで、見えるものが変わります（AI が生成。無料プランは10冊まで）。',
  },
  {
    label: 'Thinking Coach',
    title: '書けない日は、問いから。',
    body:
      '内省ノート・読む前の問い・問いかけのあと・読み終えた本の振り返りの4か所で、思考コーチが考えを進めるための短い問いを返します。答えを与えるのではなく、問いを返すのが役割です（無料プランは月10回まで、Compass Pro は無制限）。',
  },
  {
    label: 'Knowledge Compass',
    title: '読書の広がりと、読み方の傾き。',
    body:
      '思想・哲学、社会・ビジネス、文学・物語、歴史・地理、科学・技術など9つの領域で、読書のバランスをレーダーチャート「ナレッジ・コンパス」で見渡せます。本ごとの「知的ポジション」では、呟きをもとに AI が読み取った傾きを「理論↔実践」のような軸で表示します（無料プランは10冊まで）。',
  },
  {
    label: 'Explore',
    title: '次の一冊は、あなたの本棚から。',
    body:
      '「あなたの本棚に近い新刊」「本棚の著者の、ほかの本」「いつもと違う棚から」などの棚が毎週並びます。表紙をタップすると「なぜこの棚に」が読め、その場で「読みたい」に入れたり、楽天ブックスで見たりできます。気にならない本は「興味なし」で外せます。棚は、登録した本のジャンル・著者・タグからの計算で選んでいます。',
  },
  {
    label: 'Library & Widget',
    title: '本棚と、ホーム画面の「いま読んでいる本」。',
    body:
      '本はバーコードかタイトル検索で登録でき、見つからない本は手入力でも追加できます。ライブラリは「すべて／お気に入り／読みたい／読書中／読了」で絞り込み。ホーム画面ウィジェットに「いま読んでいる本」を置けば、表紙のタップでその本の呟き入力へ直行できます。',
  },
  {
    label: 'Questions & Flashback',
    title: '読む前の問いと、よみがえる呟き。',
    body:
      '読み始める前に「この本で何を考えたいか」を問いとして残せます。ホームには30日以上前の呟きが日替わりで再登場し、別々に読んだ本どうしのつながりは「本と本のあいだ」として表示されます。',
  },
  {
    label: 'Reading Documentary',
    title: '1冊の読書の歩みが、読み物に。',
    body:
      '1冊分の呟きから、あなた専属の編集者（AI）が読み物に編集します（Compass Pro・月15回）。誌面の最後では、ブックバディと読書メンターに感想を寄せてもらうこともできます。',
  },
];

const readingStages = [
  {
    stage: '読む前',
    title: '持っていく問いと、ここまでの引っかかり。',
    body: '読む前に立てた問いと、ここまでの呟きの中で引っかかった言葉が並びます。再開するときの手がかりになります。',
  },
  {
    stage: '読んでいる最中',
    title: 'その日の読みが、どう動いたか。',
    body: '呟きの流れから、あなたの読みがどこからどこへ動いているかを示します。',
  },
  {
    stage: '読み終えたあと',
    title: '30秒で話せる「語るなら」と、問いへの答え。',
    body: '誰かに話すならどう言うか。読む前に立てた問いに、自分の読書がどう応えたか。読み始めから読み終わりまでの変化は「読みの変遷」で振り返れます。',
  },
];

const partners = [
  {
    key: 'buddy',
    name: 'ブックバディ',
    role: '読書フレンド',
    tagline: '読書の感想を気軽にシェアできる友達',
    body: '呟きに返事をくれる相棒。本を登録したときのひとこと、呟いたときの返事、ホームの「ブックバディの一言」で声をかけてくれます（設定でオフにできます）。',
    accent: 'from-[#fca5a5] to-[#f59e0b]',
    icon: '/images/bookcompass-partner-buddy.jpg',
    iconBg: 'bg-[#fde4cf]',
  },
  {
    key: 'mentor',
    name: '読書メンター',
    role: '博識な教授',
    tagline: '読書の質を高める博識なアドバイザー',
    body: '本の背景や読み方のコツを、一緒にたどる相談相手。本の深掘りチャット（Compass Pro）で話せます。',
    accent: 'from-[#93c5fd] to-[#60a5fa]',
    icon: '/images/bookcompass-partner-mentor.jpg',
    iconBg: 'bg-[#dbeafe]',
  },
  {
    key: 'coach',
    name: '思考コーチ',
    role: '壁打ち深掘り',
    tagline: '思考を深め、新たな視点を拓くコーチ',
    body: '答えではなく、問いをくれるコーチ。内省ノートや読み終えた本の振り返りで、考えを進めるための問いを返します（無料プランは月10回まで）。',
    accent: 'from-[#86efac] to-[#4ade80]',
    icon: '/images/bookcompass-partner-coach.jpg',
    iconBg: 'bg-[#dcfce7]',
  },
];

// ストア説明文「■ AIの使い方について」「■ 広告について」とプライバシーポリシーで裏を取れる事実だけを書く
const trustPoints = [
  '呟きは他のユーザーに公開されません。フォローも、いいねも、他の人の評価もありません。',
  'AI が本の内容を代わりに読むのではありません。あなたが書いた呟きを材料に、あなたがどう読んだかを編集します。',
  'あなたが書いたものは、あなたのためだけに使います。AI モデルの学習には使いません。',
  '「探す」に並ぶ棚は、AI ではなく計算で選んでいます。本の紹介とタグには AI が生成した内容が含まれます。',
  '呟いたときの返事は頻度を変えたりオフにしたりでき、ホームの「ブックバディの一言」もオフにできます。',
  '本の深掘りチャットは、はじめて使うときに同意を確認します。',
  '広告は表示しません。',
];

const learns = [
  '最近どんなテーマに惹かれているか',
  '繰り返し悩む問いは何か',
  '価値観がどの方向へ動いているか',
  '言語化しきれていない思考の傾向',
];

const differentiators = [
  {
    not: '本の解説',
    yes: 'あなたの読み',
    body: '本の中身を解説するのではなく、あなたがその本をどう読んだかを、あなたが書いた言葉で残す。',
  },
  {
    not: 'ランキング',
    yes: 'あなたの本棚からの棚',
    body: '他人の人気度ではなく、あなたが登録した本のジャンル・著者・タグから計算した棚を、選ばれた理由と一緒に並べる。',
  },
  {
    not: '冊数',
    yes: '読みの動き',
    body: '「年間50冊」のような量ではなく、一冊の中で考えがどう動いたか、どの領域に広がってきたかを見せる。',
  },
];

const flows = [
  {
    label: 'サービス内で価値になること',
    desc: '読書の記録、呟きの読み返し、関心の領域の可視化、あなたの本棚からの棚。',
  },
  {
    label: 'DoubleHub に入る情報',
    desc: '関心の変化、思考のクセ、心が動くトピック。連携した場合に、構造化されたインサイトとして渡ります。',
  },
];

const comparisonRows = [
  { feature: '本の登録', free: '無制限', pro: '無制限' },
  { feature: '呟き（読書メモ）', free: '10 件 / 日', pro: '30 件 / 日' },
  { feature: 'ナレッジ・コンパス（レーダーチャート）', free: '無制限', pro: '無制限' },
  { feature: '知的ポジション（特性分析）', free: '10 冊まで', pro: '無制限' },
  { feature: '読みの現在地', free: '10 冊まで', pro: '無制限' },
  { feature: 'バディの返事', free: 'じっくり月 20 回＋相槌は無制限', pro: 'じっくり無制限' },
  { feature: '思考コーチの問い', free: '月 10 回', pro: '無制限' },
  { feature: '内省ノート・ウィジェット', free: '利用可', pro: '利用可' },
  { feature: '探すの棚（毎週）', free: '利用可', pro: '利用可' },
  { feature: '読書特集号（複数の本の横断編集）', free: '半年に 1 号', pro: '90 日ごと' },
  { feature: '読書ドキュメンタリー（読者の声つき）', free: '—', pro: '月 15 回' },
  { feature: '本の深掘りチャット', free: '—', pro: '30 件 / 日' },
  { feature: 'これまでの会話の閲覧', free: '可', pro: '可' },
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
              読んだのに、
              <br />
              頭に残らない。
            </h1>
            <p className="mt-5 max-w-lg text-text-muted">
              読みながら一言だけ。呟きは、あとから読み返せる誌面になって返ってきます。
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted">
              きれいな感想文は要りません。呟きは他のユーザーに公開されず、広告も表示しません。
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

          <div className="relative mx-auto w-full max-w-[300px] md:max-w-[320px]">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-2.5 shadow-xl">
              <Image
                src="/images/bookcompass-hero-202610.jpg"
                alt="Book Compass の本の画面。読みながら残した呟きの一覧と、280字までの入力欄"
                width={1080}
                height={2206}
                className="h-auto w-full rounded-[1.5rem]"
                sizes="(min-width: 768px) 320px, 300px"
                priority
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ========== 2. Concept (入口 / 中段 / 出口) ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              How It Works
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              呟く。返ってくる。読み返せる。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              長い感想文も、完璧なレビューもいりません。読みながら一言残すだけで、その本のページが少しずつ育っていきます。
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

      {/* ========== 3. App Screenshots ========== */}
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
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-text-faint">
            ※ 画面はバージョン 2.6.0 のものです。表示している本や呟きはテスト用の記録です。
          </p>
        </Container>
      </Section>

      {/* ========== 4. Pains × Solutions ========== */}
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
              読んだのに思い出せない。感想が書けない。書けない日がある。次の一冊で迷う。Book Compass は、読書にまとわりつく4つの引っかかりに、それぞれの答えを用意しています。
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

      {/* ========== 5. Features ========== */}
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

      {/* ========== 6. 読みの現在地 ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Reading Compass
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              いま、その本をどう読んでいるか。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              「読みの現在地」は、本の中身を解説するのではなく、あなたがその本をどう読んだかだけを扱います。使うのは、あなたが書いた言葉そのものです。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl items-start gap-10 md:grid-cols-[0.85fr_1.15fr]">
            <div className="relative mx-auto w-full max-w-sm md:sticky md:top-24">
              <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-lg">
                <Image
                  src="/images/bookcompass-reading-compass-202610.jpg"
                  alt="読みの現在地の画面。持っていく問い、読みの動き、ここまでの引っかかり"
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 360px, 90vw"
                />
              </div>
            </div>

            <div>
              <ol className="grid gap-5">
                {readingStages.map((s) => (
                  <li
                    key={s.stage}
                    className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                      {s.stage}
                    </p>
                    <h3 className="mt-2 font-display text-base font-semibold tracking-[-0.01em] md:text-lg">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-6 text-xs leading-relaxed text-text-muted">
                ※ 読みの現在地は、呟きをもとに AI が生成します。呟き1件目から作られ、無料プランは10冊まで、Compass Pro は全冊で使えます。
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========== 7. 読書特集号 ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Reading Special Issue
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              あなたの読書が、
              <br className="sm:hidden" />
              1冊の特集誌になる。
            </h2>
            <p className="mt-4 text-sm leading-[1.9] text-text-muted md:text-base">
              複数の本にまたがる呟きを、AIが「専属編集者」として横断編集。表紙のタイトルから章立て、あなたが立てた「問いの記録」まで、一定期間の読書があなたを主役にした1冊の特集号にまとまります。無料でも半年に1号、Pro なら90日ごとに発行できます。
            </p>
            <p className="mt-3 text-sm leading-[1.9] text-text-muted md:text-base">
              3冊以上の本に呟きが10件たまると、短めの「ライト版」で創刊できます（15件からは通常版）。作る前でも、アプリの「サンプルを見る」で誌面の作例を読めます。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-10 sm:grid-cols-2">
            <figure className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
                <Image
                  src="/images/bookcompass-special-issue-cover-202610.jpg"
                  alt="読書特集号の表紙 — 期間の読書に編集者がタイトルをつけ、語った本や残した呟き、記録した日数などの数字が並ぶ"
                  width={1080}
                  height={2236}
                  className="h-auto w-full rounded-[1.5rem]"
                  sizes="(min-width: 640px) 384px, 90vw"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs leading-[1.7] text-text-muted">
                表紙——その期間のあなたの読書に、専属編集者がタイトルをつけます。
              </figcaption>
            </figure>
            <figure className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
                <Image
                  src="/images/bookcompass-special-issue-inside-202610.jpg"
                  alt="読書特集号の中面 — 「問いの記録」の章で、期間中に立てた問いと呟きが誌面に編み込まれている"
                  width={1080}
                  height={2236}
                  className="h-auto w-full rounded-[1.5rem]"
                  sizes="(min-width: 640px) 384px, 90vw"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs leading-[1.7] text-text-muted">
                中面——章立てのなかに「問いの記録」。あなたの呟きが、そのまま誌面に編み込まれます。
              </figcaption>
            </figure>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-text-faint">
            ※ 誌面は実際の生成例（ライト版）です。内容には AI が生成したコンテンツを含みます。
          </p>
        </Container>
      </Section>

      {/* ========== 8. 3人の読書パートナー ========== */}
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
              ブックバディは呟きへの返事、思考コーチは考えを進める問い、読書メンターは本の背景を一緒にたどる相手。3人とも、あなたが書いた読書記録をもとに応答します（AI）。
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
            本の深掘りチャットは Compass Pro の機能です（1日30件まで）。本の詳細の「AIと深める」と、マイページの「あなたの読書パートナー」から始められます。これまでの会話は、無料プランでも読み返せます。
          </p>
        </Container>
      </Section>

      {/* ========== 9. AIと深める（Compass Pro） ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Deepen With AI
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              本について、もう一人の自分と対話する。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              何でも答えるAI先生ではなく、あなたの読書記録を根拠に一緒に考える読書パートナーを目指しています。本の深掘りチャットは Compass Pro の機能です。
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
                  Book Compass からの応答例（イメージ）
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

      {/* ========== 10. AI の使い方と、見せない記録 ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-4xl">
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                Privacy &amp; AI
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold leading-[1.3] tracking-[-0.01em] md:text-2xl">
                AI の使い方と、見せない記録。
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                読書の記録は、誰かに見せるためのものではありません。Book Compass での AI の使い方は次のとおりです。
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {trustPoints.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2 text-sm leading-relaxed text-text-muted"
                  >
                    <Check /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-text-faint">
                詳しくは{' '}
                <Link href="/privacy/bookcompass/" className="underline underline-offset-2">
                  プライバシーポリシー
                </Link>{' '}
                をご覧ください。
              </p>
            </article>
          </div>
        </Container>
      </Section>

      {/* ========== 11. Differentiators ========== */}
      <Section spacing="md" surface="alt">
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

      {/* ========== 12. What Double Learns ========== */}
      <Section spacing="md">
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

      {/* ========== 13. Flow Into DoubleHub ========== */}
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
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
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

      {/* ========== 14. Plans ========== */}
      <Section spacing="md" id="plans">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Plans
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              読書メモとしては、無料でずっと使えます。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              本の登録・呟き・ライブラリ・ナレッジ・コンパスは無料で使えます。じっくり使いたい方は Compass Pro へ。初回登録は最初の 3 ヶ月が ¥480 / 月です。
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
                読書メモとしての基本機能を、無料で
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> 本の登録は無制限
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 呟き（読書メモ） 10 件 / 日
                </li>
                <li className="flex items-start gap-2">
                  <Check /> ナレッジ・コンパスは無制限
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 知的ポジション・読みの現在地は 10 冊まで
                </li>
                <li className="flex items-start gap-2">
                  <Check /> バディの返事 じっくり月 20 回（相槌は無制限）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 思考コーチの問い 月 10 回
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 内省ノート・ホーム画面ウィジェット
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 読書特集号 半年に 1 号
                </li>
              </ul>
              <p className="mt-6 border-t border-divider pt-4 text-xs text-text-faint">
                ※ 本の深掘りチャットは Compass Pro の機能です。これまでの会話は無料プランでも読み返せます。
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
                読みの記録を、AI と一緒にもっと深く
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> <strong className="font-semibold text-text">本の深掘りチャット 30 件 / 日</strong>
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 呟きの日次上限を 30 件 / 日に拡張
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 知的ポジションと読みの現在地を全冊で
                </li>
                <li className="flex items-start gap-2">
                  <Check /> じっくりした返事と思考コーチの問いが無制限
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 読書ドキュメンタリー 月 15 回・読書特集号 90 日ごと
                </li>
                <li className="flex items-start gap-2">
                  <Check /> いつでも解約できます（解約後も、これまでの記録と会話を閲覧できます）
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
                  {comparisonRows.map((r) => (
                    <tr key={r.feature}>
                      <td className="px-4 py-3 text-text">{r.feature}</td>
                      <td className="px-4 py-3 text-center text-text-muted">{r.free}</td>
                      <td className="px-4 py-3 text-center text-text">{r.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-6 space-y-2 text-xs text-text-muted">
              <li className="flex items-start gap-2">
                <Check /> 本の深掘りチャットは Compass Pro の機能です。これまでの会話は、無料プランでも読み返せます。
              </li>
              <li className="flex items-start gap-2">
                <Check /> Compass Pro を解約したあとも、これまでの記録と会話は閲覧できます。
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
                  期間終了の 24 時間以上前に解約しない限り自動的に更新されます。解約は App Store のサブスクリプション設定から、いつでも行えます。
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-text-faint">
              年額プランと無料トライアルはありません。価格は執筆時点のもので、最新の料金は App Store 上の表示をご確認ください。
            </p>
          </div>
        </Container>
      </Section>

      {/* ========== 15. Final CTA ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              最近、なに読んでる？
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              いま読んでいる本を一冊登録して、読みながら一言呟くところから。呟きは、あとから読み返せる形になって返ってきます。
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
