'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/marketing/SectionEyebrow';
import { VideoSlot } from '@/components/marketing/VideoSlot';

// 動画アセット差し替えポイント:
//   public/videos/doublehub-home-solution.mp4 を置けば自動でループ再生に切り替わる。
//   未配置の場合は posterSrc の既存スクショ（doublehub-memory.webp）にフォールバック。
const HOME_SOLUTION_VIDEO = '/videos/doublehub-home-solution.mp4';
const HOME_SOLUTION_POSTER = '/images/doublehub-memory.webp';

/**
 * Solution セクション
 * DoubleHub がどう解決するかを 3 ステップで提示。右側にアプリ画面を添える。
 */

const steps = [
  {
    num: '1',
    title: '日々の記録や対話を積み重ねる',
    desc: 'あなたとの対話や、連携アプリからの記録を通じて、DoubleHub はあなた自身を少しずつ理解していきます。',
  },
  {
    num: '2',
    title: '好き、苦手、頑張り方のクセを学ぶ',
    desc: '好きなもの、苦手なこと、朝型か夜型か、追い込みすぎると止まるタイプか。使うほどに、あなたへの理解が深まっていく。',
  },
  {
    num: '3',
    title: '理解しているから、的確に返せる',
    desc: 'あなたを知っているからこそ、上辺じゃないアドバイスができる。一般論ではなく、あなたに合った具体的な一歩を提案します。',
  },
];

export function SolutionSection() {
  return (
    <section className="relative overflow-hidden border-t border-divider bg-surface-2/40 py-20 md:py-24">
      <Container width="wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionEyebrow number="01" label="Solution" />
          <h2 className="mt-4 font-display text-[clamp(1.75rem,1.1rem+2.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
            DoubleHub は、<br className="sm:hidden" />
            あなたを理解することから始める。
          </h2>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            {steps.map((s, idx) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.1,
                }}
                className="flex gap-4 md:gap-5"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent-warm font-display text-lg font-semibold text-white shadow-md">
                    {s.num}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] md:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm md:max-w-md"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-xl">
              {/* aspect-ratio を親に固定することで、動画が読込中・フォールバック切替時に
                  intrinsic 800×1400 のまま親幅を押し広げて横ジッターを起こすのを防ぐ。 */}
              <div className="relative aspect-[800/1400] w-full overflow-hidden rounded-[1.5rem]">
                <VideoSlot
                  videoSrc={HOME_SOLUTION_VIDEO}
                  posterSrc={HOME_SOLUTION_POSTER}
                  alt="DoubleHub があなたを理解している画面"
                  width={800}
                  height={1400}
                  sizes="(min-width: 768px) 420px, 80vw"
                  mediaClassName="rounded-[1.5rem]"
                  className="absolute inset-0 rounded-[1.5rem]"
                />
              </div>
            </div>
            {/* 装飾: 後ろの光 */}
            <div
              aria-hidden
              className="absolute inset-[-20%] -z-10 rounded-full bg-primary/15 blur-3xl"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
