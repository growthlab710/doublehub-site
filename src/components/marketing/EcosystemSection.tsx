import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

const pillars = [
  {
    title: 'データは、あなたのもの',
    body:
      '各プロダクトのデータは Supabase + iCloud に保存され、GrowthLab が勝手に分析対象にすることはありません。エクスポートも削除もいつでも可能です。',
  },
  {
    title: '完了は、捨てない',
    body:
      'ToDo の完了タスク、読み終えた本、達成したトレーニング。過去の行動を「記録」ではなく「素材」として扱い、未来の判断に活かします。',
  },
  {
    title: '独立、でも繋がる',
    body:
      '各プロダクトは独立した Supabase プロジェクトで運用されています。連携は任意で、いつでも解除できる。壊れにくい設計です。',
  },
];

export function EcosystemSection() {
  return (
    <Section surface="alt" spacing="lg">
      <Container width="wide">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-warm">
            Ecosystem
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,1rem+2.5vw,2.75rem)] font-semibold">
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
      </Container>
    </Section>
  );
}
