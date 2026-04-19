/**
 * サイト全体の定数・メタ情報
 */
export const siteConfig = {
  name: 'DoubleHub',
  tagline: 'ひとりで、でも、孤独じゃない。',
  description:
    'DoubleHub は「自己理解」を核にした生産性ツール群のエコシステム。ToDo / メモ / 読書記録 / トレーニング記録を横断し、あなたの行動データから「自分の型」を見つけます。',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://doublehub.jp',
  ogImage: '/images/og-default.jpg',
  locale: 'ja_JP',
  language: 'ja',
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-DJW7K08F6F',
  author: {
    name: 'GrowthLab',
    url: 'https://doublehub.jp/about/',
  },
  social: {
    appStoreBookCompass: 'https://apps.apple.com/jp/app/bookcompass/id6741010284',
    appStoreDoubleHub: 'https://apps.apple.com/jp/app/doublehub/id6742528013',
    appStoreTrainNote: 'https://apps.apple.com/jp/app/trainnote/id6745749843',
  },
} as const;

export const products = [
  {
    slug: 'doublehub',
    name: 'DoubleHub',
    tagline: '自己理解から始まる、頭の整理術。',
    description:
      'タスクとメモを一体化した、自己理解のためのノート。完了タスクも捨てずに、あなたの行動ログとして残ります。',
    href: '/products/doublehub/',
    accentClass: 'theme-doublehub',
    icon: '🧠',
    features: [
      'ToDo とメモが一体化',
      '完了タスクが行動ログになる',
      'プライベート / ワーク切替',
      'パターン分析で自己理解へ',
    ],
  },
  {
    slug: 'bookcompass',
    name: 'BookCompass',
    tagline: '本との対話を、羅針盤に。',
    description:
      '読んだ本を「知の地図」として可視化。ISBN 検索で素早く登録、Mutter（呟き）で短文感想を残せます。',
    href: '/products/bookcompass/',
    accentClass: 'theme-bookcompass',
    icon: '📘',
    features: [
      'ISBN / タイトルで本を登録',
      'Mutter で短文感想を残す',
      '読書履歴を地図として俯瞰',
      'AI との対話で読書を深める',
    ],
  },
  {
    slug: 'trainnote',
    name: 'TrainNote',
    tagline: '鍛えるを、記録する。',
    description:
      'シンプルなトレーニング記録アプリ。部位別のヒートマップで、継続と成長を可視化。',
    href: '/products/trainnote/',
    accentClass: 'theme-trainnote',
    icon: '💪',
    features: [
      'シンプルなワークアウト記録',
      '部位別カレンダーヒートマップ',
      'AI コーチが継続をサポート',
      'ピークと成長を自動集計',
    ],
    comingSoonWeb: true,
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
  ],
  company: [
    { label: 'About', href: '/about/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Support', href: '/support/' },
    { label: 'Privacy', href: '/privacy/' },
  ],
} as const;
