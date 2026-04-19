import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductHero } from '@/components/marketing/ProductHero';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { CtaSection } from '@/components/marketing/CtaSection';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site/config';

export const metadata: Metadata = {
  title: 'TrainNote — 鍛えるを、記録する',
  description:
    'シンプルなトレーニング記録アプリ。部位別のヒートマップで、継続と成長を可視化。',
  alternates: { canonical: '/products/trainnote/' },
};

const features = [
  {
    icon: '💪',
    title: 'シンプルなワークアウト記録',
    body:
      '重量 × 回数 × セット数をさっと記録。迷うところが少なく、習慣にしやすい設計です。',
  },
  {
    icon: '🗓️',
    title: '部位別カレンダーヒートマップ',
    body:
      '胸 / 背中 / 脚 / 肩 / 腕 / 腹筋 / 有酸素。どの部位を、いつ、どれだけ鍛えたかが一目で分かる。',
  },
  {
    icon: '🤖',
    title: 'AI コーチが継続をサポート',
    body:
      '会話ベースで「今日は何をしようか」を決められる AI コーチ。負荷の偏りや休養の提案も。',
  },
  {
    icon: '📈',
    title: 'ピークと成長の自動集計',
    body:
      '種目別のピーク重量、1 週間の総負荷、部位別の回数など、成長の指標を自動で可視化。',
  },
];

export default function TrainNotePage() {
  return (
    <div className="theme-trainnote">
      <ProductHero
        productName="TrainNote"
        tagline="鍛えるを、記録する。"
        description="シンプルなトレーニング記録アプリ。部位別のヒートマップで、継続と成長を可視化。"
        heroImage="/images/trainnote-calendar.jpg"
        appStoreUrl={siteConfig.social.appStoreTrainNote}
        badgeLabel="iOS 版配信中 · Web 版 Coming Soon"
      />

      {/* Web 対応に関する注意 */}
      <Section spacing="sm">
        <Container width="default">
          <div className="rounded-2xl border border-accent-warm/30 bg-accent-warm/5 p-6">
            <h2 className="font-display text-lg font-semibold text-accent-warm">
              Web 版の対応について
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              TrainNote の Web 版は <strong>近日公開</strong> 予定です。
              現在のトレーニングデータは iOS 端末内の SwiftData に安全に保管されており、
              クラウド同期が整い次第、Web でも閲覧・記録ができるようになります。
              まずは iOS アプリからご体験ください。
            </p>
            <div className="mt-4">
              <Button asChild size="sm" variant="product">
                <Link href={siteConfig.social.appStoreTrainNote} target="_blank">
                  App Store で TrainNote を見る
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <FeatureGrid title="TrainNote の特徴" features={features} />
      <CtaSection />
    </div>
  );
}
