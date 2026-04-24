'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

/**
 * Hero セクション
 * 本番サイト（doublehub.jp）のコピーに準拠しつつ、
 * Granola/Notion のエッセンス（グラデ光源・コンセプト画像）を取り入れる。
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Gradient mesh background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-15%] h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute right-[5%] bottom-[0%] h-[320px] w-[320px] rounded-full bg-accent-warm/20 blur-[120px]" />
        <div className="absolute left-[5%] top-[40%] h-[260px] w-[260px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <Container width="wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-text-muted">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Your Personal Partner
          </span>
          <h1 className="mt-7 font-display text-[clamp(2rem,1rem+4.2vw,4rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
            世界で一番あなたのことを<br className="hidden md:inline" />
            理解してくれる存在を目指す
            <br />
            <span className="gradient-text-brand">
              「DoubleHub（ダブルハブ）」
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
            タスクやスケジュールの整理だけではなく、<br className="hidden sm:inline" />
            あなたの行動や考え方を理解し、思考整理や適切な<br className="hidden md:inline" />
            コミュニケーションを提供してくれます。
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="#daily-choices">
                どう役に立つのか見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#products">今すぐ使えるサービス</Link>
            </Button>
          </div>
        </motion.div>

        {/* コンセプト画像
            - spring に納めて "リアルな物が召定位置に落ち着く" 演出
            - 他のセクションの ease-out 一辺倒と差別化し AIっぽい均質さを折る */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 48 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 16,
            mass: 1,
            delay: 0.25,
          }}
          className="relative mx-auto mt-14 max-w-4xl md:mt-20"
        >
          {/* Liquid Glass のフレーム
              - 外側: 透き通るガラスの面。背後のグラデーション光源がハミ出しに滞留
              - 内側: 画像をそのまま表示（視認性優先） */}
          <div className="liquid-glass relative rounded-2xl p-1.5 md:rounded-3xl md:p-2">
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
              <Image
                src="/images/DoubleHub-Concept.webp"
                alt="DoubleHub コンセプト図：あなたの行動・習慣・思考を学習し、プロアクティブな提案と成長をもたらすAIパートナー"
                width={1600}
                height={900}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-text-faint">
            日々の記録や会話が集まり、あなたを理解して成長していく。
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
