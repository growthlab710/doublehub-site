'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Container } from '@/components/ui/Container';

/**
 * Ecosystem Tabs セクション
 *
 * 旧 HTML の 5 タブ切替 UI を移植。
 * TrainNote / Book Compass / DoubleHub 本体 / 家計（Future）/ 健康（Future）
 * を横断的に紹介し、「どのサービスから入るか」を選ぶ体験を提供する。
 */

type TabStatus = 'current' | 'coming' | 'future';

type InsightPanel = {
  id: string;
  name: string;
  status: TabStatus;
  statusLabel: string;
  tabDesc: string;
  panelLabel: string;
  title: string;
  inputs: string[];
  understands: string[];
  visual: 'screenshots' | 'abstract-todo' | 'abstract-finance' | 'abstract-health';
  screenshots?: { src: string; alt: string }[];
};

const panels: InsightPanel[] = [
  {
    id: 'trainnote',
    name: 'TrainNote',
    status: 'current',
    statusLabel: 'Current',
    tabDesc: '運動量、継続リズム、目標への向き合い方',
    panelLabel: 'Input → Insight',
    title: 'TrainNote から入るのは、筋トレ記録だけではない。',
    inputs: ['運動メニューと頻度', '調子の波と中断しやすい時期', '目標に対する粘り方'],
    understands: ['どんな負荷なら続けやすいか', '落ち込みやすいタイミング', '気合いより仕組みが効くタイプか'],
    visual: 'screenshots',
    screenshots: [
      { src: '/images/trainnote-peak.webp', alt: 'TrainNote ホーム画面 — PEAK バッジと AI Coach' },
      { src: '/images/trainnote-coach-detail.webp', alt: 'TrainNote AI Coach 提案画面' },
    ],
  },
  {
    id: 'bookcompass',
    name: 'Book Compass',
    status: 'current',
    statusLabel: 'Current',
    tabDesc: '関心テーマ、読書メモ、価値観の変化',
    panelLabel: 'Input → Insight',
    title: 'Book Compass は、思考の地図をダブルに渡す。',
    inputs: ['読書テーマとメモの傾向', '何に反応し、何を繰り返し考えるか', '価値観や関心の変化'],
    understands: ['いま伸ばしたい知的テーマ', '思考のクセや偏り', '次に読むべき一冊の方向性'],
    visual: 'screenshots',
    screenshots: [
      { src: '/images/bookcompass-map.webp', alt: 'Book Compass ナレッジマップ' },
      { src: '/images/bookcompass-explore.webp', alt: 'Book Compass 探す画面' },
    ],
  },
  {
    id: 'doublehub',
    name: 'DoubleHub 本体',
    status: 'coming',
    statusLabel: 'Coming Soon',
    tabDesc: 'ToDo、予定、対話、感情の流れ',
    panelLabel: 'Coming Soon',
    title: 'DoubleHub 本体は、生活のリアルタイムな流れを残す。',
    inputs: ['ToDo と予定の配置', '先延ばしや集中のパターン', 'チャットで漏れる迷いや感情'],
    understands: ['疲れる予定の並び', '決断が鈍るタイミング', '今日の自分に必要な整理方法'],
    visual: 'abstract-todo',
  },
  {
    id: 'finance',
    name: '家計アプリ',
    status: 'future',
    statusLabel: 'Future',
    tabDesc: '自己投資や娯楽のバランス',
    panelLabel: 'Future Input',
    title: '家計データは「満足度の高い配分」を考える材料になる。',
    inputs: ['固定費と変動費の流れ', '自己投資、娯楽、浪費のバランス', '満足度に対する費用対効果'],
    understands: ['削るべき出費より、活かすべき支出', '自己投資の効きやすい領域', '我慢に寄らない満足度の高い選択'],
    visual: 'abstract-finance',
  },
  {
    id: 'health',
    name: '健康・ヘルスケア',
    status: 'future',
    statusLabel: 'Future',
    tabDesc: '睡眠、歩数、生活リズム',
    panelLabel: 'Future Input',
    title: '健康データで、努力の成果を生活リズムと読める。',
    inputs: ['睡眠、歩数、心身の回復具合', '忙しい時期の生活の乱れ', '気分とコンディションの相関'],
    understands: ['頑張れる日と休むべき日の違い', '無理が続くサイン', '行動提案の適切な強度'],
    visual: 'abstract-health',
  },
];

const statusStyles: Record<TabStatus, string> = {
  current: 'bg-primary/10 text-primary border-primary/30',
  coming: 'bg-accent-warm/10 text-accent-warm border-accent-warm/30',
  future: 'bg-text-faint/10 text-text-muted border-border',
};

function AbstractTodo() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="180" height="30" rx="8" className="fill-primary/20 stroke-primary/40" strokeWidth="1" />
      <rect x="10" y="50" width="85" height="85" rx="8" className="fill-surface-2 stroke-border" strokeWidth="1" />
      <rect x="105" y="50" width="85" height="40" rx="8" className="fill-surface-2 stroke-border" strokeWidth="1" />
      <rect x="105" y="100" width="85" height="35" rx="8" className="fill-primary/15 stroke-primary/40" strokeWidth="1" />
      <circle cx="52" cy="92" r="20" className="fill-primary/20" />
      <text x="52" y="97" textAnchor="middle" fontSize="14" className="fill-primary" fontWeight="600">📋</text>
    </svg>
  );
}

function AbstractFinance() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="h-full w-full">
      <rect x="10" y="120" width="30" height="30" rx="4" className="fill-accent-warm/30" />
      <rect x="50" y="80" width="30" height="70" rx="4" className="fill-accent-warm/40" />
      <rect x="90" y="50" width="30" height="100" rx="4" className="fill-accent-warm/50" />
      <rect x="130" y="30" width="30" height="120" rx="4" className="fill-primary/40" />
      <rect x="170" y="10" width="20" height="140" rx="4" className="fill-primary/50" />
      <line x1="10" y1="155" x2="195" y2="155" className="stroke-border" strokeWidth="1" />
    </svg>
  );
}

function AbstractHealth() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="h-full w-full">
      <path
        d="M10 100 Q30 60, 50 80 T90 70 T130 90 T170 50 T195 60"
        className="stroke-primary/60"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M10 120 Q30 100, 50 110 T90 105 T130 115 T170 95 T195 100"
        className="stroke-accent-warm/60"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="50" cy="80" r="4" className="fill-primary" />
      <circle cx="130" cy="90" r="4" className="fill-primary" />
      <circle cx="90" cy="105" r="4" className="fill-accent-warm" />
    </svg>
  );
}

function AbstractVisual({
  kind,
  label,
}: {
  kind: 'abstract-todo' | 'abstract-finance' | 'abstract-health';
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface-2/50 p-8">
      <div className="aspect-[5/4] w-full max-w-md">
        {kind === 'abstract-todo' && <AbstractTodo />}
        {kind === 'abstract-finance' && <AbstractFinance />}
        {kind === 'abstract-health' && <AbstractHealth />}
      </div>
      <span className="mt-4 text-sm text-text-muted">{label}</span>
    </div>
  );
}

const abstractLabels: Record<string, string> = {
  doublehub: 'ToDo・予定・対話をひとつに',
  finance: '収支バランスの可視化（構想中）',
  health: '生活リズムの可視化（構想中）',
};

export function EcosystemTabs() {
  return (
    <section className="py-20 md:py-28" id="ecosystem">
      <Container width="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-warm">
            Ecosystem
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,1rem+2.5vw,2.75rem)] font-semibold leading-tight">
            つながるほど、
            <br />
            理解が深まる。
          </h2>
          <p className="mt-4 text-text-muted">
            相棒の理解を深めるための入口。ひとつから始めて、つなげるほどあなたへの理解が増していく。
            気になるサービスを選ぶと、DoubleHub が受け取る情報が切り替わります。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-14"
        >
          <Tabs defaultValue="trainnote" className="w-full">
            <TabsList className="flex h-auto w-full flex-wrap gap-2 bg-transparent p-0">
              {panels.map((p) => (
                <TabsTrigger
                  key={p.id}
                  value={p.id}
                  className="flex flex-1 min-w-[150px] flex-col items-start gap-2 whitespace-normal rounded-xl border border-border bg-surface p-4 text-left data-[state=active]:border-primary/40 data-[state=active]:bg-primary/5 data-[state=active]:shadow-md"
                >
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyles[p.status]}`}
                  >
                    {p.statusLabel}
                  </span>
                  <span className="font-display text-sm font-semibold text-text">{p.name}</span>
                  <span className="text-xs leading-relaxed text-text-muted">{p.tabDesc}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {panels.map((p) => (
              <TabsContent key={p.id} value={p.id} className="mt-10">
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-10">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-warm">
                    {p.panelLabel}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                    {p.title}
                  </h3>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-border bg-surface-2/40 p-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        入力される情報
                      </span>
                      <ul className="mt-3 space-y-2 text-sm text-text">
                        {p.inputs.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        ダブルが理解すること
                      </span>
                      <ul className="mt-3 space-y-2 text-sm text-text">
                        {p.understands.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    {p.visual === 'screenshots' && p.screenshots ? (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {p.screenshots.map((s) => (
                          <div
                            key={s.src}
                            className="relative aspect-[9/16] overflow-hidden rounded-xl border border-border bg-surface-2"
                          >
                            <Image
                              src={s.src}
                              alt={s.alt}
                              fill
                              sizes="(min-width: 768px) 320px, 50vw"
                              className="object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <AbstractVisual
                        kind={p.visual as 'abstract-todo' | 'abstract-finance' | 'abstract-health'}
                        label={abstractLabels[p.id]}
                      />
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </Container>
    </section>
  );
}
