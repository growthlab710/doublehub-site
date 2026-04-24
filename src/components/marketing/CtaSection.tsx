import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export function CtaSection() {
  return (
    <Section spacing="md">
      <Container width="default">
        {/* 外枠: ガラス面の内側にグラデーション光源を配置し、ガラス越しに滞留する演出 */}
        <div className="liquid-glass relative overflow-hidden rounded-3xl p-10 md:p-14">
          {/* 中に配置した光源。ガラスがそのまま blur を乗けて柔らかくだぶらせる */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/30"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-accent-warm/15"
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
