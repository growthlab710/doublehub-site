'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionEyebrow } from '@/components/marketing/SectionEyebrow';

/**
 * Spotlight セクション
 * TrainNote と BookCompass を横並び交互レイアウトで紹介。
 */

type Spotlight = {
  badge: string;
  iconSrc: string;
  titleLines: string[];
  desc: string;
  href: string;
  appStoreUrl: string;
  appStoreLabel: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

const spotlights: Spotlight[] = [
  {
    badge: 'TrainNote',
    iconSrc: '/images/trainnote-app-icon.jpg',
    titleLines: ['5人の専門AIコーチが、', 'あなたの筋トレを変える。'],
    desc:
      '190以上の科学論文を参照する5名のAIコーチが、記録・栄養・回復・計画・心理の6領域であなたの筋トレを個別サポート。DoubleHub につながると、継続パターンがさらに深い洞察に変わります。',
    href: '/products/trainnote/',
    appStoreUrl:
      'https://apps.apple.com/us/app/trainnote/id6759539755?itscg=30200&itsct=apps_box_artwork&mttnsubad=6759539755',
    appStoreLabel: 'TrainNote',
    image: '/images/trainnote-peak.webp',
    imageAlt: 'TrainNote ホーム画面 — PEAK バッジと AI Coach',
  },
  {
    badge: 'Book Compass',
    iconSrc: '/images/bookcompass-app-icon.jpg',
    titleLines: ['読書記録ではなく、', '思考の流れを残す地図。'],
    desc:
      '読んだ本、残したメモ、繰り返し考えるテーマから、価値観の移り変わりを可視化。DoubleHub に接続すると「何を大事にしているか」が輪郭を持ちはじめます。',
    href: '/products/bookcompass/',
    appStoreUrl:
      'https://apps.apple.com/us/app/bookcompass-%E8%AA%AD%E6%9B%B8%E7%9F%A5%E8%AD%98%E3%83%9E%E3%83%83%E3%83%97/id6760604663?itscg=30200&itsct=apps_box_badge&mttnsubad=6760604663',
    appStoreLabel: 'BookCompass',
    image: '/images/bookcompass-map.webp',
    imageAlt: 'Book Compass アプリ画面',
    reverse: true,
  },
];

export function SpotlightSection() {
  return (
    <section className="border-t border-divider py-20 md:py-24">
      <Container width="wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionEyebrow label="Spotlight" />
          <h2 className="mt-4 font-display text-[clamp(1.75rem,1.1rem+2.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
            サービス別の詳細。
          </h2>
        </motion.div>

        <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-14 md:gap-20">
          {spotlights.map((s, idx) => (
            <motion.div
              key={s.badge}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.1,
              }}
              className={`grid items-center gap-10 md:gap-14 ${
                s.reverse ? 'md:grid-cols-[1fr_1.1fr]' : 'md:grid-cols-[1.1fr_1fr]'
              }`}
            >
              <div className={s.reverse ? 'md:order-2' : ''}>
                <div className="inline-flex items-center gap-2">
                  <Image
                    src={s.iconSrc}
                    alt={`${s.badge} アプリアイコン`}
                    width={40}
                    height={40}
                    className="h-8 w-8 rounded-lg border border-border object-cover shadow-sm"
                  />
                  <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted">
                    {s.badge}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[clamp(1.35rem,1rem+1.4vw,2rem)] font-semibold leading-[1.25] tracking-[-0.02em]">
                  {s.titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-text-muted md:text-base">
                  {s.desc}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild variant="secondary">
                    <Link href={s.href}>
                      詳細ページへ
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <a
                    href={s.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex transition-transform hover:scale-[1.02]"
                    aria-label={`App Store で ${s.appStoreLabel} をダウンロード`}
                  >
                    <img
                      src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/ja-jp?releaseDate=1774224000"
                      alt="App Storeでダウンロード"
                      style={{ height: 40, objectFit: 'contain' }}
                    />
                  </a>
                </div>
              </div>

              <div className={`relative ${s.reverse ? 'md:order-1' : ''}`}>
                <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl md:max-w-md">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    width={800}
                    height={1400}
                    className="h-auto w-full rounded-[1.5rem]"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-[-15%] -z-10 rounded-full bg-primary/10 blur-3xl"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
