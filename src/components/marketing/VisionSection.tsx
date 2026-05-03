'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

/**
 * Vision セクション
 *
 * このセクションは「静かに読ませる場」として意図的にシンプルにする。
 *
 * 以前は「英語ラベル → 中央見出し → 引用 → 本文 → 3値カード」という
 * "AI が量産する型" だったが、構成のリズムを崩すために
 * - 英語ラベル削除
 * - 3値カード削除 (前の CtaSection と続くリズムを利かせて「引用で静かに終える」)
 * - 本文の長さはそのまま
 */
export function VisionSection() {
  return (
    <section className="border-t border-divider bg-surface-2/40 py-24 md:py-32">
      <Container width="default">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-[clamp(1.75rem,1.1rem+2.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
            あなたのことを、<br className="sm:hidden" />
            世界で一番理解する存在へ。
          </h2>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto mt-12 max-w-3xl text-center"
        >
          <p className="font-display text-[clamp(1.15rem,0.9rem+1.2vw,1.6rem)] font-medium leading-[1.6] tracking-[-0.01em] text-text">
            ただ甘やかすだけじゃない。上辺で合わせるだけでもない。<br />
            あなたを理解した上で、あなたのためになることを返す。<br />
            そういう存在を、テクノロジーでつくりたい。
          </p>
        </motion.blockquote>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 text-sm leading-relaxed text-text-muted">
          <p>
            DoubleHub は、あなたの注意を奪うためではなく、あなた自身に戻すためのアプリです。
            滞在時間を伸ばすためのおすすめでも、続きが気になる無限スクロールでもありません。
          </p>
          <p>
            バラバラな努力や記録をつなぎ直し、一つ一つの積み重ねからあなた自身の輪郭を少しずつ鮮明にしていく。
            それが、より満足度の高い判断を重ねていく土台になると信じています。
          </p>
        </div>
      </Container>
    </section>
  );
}
