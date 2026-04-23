'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface ProductHeroProps {
  productName: string;
  tagline: string;
  description: string;
  heroImage?: string;
  appStoreUrl?: string;
  badgeLabel?: string; // 例: "iOS 版配信中", "Web 版近日公開"
}

export function ProductHero({
  productName,
  tagline,
  description,
  heroImage,
  appStoreUrl,
  badgeLabel,
}: ProductHeroProps) {
  return (
    <Container width="wide" className="relative pt-16 pb-14 md:pt-24 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[-5%] top-[-10%] h-[480px] w-[480px] rounded-full bg-accent-product/15 blur-[120px]" />
      </div>
      <div className="mx-auto grid max-w-content-wide items-center gap-12 md:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {badgeLabel && (
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-product/30 bg-accent-product/10 px-3 py-1 text-xs font-medium text-accent-product">
              {badgeLabel}
            </span>
          )}
          <h1 className="mt-4 font-display text-[clamp(2rem,1rem+4vw,4rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
            {productName}
          </h1>
          <p className="mt-3 text-lg font-medium text-accent-product">{tagline}</p>
          <p className="mt-5 max-w-lg text-text-muted">{description}</p>
          {appStoreUrl && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="product">
                <Link href={appStoreUrl} target="_blank" rel="noopener noreferrer">
                  App Store で見る
                </Link>
              </Button>
            </div>
          )}
        </motion.div>

        {heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-xl">
              <Image
                src={heroImage}
                alt={`${productName} スクリーンショット`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 420px, 100vw"
              />
            </div>
          </motion.div>
        )}
      </div>
    </Container>
  );
}
