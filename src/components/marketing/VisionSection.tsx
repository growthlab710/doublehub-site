'use client';

import { motion } from 'framer-motion';
import { Link2, Sparkles, Compass } from 'lucide-react';
import { Container } from '@/components/ui/Container';

/**
 * Vision セクション
 * 大きな引用句 + 3 つの価値（つなぐ / 映す / 導く）。
 */

const values = [
  {
    Icon: Link2,
    title: 'つなぐ',
    desc: 'バラバラだった努力をひとつの文脈で読み解く。',
  },
  {
    Icon: Sparkles,
    title: '映す',
    desc: '自分でも気づかなかった傾向やパターンを見せる。',
  },
  {
    Icon: Compass,
    title: '導く',
    desc: '次の一歩を、あなたに合った形で提案する。',
  },
];

export function VisionSection() {
  return (
    <section className="border-t border-divider bg-surface-2/40 py-20 md:py-24">
      <Container width="default">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Vision
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,1.1rem+2.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
            あなたのことを、<br className="sm:hidden" />
            世界で一番理解する存在へ。
          </h2>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto mt-10 max-w-3xl text-center"
        >
          <p className="font-display text-[clamp(1.15rem,0.9rem+1.2vw,1.6rem)] font-medium leading-[1.6] tracking-[-0.01em] text-text">
            ただ甘やかすだけじゃない。上辺で合わせるだけでもない。<br />
            あなたを理解した上で、あなたのためになることを返す。<br />
            そういう存在を、テクノロジーでつくりたい。
          </p>
        </motion.blockquote>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-sm leading-relaxed text-text-muted">
          <p>
            DoubleHub は、テクノロジーで人間を置き換えるためのプロジェクトではありません。
            バラバラな努力や記録をつなぎ直し、あなたの可能性を広げるための試みです。
          </p>
          <p>
            一つ一つの記録が、あなた自身の輪郭を少しずつ鮮明にしていく。
            それが、より満足度の高い判断を積み重ねていく土台になると信じています。
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-3 md:gap-5">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.08,
              }}
              className="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <v.Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold tracking-[-0.01em]">
                {v.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-text-muted md:text-sm">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
