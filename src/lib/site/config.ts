/**
 * サイト全体の定数・メタ情報
 */
export const siteConfig = {
  name: 'DoubleHub',
  // ヒーローコピー（あなたを理解し、毎日を一緒に整える AI パートナー。）に合わせた短縮版。
  // page title `${name} — ${tagline}` として SERP / ブラウザタブに表示される。
  tagline: 'あなたを理解し、毎日を一緒に整える AI パートナー',
  description:
    '学び（BookCompass）、身体（TrainNote）、お金（HubWallet）、タスク——複数のサービスをつないで、あなた専用の AI パートナーを育てる DoubleHub のエコシステム。',
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
    appStoreBookCompass: 'https://apps.apple.com/jp/app/bookcompass/id6741010284',
    appStoreDoubleHub:
      'https://apps.apple.com/jp/app/doublehub-ai%E6%B4%BB%E7%94%A8todo%E7%AE%A1%E7%90%86/id6761981050',
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
    appIcon: '/images/doublehub-icon.jpg',
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
    appIcon: '/images/bookcompass-app-icon.jpg',
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
    appIcon: '/images/trainnote-app-icon.jpg',
    features: [
      'シンプルなワークアウト記録',
      '部位別カレンダーヒートマップ',
      'AI コーチが継続をサポート',
      'ピークと成長を自動集計',
    ],
    comingSoonWeb: true,
  },
  {
    slug: 'hubwallet',
    name: 'HubWallet',
    tagline: '節約疲れしない家計簿。',
    description:
      'レシートは「撮るだけ」、仕分けは隙間時間にまとめて。銀行連携不要・全プラン広告ゼロの、使い方を理解するための家計簿。',
    href: '/products/hubwallet/',
    accentClass: 'theme-hubwallet',
    icon: '💰',
    features: [
      '撮って溜める・あとで仕分ける',
      'Gemini OCR とカテゴリ推定',
      '銀行連携不要 · ローカルファースト',
      '全プラン広告なし',
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
    { label: 'HubWallet', href: '/products/hubwallet/' },
  ],
  company: [
    { label: 'About', href: '/about/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Support', href: '/support/' },
    { label: 'Privacy', href: '/privacy/' },
  ],
} as const;
