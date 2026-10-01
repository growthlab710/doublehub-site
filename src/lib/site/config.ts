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
    appStoreTrainNote: 'https://apps.apple.com/jp/app/trainnote/id6759539755',
    appStoreHubWallet:
      'https://apps.apple.com/jp/app/hubwallet-ai%E5%AE%B6%E8%A8%88%E7%B0%BF/id6766543029',
  },
} as const;

export const products = [
  {
    slug: 'doublehub',
    name: 'DoubleHub',
    tagline: '日記は、写真1枚でいい。',
    description:
      '広告なし。写真1枚と気分スタンプの1日1枚日記に、ダブル（もう一人の自分）がひと言返します。写真は端末の外に残りません。',
    href: '/products/doublehub/',
    accentClass: 'theme-doublehub',
    icon: '🧠',
    appIcon: '/images/doublehub-icon.jpg',
    features: [
      '写真1枚と気分スタンプの1日1枚日記',
      '書いた日はダブルがひと言。返事ができて、後日つづく',
      'アルバム——日記から見つけた幸せの種を、月ごとに',
      '広告なし。写真は端末の外に残らない',
    ],
  },
  {
    slug: 'bookcompass',
    name: 'BookCompass',
    tagline: '読みながら一言、あとで読み返す。',
    description:
      '読んだのに、頭に残らない——その手前で、読みながら一言だけ呟く読書メモ。呟きは本ごとの「読みの現在地」や読書特集号になって返ってきます。広告なし。',
    href: '/products/bookcompass/',
    accentClass: 'theme-bookcompass',
    icon: '📘',
    appIcon: '/images/bookcompass-app-icon.jpg',
    features: [
      '読みながら一言（280字・音声入力も）',
      '呟くと、ブックバディがその場でひと言',
      '本ごとの「読みの現在地」と読書特集号',
      '本棚をもとにした「探す」の棚が毎週',
    ],
  },
  {
    slug: 'trainnote',
    name: 'TrainNote',
    tagline: '広告なしの筋トレ記録。',
    description:
      '広告を表示しない筋トレ記録アプリ。前回の重量と伸び、部位ごとの回復がひと目でわかります。食事の記録、ボディフォト、トレーニング日誌、AI コーチ（Plus）にも対応。',
    href: '/products/trainnote/',
    accentClass: 'theme-trainnote',
    icon: '💪',
    appIcon: '/images/trainnote-app-icon.jpg',
    features: [
      '前回の重量が出る記録（両手モード・自重の負荷割合）',
      '週・月の振り返りと部位ごとの回復（PEAK）',
      '食事の写真から kcal・PFC の目安を推定（栄養プラン）',
      'ボディフォト・トレーニング日誌・AI コーチ（Plus）',
    ],
    comingSoonWeb: true,
  },
  {
    slug: 'hubwallet',
    name: 'HubWallet',
    tagline: '節約疲れしない家計簿。',
    description:
      '広告が、ひとつも出ない家計簿。レシートは撮るだけで、仕分けは隙間時間にまとめて。サブスク・固定費の管理と、無料お試しの終了前のお知らせにも対応しています。',
    href: '/products/hubwallet/',
    accentClass: 'theme-hubwallet',
    icon: '💰',
    appIcon: '/images/hubwallet-app-icon.jpg',
    features: [
      '撮って溜める・あとでスワイプで仕分け',
      'サブスク・固定費の管理と終了前のお知らせ',
      '銀行口座・カードとは連携しない',
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
