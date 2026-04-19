import type { Metadata } from 'next';
import { ProductHero } from '@/components/marketing/ProductHero';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { CtaSection } from '@/components/marketing/CtaSection';
import { siteConfig } from '@/lib/site/config';

export const metadata: Metadata = {
  title: 'BookCompass — 本との対話を、羅針盤に',
  description:
    '読んだ本を「知の地図」として可視化。ISBN 検索で素早く登録、Mutter（呟き）で短文感想を残せます。',
  alternates: { canonical: '/products/bookcompass/' },
};

const features = [
  {
    icon: '📘',
    title: 'ISBN / タイトル検索で素早く登録',
    body:
      'NDL Search / openBD を使った高品質な書誌データで、バーコード撮影や検索ワードから瞬時に本を追加できます。',
  },
  {
    icon: '💬',
    title: 'Mutter（呟き）で短文感想',
    body:
      '読書中にふと湧いた感想を、ツイートのような気軽さで。後から本ごとにまとめて振り返れます。',
  },
  {
    icon: '🧭',
    title: '知の地図として可視化',
    body:
      '読んだ本を軸・テーマ・時系列で俯瞰。自分の興味がどう動いてきたかが一目でわかります。',
  },
  {
    icon: '🤖',
    title: 'AI との対話で読書を深める',
    body:
      '本の内容について AI に質問できる Chat 機能。気づきは Insight として蓄積され、後から閲覧可能です。',
  },
  {
    icon: '📚',
    title: '読書ステータス管理',
    body:
      '読みかけ / 読了 / 一時停止 / お気に入り。自分の読書スタイルに合わせてフィルタできます。',
  },
  {
    icon: '📅',
    title: '継続のためのヒント',
    body:
      '読書習慣を優しくサポート。読書の進捗や連続記録を、押し付けずに可視化します。',
  },
];

export default function BookCompassPage() {
  return (
    <div className="theme-bookcompass">
      <ProductHero
        productName="BookCompass"
        tagline="本との対話を、羅針盤に。"
        description="読んだ本を「知の地図」として可視化。ISBN 検索で素早く登録、Mutter（呟き）で短文感想を残せます。"
        heroImage="/images/bookcompass-map.jpg"
        appStoreUrl={siteConfig.social.appStoreBookCompass}
        badgeLabel="iOS 版配信中 · Web 版 準備中"
      />
      <FeatureGrid title="BookCompass の特徴" features={features} />
      <CtaSection />
    </div>
  );
}
