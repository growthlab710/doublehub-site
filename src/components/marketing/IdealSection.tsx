'use client';

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/marketing/SectionEyebrow';

/**
 * Ideal セクション
 * 「自分がもう一人いたら」の理想像を、理解不足 vs DoubleHub の対比で提示。
 */
export function IdealSection() {
  const notUs = [
    '上辺だけのアドバイスや一般論',
    '文脈を理解してないただの会話相手',
    '毎回リセットされる AI チャット',
  ];
  const us = [
    'あなたの性格や習慣を理解している',
    '理解しているからこそ、的確に返せる',
    '使うほどに、あなたへの理解が深まる',
  ];

  return (
    <section className="border-t border-divider py-20 md:py-24">
      <Container width="default">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionEyebrow label="Your Partner" />
          <h2 className="mt-4 font-display text-[clamp(1.75rem,1.1rem+2.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
            「自分がもう一人いたら」と<br className="sm:hidden" />
            思ったことはないだろうか？
          </h2>
          <p className="mt-5 text-base text-text-muted">
            DoubleHub はいつもそばにいる、<br className="sm:hidden" />
            頼れる相棒のような存在を目指します。
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2 md:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-surface-2 p-6 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-text-faint">
              理解不足
            </p>
            <ul className="mt-5 space-y-3">
              {notUs.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-text-faint" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="rounded-2xl border border-primary/30 bg-primary-soft p-6 shadow-sm md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              DoubleHub が目指す姿
            </p>
            <ul className="mt-5 space-y-3">
              {us.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
