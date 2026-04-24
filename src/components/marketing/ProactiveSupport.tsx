'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/marketing/SectionEyebrow';

/**
 * Proactive Support セクション（軸②）
 *
 * Double からの能動的な声かけをチャット吹き出し風に 3 件表示。
 * 「DoubleHub 本体で予定している体験」と上部で明示して開発中である
 * ことを誠実に伝える。
 */

type ProactiveMessage = {
  theme: string;
  title: string;
  message: string;
  insight: string;
};

const messages: ProactiveMessage[] = [
  {
    theme: '思考のバイアス',
    title: '最近のインプットに、偏りが見えます',
    message:
      '今週はビジネス書ばかり読んでるね。前に科学系の本で「視点が一気に広がった」ってメモしてた。一度話してみない？',
    insight: 'BookCompass の読書履歴 × あなた自身のメモを読み解いて声をかける。',
  },
  {
    theme: 'メモフォロー',
    title: '昨日のメモ、気になってました',
    message:
      '「このまま続けていいのか少し迷う」って残してたよね。焦って結論を出す前に、30分だけ一緒に整理してみない？',
    insight: '過去の文脈から「引っかかり」を拾い、適切なタイミングで話しかける。',
  },
  {
    theme: '行動提案',
    title: '今日は、軽めに動く日かもしれません',
    message:
      'トレーニングの回復度が3日連続で低め。明日が本番の予定だから、今日は散歩10分か軽いストレッチに切り替えよう。',
    insight: 'トレーニング記録 × 予定 × 過去のコンディションから最適な強度を提案。',
  },
];

export function ProactiveSupport() {
  return (
    <section className="relative border-t border-divider bg-surface-2/40 py-20 md:py-28">
      {/* 装飾: 右上にソフトグラデ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute right-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[320px] w-[320px] rounded-full bg-accent-warm/10 blur-[120px]" />
      </div>

      <Container width="wide">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow number="03" label="Proactive Partner" />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            DoubleHub 本体で予定している体験
          </span>

          <h2 className="mt-4 font-display text-[clamp(1.75rem,1.1rem+2.4vw,2.75rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
            ダブルは、<br className="sm:hidden" />
            向こうから話しかけてくる。
          </h2>
          <p className="mt-4 text-base text-text-muted">
            一般的な AI は、あなたが聞かないと黙っている。<br />
            DoubleHub は、気づいたことがあれば先に声をかける相棒です。
          </p>
        </div>

        {/* チャット吹き出し 3 件 */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:gap-7">
          {messages.map((m, idx) => (
            <motion.div
              key={m.theme}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.1,
              }}
              className="flex gap-4 md:gap-5"
            >
              {/* アバター: DoubleHub ロゴ */}
              <div className="flex-shrink-0">
                <div className="relative h-12 w-12 overflow-hidden rounded-full shadow-md ring-1 ring-border md:h-14 md:w-14">
                  <Image
                    src="/images/doublehub-icon.jpg"
                    alt="DoubleHub"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-1.5 text-center text-[10px] font-medium text-text-faint">
                  Double
                </p>
              </div>

              {/* 吹き出し */}
              <div className="relative flex-1">
                {/* テーマタグ */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                    {m.theme}
                  </span>
                </div>

                <div className="relative rounded-2xl rounded-tl-sm border border-border bg-surface p-5 shadow-sm md:p-6">
                  {/* 吹き出しの三角 */}
                  <span
                    aria-hidden
                    className="absolute left-[-7px] top-4 h-3 w-3 rotate-45 border-b border-l border-border bg-surface"
                  />
                  <p className="font-display text-base font-semibold leading-snug text-text md:text-lg">
                    {m.title}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-muted md:text-[15px]">
                    {m.message}
                  </p>
                </div>

                {/* インサイト注釈 */}
                <p className="mt-2.5 pl-1 text-xs leading-relaxed text-text-faint">
                  <span className="font-semibold text-text-muted">なぜ話しかけられる？ </span>
                  {m.insight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 締めの一文 */}
        <p className="mx-auto mt-14 max-w-xl text-center text-sm text-text-muted">
          聞かれなくても、気づいたら声をかける。<br />
          そういう存在は、あなたを本当に知っているからこそできる。
        </p>
      </Container>
    </section>
  );
}
