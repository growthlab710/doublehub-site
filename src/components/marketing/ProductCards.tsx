'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { products } from '@/lib/site/config';
import { cn } from '@/lib/utils';

export function ProductCards() {
  return (
    <Section id="products" spacing="lg">
      <Container width="wide">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Products
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,1rem+2.5vw,2.75rem)] font-semibold leading-tight">
            3 つのプロダクトで、自分の型を見つける。
          </h2>
          <p className="mt-4 text-text-muted">
            タスク管理、読書、トレーニング。異なる領域のデータが一つに繋がることで、
            あなたの「無意識のパターン」が見えてきます。
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={p.accentClass}
            >
              <Link
                href={p.href}
                className={cn(
                  'group block h-full rounded-2xl border border-border bg-surface p-7 shadow-sm',
                  'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'hover:-translate-y-1 hover:border-accent-product/50 hover:shadow-xl'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-product/10 text-2xl">
                    {p.icon}
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-product" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-1.5 text-sm font-medium text-accent-product">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">{p.description}</p>

                <ul className="mt-6 space-y-1.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-text-muted">
                      <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-accent-product" />
                      {f}
                    </li>
                  ))}
                </ul>

                {'comingSoonWeb' in p && p.comingSoonWeb && (
                  <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent-warm/10 px-2.5 py-1 text-[0.65rem] font-medium text-accent-warm">
                    Web 版近日公開
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
