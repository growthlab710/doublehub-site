import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'About — DoubleHub と GrowthLab について',
  description: 'DoubleHub と GrowthLab の開発思想、なぜ「自己理解」なのかを綴ります。',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <Section spacing="lg">
      <Container width="narrow">
        <h1 className="font-display text-3xl font-semibold">About</h1>
        <p className="mt-6 text-text-muted">
          DoubleHub は、GrowthLab（個人開発）が運営する「自己理解のための生産性ツール群」です。
        </p>
        <h2 className="mt-10 font-display text-xl font-semibold">なぜ「自己理解」なのか</h2>
        <p className="mt-4 text-text-muted">
          タスク管理、読書、トレーニング。領域は違えど、どれも「自分がどう過ごしたか」の記録です。
          別々のアプリで記録したデータは、単独では断片。統合することで、自分の「型」が見えてきます。
        </p>
        <h2 className="mt-10 font-display text-xl font-semibold">設計思想</h2>
        <ul className="mt-4 space-y-3 text-text-muted">
          <li>・各プロダクトは独立した Supabase プロジェクトで運用（壊れにくさを優先）</li>
          <li>・連携は任意、解除もいつでも可能（ロックインしない）</li>
          <li>・AI は道具。自分で考える力を奪わない使い方を目指す</li>
          <li>・完了タスクや読了本を「捨てない」 — 過去は素材</li>
        </ul>
        <p className="mt-10 text-sm text-text-faint">
          ※ このページは Day 2 で詳細コンテンツに差し替え予定です（目次・プロフィール等）
        </p>
      </Container>
    </Section>
  );
}
