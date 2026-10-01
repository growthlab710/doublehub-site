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
 * TrainNote / BookCompass / HubWallet を横並び交互レイアウトで紹介。
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
    titleLines: ['ジムで、', '音楽は止まらない。'],
    desc:
      '広告を表示しない筋トレ記録アプリ。前回の重量が同じ画面に出て、伸びと部位ごとの回復がひと目でわかり、食事の記録やボディフォト、トレーニング日誌、AI コーチ（Plus）までひとつのアプリで使えます。',
    href: '/products/trainnote/',
    appStoreUrl:
      'https://apps.apple.com/us/app/trainnote/id6759539755?itscg=30200&itsct=apps_box_artwork&mttnsubad=6759539755',
    appStoreLabel: 'TrainNote',
    image: '/images/trainnote-hero-202610.jpg',
    imageAlt: 'TrainNote の記録タブ — 今日の日付・コンディション・部位ごとの回復状態',
  },
  {
    badge: 'Book Compass',
    iconSrc: '/images/bookcompass-app-icon.jpg',
    titleLines: ['読みながら一言。', 'あとから、読み返せる。'],
    desc:
      '読んだのに、頭に残らない——その手前で、読みながら一言だけ呟く読書メモです。残した一言は、本ごとの「読みの現在地」や、複数の本をまたぐ読書特集号になって返ってきます。呟きは他のユーザーに公開されず、広告も表示しません。',
    href: '/products/bookcompass/',
    appStoreUrl:
      'https://apps.apple.com/us/app/bookcompass-%E8%AA%AD%E6%9B%B8%E7%9F%A5%E8%AD%98%E3%83%9E%E3%83%83%E3%83%97/id6760604663?itscg=30200&itsct=apps_box_badge&mttnsubad=6760604663',
    appStoreLabel: 'BookCompass',
    image: '/images/bookcompass-hero-202610.jpg',
    imageAlt: 'Book Compass の本の詳細——読みながら残した呟きの一覧と、呟きの入力欄',
    reverse: true,
  },
  {
    badge: 'HubWallet',
    iconSrc: '/images/hubwallet-app-icon.jpg',
    titleLines: ['お金の使い方を、', '理解するための家計簿。'],
    desc:
      'レシートは撮るだけ、仕分けは隙間時間にスワイプでまとめて。サブスクや固定費は月額換算と30日以内の予定で見渡せ、無料お試しの終了前にはホームでお知らせします。銀行連携なし・全プラン広告なしで、支出の傾向から「どんな使い方が自分を充電させるか」が見えてきます。',
    href: '/products/hubwallet/',
    appStoreUrl:
      'https://apps.apple.com/jp/app/hubwallet-ai%E5%AE%B6%E8%A8%88%E7%B0%BF/id6766543029',
    appStoreLabel: 'HubWallet',
    image: '/images/hubwallet-recurring-202610.jpg',
    imageAlt: 'HubWallet ホームの固定費・サブスク — 月額換算と、30日以内の予定（無料お試しの終了日つき）',
  },
];

export function SpotlightSection() {
  return (
    <section className="relative overflow-hidden border-t border-divider py-20 md:py-24">
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
            サービス別の詳細
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
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
