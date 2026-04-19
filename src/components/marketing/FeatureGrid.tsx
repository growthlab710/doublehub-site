import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export interface Feature {
  title: string;
  body: string;
  icon?: string;
}

export function FeatureGrid({
  title,
  features,
}: {
  title: string;
  features: Feature[];
}) {
  return (
    <Section spacing="md" surface="alt">
      <Container width="wide">
        <h2 className="font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold">
          {title}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-product/40 hover:shadow-md"
            >
              {f.icon && <div className="text-2xl">{f.icon}</div>}
              <h3 className="mt-3 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
