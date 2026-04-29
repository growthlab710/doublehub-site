import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { IdealSection } from '@/components/marketing/IdealSection';
import { ProblemSection } from '@/components/marketing/ProblemSection';
import { SolutionSection } from '@/components/marketing/SolutionSection';
import { DailyChoices } from '@/components/marketing/DailyChoices';
import { ProactiveSupport } from '@/components/marketing/ProactiveSupport';
import { EcosystemTabs } from '@/components/marketing/EcosystemTabs';
import { EcosystemSection } from '@/components/marketing/EcosystemSection';
import { ProductCards } from '@/components/marketing/ProductCards';
import { SpotlightSection } from '@/components/marketing/SpotlightSection';
import { RoadmapSection } from '@/components/marketing/RoadmapSection';
import { VisionSection } from '@/components/marketing/VisionSection';
import { FaqSection } from '@/components/marketing/FaqSection';
import { BlogTeaser } from '@/components/marketing/BlogTeaser';
import { CtaSection } from '@/components/marketing/CtaSection';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * トップページ（ハブエントリー）
 *
 * 構成：
 * 1. Hero                    — キャッチコピー + コンセプト画像
 * 2. IdealSection            — 「もう一人の自分」の理想像（対比）
 * 3. ProblemSection          — 現状の課題 3 カード
 * 4. SolutionSection         — DoubleHub の解決策 3 ステップ
 * 5. DailyChoices（軸①）    — 日常の分岐点 6 ケースで Double の寄り添い方を見せる
 * 6. ProactiveSupport（軸②）— Double からの能動的な声かけ 3 件（予定体験）
 * 7. EcosystemTabs           — 5 サービスから入る入口（タブ切替）
 * 8. EcosystemSection        — 3 つの設計哲学（データ / 完了 / 独立）
 * 9. ProductCards            — TrainNote / BookCompass / DoubleHub カード
 * 10. SpotlightSection       — TrainNote / BookCompass ディープダイブ
 * 11. RoadmapSection         — Now / Next / Future
 * 12. VisionSection          — 引用 + 3 つの価値
 * 13. FaqSection             — 4 問アコーディオン
 * 14. BlogTeaser             — 最新記事
 * 15. CtaSection             — 最終 CTA
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <IdealSection />
      <ProblemSection />
      <SolutionSection />
      <DailyChoices />
      <ProactiveSupport />
      <EcosystemTabs />
      <EcosystemSection />
      <ProductCards />
      <SpotlightSection />
      <RoadmapSection />
      <VisionSection />
      <FaqSection />
      <BlogTeaser />
      <CtaSection />
    </>
  );
}
