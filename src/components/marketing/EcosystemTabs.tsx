'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/marketing/SectionEyebrow';

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
  /**
   * 'screenshots': 実機スクリーンショットを並べる
   * 'none': 視覚ビジュアルは出さず、代わりに note (補足) を表示
   */
  visual: 'screenshots' | 'none';
  screenshots?: { src: string; alt: string }[];
  /** visual === 'none' のときに表示される補足ブロック */
  note?: { label: string; body: string };
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
    status: 'current',
    statusLabel: 'Current',
    tabDesc: 'ToDo・メモ・予定、ダブルとの対話',
    panelLabel: 'Input → Insight',
    title: 'DoubleHub 本体は、生活のリアルタイムな流れを残す。',
    inputs: [
      '音声やテキストで投げた ToDo・メモ',
      'カレンダーの予定と期限の配置',
      'チャットで漏れる迷いや感情',
      '「覚えておいて」と伝えたメモリ',
    ],
    understands: [
      '動きやすい時間帯・疲れる予定の並び',
      '先延ばしや集中のパターン',
      '今日の自分に必要な整理と声かけの調子',
    ],
    visual: 'screenshots',
    screenshots: [
      { src: '/images/doublehub-task.jpg', alt: 'DoubleHub タスク画面——テキストと音声で投げた ToDo・メモを自動仕分け' },
      { src: '/images/doublehub-chat.jpg', alt: 'DoubleHub チャット画面——ダブルとの対話' },
    ],
  },
  {
    id: 'health',
    name: '健康・ヘルスケア',
    status: 'current',
    statusLabel: 'Current',
    tabDesc: '睡眠・歩数・活動量の傾向',
    panelLabel: 'Input → Insight',
    title: 'ヘルスケア連携で、努力の成果を生活リズムと読める。',
    inputs: [
      '睡眠時間・睡眠スコア（Apple Health 等から連携）',
      '1 日の歩数・アクティビティ量・エクササイズ分数',
      '週次・月次で見た身体のコンディションの波',
      '体調の揺らぎと予定の詰まり具合の関係',
    ],
    understands: [
      '頑張れる日と休むべき日の違い',
      '睡眠不足が集中力・決断力に与える影響',
      '今日のタスク量が身体に見合っているか',
      '行動提案の適切な強度（励ましを控えめにするか・背中を押すか）',
    ],
    visual: 'none',
    note: {
      label: '読み取り専用、生データは保存しません',
      body: 'DoubleHub は Apple HealthKit から集計値のみを受け取り、書き込みは一切行いません。「最近あまり眠れていないみたいですね。明日の 5 件は少し多いかもしれません」のように、身体と予定を結びつけた気づきをダブルが届けます。',
    },
  },
  {
    id: 'finance',
    name: '家計アプリ',
    status: 'future',
    statusLabel: 'Future',
    tabDesc: '自己投資・娯楽・生活のバランス',
    panelLabel: 'Future Input',
    title: '家計データは「満足度の高い配分」を考える材料になる。',
    inputs: [
      '固定費と変動費の流れ',
      '自己投資・娯楽・浪費のバランス',
      '「使って良かった」と感じた支出のメモ',
      '買うか迷っているものとその背景',
    ],
    understands: [
      '削るべき出費より、活かすべき支出',
      '自分にとって「充電になるお金の使い方」',
      '自己投資が効きやすい領域とタイミング',
      '我慢に寄らない、満足度の高い選択',
    ],
    visual: 'none',
    note: {
      label: '構想中の領域です',
      body: '家計連携は現在未実装。将来的には「何を買うべきか」よりも「どんな使い方が自分を充電させるか」を一緒に考えるパートナーとして、ダブルが寄り添える姿を構想しています。',
    },
  },
];

/**
 * タブボタンに表示する各プロダクトの公式アイコン。
 * 定義された panel のみアイコンを表示し、未定義はバッジのみにフォールバック。
 */
const panelIconMap: Record<string, string> = {
  trainnote: '/images/trainnote-app-icon.jpg',
  bookcompass: '/images/bookcompass-app-icon.jpg',
  doublehub: '/images/doublehub-icon.jpg',
};

const statusStyles: Record<TabStatus, string> = {
  current: 'bg-primary/10 text-primary border-primary/30',
  coming: 'bg-accent-warm/10 text-accent-warm border-accent-warm/30',
  future: 'bg-text-faint/10 text-text-muted border-border',
};

/**
 * 実機スクリーンショットがないパネル用の補足ノートブロック。
 * 抽象図形を出さず、説明の丁寧さを優先する。
 */
function PanelNote({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface-2/40 p-5 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </p>
      <p className="mt-2 text-sm leading-[1.85] text-text-muted md:text-[0.95rem]">
        {body}
      </p>
    </div>
  );
}

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
          <SectionEyebrow number="04" label="Ecosystem" />
          <h2 className="mt-4 font-display text-[clamp(1.8rem,1rem+2.5vw,2.75rem)] font-semibold leading-tight">
            つながるほど、
            <br />
            理解が深まる。
          </h2>
          <p className="mt-4 text-text-muted">
            相棒の理解を深めるための入口。ひとつから始めて、つなげるほどあなたへの理解が増していく。
          </p>
          <p className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <ChevronRight className="h-3 w-3" />
            下のサービスをタップして切り替えてみてください
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
                  /* Liquid Glass: 通常は regular / アクティブ時は primary ティントを紡へる。
                     "タブを押す” 操作でガラスが光る演出で、AIっぽい「同規格カードの連続」を破る。 */
                  className="liquid-glass group relative flex flex-1 min-w-[150px] cursor-pointer flex-col items-start gap-2 whitespace-normal rounded-xl border-0 p-4 pr-8 text-left transition-all duration-300 hover:-translate-y-0.5 data-[state=active]:-translate-y-0.5 data-[state=active]:bg-primary/10 data-[state=active]:ring-2 data-[state=active]:ring-primary/40"
                >
                  <div className="flex items-center gap-2">
                    {panelIconMap[p.id] && (
                      <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-lg ring-1 ring-border/70">
                        <Image
                          src={panelIconMap[p.id]}
                          alt=""
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyles[p.status]}`}
                    >
                      {p.statusLabel}
                    </span>
                  </div>
                  <span className="font-display text-sm font-semibold text-text">{p.name}</span>
                  <span className="text-xs leading-relaxed text-text-muted">{p.tabDesc}</span>
                  <ChevronRight className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary group-data-[state=active]:rotate-90 group-data-[state=active]:text-primary" />
                </TabsTrigger>
              ))}
            </TabsList>

            {panels.map((p) => (
              <TabsContent key={p.id} value={p.id} className="mt-10">
                {/* パネルは liquid-glass-heavy で文字の読みやすさを保つ。
                    タブとの対比で「上に浮かんだパネル」に見える */}
                <div className="liquid-glass-heavy rounded-2xl p-6 md:p-10">
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

                  {p.visual === 'screenshots' && p.screenshots ? (
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
                  ) : p.note ? (
                    <div className="mt-8">
                      <PanelNote label={p.note.label} body={p.note.body} />
                    </div>
                  ) : null}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </Container>
    </section>
  );
}
