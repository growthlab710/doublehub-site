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
 * AIテンプレの署名（グラデ光源・✨ピル・グラデ見出し・生成風コンセプト図）を外し、
 * コピーとボタンに集中させたシンプルな構成にする。
 */
export function Hero() {
  return (
    <section className="relative py-20 md:py-28">
      <Container width="wide">
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
