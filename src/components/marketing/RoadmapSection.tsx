'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, CircleDashed } from 'lucide-react';
import { Container } from '@/components/ui/Container';

/**
 * Roadmap セクション
 * Now / Next / Future の 3 フェーズをタイムライン風に配置。
 */

type CheckState = 'done' | 'progress' | 'pending';

type Phase = {
  label: string;
  title: string;
  desc: string;
  checks: { text: string; state: CheckState }[];
  tone: 'now' | 'next' | 'future';
};

const phases: Phase[] = [
  {
    label: 'Now',
    tone: 'now',
    title: '既存サービスを磨く',
    desc: 'TrainNote、Book Compass をそれぞれ磨き、単体でも選ばれるサービスへ。DoubleHub 本体は設計・開発を推進中。',
    checks: [
      { text: 'TrainNote — AI Coach Plus（5名の専門コーチ）', state: 'done' },
      { text: 'Book Compass — AI 読書整理', state: 'done' },
      { text: 'DoubleHub 本体 — 設計・開発中', state: 'progress' },
    ],
  },
  {
    label: 'Next',
    tone: 'next',
    title: '連携基盤を整える',
    desc: '認証とデータ連携の土台を整え、各サービスから必要な情報だけをダブルが横断的に読める状態をつくる。',
    checks: [
      { text: '共通認証基盤の構築', state: 'pending' },
      { text: 'フェデレーテッド API 設計', state: 'pending' },
      { text: 'データ連携の同意フロー', state: 'pending' },
    ],
  },
  {
    label: 'Future',
    tone: 'future',
    title: '生活全体へ広げる',
    desc: '家計、健康、娯楽まで入力が増えるほど、あなたにとって満足度の高い配分や選択を提案できるように。',
    checks: [
      { text: '家計・健康データの接続', state: 'pending' },
      { text: '横断インサイトの精度向上', state: 'pending' },
      { text: 'ダブルのパーソナライズ深化', state: 'pending' },
    ],
  },
];

const toneStyles: Record<Phase['tone'], { badge: string; border: string }> = {
  now: {
    badge: 'bg-primary text-white',
    border: 'border-primary/40',
  },
  next: {
    badge: 'bg-accent-warm/90 text-white',
    border: 'border-accent-warm/30',
  },
  future: {
    badge: 'bg-surface-2 text-text-muted border border-border',
    border: 'border-border',
  },
};

function CheckIcon({ state }: { state: CheckState }) {
  if (state === 'done')
    return <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" strokeWidth={2} />;
  if (state === 'progress')
    return <CircleDashed className="h-4 w-4 flex-shrink-0 animate-spin-slow text-accent-warm" strokeWidth={2} />;
  return <Circle className="h-4 w-4 flex-shrink-0 text-text-faint" strokeWidth={1.5} />;
}

export function RoadmapSection() {
  return (
    <section className="border-t border-divider py-20 md:py-24" id="roadmap">
      <Container width="wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Roadmap
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,1.1rem+2.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
            三つの入口から、<br className="sm:hidden" />
            人生全体の入力基盤へ。
          </h2>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3 md:gap-6">
          {phases.map((p, idx) => {
            const styles = toneStyles[p.tone];
            return (
              <motion.article
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.1,
                }}
                className={`rounded-2xl border ${styles.border} bg-surface p-6 shadow-sm md:p-7`}
              >
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${styles.badge}`}
                >
                  {p.label}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-[-0.01em] md:text-xl">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {p.desc}
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-divider pt-4">
                  {p.checks.map((c) => (
                    <li key={c.text} className="flex items-start gap-2.5 text-xs text-text-muted md:text-sm">
                      <CheckIcon state={c.state} />
                      <span
                        className={
                          c.state === 'done'
                            ? 'text-text'
                            : c.state === 'progress'
                              ? 'text-text'
                              : ''
                        }
                      >
                        {c.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
