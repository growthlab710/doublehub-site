import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site/config';

export const metadata: Metadata = {
  title: 'DoubleHub — 日記は、写真1枚でいい。広告なしの写真日記と、AIの相棒',
  description:
    '日記は、写真1枚でいい。気分はワンタップ、文章はなくてもかまいません。広告なし。書いた日はダブル（もう一人の自分）がひと言返し、写真は端末の外に残りません。日記から見つけた幸せの種は、月ごとのアルバムに。iOS の日記アプリ DoubleHub。',
  keywords: [
    'DoubleHub',
    'ダブルハブ',
    '日記アプリ',
    '写真日記',
    'フォトダイアリー',
    '1日1枚 日記',
    '気分記録',
    '広告なし 日記',
    '三日坊主 日記',
    'AI 日記',
    'アルバム',
    '日記 検索',
    '日記 書き出し',
    'ToDo メモ',
    '音声入力',
    'iOS アプリ',
    'GrowthLab',
  ],
  alternates: { canonical: '/products/doublehub/' },
  openGraph: {
    title: 'DoubleHub — 日記は、写真1枚でいい。',
    description:
      '広告なし。1日1枚の写真日記と、AIの相棒。書いた日はダブルがひと言返し、写真は端末の外に残りません。',
    url: 'https://www.doublehub.jp/products/doublehub/',
    type: 'website',
    siteName: 'DoubleHub',
    locale: 'ja_JP',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DoubleHub — 日記は、写真1枚でいい。',
    description:
      '広告なし。1日1枚の写真日記と、AIの相棒。書いた日はダブルがひと言返し、写真は端末の外に残りません。',
    images: ['/images/og-default.jpg'],
  },
};

const appStoreUrl = siteConfig.social.appStoreDoubleHub;
const appStoreBadge =
  'https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/ja-jp?releaseDate=1774224000';

// 日記の3つの柱
const diaryPillars = [
  {
    tag: '1日1枚',
    title: '写真1枚と気分スタンプだけで、今日が残る。',
    body:
      '文章が出てこない日は、今日撮った写真を1枚選んで、気分スタンプを1タップするだけでいい。それでもダブルがその日の記録にひと言添えてくれます。ことばで書きたい日は、ひと言メモも。Plus では写真を1日3枚まで、Premium では5枚まで貼れます。',
  },
  {
    tag: 'カレンダー',
    title: '月をながめるだけで、気分の波が見えてくる。',
    body:
      'カレンダーには写真のサムネイルと、気分の「天気」アイコンが並びます。晴れの日、くもりの日。がんばって分析しなくても、ながめるだけで自分の1ヶ月の波が見えてきます。週のふり返りは、その週の写真から始まります。',
  },
  {
    tag: 'プライバシー',
    title: '日記の写真は、端末の外に残りません。',
    body:
      '日記の写真は端末の中に保存され、外部に保存されることはありません。ダブルがリアクションを生成するときだけ縮小画像を一時送信し、サーバーには残りません。気分や傾向の分析も端末の中で完結し、心理データを新規にサーバー保存することはありません。',
  },
];

// つづきのある一言
const replyPoints = [
  {
    title: 'ひと言が返る',
    body:
      '夕方の空の写真に「ふつう」のスタンプだけを押した日にも、ダブルは短い言葉を返します。分析でも、励ましでもありません。見ている相手がいる、という手応えだけが残ります。無料プランでは週に3日、Plus では毎日。',
  },
  {
    title: '返事ができる',
    body:
      'チップをひとつ選ぶか、短い文で返すか。返事は、その日の日記の中に、ダブルの言葉と並んで残ります。',
  },
  {
    title: '後日、またふれる',
    body:
      '返事をした話題に、ダブルが後日またふれます。「またやる」と答えたことが日記に現れたときは、ダブルがそっと気づきます。ダブルからの声は受信箱にまとまるので、あとから読み返せます。',
  },
];

// 想起と検索
const recallPoints = [
  {
    title: '1週間前・1ヶ月前・1年前の同じ日',
    body:
      '同じ日の日記を、ダブルが持ってきます。「ちょうど1週間前の今日が、この日記の1ページ目だったんだよ」。すべてのプランで届きます。',
  },
  {
    title: '今日と似ている日',
    body:
      '今日の日記と似ている日を、ダブルが思い出して添えます。あなたが書いた一言ごと、2枚並べて見くらべられます（Plus）。',
  },
  {
    title: '言葉でさがす',
    body:
      'あなたが書いた言葉からも、ダブルが写真から読み取った言葉からも、日記をさがせます。さがす処理は、端末の中だけで完結します。',
  },
];

// アルバム（2.10.0）の説明カード
const albumPoints = [
  {
    title: 'ダブルが、選んで貼る',
    body:
      'あなたの日記から、ダブルが幸せの種を見つけて、月ごとのページに貼っていきます。写真と、日付・場面の題、その日の手がかり（気分、一緒にいた相手、「はじめてのこと」「またやりたい」）。旅行は数日でひとつのページに。その日にダブルが返した一言と、あなたの一行が、そのままの言葉で添えられます（一言と章の便りは Plus）。',
  },
  {
    title: '順位をつけない、数えない',
    body:
      '星も、順位もありません。写真の上に文字を重ねず、AI の文には「AIによる生成」の表示、あなたの言葉は別の書体で貼られます。派手な旅行の日も、湯気の写真しかない火曜日も、同じ大きさで並びます。',
  },
  {
    title: '見たくないものは、見なくていい',
    body:
      '日ごと・期間ごと・人やペットごとに非表示にできます（日記そのものは残り、あとで戻せます）。死別や別れのような喪失の日は貼らず、その直後はアプリ側からの差し出しを止めます。閉じた月のページは、アプリを更新しても並びが変わりません。',
  },
];

// 週・月のまとめと法則
const summaryPoints = [
  {
    title: '週のふり返り',
    body:
      'その週の写真から始まります。目次と、あなたの言葉の引用。気分にふれるのは、とてもいい週と、先週より上向いた週だけです。Plus は毎週、無料プランは月に1回。',
  },
  {
    title: '月のまとめ',
    body:
      'その月の写真から始まり、ダブルがその月について短く語ります。末尾から、アルバムの章へ移れます（Plus）。',
  },
  {
    title: 'ダブルの気づきと、あなたの法則',
    body:
      '「人と会った翌日は、気分が高めみたい」。根拠は、あなたがワンタップで付けた気分と充実度のスタンプだけです。日記の文章から感情を読み取ることはしません。根拠になった日数は、必ず一緒に表示します。同じ組み合わせがくり返し現れると「あなたの法則」としてカードにまとまり、月のまとめにも並びます（Plus）。',
  },
];

// 道具箱と連携
const toolboxPoints = [
  {
    title: 'ToDo・メモ・予定',
    body:
      'テキストでも音声でも、まずは話すだけ。ダブルが ToDo かメモかを仕分けて、「明日まで」「来週水曜の朝10時」のような期限も読み取ります。音声入力は iOS 標準の仕組みで、ホーム画面に置けるウィジェットもあります。',
  },
  {
    title: 'ヘルスケア',
    body:
      '歩数や睡眠などは読み取り専用で、扱うのは集計値だけ。連携はあなたが明示的に有効にしたときだけで、許可しなくても日記は使えます。',
  },
  {
    title: 'iOS カレンダー',
    body:
      'iOS 標準の仕組みで双方向に同期します。Google アカウントの連携や OAuth は不要です。',
  },
  {
    title: 'BookCompass',
    body:
      '読書記録アプリ BookCompass と連携すると、読書中に言葉にした気づきや最近の関心が、ダブルとの会話に文脈として流れ込みます。連携は任意で、いつでもオフにできます。',
  },
];

// FAQ（AIO/SEO 対策）
const faqs = [
  {
    q: 'DoubleHub は無料で使えますか？',
    a: 'はい。無料プランでは、1日1枚の日記（写真・気分スタンプ・メモ）、ダブルのひと言（週 3 日）と返事、1週間前・1ヶ月前・1年前の同じ日の想起、日記の検索、アルバムの閲覧、日記の書き出し（ZIP）、週のふり返り（月 1 回）、AI による ToDo / メモの自動仕分け（月 20 回まで）、天気、ウィジェット、音声入力などをお使いいただけます。',
  },
  {
    q: '日記の写真はどこに保存されますか？',
    a: '日記の写真は端末の中に保存され、端末の外に残りません。ダブルがリアクションを生成するときだけ縮小画像を一時送信し、サーバーには保存されません。気分や充実度の記録、傾向の分析も端末の中で完結し、心理データを新規にサーバー保存することはありません。',
  },
  {
    q: '日記を書かなかった日はどうなりますか？',
    a: '空いたままです。「3日空いています」とは言いませんし、連続記録の数字もありません。空いた日は、ただ空いた日として、カレンダーにそのまま残ります。',
  },
  {
    q: 'アルバムとはなんですか？',
    a: 'ダブルがあなたの日記から幸せの種を見つけて、写真とその日の一言を月ごとのページに貼っていく場所です。星や順位はつけません。閲覧はすべてのプランででき、その日のダブルの一言と章の終わりの便りが付くのは Plus です。出したくない日・期間・人は非表示にでき、閉じた月のページはアプリを更新しても並びが変わりません。',
  },
  {
    q: '未来日記はどうなりましたか？',
    a: '2.10 で、新しい号の作成を終了しました。それまでに届いた号は、設定「ダブルの理解」の末尾からこれまでどおり読めます。ひと月に一度の物語より、自分の言葉と写真に何度も触れられる形のほうが残る、と判断し、その席をアルバムに譲りました。',
  },
  {
    q: 'ダブルとは何ですか？',
    a: 'あなたの日記を読んで、ひと言返し、続きを覚えている「もう一人の自分」です。頼まれたことをこなす存在ではなく、あなたの記録を踏まえて、指図ではなく気づきを置いていく相手を目指しています。話し方と口数は、設定で選べます。',
  },
  {
    q: 'Plus / Premium プランではなにが解放されますか？',
    a: 'Plus（月 ¥480 / 年 ¥4,800）では、ダブルのひと言が毎日になり、写真を1日3枚まで貼れます。似ている日の想起、ダブルのノート、写真で覚える、週のふり返り（毎週）、月のまとめ、あなたの法則、アルバムのダブルの一言と章の便り、ダブルとの AI チャット、AI 自動仕分けの無制限化が利用できます。はじめの 1 ヶ月は無料でお試しいただけます。Premium（月 ¥1,280 / 年 ¥12,800）では、Plus の全機能に加えて、1日5枚までの写真日記と、ひとつの悩みを3つの視点でいっしょに考える「評議会」が使えます。',
  },
  {
    q: 'BookCompass と連携すると何が変わりますか？',
    a: '同じあなたなのにアプリをまたぐと毎回ゼロから説明し直す——その負担がなくなります。BookCompass で読書中に言葉にした気づきや最近の関心テーマ、読んだ本の余韻が、ダブルとの会話に「文脈」として自然に流れ込みます。たとえば「最近自信がなくて…」と話したとき、過去に読書中にたどり着いていた答えを踏まえて受け止めてくれたり、「最近どう？」とダブルから話題を切り出してもらえたりします。連携は任意で、いつでもオフにできます。',
  },
  {
    q: '対応 OS を教えてください。',
    a: 'iOS 17.0 以上の iPhone / iPad でお使いいただけます。Android 版の提供予定はありません。',
  },
  {
    q: 'ヘルスケアのデータは安全に扱われますか？',
    a: 'DoubleHub のヘルスケア連携は読み取り専用で、書き込みは一切行いません。さらに、扱うのは生データではなく集計値のみ。連携はユーザーが明示的に有効化する必要があり、許可しなくてもアプリの主要機能は普通に使えます。',
  },
  {
    q: 'カレンダー連携は Google アカウントが必要ですか？',
    a: '不要です。DoubleHub は iOS 標準の EventKit 経由でカレンダーにアクセスするため、OAuth は必要ありません。iOS 設定で Google アカウントを追加していれば、Google カレンダーにも自動的に反映されます。',
  },
  {
    q: 'アカウントの削除はアプリ内からできますか？',
    a: 'はい。アプリ内からいつでも削除を実行できます。課金は App Store 経由のみで、広告や外部決済の導線はありません。',
  },
];

// 競合比較テーブル
const vsTable = [
  {
    category: '一般的な日記アプリ',
    doublehub:
      '写真1枚とスタンプだけの日でも成立。広告は出ません。書いた日はダブルからひと言が返り、蓄積は月ごとのアルバムになっていく',
  },
  {
    category: 'AI チャットアプリ',
    doublehub:
      '会話ではなく、日記が主役。ダブルは日記を読んでひと言返し、続きを覚えている。覚えたことは設定から直せる・消せる',
  },
  {
    category: 'SNS・写真共有アプリ',
    doublehub:
      '誰にも見せない前提。星も順位も、連続記録もない。滞在時間を伸ばす仕掛けを持たない',
  },
  {
    category: 'メモ・ToDo アプリ',
    doublehub:
      'ToDo・メモ・予定は道具箱として日記のとなりに置く。主役に戻さないが、削りもしない',
  },
];

// 構造化データ（JSON-LD）
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'DoubleHub',
      alternateName: 'ダブルハブ',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'iOS 17.0 以上',
      description:
        '写真1枚と気分スタンプの1日1枚日記に、ダブル（もう一人の自分）がひと言返す、広告なしの iOS 日記アプリ。写真は端末の外に残らず、日記から見つけた幸せの種は月ごとのアルバムに。ToDo・メモ・予定、ヘルスケア、iOS カレンダー、読書記録（BookCompass）とも連携。',
      url: 'https://www.doublehub.jp/products/doublehub/',
      image: 'https://www.doublehub.jp/images/doublehub-icon-rich.png',
      softwareVersion: '2.10.0',
      author: {
        '@type': 'Organization',
        name: 'GrowthLab',
        url: 'https://www.doublehub.jp/about/',
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Free',
          price: '0',
          priceCurrency: 'JPY',
        },
        {
          '@type': 'Offer',
          name: 'Plus (月額)',
          price: '480',
          priceCurrency: 'JPY',
        },
        {
          '@type': 'Offer',
          name: 'Plus (年額)',
          price: '4800',
          priceCurrency: 'JPY',
        },
        {
          '@type': 'Offer',
          name: 'Premium (月額)',
          price: '1280',
          priceCurrency: 'JPY',
        },
        {
          '@type': 'Offer',
          name: 'Premium (年額)',
          price: '12800',
          priceCurrency: 'JPY',
        },
      ],
      downloadUrl: appStoreUrl,
      featureList: [
        '1日1枚の写真日記（写真・気分スタンプ・ひと言メモ）',
        'ダブルのひと言（AI 生成表示つき）と、返事・後日のつづき',
        '1週間前・1ヶ月前・1年前の同じ日の想起',
        '今日と似ている日の対比（Plus・2枚並べ）',
        '日記の検索（端末内で完結）',
        'アルバム（日記から見つけた幸せの種を、月ごとのページに）',
        '日記カレンダー（気分の天気アイコン）',
        '週のふり返り・月のまとめ・あなたの法則',
        'ダブルのノート・写真で覚える（特徴データは端末内）',
        '写真 1 日 3 枚（Plus）／5 枚（Premium）',
        '日記の一括書き出し（ZIP）',
        'ToDo / メモの AI 自動仕分け・音声入力・ウィジェット',
        'ダブルとの AI チャット（Plus）',
        'ヘルスケア連携（HealthKit / 読み取り専用）',
        'iOS カレンダー双方向同期（EventKit）',
        'BookCompass 連携',
        '評議会（Premium）',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ホーム',
          item: 'https://www.doublehub.jp/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: 'https://www.doublehub.jp/#products',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'DoubleHub',
          item: 'https://www.doublehub.jp/products/doublehub/',
        },
      ],
    },
  ],
};

export default function DoubleHubPage() {
  return (
    <div className="theme-doublehub">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ========== 1. Hero ========== */}
      <Container width="wide" className="relative pt-16 pb-14 md:pt-24 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-[-5%] top-[-10%] h-[480px] w-[480px] rounded-full bg-accent-product/15 blur-[120px]" />
          <div className="absolute right-[-8%] bottom-[-12%] h-[420px] w-[420px] rounded-full bg-accent-product/10 blur-[120px]" />
        </div>
        <div className="mx-auto grid max-w-content-wide items-center gap-12 md:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2">
              <Image
                src="/images/doublehub-icon.jpg"
                alt="DoubleHub アプリアイコン"
                width={44}
                height={44}
                className="h-10 w-10 rounded-lg border border-border object-cover shadow-sm"
              />
              <span className="inline-flex items-center rounded-full border border-accent-product/30 bg-accent-product/10 px-3 py-1 text-xs font-semibold text-accent-product">
                DoubleHub · Ver.2.10.0
              </span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(1.75rem,1rem+2.8vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              日記は、
              <br />
              写真1枚でいい。
            </h1>
            <p className="mt-4 font-display text-lg font-semibold tracking-[-0.01em] text-text md:text-xl">
              広告なし。1日1枚の写真日記と、AIの相棒
            </p>
            <p className="mt-5 max-w-lg text-text-muted">
              気分はワンタップ。文章はなくてもかまいません。書いた日は、ダブル（もう一人の自分）が短いひと言を返します。日記の写真は、端末の外に残りません。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex transition-transform hover:scale-[1.02]"
                aria-label="App Store で DoubleHub をダウンロード"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={appStoreBadge}
                  alt="App Storeでダウンロード"
                  style={{ height: 44, objectFit: 'contain' }}
                />
              </a>
              <Button asChild size="lg" variant="secondary">
                <Link href="#plans">料金プランを見る</Link>
              </Button>
            </div>
            <p className="mt-5 text-xs text-text-faint">
              iOS 17.0 以上・無料ではじめられます
            </p>
          </div>

          <figure className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
              <Image
                src="/images/doublehub-diary-home.jpg"
                alt="DoubleHub の日記ホーム。写真つきのカレンダーと、日記の本棚（アルバム・週のふり返り・月のふり返り）"
                width={860}
                height={1782}
                className="h-auto w-full rounded-[1.5rem]"
                sizes="(min-width: 768px) 384px, 90vw"
                priority
              />
            </div>
          </figure>
        </div>
      </Container>

      {/* ========== 2. 日記 ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Diary
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              写真1枚と気分スタンプの、
              <br className="sm:hidden" />
              1日1枚日記。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              今日撮った写真を1枚選んで、気分をワンタップ。それだけで、今日が残ります。書かなかった日は、空いたままでかまいません。連続記録の数字も、責める言葉もありません。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {diaryPillars.map((d) => (
              <article
                key={d.title}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <span className="inline-flex w-fit items-center rounded-full border border-accent-product/30 bg-accent-product/10 px-3 py-1 text-xs font-semibold text-accent-product">
                  {d.tag}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold leading-[1.4] tracking-[-0.01em] md:text-lg">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                  {d.body}
                </p>
              </article>
            ))}
          </div>

          {/* 実際の画面 */}
          <div className="mx-auto mt-14 grid max-w-4xl justify-items-center gap-10">
            <figure className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
                <Image
                  src="/images/doublehub-diary-hitokoto.jpg"
                  alt="DoubleHub の日記。写真1枚と、ダブルが推定した日のタグ、ダブルからのひと言（AI による生成の表示つき）"
                  width={860}
                  height={1777}
                  className="h-auto w-full rounded-[1.5rem]"
                  sizes="(min-width: 640px) 384px, 90vw"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs leading-[1.7] text-text-muted">
                写真1枚の日記に、ダブルからひと言。「人と会った」「外出」などの日のタグはダブルの推定で、違っていればタップで直せます。
              </figcaption>
            </figure>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-text-faint">
            ※ 画面は実際の利用イメージです。
          </p>
        </Container>
      </Section>

      {/* ========== 3. つづきのある一言 ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Reply &amp; Continue
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              書いた日は、
              <br className="sm:hidden" />
              ひとりじゃない。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              書いた日記に、ダブルが短いひと言を返します。そのひと言には返事ができて、返事をした話題には後日またふれます。「この前の話」として、日記が会話のようにつづいていきます。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {replyPoints.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <h3 className="font-display text-base font-semibold leading-[1.4] tracking-[-0.01em] md:text-lg">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 4. 想起と検索 ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Recall &amp; Search
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              過去の日記に、
              <br className="sm:hidden" />
              もう一度出会える。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              思い出は、勝手には戻ってきません。だから DoubleHub では、手がかりのほうを、ダブルが向こうから持ってきます。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {recallPoints.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <h3 className="font-display text-base font-semibold leading-[1.4] tracking-[-0.01em] md:text-lg">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                  {p.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-[1.8] text-text-faint">
            ※ つらい日を、勝手に再提示しません。過去の日記を持ってくるときは、あなたが付けた気分のスタンプを見て、つらかった日は避けます。
          </p>
        </Container>
      </Section>

      {/* ========== 5. アルバム（2.10.0） ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Album · New in 2.10.0
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              あなたの日記から、幸せの種を。
            </h2>
            <p className="mt-5 text-sm leading-[1.9] text-text-muted md:text-base">
              ダブルが、あなたの日記帳から思い出の写真と言葉を選んで、月ごとのページに貼り直します。「この日はこうだったね」と、一緒に見返す場所です。表紙には、ダブルの一行があります。「あなたの日記から幸せの種を見つけて、アルバムにまとめたよ」。なぜその1枚なのかも、手がかりごと貼ってあります。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl items-center gap-10 md:grid-cols-[0.85fr_1.15fr]">
            <figure className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
                <Image
                  src="/images/doublehub-album.jpg"
                  alt="DoubleHub のアルバム。6月の章に「外に出た日」のページ。主役の写真と、その日の写真3枚、日付と気分、その日にダブルが返した一言"
                  width={860}
                  height={1777}
                  className="h-auto w-full rounded-[1.5rem]"
                  sizes="(min-width: 768px) 384px, 90vw"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs leading-[1.7] text-text-muted">
                月ごとの章に、ページが並びます。写真の上に文字は重ねず、AI の文には「AIによる生成」の表示がつきます。
              </figcaption>
            </figure>

            <div className="flex flex-col gap-5">
              {albumPoints.map((p) => (
                <article
                  key={p.title}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
                >
                  <h3 className="font-display text-base font-semibold leading-[1.4] tracking-[-0.01em] md:text-lg">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-[1.8] text-text-faint">
            ※ 閲覧はすべてのプランでできます。その日のダブルの一言と、章の終わりの便りが付くのは Plus です。
          </p>
        </Container>
      </Section>

      {/* ========== 6. 週・月のまとめと法則 ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Weekly · Monthly · Laws
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              週にいちど、月にいちど、
              <br className="sm:hidden" />
              法則がひとつ。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              記録がたまってきた人のための機能です。ダブルは、あなたの記録から見えたことを、根拠つきで、命じずに置いていきます。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {summaryPoints.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <h3 className="font-display text-base font-semibold leading-[1.4] tracking-[-0.01em] md:text-lg">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                  {p.body}
                </p>
              </article>
            ))}
          </div>

          {/* 実際の画面 */}
          <div className="mx-auto mt-14 grid max-w-4xl gap-10 sm:grid-cols-2">
            <figure className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
                <Image
                  src="/images/doublehub-monthly-review.jpg"
                  alt="DoubleHub の月のふり返り。その月の写真から始まり、「アルバムで見る」のリンクと、ダブルからの語り"
                  width={860}
                  height={1783}
                  className="h-auto w-full rounded-[1.5rem]"
                  sizes="(min-width: 640px) 384px, 90vw"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs leading-[1.7] text-text-muted">
                月のふり返りは写真から始まり、ダブルの語りが続きます。末尾からアルバムの章へ。
              </figcaption>
            </figure>
            <figure className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
                <Image
                  src="/images/doublehub-double-tab-laws.jpg"
                  alt="DoubleHub のダブル画面。期限ボード、きょうのあなた、あなたの法則「人と会った翌日は、気分が高めみたい」と根拠の日数"
                  width={860}
                  height={1778}
                  className="h-auto w-full rounded-[1.5rem]"
                  sizes="(min-width: 640px) 384px, 90vw"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs leading-[1.7] text-text-muted">
                ダブル画面の「あなたの法則」。一文の下に、根拠になった日数が並びます。
              </figcaption>
            </figure>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-[1.8] text-text-faint">
            ※ 気づきも法則も、「見せる」だけです。「だから、もっと外に出ましょう」とは書きません。どう受け取るかは、あなたに残したままにします。
          </p>
        </Container>
      </Section>

      {/* ========== 7. ダブルとは ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Concept
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              頼まれたことをやる人ではなく、
              <br className="sm:hidden" />
              もう一人の自分。
            </h2>
            <p className="mt-5 text-sm leading-[1.9] text-text-muted md:text-base">
              DoubleHub の「ダブル」は、あなたの日記を読んで、ひと言返し、続きを覚えている、もう一人の自分です。踏み込みすぎない距離で、指図ではなく気づきを置いていきます。
            </p>
            <p className="mt-5 text-sm leading-[1.9] text-text-muted md:text-base">
              ダブルが見ているのは、あなただけ。広告主や別の誰かの都合は入りません。アプリ側にも、あなたの注意を引き留めたり、長く滞在させたりする都合はありません。だからこそ、必要なときに必要なことだけを、静かに置いていけます。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
            <ConceptCard
              title="話し方と口数を選べる"
              body="ダブルの話し方と口数は、設定で選べます。「がんばれ」より「無理しないで」を先に言う。押し付けない、急かさない、が共通です。"
            />
            <ConceptCard
              title="押し付けない"
              body="アドバイスではなく、気づきを置いていく存在。「〜すべき」とは言いません。どう受け取るかは、あなたに残したままにします。"
            />
            <ConceptCard
              title="育っていく"
              body="日記に何度も出てくる人・場所・話題を、ダブルが短いノートにまとめます（Plus）。覚えたことは設定の「カルテ」からいつでも見られ、直したり消したりできます。「この話はもう出さない」と伝えれば、ダブルからは触れなくなります。"
            />
          </div>

          {/* ダブルの口調サンプル */}
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
              How Double Talks
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-surface-2 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                  よくあるリマインド
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  今日の記録を書きましょう。
                </p>
              </div>
              <div className="rounded-xl bg-accent-product/5 p-4 ring-1 ring-accent-product/20">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  ダブルのことば
                </p>
                <p className="mt-2 text-sm leading-[1.8] text-text">
                  空の青と、もくもくと広がっている白い雲が、すごく気持ちよさそうに見えるね。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========== 8. 道具箱と連携 ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Toolbox &amp; Integrations
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              日記のとなりに、
              <br className="sm:hidden" />
              道具箱。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              ToDo・メモ・予定は、道具箱タブにまとまります。日記が主役、道具箱は脇。削らずに、そばに置いてあります。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl items-center gap-10 md:grid-cols-[0.85fr_1.15fr]">
            <figure className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
                <Image
                  src="/images/doublehub-toolbox.jpg"
                  alt="DoubleHub の道具箱タブ。入力欄と AI の自動仕分け、ToDo の一覧"
                  width={860}
                  height={1783}
                  className="h-auto w-full rounded-[1.5rem]"
                  sizes="(min-width: 768px) 384px, 90vw"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs leading-[1.7] text-text-muted">
                道具箱タブ。入力を ToDo かメモかにダブルが仕分けます。
              </figcaption>
            </figure>

            <div className="flex flex-col gap-5">
              {toolboxPoints.map((p) => (
                <article
                  key={p.title}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
                >
                  <h3 className="font-display text-base font-semibold leading-[1.4] tracking-[-0.01em] md:text-lg">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-[1.8] text-text-faint">
            ※ ダブルとのチャット（Plus）では、直近7日の日記や ToDo・予定を踏まえて相談できます。
          </p>
        </Container>
      </Section>

      {/* ========== 9. Why DoubleHub ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Why DoubleHub
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              似たアプリじゃ、たどり着けない位置にある。
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-divider bg-surface-2">
                  <th className="px-4 py-3 text-left font-semibold text-text-muted md:px-6">
                    比較対象
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-accent-product md:px-6">
                    DoubleHub の位置
                  </th>
                </tr>
              </thead>
              <tbody className="[&>tr]:border-b [&>tr]:border-divider [&>tr:last-child]:border-0">
                {vsTable.map((row) => (
                  <tr key={row.category}>
                    <td className="px-4 py-4 font-medium text-text md:px-6">
                      {row.category}
                    </td>
                    <td className="px-4 py-4 text-text-muted md:px-6">
                      {row.doublehub}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ========== 10. Trust & Privacy ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
              Trust &amp; Privacy
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold leading-[1.3] tracking-[-0.01em] md:text-2xl">
              「知ってもらう」ことの、安心を。
            </h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Check /> 個人情報や健康データを広告目的で利用することは一切ありません
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Check /> 日記の写真は端末の中に保存。AI 解析時のみ縮小画像を一時送信し、サーバーには残りません
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Check /> 気分・充実度の記録と傾向の分析は端末の中で完結。心理データを新規にサーバー保存しません
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Check /> ヘルスケアデータは読み取り専用・生データの保存なし
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Check /> カレンダーは iOS 標準機能経由・OAuth 不要
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Check /> AI 応答には「AI 生成」であることが明示されます
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Check /> アカウント削除はアプリ内からいつでも実行できます
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Check /> 課金は App Store 経由のみ。広告・外部決済はありません
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Check /> 「写真で覚える」の参考写真と、顔・被写体の特徴データは端末の中だけに保存され、送信されません（Plus）
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* ========== 11. 依存させない設計 ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              No Addiction by Design
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              「長く使わせる」ではなく、
              <br className="sm:hidden" />
              「あなたに戻す」ための設計。
            </h2>
            <p className="mt-5 text-sm leading-[1.9] text-text-muted md:text-base">
              DoubleHub は、滞在時間や利用頻度を伸ばすことを目的にしていません。アプリを開いた時間より、アプリを閉じた後の毎日が良くなることを優先しています。そのために、UI と通知の作りそのものを次の方針で揃えています。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold tracking-[-0.01em] md:text-lg">
                通知は、必要なタイミングだけ。
              </h3>
              <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                「最近どうですか」のような呼び戻しの通知は送りません。期限・予定・体調の変化など、あなたが知っておきたい瞬間に絞って届けます。
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold tracking-[-0.01em] md:text-lg">
                プル型のお知らせ。
              </h3>
              <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                ダブルからの声は、受信箱にまとまります。あなたが開いたときに並ぶプル型で、プッシュで横から割り込んで、注意を引きにいくような作りにはしていません。
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold tracking-[-0.01em] md:text-lg">
                無限スクロールも、おすすめフィードもありません。
              </h3>
              <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                並ぶのは、あなた自身の記録から出てきたものだけ。続きが気になるレコメンドや、別の人が見ているコンテンツを差し込む仕組みは持ちません。
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold tracking-[-0.01em] md:text-lg">
                滞在時間を伸ばす UI を置かない。
              </h3>
              <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                バッジで未読をあおったり、ストリークで連続日数を競わせたり——アプリに戻ってこさせるための仕掛けは入れません。用が済んだら閉じていい、それが正しい使い方です。
              </p>
            </article>
          </div>
        </Container>
      </Section>

      {/* ========== 12. Plans ========== */}
      <Section spacing="md" id="plans">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Plans
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              まずは無料で。気に入ったら、もう一人の自分を育てよう。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              無料で、日記・想起・検索・アルバムの閲覧・書き出し。Plus で、ダブルの声が毎日になり、まとめと法則が届きます。月 ¥480 は、コーヒー 1 杯ぶんの価格です。
            </p>
            <p className="mt-3 text-xs leading-relaxed text-text-faint md:text-sm">
              広告や滞在時間ではなく、あなたから直接いただく形で運営しています。アプリの利益とあなたの利益の向きを揃えるための選択です。
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
            {/* Free */}
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                Free
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">無料プラン</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-[-0.03em]">
                  ¥0
                </span>
              </div>
              <p className="mt-3 text-xs text-text-muted">
                日記と、ダブルのひと言を体験
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> 1日1枚の日記（写真1枚・気分スタンプ・メモ）・カレンダー
                </li>
                <li className="flex items-start gap-2">
                  <Check /> ダブルのひと言 週 3 日・返事とつづき
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 1週間前・1ヶ月前・1年前の想起・日記の検索
                </li>
                <li className="flex items-start gap-2">
                  <Check /> アルバムの閲覧・日記の書き出し（ZIP）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 週のふり返り 月 1 回
                </li>
                <li className="flex items-start gap-2">
                  <Check /> ToDo / メモの AI 自動仕分け（月 20 回まで）・音声入力・ウィジェット
                </li>
              </ul>
            </div>

            {/* Plus */}
            <div className="relative rounded-2xl border-2 border-accent-product bg-surface p-8 shadow-lg">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-accent-product px-4 py-1 text-xs font-bold text-white">
                おすすめ
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                Subscription
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">Plus</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-[-0.03em]">
                  ¥480
                </span>
                <span className="text-sm text-text-muted">／ 月（税込）</span>
              </div>
              <div className="mt-2 inline-flex items-center rounded-full bg-accent-product/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent-product">
                年額 ¥4,800 なら実質 ¥400 / 月（17%OFF）
              </div>
              <p className="mt-2 text-xs font-semibold text-accent-product">
                はじめの 1 ヶ月は無料でお試しいただけます
              </p>
              <p className="mt-3 text-xs text-text-muted">
                ダブルの声が、毎日になる
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> ダブルのひと言 <strong className="font-semibold text-text">毎日</strong>・写真 1 日 <strong className="font-semibold text-text">3 枚</strong>
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 似ている日の想起（2 枚並べて見くらべ）・ダブルのノート・写真で覚える
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 週のふり返り 毎週・月のまとめ・あなたの法則
                </li>
                <li className="flex items-start gap-2">
                  <Check /> アルバムのダブルの一言と、章の便り
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 日記のゲスト（偉人風の視点）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> ダブルとの AI チャット・AI 自動仕分け <strong className="font-semibold text-text">無制限</strong>
                </li>
              </ul>
            </div>

            {/* Premium */}
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                Subscription
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">Premium</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-[-0.03em]">
                  ¥1,280
                </span>
                <span className="text-sm text-text-muted">／ 月（税込）</span>
              </div>
              <div className="mt-2 inline-flex items-center rounded-full bg-accent-product/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent-product">
                年額 ¥12,800 プランもあります
              </div>
              <p className="mt-3 text-xs text-text-muted">
                Plus の全機能に、写真 5 枚と評議会
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> Plus の全機能
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 写真日記 1 日 5 枚
                </li>
                <li className="flex items-start gap-2">
                  <Check /> <strong className="font-semibold text-text">評議会</strong>——ひとつの悩みを、3つの視点を持つ AI がいっしょに考える
                </li>
                <li className="flex items-start gap-2">
                  <Check /> BookCompass 連携中は、読んだ本の視点も議論に加わる
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 text-center text-xs text-text-faint">
            <p>
              課金は App Store 経由のみ。解約は iOS の「設定 ＞ Apple ID ＞ サブスクリプション」からいつでも可能です。
            </p>
          </div>
        </Container>
      </Section>

      {/* ========== 13. FAQ ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              FAQ
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              よくある質問。
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-divider overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-text transition hover:bg-surface-2/60 md:px-6 md:text-base">
                  <span>{f.q}</span>
                  <span
                    aria-hidden
                    className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-accent-product/10 text-accent-product transition group-open:rotate-45"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 2v8M2 6h8" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm leading-[1.9] text-text-muted md:px-6 md:text-[0.95rem]">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 14. Final CTA ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              日記は、
              <br />
              写真1枚でいい。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              今日の写真を1枚。気分をワンタップ。まずは無料で、試してみてください。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex transition-transform hover:scale-[1.02]"
                aria-label="App Store で DoubleHub をダウンロード"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={appStoreBadge}
                  alt="App Storeでダウンロード"
                  style={{ height: 44, objectFit: 'contain' }}
                />
              </a>
              <Button asChild size="lg" variant="secondary">
                <Link href="/blog/happiness-noticed-count/">開発者の考えを読む</Link>
              </Button>
            </div>
            <p className="mt-5 text-xs text-text-faint">
              iOS 17.0 以上・個人開発（GrowthLab / Naoki）
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function ConceptCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h3 className="font-display text-base font-semibold tracking-[-0.01em] md:text-lg">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-[1.8] text-text-muted">{body}</p>
    </article>
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
