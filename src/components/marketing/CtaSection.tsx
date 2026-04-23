import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export function CtaSection() {
  return (
    <Section spacing="md">
      <Container width="default">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-surface to-accent-warm/5 p-10 md:p-14 shadow-lg">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-tight">
              あなたの “型” を、ここから見つける。
            </h2>
            <p className="mt-4 text-text-muted">
              まずは無料の DoubleHub から。iOS アプリで、あなたの一日の記録が静かに積み上がります。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/products/doublehub/">
                  DoubleHub を見る
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/about/">開発者について</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
