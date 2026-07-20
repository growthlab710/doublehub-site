/**
 * サイト全体の定数・メタ情報
 */
export const siteConfig = {
  name: 'DoubleHub',
  // ヒーローコピー（あなたを理解し、毎日を一緒に整える AI パートナー。）に合わせた短縮版。
  // page title `${name} — ${tagline}` として SERP / ブラウザタブに表示される。
  tagline: 'あなたを理解し、毎日を一緒に整える AI パートナー',
  description:
    '学び（BookCompass）、身体（TrainNote）、お金（HubWallet）、日記・タスク——複数のサービスをつないで、あなた専用の AI パートナーを育てる DoubleHub のエコシステム。',
  // canonical ホストは www 付き。apex は Vercel 側で 308 → www に転送されるため、
  // sitemap / OGP / 構造化データの URL は全て www に揃え、GSC の
  // 「ページにリダイレクトがあります」を発生させない。
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.doublehub.jp',
  ogImage: '/images/og-default.jpg',
  locale: 'ja_JP',
  language: 'ja',
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-DJW7K08F6F',
  author: {
    name: 'GrowthLab',
    url: 'https://www.doublehub.jp/about/',
  },
  social: {
    // App Store ID は他の参照箇所（products/bookcompass、SpotlightSection 等）と揃える。
    appStoreBookCompass:
      'https://apps.apple.com/us/app/bookcompass-%E8%AA%AD%E6%9B%B8%E7%9F%A5%E8%AD%98%E3%83%9E%E3%83%83%E3%83%97/id6760604663?itscg=30200&itsct=apps_box_badge&mttnsubad=6760604663',
    appStoreDoubleHub:
      'https://apps.apple.com/jp/app/doublehub-ai%E6%B4%BB%E7%94%A8todo%E7%AE%A1%E7%90%86/id6761981050',
    appStoreTrainNote: 'https://apps.apple.com/jp/app/trainnote/id6745749843',
    appStoreHubWallet:
      'https://apps.apple.com/jp/app/hubwallet-ai%E5%AE%B6%E8%A8%88%E7%B0%BF/id6766543029',
  },
} as const;

export const products = [
  {
    slug: 'doublehub',
    name: 'DoubleHub',
    tagline: 'もう一人の自分と、毎日を残す。',
    description:
      '写真1枚と気分スタンプの日記、投げるだけで整う ToDo・メモ。記録をダブル（AI）が覚えて、あなたへの理解を深めていきます。',
    href: '/products/doublehub/',
    accentClass: 'theme-doublehub',
    icon: '🧠',
    appIcon: '/images/doublehub-icon.jpg',
    features: [
      '写真1枚と気分スタンプの1日1枚日記',
      'ToDo・メモは投げるだけで AI が自動仕分け',
      '未来日記——記録から「もしもの続き」を想像',
      '写真は端末から出ないプライバシー設計',
    ],
  },
  {
    slug: 'bookcompass',
    name: 'BookCompass',
    tagline: '本との対話を、羅針盤に。',
    description:
      '読んだ本を「知の地図」として可視化。読みながらひと言つぶやくだけで、AI があなたの読書を特集誌やドキュメンタリーに編み上げます。',
    href: '/products/bookcompass/',
    accentClass: 'theme-bookcompass',
    icon: '📘',
    appIcon: '/images/bookcompass-app-icon.jpg',
    features: [
      'ISBN / タイトルで本を登録',
      '呟きで読書中の気づきを残す',
      '読書特集号——あなたの読書が1冊の特集誌に',
      '3人の AI 読書パートナーと対話',
    ],
  },
  {
    slug: 'trainnote',
    name: 'TrainNote',
    tagline: '鍛えるを、記録する。',
    description:
      'トレーニング記録・ボディフォト・AI コーチをつなげる継続支援アプリ。体重だけでは分からない前進を、写真・記録・AI で振り返れます。',
    href: '/products/trainnote/',
    accentClass: 'theme-trainnote',
    icon: '💪',
    appIcon: '/images/trainnote-app-icon.jpg',
    features: [
      'シンプルなワークアウト記録',
      'ボディフォトの蓄積と 2〜4 枚比較',
      'AI ボディ変化レポート（AI Coach Plus）',
      '部位別の回復状況と PEAK バッジ',
    ],
    comingSoonWeb: true,
  },
  {
    slug: 'hubwallet',
    name: 'HubWallet',
    tagline: '節約疲れしない家計簿。',
    description:
      'レシートは「撮るだけ」、仕分けは隙間時間にまとめて。サブスク・固定費の管理と解約忘れを防ぐ通知まで。銀行連携不要・全プラン広告ゼロの家計簿。',
    href: '/products/hubwallet/',
    accentClass: 'theme-hubwallet',
    icon: '💰',
    appIcon: '/images/hubwallet-app-icon.jpg',
    features: [
      '撮って溜める・あとで仕分ける',
      'サブスク・固定費管理と解約忘れ防止の通知',
      '銀行連携不要 · ローカルファースト',
      '全プラン広告なし',
    ],
  },
] as const;

export type Product = (typeof products)[number];

export const marketingNav = [
  { label: 'Products', href: '/#products' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'Support', href: '/support/' },
] as const;

export const footerNav = {
  products: [
    { label: 'DoubleHub', href: '/products/doublehub/' },
    { label: 'BookCompass', href: '/products/bookcompass/' },
    { label: 'TrainNote', href: '/products/trainnote/' },
    { label: 'HubWallet', href: '/products/hubwallet/' },
  ],
  company: [
    { label: 'About', href: '/about/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Support', href: '/support/' },
    { label: 'App Linking', href: '/app-linking/' },
    { label: 'Privacy', href: '/privacy/' },
  ],
} as const;
