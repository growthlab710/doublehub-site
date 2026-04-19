/**
 * ブログ記事メタデータ。
 * Day 2 で MDX 本格化するまでは、既存 HTML から抽出した基本情報を扱う。
 */
export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO 8601
  tags: string[];
  readingTime?: number; // 分
}

/**
 * 20 記事のメタデータ一覧（既存 HTML から抽出）。
 * NOTE: 記事本文は Day 2 で MDX 化される予定。v1 では一覧表示 + 旧 HTML へのメタリダイレクトで到達。
 */
export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'perplexity-computer-guide',
    title: 'Perplexity Computer 完全ガイド — AI エージェントと作業する時代の実践',
    description: 'Perplexity Computer の使い方から、AI エージェントを日常業務に組み込む具体的な運用まで。',
    publishedAt: '2026-04-12',
    tags: ['AI', 'Productivity', 'Guide'],
    readingTime: 8,
  },
  {
    slug: 'ai-coding-agent-comparison-2026',
    title: '2026 年版 AI コーディングエージェント比較',
    description: 'Claude Code / Cursor / Devin / Copilot Workspace の現実的な使い分け。',
    publishedAt: '2026-04-08',
    tags: ['AI', 'Engineering'],
    readingTime: 10,
  },
  {
    slug: 'claude-code-auto-mode',
    title: 'Claude Code オートモードを仕事に入れた話',
    description: '完全自律モードの実務投入で見えた、得意・不得意と運用のコツ。',
    publishedAt: '2026-04-04',
    tags: ['AI', 'Engineering'],
    readingTime: 7,
  },
  {
    slug: 'gemini-api-spend-cap-april-2026',
    title: 'Gemini API 支出キャップ機能（2026 年 4 月）を徹底レビュー',
    description: '個人開発者向けの課金コントロール機能の実際。',
    publishedAt: '2026-04-02',
    tags: ['AI', 'API'],
    readingTime: 5,
  },
  {
    slug: 'gemini-chat-import',
    title: 'Gemini のチャット履歴インポート機能',
    description: '他サービスから Gemini への乗り換えを滑らかにする機能を試す。',
    publishedAt: '2026-03-30',
    tags: ['AI'],
    readingTime: 4,
  },
  {
    slug: 'llm-benchmark-guide-advanced',
    title: 'LLM ベンチマークガイド(上級編) — 本当に効く評価指標',
    description: 'コモディティ化したベンチマークの中から、自分のユースケースに効く指標を選ぶ。',
    publishedAt: '2026-03-26',
    tags: ['AI', 'Benchmark'],
    readingTime: 12,
  },
  {
    slug: 'llm-benchmark-guide-basics',
    title: 'LLM ベンチマークガイド(基本編)',
    description: 'MMLU、HumanEval、GSM8K … 主要ベンチマークの読み方と注意点。',
    publishedAt: '2026-03-24',
    tags: ['AI', 'Benchmark'],
    readingTime: 9,
  },
  {
    slug: 'ai-brain-fry-workload-creep',
    title: 'AI による “脳の揚げ過ぎ”— ワークロード・クリープに気をつけろ',
    description: 'AI と働くと「際限なく上積み」できてしまう。認知疲労との付き合い方。',
    publishedAt: '2026-03-20',
    tags: ['AI', 'Wellbeing'],
    readingTime: 6,
  },
  {
    slug: 'ai-workslop-bottleneck',
    title: 'AI 生成物でボトルネックが「人間のレビュー」に移った',
    description: 'Workslop 現象 — 生成の速さに人間のチェックが追いつかない問題。',
    publishedAt: '2026-03-16',
    tags: ['AI', 'Workflow'],
    readingTime: 6,
  },
  {
    slug: 'ai-cognitive-offloading',
    title: 'AI に考えることをどこまで任せるか — 認知オフロードの良い使い方',
    description: '「覚えなくていい」ことは何で、「考える力を残す」には何をすべきか。',
    publishedAt: '2026-03-12',
    tags: ['AI', 'Cognition'],
    readingTime: 7,
  },
  {
    slug: 'ai-critical-thinking',
    title: 'AI 時代のクリティカルシンキング',
    description: 'AI の出力を鵜呑みにしないための、3 つのチェック手順。',
    publishedAt: '2026-03-08',
    tags: ['AI', 'Thinking'],
    readingTime: 6,
  },
  {
    slug: 'ai-habit-guide',
    title: 'AI を日常の習慣に組み込む 7 つの方法',
    description: '「使う」を超えて「習慣化する」ためのテンプレート。',
    publishedAt: '2026-03-04',
    tags: ['AI', 'Habit'],
    readingTime: 8,
  },
  {
    slug: 'ai-healthy-work-guide',
    title: 'AI と健全に働くためのガイド',
    description: '肩こり、眼精疲労、集中力の消耗。AI 時代の身体性を取り戻す。',
    publishedAt: '2026-02-28',
    tags: ['AI', 'Wellbeing'],
    readingTime: 7,
  },
  {
    slug: 'ai-self-understanding-data',
    title: 'AI ×自己理解 — あなたのデータが次の行動を導く',
    description: '「気分日記」は AI にこそ相性がいい。自己理解を促すプロンプトの作り方。',
    publishedAt: '2026-02-24',
    tags: ['AI', 'Self-Understanding'],
    readingTime: 7,
  },
  {
    slug: 'ai-trainer-vs-human',
    title: 'AI トレーナー vs 人間トレーナー — どちらをいつ使うか',
    description: 'フィジカルトレーニングにおける AI と人間の役割分担。',
    publishedAt: '2026-02-20',
    tags: ['AI', 'Fitness'],
    readingTime: 5,
  },
  {
    slug: 'fitness-ai-record',
    title: 'フィットネス AI 記録 — TrainNote ができるまで',
    description: 'なぜ既存のトレーニング記録アプリで満足できなかったのか。',
    publishedAt: '2026-02-16',
    tags: ['TrainNote', 'Product'],
    readingTime: 6,
  },
  {
    slug: 'indie-dev-ai-implementation',
    title: 'インディー開発者の AI 実装録',
    description: '3 つのアプリを 1 人で開発する中で、AI にどこまで任せたか。',
    publishedAt: '2026-02-12',
    tags: ['Indie', 'AI'],
    readingTime: 9,
  },
  {
    slug: 'lifedata-self-understanding',
    title: 'ライフデータと自己理解 — なぜ統合が必要なのか',
    description: 'ToDo、読書、運動、それぞれ単独では見えないパターン。',
    publishedAt: '2026-02-08',
    tags: ['Self-Understanding'],
    readingTime: 8,
  },
  {
    slug: 'reading-ai-habit',
    title: '読書 × AI — 読書体験を深める AI 連携パターン',
    description: 'Mutter、要約、対話。読書を AI でアップグレードする 3 つの方法。',
    publishedAt: '2026-02-04',
    tags: ['BookCompass', 'Reading'],
    readingTime: 7,
  },
];

/** 日付降順で並べ替え */
export function getAllPosts(): BlogPostMeta[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getLatestPosts(limit = 3): BlogPostMeta[] {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
