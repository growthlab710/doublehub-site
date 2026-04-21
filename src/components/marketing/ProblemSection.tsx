'use client';

import { motion } from 'framer-motion';
import { Users, MessageCircleOff, LayoutGrid } from 'lucide-react';
import { Container } from '@/components/ui/Container';

/**
 * Problem セクション
 * 現状の課題を 3 カードで提示。bento box 的にサイズ差を付ける。
 */

const problems = [
  {
    Icon: Users,
    title: '話せる相手はいる。でも理解者は少ない。',
    desc: 'SNSでつながっている人はいる。雑談できる友人もいる。でも、自分の趣味・思考・好き嫌い・頑張り方まで本当に理解してくれている人は、ほとんどいない。',
    accent: 'primary' as const,
  },
  {
    Icon: MessageCircleOff,
    title: 'AI チャットも増えた。でも毎回リセットされる。',
    desc: '便利な AI は増えた。でも会話するたびにゼロから。あなたの性格も、先週何に悩んでいたかも知らない。結局、一般的なアドバイスしか返ってこない。',
    accent: 'warm' as const,
  },
  {
    Icon: LayoutGrid,
    title: '記録アプリはある。でも全体像は誰も見ていない。',
    desc: '読書、筋トレ、タスク管理、家計。便利なアプリは増えたのに、それぞれバラバラ。あなたの全体像を把握している存在は、どこにもいない。',
    accent: 'primary' as const,
  },
];

export function ProblemSection() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Problem
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,1.1rem+2.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
            あなたのことをよく知っている存在じゃないと、<br className="hidden md:inline" />
            あなたにとって本当の価値につながらない。
          </h2>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3 md:gap-6">
          {problems.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.08,
              }}
              className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:p-7"
            >
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                  p.accent === 'primary'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-accent-warm/10 text-accent-warm'
                }`}
              >
                <p.Icon className="h-6 w-6" strokeWidth={1.6} />
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] md:text-xl">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
