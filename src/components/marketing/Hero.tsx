'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/lib/site/config';

export function Hero() {
  return (
    <Container width="wide" className="relative py-20 md:py-28">
      {/* Gradient mesh background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-10%] h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute right-[10%] bottom-[-10%] h-[320px] w-[320px] rounded-full bg-accent-warm/20 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-content-wide items-center gap-12 md:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-muted">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
            for iOS & Web · 2026
          </span>
          <h1 className="mt-6 font-display text-[clamp(2.2rem,1rem+5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            <span className="block">ひとりで、</span>
            <span className="block">でも、</span>
            <span className="gradient-text-primary block">孤独じゃない。</span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-text-muted">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="#products">
                プロダクトを見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/blog/">
                <BookOpen className="h-4 w-4" />
                Blog を読む
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative"
        >
          <div className="relative rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-2 p-6 shadow-xl">
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square rounded-xl bg-primary/10 p-3 text-3xl">🧠</div>
              <div className="aspect-square rounded-xl bg-accent-warm/10 p-3 text-3xl">📘</div>
              <div className="aspect-square rounded-xl bg-primary/5 p-3 text-3xl">💪</div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-2 w-3/4 rounded-full bg-primary/20" />
              <div className="h-2 w-1/2 rounded-full bg-accent-warm/20" />
              <div className="h-2 w-5/6 rounded-full bg-primary/10" />
            </div>
            <p className="mt-6 text-xs text-text-faint">
              DoubleHub Ecosystem — 自分の「型」が見える場所
            </p>
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
