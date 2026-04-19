import type { Metadata } from 'next';
import { ProductHero } from '@/components/marketing/ProductHero';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { CtaSection } from '@/components/marketing/CtaSection';
import { siteConfig } from '@/lib/site/config';

export const metadata: Metadata = {
  title: 'DoubleHub — 自己理解から始まる、頭の整理術',
  description:
    'タスクとメモを一体化した、自己理解のためのノート。完了タスクも捨てずに、あなたの行動ログとして残ります。',
  alternates: { canonical: '/products/doublehub/' },
};

const features = [
  {
    icon: '🧠',
    title: 'ToDo とメモの一体化',
    body:
      '頭に浮かんだことを「タスクか / メモか」を意識せずに書き込める。後から完了タスクを振り返ることで、自分の関心の軌跡が見えます。',
  },
  {
    icon: '🔒',
    title: 'プライベート / ワーク分離',
    body:
      'カテゴリで 2 つの空間に分割。仕事とプライベートを 1 アプリで安全に扱えます。',
  },
  {
    icon: '📊',
    title: '行動ログとしての完了タスク',
    body:
      '完了タスクは単なる履歴ではなく、あなたの「行動データ」。後からパターン分析の素材になります。',
  },
  {
    icon: '🎤',
    title: '音声入力対応（iOS）',
    body:
      '歩きながら、手を離せない時も、声でメモ。iOS Speech Framework を活用した正確な書き起こし。',
  },
  {
    icon: '🔁',
    title: 'iCloud 同期',
    body: 'デバイス間でシームレスに同期。どこで書いても、すぐ参照できます。',
  },
  {
    icon: '🧩',
    title: '他プロダクトと連携',
    body:
      'BookCompass / TrainNote で記録したデータをダッシュボードで一望。別プロバイダの認証でも連携できます（プロバイダ非依存設計）。',
  },
];

export default function DoubleHubPage() {
  return (
    <div className="theme-doublehub">
      <ProductHero
        productName="DoubleHub"
        tagline="自己理解から始まる、頭の整理術。"
        description="タスクとメモを一体化した、自己理解のためのノート。完了タスクも捨てずに、あなたの行動ログとして残ります。"
        heroImage="/images/doublehub-task.jpg"
        appStoreUrl={siteConfig.social.appStoreDoubleHub}
        badgeLabel="iOS 版配信中"
      />
      <FeatureGrid title="DoubleHub の特徴" features={features} />
      <CtaSection />
    </div>
  );
}
