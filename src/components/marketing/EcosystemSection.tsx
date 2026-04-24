import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionEyebrow } from '@/components/marketing/SectionEyebrow';

const pillars = [
  {
    title: 'データは、あなたのもの',
    body:
      '各プロダクトのデータは安全に保存され、GrowthLab が勝手に分析対象にすることはありません。エクスポートも削除もいつでも可能です。',
  },
  {
    title: '完了は、捨てない',
    body:
      'ToDo の完了タスク、読み終えた本、達成したトレーニング。過去の行動を「記録」ではなく「素材」として扱い、未来の判断に活かします。',
  },
  {
    title: '独立、でも繋がる',
    body:
      '各プロダクトは独立したデータベースで運用されています。連携は任意で、いつでも解除できる。壊れにくい設計です。',
  },
];

export function EcosystemSection() {
  return (
    <Section surface="alt" spacing="lg">
      <Container width="wide">
        <div className="max-w-2xl">
          <SectionEyebrow label="Three Principles" align="left" />
          <h2 className="mt-4 font-display text-[clamp(1.8rem,1rem+2.5vw,2.75rem)] font-semibold">
            ツールを集めるのではなく、自分を整える。
          </h2>
          <p className="mt-4 text-text-muted">
            DoubleHub は「別々のアプリを束ねるハブ」ではありません。
            タスク・読書・トレーニングを通じた<strong className="font-semibold text-text">「自己理解の基盤」</strong>を作るプロジェクトです。
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-xs font-mono text-text-faint">0{i + 1}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{pillar.body}</p>
            </div>
          ))}
        </div>

        {/* 3 原則の統合図 —— 中心に「あなた」、3 原則が円で取り囲む */}
        <div className="mt-10 rounded-2xl border border-border bg-surface p-6 shadow-sm md:mt-12 md:p-10">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-warm">
                Three Principles, One Self
              </p>
              <p className="mt-3 font-display text-lg font-semibold leading-snug md:text-xl">
                3 つの原則は、真ん中の「あなた」を支えるためにある。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-[15px]">
                データの主権、過去の蓄積、サービスの独立性。
                この 3 つが揃うことで、初めて「自分を整えるプラットフォーム」が成り立ちます。
              </p>
            </div>
            <div className="hidden h-20 w-px bg-divider md:block" aria-hidden />
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface-2">
              <Image
                src="/images/ecosystem-principles-diagram.png"
                alt="中心に「あなた」、周囲を3つの原則（データの主権・過去の蓄積・独立性）が囲む図"
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
