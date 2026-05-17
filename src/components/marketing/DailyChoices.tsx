'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/marketing/SectionEyebrow';

/**
 * Daily Choices セクション（軸①）
 *
 * 日常の分岐点シーンで、一般的な AI と DoubleHub の返答を比較。
 * 軽い選択（運動/学習、プレゼント）から重い選択（人生の選択）まで
 * グラデーションで配置し、「日常のあらゆる場面に寄り添う」ことを
 * 伝える。旧 HTML の Use Cases セクションを拡張して 6 ケース化。
 */

type Choice = {
  tag: string;
  tagVariant: 'daily' | 'trainnote' | 'bookcompass' | 'cross';
  title: string;
  generic: string;
  double: string;
  why: string;
};

const choices: Choice[] = [
  {
    tag: '日常の小さな選択',
    tagVariant: 'daily',
    title: '今日は運動と学習、どちらを優先すべき？',
    generic:
      '両方大事です。時間配分を決めて計画的に取り組みましょう。',
    double:
      'トレーニングの記録を見ると、今週は強度高めで疲労溜まってる。読書は進みが良いから、今日は軽めの運動で切り替えて、明日の朝に学習を入れるのがいい感じ。',
    why: 'あなたの今週のコンディションと学習の進み具合の両方を知っているから、無理のない配分を返せる。',
  },
  {
    tag: '日常の小さな選択',
    tagVariant: 'daily',
    title: '家族へのプレゼント、何にしよう？',
    generic:
      '相手の趣味や最近欲しがっているものを考慮して選びましょう。',
    double:
      '前にお母さんが「読書灯が欲しい」って話してたの、メモに残ってたよ。去年の誕生日はキッチン用品だったから、今年は読書周りに振るの良さそう。',
    why: '会話のメモや過去の贈り物の履歴から、「何を大事にしている相手か」を一緒に覚えている。',
  },
  {
    tag: 'トレーニング連携',
    tagVariant: 'trainnote',
    title: 'サボりがちになってきたとき',
    generic:
      '筋トレは継続が大事です。モチベーションを保つために目標を見直してみましょう。',
    double:
      '2週間空くとそのまま1ヶ月止まりやすいのがあなたのパターンだよね。今日は家で腕立て10回だけでもいいから、ゼロにしないのが大事。',
    why: 'トレーニングの記録から「中断→復帰」のパターンを知っているから、タイミングと強度を適切に提案できる。',
  },
  {
    tag: '読書連携',
    tagVariant: 'bookcompass',
    title: '漠然とした停滞感があるとき',
    generic:
      '新しいことに挑戦してみましょう。視野を広げるために異分野の本を読んでみてはいかがですか。',
    double:
      '最近ビジネス書ばかりだけど、前に科学の本を読んだ時に「視点が一気に広がった」って書いてたよね。違うジャンルを1冊挟んでみるのはどう？',
    why: 'BookCompass の読書メモから、過去にどのジャンルがあなたに効いたかを知っているから、具体的かつ根拠のある提案ができる。',
  },
  {
    tag: 'データ横断',
    tagVariant: 'cross',
    title: '最近なんか調子が悪いと感じているとき',
    generic:
      '十分な休息を取って、無理のない範囲で活動しましょう。',
    double:
      'トレーニングの運動頻度が3週間で半分に落ちてる。読書も2週間新しい本を開いてない。前にこのパターンになった時は仕事の負荷が原因だったよね。今週は回復に振り切って、来週からまた始めよう。',
    why: '複数のサービスを横断して全体の変化を読み取り、過去の類似パターンと照合して提案する。',
  },
  {
    tag: 'データ横断',
    tagVariant: 'cross',
    title: '人生の選択に迷っているとき',
    generic:
      '転職で重視すべきポイントは年収、成長環境、ワークライフバランスです。',
    double:
      '3ヶ月前に読んだ本で「安定より挑戦を選びたい」って書いてたよね。最近の運動の記録を見ても調子は良さそう。今のコンディションなら、挑戦する側に振ってみていいんじゃない？',
    why: 'あなたの価値観、性格、今のコンディションを踏まえて、一般論ではなく「あなたに合う選択肢」を返せる。',
  },
];

// すべて「チップ」として見えるよう、既存カード背景（ほぼ白）に細かれない濃さに揃える。
const tagStyles: Record<Choice['tagVariant'], string> = {
  daily: 'bg-primary/20 text-primary',
  trainnote: 'bg-[#00e5ff45] text-[#006b7a] dark:text-[#00e5ff]',
  bookcompass: 'bg-[#e8911a45] text-[#a56309] dark:text-[#e8911a]',
  cross: 'bg-accent-warm/20 text-accent-warm',
};

export function DailyChoices() {
  return (
    <section id="daily-choices" className="relative py-20 md:py-28">
      <Container width="wide">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow number="02" label="Daily Choices" />
          <h2 className="mt-4 font-display text-[clamp(1.75rem,1.1rem+2.4vw,2.75rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
            日常の小さな分かれ道で、<br className="sm:hidden" />
            ちょっとスマートに。
          </h2>
          <p className="mt-4 text-base text-text-muted">
            「運動と学習、どっち？」「プレゼント何にしよう？」<br />
            そんな日常の思考の分岐点で、ダブルが一歩賢い選択をそっと後押しします。
          </p>
          <p className="mt-3 text-sm text-text-faint">
            同じ問いに対する、一般的な AI と DoubleHub の返答の違いをご覧ください。
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:gap-8">
          {choices.map((c, idx) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.min(idx * 0.06, 0.3),
              }}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${tagStyles[c.tagVariant]}`}
                >
                  {c.tag}
                </span>
              </div>

              <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] md:text-2xl">
                {c.title}
              </h3>

              <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-5">
                {/* 一般的な AI */}
                <div className="rounded-xl border border-border bg-surface-2 p-4 md:p-5">
                  <span className="inline-flex items-center rounded-full bg-text-faint/15 px-2.5 py-0.5 text-[11px] font-medium text-text-muted">
                    一般的な AI
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {c.generic}
                  </p>
                </div>

                {/* DoubleHub */}
                <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary-soft p-4 md:p-5">
                  <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                    DoubleHub
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-text">
                    {c.double}
                  </p>
                </div>
              </div>

              <p className="mt-5 border-t border-divider pt-4 text-xs leading-relaxed text-text-faint md:text-sm">
                <span className="font-semibold text-text-muted">なぜこう返せる？ </span>
                {c.why}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
