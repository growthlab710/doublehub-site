'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/marketing/SectionEyebrow';

/**
 * Hero セクション
 * 本番サイト（doublehub.jp）のコピーに準拠。
 * 背景に「人の日常に寄り添う」コンセプト動画を敷き、その上にコピー＋ボタンを重ねる。
 * - ぼかしは動画ファイルに焼き込み済み（CSS で毎フレームぼかさず、再生は通常コストのみ）。
 * - テーマ背景色の薄い膜（scrim）で覆い、ライト/ダーク両方で文字を読みやすくする。
 * - 動画は muted/loop/playsInline で自動再生。poster と静止画フォールバックを併用。
 * - prefers-reduced-motion 時は動画を隠し、静止画（poster）のみ表示。
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* 背景動画レイヤー（装飾） */}
      <div aria-hidden className="absolute inset-0">
        {/* 端のフェードを隠すため少しだけ拡大 */}
        <div className="absolute inset-0 scale-[1.06]">
          {/* prefers-reduced-motion 時や動画読込前のフォールバック静止画 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-home-poster.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <video
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/hero-home-poster.jpg"
          >
            <source src="/videos/hero-home.webm" type="video/webm" />
            <source src="/videos/hero-home.mp4" type="video/mp4" />
          </video>
        </div>
        {/* テーマ背景色の薄い膜（ライト=明るく/ダーク=暗く 自動で切替）*/}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--color-bg)', opacity: 0.48 }}
        />
      </div>

      <Container width="wide" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <SectionEyebrow label="Your Personal AI Partner" align="center" />
          <h1 className="mt-7 font-display text-[clamp(2rem,1rem+4.2vw,4rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
            あなたを理解し、<br className="hidden md:inline" />
            毎日を一緒に整える
            <br />
            AI パートナー。
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
            学び（BookCompass）、身体（TrainNote）、お金（HubWallet）、タスク——<br className="hidden md:inline" />
            複数のサービスをつないで、あなた専用の AI パートナーを育てます。
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
            売り込みも、引き止めもなく。<br className="hidden md:inline" />
            あなた自身に向かう情報だけを、必要なときに届けます。
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="#daily-choices">
                DoubleHub の使い方を見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#products">使えるサービスを見る</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
