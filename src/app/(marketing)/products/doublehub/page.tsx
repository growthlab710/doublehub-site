import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site/config';

export const metadata: Metadata = {
  title:
    'DoubleHub — もう一人の自分が、毎日の頭の中を整える。AI ToDo・メモ・対話アプリ',
  description:
    'DoubleHub は ToDo・メモ・対話を一つにまとめ、ヘルスケアやカレンダー、読書記録（BookCompass）の情報も束ねて「もう一人の自分（ダブル）」を育てる iOS アプリ。音声で投げるだけで AI が整理し、睡眠・予定・タスク・読書から得た気づきを結びつけた応答を届けます。無料で始められる AI 生活アシスタント。',
  keywords: [
    'DoubleHub',
    'ダブルハブ',
    'AI ToDo',
    'AI タスク管理',
    'AI メモ',
    'AI チャット',
    '音声入力 ToDo',
    'ヘルスケア連携',
    'カレンダー連携',
    'BookCompass 連携',
    '読書連携',
    'もう一人の自分',
    'AI 生活アシスタント',
    'ジャーナリングアプリ',
    '振り返り習慣',
    'iOS アプリ',
  ],
  alternates: { canonical: '/products/doublehub/' },
  openGraph: {
    title: 'DoubleHub — もう一人の自分が、毎日の頭の中を整える。',
    description:
      'ToDo・メモ・対話を一つに。ヘルスケアとカレンダーを束ね、あなたを誰よりも理解する「ダブル」を育てる iOS アプリ。',
    url: 'https://doublehub.jp/products/doublehub/',
    type: 'website',
    siteName: 'DoubleHub',
    locale: 'ja_JP',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DoubleHub — もう一人の自分が、毎日の頭の中を整える。',
    description:
      'ToDo・メモ・対話・ヘルスケア・カレンダーを束ねる AI 生活アシスタント。',
    images: ['/images/og-default.jpg'],
  },
};

const appStoreUrl = siteConfig.social.appStoreDoubleHub;
const appStoreBadge =
  'https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/ja-jp?releaseDate=1774224000';

// 主要メリット（機能ではなく「得られる状態」で語る）
const features = [
  {
    label: 'Capture',
    title: '思いついたことを「投げるだけ」で、ダブルが整えてくれる。',
    body:
      'テキストでも音声でも、まずは話すだけ。ダブルが ToDo か メモかを自動で仕分けて、「明日まで」「来週水曜の朝 10 時」といった自然文の期限も読み取ります。入力のたびに分類で迷わなくていい。音声は iOS 標準のフレームワークを使うのでオフラインでも動きます。',
    image: '/images/doublehub-task.jpg',
    imageAlt: 'DoubleHub のタスク画面',
  },
  {
    label: 'Chat with Double',
    title: 'ダブルとの対話で、今日のあなたが見えてくる。',
    body:
      '入力した ToDo・メモ・予定・健康状態を踏まえて、ダブルと会話できます。「今日の優先順位を決めたい」「今週どうだった？」みたいな曖昧な相談でも大丈夫。チャットから「全部終わった」「明日に回して」と自然文で一括操作もできます。',
    image: '/images/doublehub-chat.jpg',
    imageAlt: 'DoubleHub のチャット画面',
  },
  {
    label: 'Memory',
    title: '使い続けるほど、ダブルがあなたを覚えていく。',
    body:
      '毎週火曜の送迎、水曜のジム——行動パターンを自動で学習。「覚えておいて」と言えば、明示的なメモリとして保存されます。設定画面からはダブルの理解度（カルテ）を確認・編集でき、提案には必ず「理由」がついて、ブラックボックス化しません。',
    image: '/images/doublehub-understanding.jpg',
    imageAlt: 'DoubleHub のダブルの理解度ダッシュボード画面',
  },
];

// Ver.1.1.0 新機能（3カード）
const v110Highlights = [
  {
    tag: 'HealthKit',
    title: 'ヘルスケアと結びつく「気づき」',
    body:
      '歩数・睡眠・アクティビティの傾向をダブルが受け取り、「最近あまり眠れていないみたいですね。明日の 5 件は少し多いかもしれません」のように、身体と予定を結びつけた気づきを届けます。ポジティブな健康トレンドも見逃さず、褒めてくれます。読み取り専用。書き込みは一切しません。',
    image: '/images/doublehub-integrations.jpg',
    imageAlt: 'DoubleHub のヘルスケア連携・カレンダー連携設定画面',
    accent: 'from-[#fca5a5] via-[#f87171] to-[#ef4444]',
  },
  {
    tag: 'EventKit',
    title: 'カレンダーと双方向に同期',
    body:
      '期限付き ToDo はそのまま iOS カレンダーに載って管理できます。iOS 設定で Google アカウントを追加していれば Google カレンダーにも自動反映（OAuth 不要）。予定とタスクを 1 つの時間軸で扱えます。',
    image: '/images/doublehub-calendar.jpg',
    imageAlt: 'DoubleHub のカレンダー画面（月間ビュー）',
    accent: 'from-[#93c5fd] via-[#60a5fa] to-[#3b82f6]',
  },
  {
    tag: 'BookCompass Link',
    title: '読書で深めた自己理解が、会話に溶け込む',
    body:
      'BookCompass で読書中に言葉にした気づき・最近の関心テーマ・読んだ本の余韻が、ダブルとの会話に「文脈」として自然に流れ込みます。「最近どう？」と切り出されたとき、自分が切り口を提供しなくても、ダブルの方からあなたの関心を踏まえて話題を出してくれます。',
    image: '/images/doublehub-weekly.jpg',
    imageAlt: 'DoubleHub と BookCompass の連携イメージ',
    accent: 'from-[#c4b5fd] via-[#a78bfa] to-[#8b5cf6]',
  },
];

// ダブルの声がけ 3 カテゴリ詳細
const homeCategories = [
  {
    key: 'today',
    label: '今日',
    tagline: '今日対応が必要な行動のきっかけ',
    examples: [
      '期限切れの ToDo を静かに知らせる',
      '今日期限が多いとき、少し前倒し提案',
      '夕方に「今日終わらなかった？」のナッジ',
      '明日の期限を朝のうちに前倒しで処理する提案',
    ],
    color: 'bg-[#fff4ec] text-[#b45309] border-[#fdba74]',
  },
  {
    key: 'notice',
    label: '気づき',
    tagline: '読むこと自体に価値がある内容',
    examples: [
      '朝・夜サマリ、週次ふり返り',
      'ヘルスケアの傾向変化',
      '過去メモの再浮上',
      '滞留している ToDo の棚卸し',
      'ポジティブな健康トレンド、二十四節気',
    ],
    color: 'bg-[#eefaf0] text-[#166534] border-[#86efac]',
  },
  {
    key: 'talk',
    label: '話したいこと',
    tagline: 'チャットに誘う発話',
    examples: [
      '睡眠パターンの相談',
      '活動量低下の相談',
      '週末プランニング',
    ],
    color: 'bg-[#eff4ff] text-[#1d4ed8] border-[#93c5fd]',
  },
];

// Ver.1.1.0 改善点サマリ
const v110Improvements = [
  '期限に時刻を設定できる',
  'チャットからの一括操作・相対期限変更（「全部終わった」「3 日延ばして」など）',
  '期限切れ ToDo の視認性改善（色と日付）',
  'チャット失敗時の再送 UX と遅延時のエラー表示',
  'データ保持ポリシーをアプリ内から確認可能',
  '朝/夜サマリの読みやすさ向上（冗長な「ダブルのひとこと」を廃止）',
  '天気の精度改善（時間帯ベースの降水確率）',
  '週次レポートで、今週の自分のペースをやさしく整理',
];

// 1日のシナリオ
const scenes = [
  {
    time: '朝',
    title: '今日の段取りを掴む',
    body:
      'アプリを開くと、ダブルが「昨夜は寝るのが遅かったみたいですね。今日 5 件入っていますが、急ぎじゃないものは週末に回してみますか？」と先に声をかけてくれます。',
  },
  {
    time: '通勤中',
    title: '思いついたことを声で投げる',
    body:
      '「今夜燃えるゴミ出すの忘れない、あと来週の歯医者の予約取らないと」とつぶやくと、ToDo が 2 件、自動で整理されます。',
  },
  {
    time: '仕事中',
    title: '優先順位に迷ったら',
    body:
      'チャットで「今日何から手をつければいいかな？」と聞くと、予定・締切・過去の傾向を踏まえて「14 時に会議が入っているので、その前に資料 1 件だけはいかがでしょうか」と返してくれます。',
  },
  {
    time: '夜',
    title: 'やさしい振り返り',
    body:
      'ダブルから「今日はどんな 1 日でしたか？」とやさしく声がかかります。一言返すだけで、ダブルが今日の出来事を整理してくれます。',
  },
  {
    time: '週末',
    title: '来週を考える',
    body:
      '「今週もう後半ですね。残っているタスク、見てみませんか？」とダブルが場を作ってくれます。週次レポートで今週のペースが見えて、来週の計画が立てやすくなります。',
  },
  {
    time: '体調が揺らぐとき',
    title: '先回りの気づき',
    body:
      '睡眠が 3 日連続で短いことをダブルが察知して、「最近あまり眠れていないみたいですね。今週の予定、少し詰まっていませんか？」と気づきが届きます。',
  },
];

// Before / After
const beforeAfter = [
  {
    before: 'ToDo とメモを別アプリで管理し、入力時に分類で迷う',
    after: 'テキストや音声で投げるだけで AI が ToDo / メモを自動仕分け',
  },
  {
    before: 'ヘルスケアアプリは「歩数が少ないです」で終わる',
    after:
      'ダブルが「歩数が少ない → タスク詰めすぎが原因 → スケジュール調整しよう」と因果まで繋げて提案',
  },
  {
    before: 'カレンダーと ToDo が分断され、予定と作業の整合が見えない',
    after:
      '期限付き ToDo は iOS カレンダーと双方向同期。予定と作業を 1 画面で扱える',
  },
  {
    before: 'AI チャットは便利だが、毎回背景を説明し直す必要がある',
    after:
      'ダブルはあなたの過去の入力・予定・健康状態を踏まえて応答',
  },
  {
    before: 'タスク管理アプリに「全部明日に回して」と頼めない',
    after:
      'チャットから「全部終わった」「明日に回して」「3 日延ばして」と自然文で一括操作',
  },
];

// FAQ（AIO/SEO 対策）
const faqs = [
  {
    q: 'DoubleHub は無料で使えますか？',
    a: 'はい。無料プランでは AI による ToDo / メモの自動仕分けが月 20 回まで、ホームの「今日」カテゴリのお知らせ、天気、ウィジェット、音声入力、ユーザー辞書などの基本機能をすべてお使いいただけます。「入力するだけで整理してくれる」価値を体験いただけます。',
  },
  {
    q: 'BookCompass と連携すると何が変わりますか？',
    a: '同じあなたなのにアプリをまたぐと毎回ゼロから説明し直す——その負担がなくなります。BookCompass で読書中に言葉にした気づきや最近の関心テーマ、読んだ本の余韻が、ダブルとの会話に「文脈」として自然に流れ込みます。たとえば「最近自信がなくて…」と話したとき、過去に読書中にたどり着いていた答えを踏まえて受け止めてくれたり、「最近どう？」とダブルから話題を切り出してもらえたりします。連携は任意で、いつでもオフにできます。',
  },
  {
    q: 'Plus プランではなにが解放されますか？',
    a: 'Plus（月 ¥480 / 年 ¥4,800）では、AI 自動仕分けが無制限になり、ダブルとの AI チャット、ホームの「気づき」「話したいこと」カテゴリ、朝/夜サマリ、週次ふり返り、ヘルスケア連携、カレンダー連携が利用できます。「自分のことを継続的に見てくれる理解者」としてのダブルが本格的に動き始めます。',
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
    q: 'ダブルはほかの AI 秘書アプリと何が違いますか？',
    a: 'DoubleHub のダブルは「秘書」ではなく「もう一人の自分」です。頼まれたことをこなす存在ではなく、あなたの過去の入力・予定・健康状態を踏まえて、言わなくてもわかってくれる対話相手を目指しています。いつもやわらかな敬語で話しかけてくれ、押し付けない。「がんばりましょう」より「無理しないでくださいね」を先に言える存在です。',
  },
  {
    q: '音声入力はオフラインでも使えますか？',
    a: 'はい。iOS 標準の SFSpeechRecognizer を使用しているため、オフラインでも動作します。ユーザー辞書で固有名詞・呼称の表記揺れも補正できます。',
  },
  {
    q: 'アカウントの削除はアプリ内からできますか？',
    a: 'はい。アプリ内からいつでも削除を実行できます。課金は App Store 経由のみで、広告や外部決済の導線はありません。',
  },
];

// 競合比較テーブル
const vsTable = [
  {
    category: '一般的な ToDo アプリ',
    doublehub: 'AI が分類・期限解釈・対話操作までやる。会話できる',
  },
  {
    category: '一般的な AI チャットアプリ',
    doublehub: '過去の入力・予定・健康状態・読書から得た気づきを踏まえた、自分のための AI',
  },
  {
    category: 'ヘルスケア単体アプリ',
    doublehub: '健康データを「予定」「タスク」と結びつけて行動提案',
  },
  {
    category: 'カレンダー単体アプリ',
    doublehub: '予定とタスクを統合し、「いつ何をやるべきか」まで考える',
  },
  {
    category: '既存のメモ・ジャーナルアプリ',
    doublehub: '入力するだけで構造化され、後から会話で参照できる',
  },
  {
    category: '他の AI 秘書アプリ',
    doublehub: '「秘書」ではなく「もう一人の自分」。対等で押し付けないトーン',
  },
];

// BookCompass 連携で起きる変化
const bookCompassBenefits = [
  {
    tag: '内面の地図',
    title: 'ダブルが、あなたの「内面の地図」を参照する',
    body:
      'BookCompass で読書中に AI と対話して言葉にした気づき——大切にしている価値観や、自分なりにたどり着いた答え——をダブルが踏まえて応答します。「最近ずっと自信がなくて…」と打ち明けたとき、初対面の AI のような汎用的な慰めではなく、あなたが過去に自分で見つけていた言葉に沿って受け止めてくれる対話になります。',
  },
  {
    tag: '会話の入口',
    title: '「最近の関心」が会話の入口になる',
    body:
      'BookCompass で直近どんなテーマを探していたか（キャリアチェンジ、子育てとの両立、お金との向き合い方など）をダブルが受け取ります。あなたが切り口を提供しなくても、ダブルの方から「最近どう？」と関心テーマに沿って自然に話を始めてくれます。',
  },
  {
    tag: '想起できる過去',
    title: '読んだ本が「想起できる過去」になる',
    body:
      'ダブルとの会話で「最近こういうことに悩んでいて…」と話すと、「前にあなたが読んでいた本に、似たテーマで残っていた問いがありましたね」のように、既読本の余韻を想起してくれます。本を売り込むのではなく、あなた自身が辿った思考の道のりを思い出させてくれる存在です。',
  },
];

// BookCompass 連携の Coming Soon
const bookCompassRoadmap = [
  {
    title: '読書からの行動化',
    body: '本で出会った気づきを、ダブル側で ToDo や問いに整え直し、日常のアクションへ繋げる仕組みを準備中です。',
  },
  {
    title: '応答の確実性向上',
    body: '読書から得た文脈が、いつ・どんな会話で活きるか——その精度を継続的に磨いています。今は「文脈が運ばれる経路は通った」段階です。',
  },
  {
    title: '評議会・Deep Research',
    body: '複数の視点から深く考えるモードや、特定テーマを腰を据えて掘るモードを将来的に構想中です。',
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
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'iOS 17.0 以上',
      description:
        'ToDo・メモ・対話を一つにまとめ、ヘルスケアやカレンダーも束ねる AI 生活アシスタント。「もう一人の自分（ダブル）」を育てる iOS アプリ。',
      url: 'https://doublehub.jp/products/doublehub/',
      image: 'https://doublehub.jp/images/doublehub-icon-rich.png',
      softwareVersion: '1.1.0',
      author: {
        '@type': 'Organization',
        name: 'GrowthLab',
        url: 'https://doublehub.jp/about/',
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
      ],
      downloadUrl: appStoreUrl,
      featureList: [
        'AI による ToDo / メモ自動仕分け',
        'ダブルとの AI チャット',
        'ヘルスケア連携（HealthKit / 読み取り専用）',
        'カレンダー双方向同期（EventKit）',
        'BookCompass 連携（読書から得た気づきを会話に反映）',
        'ホームの「ダブルからのお知らせ」3 カテゴリ',
        'iOS 音声入力対応',
        '朝/夜サマリ・週次ふり返り',
        'ホーム画面ウィジェット',
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
          item: 'https://doublehub.jp/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: 'https://doublehub.jp/#products',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'DoubleHub',
          item: 'https://doublehub.jp/products/doublehub/',
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
                DoubleHub · Ver.1.1.0
              </span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(1.75rem,1rem+2.8vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              もう一人の自分が、
              <br />
              毎日の頭の中を整える。
            </h1>
            <p className="mt-5 max-w-lg text-text-muted">
              DoubleHub は ToDo・メモ・対話を一つにまとめ、ヘルスケアやカレンダー、読書記録（BookCompass）の情報も束ねて、あなたを誰よりも理解する「もう一人の自分（ダブル）」を育てる iOS アプリです。
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

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/images/DoubleHub-Concept.png"
                alt="DoubleHub のコンセプトイメージ"
                fill
                className="object-contain"
                sizes="(min-width: 768px) 420px, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ========== 2. コンセプト：ダブルとは ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Concept
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              「秘書」ではなく、
              <br className="sm:hidden" />
              「もう一人の自分」。
            </h2>
            <p className="mt-5 text-sm leading-[1.9] text-text-muted md:text-base">
              DoubleHub が育てる「ダブル」は、頼まれたことをやる人ではなく、言わなくてもわかってくれる存在。踏み込みすぎないやわらかな敬語で、指図ではなく気づきを置いていく伴走者。使い続けるほどあなたへの理解が深まり、良いことも気になることも誠実に伝えてくれる——そんな、もう一人の自分を育てるためのアプリです。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
            <ConceptCard
              title="やわらかな敬語"
              body="ダブルはいつも敬語で話しかけてくれます。「ちょっと気になったんですけど」のように、丁寧でもちょうどいい距離感の寄り添い方です。"
            />
            <ConceptCard
              title="押し付けない"
              body="アドバイスではなく、気づきを置いていく存在。「がんばりましょう」より「無理しないでくださいね」を先に言えるダブルです。"
            />
            <ConceptCard
              title="育っていく"
              body="使い続けるほど理解が深まり、行動パターンを学習。「覚えておいて」と伝えるとメモリとして残ります。"
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
                  普通のタスク通知
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  タスク期限が近づいています。
                </p>
              </div>
              <div className="rounded-xl bg-accent-product/5 p-4 ring-1 ring-accent-product/20">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  ダブルのことば
                </p>
                <p className="mt-2 text-sm leading-[1.8] text-text">
                  明後日のレポート、今日のうちに少し進めておきませんか？
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========== 3. Ver.1.1.0 ハイライト ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              What’s New
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              ダブルが、生活の中心に。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              ToDo・メモ・対話だけだったダブルが、ヘルスケア・カレンダー、そして読書から得た気づきまで束ねるようになりました。予定と身体と気持ちと「内面の輪郭」を、ひとつの時間軸で扱えます。
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
            {v110Highlights.map((h) => (
              <article
                key={h.title}
                className="relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={h.image}
                    alt={h.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 768px) 300px, 90vw"
                  />
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${h.accent} opacity-30 blur-2xl mix-blend-screen`}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                    {h.tag}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-[1.3] tracking-[-0.01em]">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {h.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* 細かい改善点 */}
          <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-border bg-surface-2/60 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
              Other Refinements
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold leading-[1.3]">
              日常で触れるところを、もっと馴染むように。
            </h3>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {v110Improvements.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-text-muted">
                  <Check /> {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ========== 4. Features（3つの主役） ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Three Pillars
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              DoubleHub で、毎日がこう変わる。
            </h2>
          </div>

          <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-12 md:gap-20">
            {features.map((f, i) => (
              <div
                key={f.label}
                className={`grid items-center gap-10 md:grid-cols-[1fr_0.9fr] ${
                  i % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                    {f.label}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-[1.3] tracking-[-0.01em] md:text-2xl">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.9] text-text-muted md:text-base">
                    {f.body}
                  </p>
                </div>
                <div className="relative mx-auto w-full max-w-sm">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-lg">
                    <Image
                      src={f.image}
                      alt={f.imageAlt}
                      fill
                      className="object-contain"
                      sizes="(min-width: 768px) 360px, 80vw"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 5. ホームの3カテゴリ ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Home Feed
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              ホームに並ぶのは、今のあなた向けの声がけ。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              ホーム画面上部の「ダブルからのお知らせ」は、性質の違う 3 カテゴリで構成されています。今日の行動に効くもの、読むこと自体に価値があるもの、そして話したくなるもの。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {homeCategories.map((c) => (
              <article
                key={c.key}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${c.color}`}
                >
                  {c.label}
                </span>
                <p className="mt-3 text-sm font-medium text-text">{c.tagline}</p>
                <ul className="mt-5 space-y-2 text-sm text-text-muted">
                  {c.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-2">
                      <Dot /> {ex}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 6. Scenes：1日の流れ ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              A Day With Double
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              ダブルがいる 1 日の、具体的な景色。
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scenes.map((s) => (
              <article
                key={s.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  {s.time}
                </p>
                <h3 className="mt-2 font-display text-base font-semibold leading-[1.3] tracking-[-0.01em]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.8] text-text-muted">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 7. Before / After ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Before / After
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              バラバラだった毎日が、ひとつながりになる。
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-divider bg-surface-2">
                  <th className="w-1/2 px-4 py-3 text-left font-semibold text-text-muted md:px-6">
                    これまで
                  </th>
                  <th className="w-1/2 px-4 py-3 text-left font-semibold text-accent-product md:px-6">
                    DoubleHub があると
                  </th>
                </tr>
              </thead>
              <tbody className="[&>tr]:border-b [&>tr]:border-divider [&>tr:last-child]:border-0">
                {beforeAfter.map((row) => (
                  <tr key={row.before}>
                    <td className="px-4 py-4 text-text-muted md:px-6">{row.before}</td>
                    <td className="px-4 py-4 text-text md:px-6">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ========== 8. Why DoubleHub ========== */}
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

      {/* ========== 9. Trust & Privacy ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
              Trust & Privacy
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold leading-[1.3] tracking-[-0.01em] md:text-2xl">
              「知ってもらう」ことの、安心を。
            </h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Check /> 個人情報や健康データを広告目的で利用することは一切ありません
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
            </ul>
          </div>
        </Container>
      </Section>

      {/* ========== 10. Plans ========== */}
      <Section spacing="md" id="plans" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Plans
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              まずは無料で。気に入ったら、もう一人の自分を育てよう。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              Free で「整理してくれる」、Plus で「見守ってくれる」。月 ¥480 は、コーヒー 1 杯ぶんの価格です。
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
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
                「入力するだけで整理してくれる」価値を体験
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> AI による ToDo / メモ自動仕分け（月 20 回まで）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> ホームの「今日」カテゴリのお知らせ
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 音声入力・ユーザー辞書
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 天気・ホーム画面ウィジェット（全サイズ）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 起動時の軽い振り返り
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
              <p className="mt-3 text-xs text-text-muted">
                「自分のことを継続的に見てくれる理解者」を体験
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> <strong className="font-semibold text-text">AI 自動仕分け 無制限</strong>
                </li>
                <li className="flex items-start gap-2">
                  <Check /> ダブルとの <strong className="font-semibold text-text">AI チャット</strong>
                </li>
                <li className="flex items-start gap-2">
                  <Check /> ホームの「気づき」「話したいこと」カテゴリ解放
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 朝／夜サマリ、週次ふり返り
                </li>
                <li className="flex items-start gap-2">
                  <Check /> ヘルスケア連携・カレンダー連携
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

      {/* ========== 11. BookCompass Link ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              BookCompass Link
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              同じ自分を、二度説明しなくていい。
            </h2>
            <p className="mt-4 text-sm leading-[1.9] text-text-muted md:text-base">
              <Link href="/products/bookcompass/" className="text-accent-product underline-offset-4 hover:underline">BookCompass</Link> で読書と向き合いながら言葉にした「内面の輪郭」が、DoubleHub ではそのまま会話の背景になります。読書で深めた自己理解が、日常の意思決定や感情整理の場面で、そのまま使える状態で待っています。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {bookCompassBenefits.map((b) => (
              <article
                key={b.title}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <span className="inline-flex w-fit items-center rounded-full border border-accent-product/30 bg-accent-product/10 px-3 py-1 text-xs font-semibold text-accent-product">
                  {b.tag}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold leading-[1.4] tracking-[-0.01em] md:text-lg">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                  {b.body}
                </p>
              </article>
            ))}
          </div>

          {/* 体感価値の一言 */}
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-accent-product/20 bg-accent-product/5 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
              The Feeling
            </p>
            <p className="mt-4 font-display text-lg font-semibold leading-[1.5] tracking-[-0.01em] md:text-xl">
              「読書で深めた自分が、生活の中でそのまま生きている」
            </p>
            <p className="mt-3 text-sm leading-[1.9] text-text-muted md:text-base">
              データが連携して便利になる——とはちょっと違う種類の価値です。BookCompass で本と向き合う時間は、主にひとりで思考を深める場面。そこで言葉にした思いが、ダブルとの会話を通して生活の意思決定や感情整理にそのままつながる。「考える」と「生きる」の間に、間を空けずにいられるようになります。
            </p>
          </div>

          {/* Coming Soon */}
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-text/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                Coming Soon
              </span>
              <p className="text-sm text-text-muted">
                BookCompass 連携をもとに、こんな体験を準備しています。
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {bookCompassRoadmap.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-dashed border-border bg-surface-2/40 p-5"
                >
                  <h4 className="font-display text-sm font-semibold leading-[1.4] tracking-[-0.01em] text-text">
                    {r.title}
                  </h4>
                  <p className="mt-2 text-xs leading-[1.8] text-text-muted">
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ========== 12. Ecosystem ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Ecosystem
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              DoubleHub は、もっと大きな構想のハブ。
            </h2>
            <p className="mt-5 text-sm leading-[1.9] text-text-muted md:text-base">
              読書記録の <Link href="/products/bookcompass/" className="text-accent-product underline-offset-4 hover:underline">BookCompass</Link> とはすでに連携が始まっています。さらに、筋トレ記録 × AI コーチの <Link href="/products/trainnote/" className="text-accent-product underline-offset-4 hover:underline">TrainNote</Link> との連携も今後予定。専門アプリで記録したあなたの思考や身体の情報が、DoubleHub に集まって、ダブルをさらに深く育てていきます。
            </p>
          </div>
        </Container>
      </Section>

      {/* ========== 13. FAQ ========== */}
      <Section spacing="md">
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
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              もう一人の自分が、
              <br />
              今日からそばにいる。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              思いついたことを話すだけで、ダブルが整理して、今日のあなたに必要な気づきを置いてくれる。まずは無料で、試してみてください。
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
                <Link href="/#ecosystem">DoubleHub 全体構想を見る</Link>
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

function Dot() {
  return (
    <span
      aria-hidden
      className="mt-[0.55rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-product/60"
    />
  );
}
