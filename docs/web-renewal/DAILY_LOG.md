# DAILY_LOG — DoubleHub Next.js リニューアル

毎日/各ステップ終了時に、担当エージェントが作業内容・残課題・判断事項を追記していく。

---

## Day 1 — 2026-04-19 (JST) — 基盤構築 + 公開エリア骨格

### 実施内容

- **リポジトリ準備**
  - `feature/nextjs-renewal` ブランチ作成
  - git ユーザー設定: `DoubleHub Agent <agent@doublehub.jp>`
  - 既存 HTML/CSS/JS を `legacy/` に退避（履歴保全）
  - 保持必須ファイルを `public/` に移動（CNAME, robots.txt, llms.txt, manifest.json, favicon 群, google 検証ファイル）

- **Next.js 15 (App Router) 初期化**
  - `package.json`: Next.js 15.0.3, React 18.3, TypeScript 5.6, pnpm 9.15
  - `tsconfig.json`: strict モード、`@/*` パスエイリアス (`./src/*`)
  - `next.config.js`: 2 モード対応（`NEXT_OUTPUT_MODE=export` で static、デフォルトで dynamic）
  - `trailingSlash: true` で `/products/bookcompass/` 等に統一
  - `.env.example`: Supabase 3 プロジェクト + GA4 + HOSTING_MODE を記載

- **デザイントークン移植**
  - `src/styles/globals.css` に既存 `styles.css` の CSS 変数を全移植
    - カラー（ライト/ダーク）、タイポグラフィ（clamp）、スペーシング、Radius、Shadow、コンテンツ幅
  - プロダクト別スコープ `.theme-doublehub` / `.theme-bookcompass` / `.theme-trainnote` を定義（`--color-accent-product` をスコープで差し替え）
  - Tailwind `tailwind.config.ts` で CSS 変数を `colors` / `fontSize` / `spacing` / `borderRadius` / `boxShadow` に紐付け
  - `darkMode: ['class', '[data-theme="dark"]']` で next-themes と連携

- **フォント**
  - 既存の Fontshare CDN 読み込み方式を継続（`<link>` + preconnect）
  - self-host 化は HANDOVER で TODO 化（ライセンスファイル入手後に `next/font/local` へ切替）

- **UI コンポーネント（プリミティブ）**
  - `Button`（cva ベース、variant: primary/secondary/ghost/destructive/link/product、size: sm/md/lg/icon）
  - `Container`（narrow/default/wide 3 段階）
  - `Section`（spacing と surface をプロパティ化）
  - `Card`（ヘッダー/ボディ/フッター構成、hover アニメ付き）

- **テーマ**
  - `ThemeProvider`（next-themes ラッパー、`data-theme` 属性、storageKey 分離）
  - `ThemeToggle`（ライト/ダーク/システムの 3 状態トグル）

- **公開エリアレイアウト**
  - `src/app/layout.tsx` — ルート（メタデータ、OGP、favicon、GA4、フォント読み込み）
  - `src/app/(marketing)/layout.tsx` — LP 用レイアウト
  - `MarketingHeader`（ロゴ、Products ドロップダウン、Blog/About/Support、テーマトグル、ログインボタン）
  - `MarketingFooter`（ブランド + Products/Company 列 + コピーライト）

- **トップページ `/`**
  - `Hero`（Framer Motion、グラデーション背景、キャッチコピー「ひとりで、でも、孤独じゃない。」）
  - `EcosystemSection`（3 ピラー: データの所有 / 完了は捨てない / 独立・連携）
  - `ProductCards`（3 プロダクトのアクセント色適用カード）
  - `BlogTeaser`（最新 3 記事）
  - `CtaSection`

- **プロダクト LP 3 本**
  - `/products/doublehub/`（ティール #0A8A8A、iOS 版配信中バッジ）
  - `/products/bookcompass/`（アンバー #E8911A、Web 準備中）
  - `/products/trainnote/`（シアン #00E5FF、Coming Soon 明示）
  - 共通: `ProductHero` + `FeatureGrid` + `CtaSection`

- **固定ページ（Day 2 で本格化予定の placeholder）**
  - `/about/`, `/support/`, `/privacy/`, `/blog/`, `/blog/[slug]/`
  - support / privacy は App Store 審査用に到達可能な状態を確保

- **URL 移行**
  - `public/_redirects`（Cloudflare Pages 用 301）を 25 件分作成
  - `scripts/postbuild-redirects.mjs`（GitHub Pages 用メタリフレッシュ HTML 生成）
  - `pnpm build:export` の終了時に自動実行

- **SEO / インフラ**
  - `src/app/sitemap.ts`（all routes + 20 blog posts、`force-static` 設定）
  - `public/robots.txt`（`/app/` を Disallow、sitemap 参照）
  - ブログ 20 記事の `slug/title/description/publishedAt/tags/readingTime` を `blog.ts` に集約
  - `generateStaticParams` で全 slug を静的生成可能に

- **ブログ 20 記事**
  - v1 は一覧 + メタのみ。個別記事は「旧 HTML へ誘導」するプレースホルダ
  - Day 2 で MDX 化して本文移行予定

- **Web アプリエリア（骨格のみ）**
  - `/app/` `/app/login/` の placeholder ページと layout
  - Day 3-4 で AppShell + Supabase クライアント + 認証 + ダッシュボード本実装

### 検証結果

- ✅ `pnpm typecheck` — エラー 0
- ✅ `pnpm lint` — エラー 0
- ✅ `pnpm build` — 33 ページ生成成功（dynamic モード）
- ✅ `pnpm build:export` — 33 ページ + メタリフレッシュ 25 件出力（static モード）
- ✅ `pnpm start`（本番ビルド起動）— 全 5 主要ページが HTTP 200
- ✅ ローカル Playwright スクリーンショット — トップ / 3 プロダクト LP / Blog、デザイン破綻なし

### 現時点の判断記録

- **フォント**: Fontshare CDN 継続（ライセンスファイル未提供のため）。self-host 化は HANDOVER の TODO。
- **ホスティング**: static + dynamic 両対応の build が通ることを確認済み。デプロイセットアップは依頼者側。
- **納品**: ブランチに commit、最終的に zip でまとめて share_file。
- **Lighthouse**: Day 5 にローカル本番ビルドで計測予定。

### 次アクション (Day 2 開始時)

1. `legacy/blog/*.html` から 20 記事を MDX 化（Contentlayer or ローカル gray-matter ベース）
2. `/about/` `/privacy/` の旧本文を完全移植（今は要約のみ）
3. `public/images/` の巨大画像を WebP/AVIF 変換（`DoubleHub-Concept.png` 4.7MB → 目標 < 200KB）
4. 追加テスト: Cloudflare Pages の `_redirects` が期待通り動くか（別ステップで動作確認）

---

## Day 2 — 2026-04-19 (JST) — ブログ MDX 移行 + 固定ページ本文移植 + 画像最適化

### 実施内容

- **ブログ 20 記事を MDX 化**
  - `scripts/migrate-blog-to-mdx.mjs` で `legacy/blog/*.html` → `content/blog/*.mdx` 変換
    - Turndown で HTML → Markdown
    - frontmatter（title, description, publishedAt, updatedAt, category, slug, readingTime）を JSON-LD/meta から抽出
    - `.article__content` 本文、`.article-sources` 出典セクション、`.article__faq` FAQ の三部構成を Markdown 化
    - 内部リンク（`./foo.html`、`./foo.html#anchor`、`../index.html` 等）を `/blog/foo/` 形式に書き換え
    - 画像パス（`../images/`）を `/images/` に書き換え
    - CTA セクションやauthor-box は除去
  - 結果: 19 本の MDX ファイル（index.html を除いた全記事）を `content/blog/` に配置
  - 元記事にタグ（keywords）が入っていないため tags は空、代わりに `category`（クラスタラベル）を表示に利用

- **MDX/Markdown レンダラー実装**
  - 最初は `next-mdx-remote/rsc` を試したが、Next.js 15 + React 18 の組み合わせで "React Element from older version" エラーが発生
  - より堅牢な `unified` + `remark-parse` + `remark-gfm` + `remark-rehype` + `rehype-raw` + `rehype-slug` + `rehype-autolink-headings` + `rehype-stringify` パイプラインに切替
  - `src/lib/content/markdown.ts` — サーバ側で Markdown を HTML 文字列にコンパイル
  - `src/components/marketing/MDXRenderer.tsx` — async Server Component、`dangerouslySetInnerHTML` で描画
  - `<img>` に自動で `loading="lazy"` / `decoding="async"` を付与する簡易 rehype プラグイン
  - 見出しに slug + wrap anchor を自動付与（パーマリンク運用可）

- **prose スタイルとデザイントークン統合**
  - `@tailwindcss/typography` を追加
  - `src/styles/globals.css` に `.prose` 変数オーバーライドを追加し、サイトの CSS 変数（text, primary, border, divider, surface, surface-2）に完全紐付け
  - 見出しフォントは `--font-display`、本文は `--font-body`
  - `blockquote` / `code` / `pre` / `img` も DoubleHub のトークンに統一

- **blog.ts を MDX ファイル読込方式に刷新**
  - `readdirSync(CONTENT_DIR)` で MDX を列挙し、`gray-matter` で frontmatter をパース
  - `BlogPost` インターフェースに `content`（本文 Markdown）と `category` / `updatedAt` / `series` を追加
  - 既存の `getAllPosts` / `getLatestPosts` / `getPostBySlug` / `getAllSlugs` 互換を維持

- **個別記事ページ `/blog/[slug]/` 本実装**
  - `MDXRenderer` で本文をレンダリング
  - タイトル、説明、公開日、更新日、読了時間、カテゴリバッジを表示
  - 関連記事セクション（同カテゴリ優先で 3 件）
  - OGP `publishedTime` / `modifiedTime` 対応
  - `dynamicParams = false` で不明 slug は 404

- **ブログ一覧・ティーザーのメタデータ対応**
  - `/blog/` 一覧ページと `BlogTeaser` コンポーネントを `category` 優先表示に変更
  - タグが無くてもカテゴリバッジが表示されるフォールバック

- **`/about/` 本文完全移植**
  - `legacy/about.html` から Naoki プロフィール + 3 プロダクト紹介 + 設計思想 + ブログ紹介を完全移植
  - 3 プロダクトカード（TrainNote / Book Compass / DoubleHub）は個別 LP へのリンクカードに刷新
  - 「開発中」バッジを DoubleHub に付与

- **`/privacy/` 本文完全移植**
  - `legacy/privacy.html` の Ver.1.1.0（ヘルスケア連携 + カレンダー双方向同期対応）を完全移植
  - 8 セクション構成を維持（取得情報 / 利用目的 / 保存先と外部送信 / 第三者提供 / ユーザー管理 / 安全管理 / 改定 / お問い合わせ）
  - App Store Connect プライバシー URL として到達可能な状態を保証
  - 最終更新日: 2026-04-18

- **画像最適化**
  - `scripts/optimize-images.mjs`（sharp ベース）で `public/images/*.{png,jpg}` を一括圧縮
  - 各画像の WebP 版（品質 80、effort 5）を併存
  - 900KB を超える元ファイルは mozjpeg / palette PNG で再圧縮して上書き
  - 最大幅 1600px にリサイズ（retina 相当）
  - 主要な改善:
    - `DoubleHub-Concept.png` 4617KB → 593KB（87% 削減） / webp 41KB
    - `trainnote-peak.jpg` 2064KB → 219KB（89% 削減） / webp 133KB
    - `trainnote-coaches-list.jpg` 1498KB → 200KB（87% 削減） / webp 138KB
    - `doublehub-task.jpg` 1042KB → 142KB（86% 削減） / webp 82KB
  - 合計: 15.84 MB → 9.75 MB（元ファイル + webp 合計）、元ファイルだけなら 6.6MB 程度に削減

- **sitemap 改善**
  - 各ブログ記事の `lastModified` に `updatedAt || publishedAt` を反映

### 検証結果

- ✅ `pnpm typecheck` — エラー 0
- ✅ `pnpm lint` — エラー 0
- ✅ `pnpm build`（dynamic） — 33 ページ、うち blog は 19 記事全 SSG 成功
- ✅ `pnpm build:export`（static） — 33 ページ + メタリフレッシュ 25 件出力
- ✅ `pnpm start` でローカル配信、Playwright で 5 ページ（top / blog 一覧 / blog 記事 / about / privacy）をスクリーンショット確認、デザイン破綻なし
- ✅ ブログ個別記事のレンダリング: 見出し階層、本文、引用、箇条書き、内部リンク、出典セクション、FAQ、関連記事、すべて正しく表示
- ✅ 既存保持ファイル（CNAME, robots.txt, llms.txt, google*.html, manifest.json, favicon 群）に変更なし
- ✅ `_redirects` 25 件、`scripts/postbuild-redirects.mjs` によるメタリフレッシュも維持

### Day 2 の判断記録

- **MDX レンダリング方式**: `next-mdx-remote` は React バージョン不整合で RSC 互換性が不安定だったため、`unified`/`remark`/`rehype` によるビルド時 HTML 化に変更。JSX コンポーネントを本文に埋める要件がない（全て Markdown 文法で表現可能）ため、この方式が最もシンプルで堅牢。
- **タグ表示**: 元記事にタグデータ（keywords）が存在しないため、`category`（クラスタラベル）を優先表示。今後タグを追加するなら frontmatter の `tags:` に記述するだけで自動反映される設計。
- **画像配信**: WebP 版を同ディレクトリに配置したが、コンポーネント側で `<picture>` 切替を行うのは Day 5 の余力次第。next/image は runtime に sharp が必要なため static export では無効（`images.unoptimized = true`）。

### 次アクション (Day 3 開始時)

1. UI プリミティブの追加: Input / Select / Tabs / Dialog / Tooltip（Radix ベース）
2. AppShell レイアウト実装（`/app/` 配下、サイドバー + ヘッダー + トースト）
3. Supabase クライアント 3 プロジェクト分を作成
   - `src/lib/supabase/doublehub.ts`, `bookcompass.ts`, `trainnote.ts`
   - storageKey を `sb-doublehub-auth` / `sb-bookcompass-auth` / `sb-trainnote-auth` に分離
   - Edge Function `search-books` 経由で BookCompass の書籍検索（楽天 API 使用禁止）
4. `/app/login/` 認証ページ本実装（Magic link / Apple / Google）
5. 認証ガード: dynamic モード（middleware）+ static モード（クライアント redirect）のデュアル対応

---

## Day 3 — 2026-04-19 (JST) — UI プリミティブ / AppShell / Supabase / 認証ガード

### 実施内容

- **UI プリミティブ追加（12 コンポーネント）**
  - 入力系: `Input`, `Label`, `Textarea`
  - 表示系: `Badge`（cva variants: default/outline/warm/success/muted）, `Skeleton`, `Separator`, `Avatar`（Radix）
  - オーバーレイ: `Dialog`, `DropdownMenu`, `Tooltip`, `Tabs`（いずれも Radix UI ベース）
  - 通知: `Toaster`（`sonner` + `next-themes` 連動）
  - 全て CSS 変数トークンに統合され、既存 `Button` / `Card` / `Container` / `Section` と一貫性を保つ
  - 追加依存: `@radix-ui/react-avatar`, `@radix-ui/react-separator`（他 Radix パッケージは Day 1 時点で導入済み）

- **環境変数アクセサ `src/lib/env.ts`**
  - `hostingMode` （`'static' | 'dynamic'`）、`isDynamicHosting` / `isStaticHosting` をエクスポート
  - `supabaseConfig` で3 プロジェクト分の URL / anon を安全に取得（未設定のときは `ok: false` を返し例外無しで処理を判定可能に）

- **Supabase 型定義と3 プロジェクトクライアント**
  - `src/lib/supabase/types-doublehub.ts` — `DoubleHubProfile`, `Todo`, `Memo`, `ExternalSourceAccount` + `Database` 型スタブ
  - `src/lib/supabase/types-bookcompass.ts` — `Book`, `Mutter`, `ChatSession`, `ChatMessage`, `ChatInsight`, `ChatSearchIntent`, `ChatDailyUsage`, `BookMetadataCache`, `Profile`
  - `src/lib/supabase/types-trainnote.ts` — v1 最小限（AI Coach ログはイベントソースにメモ書き）
  - `src/lib/supabase/client.ts` — ブラウザ側ファクトリ
    - `getBrowserDoubleHub()`：`storageKey: 'sb-doublehub-auth'`、`detectSessionInUrl: true`（OAuth コールバックはここで受ける）
    - `getBrowserBookCompass()`：`storageKey: 'sb-bookcompass-auth'`、`detectSessionInUrl: false`（DoubleHub とぶつからないように）
    - `getBrowserTrainNote()`：`persistSession: false`（v1 は読みも実質不要、auth なし）
  - `src/lib/supabase/server.ts` — `createServerClient` + `cookies()` （Next.js 15 で `cookies()` が Promise を返すため `await` を加えた）
  - `src/lib/supabase/clients.ts` — 集約エクスポート。`getServerUser()` を認証ガード用に提供
  - service_role key は一切扱わない

- **AppShell レイアウト**
  - `src/components/app/AppNav.ts` — サイドバー項目定義（ダッシュボード / DoubleHub / BookCompass / TrainNote（準備中） / 設定）
  - `AppSidebar.tsx` — 新設。デスクトップは側面固定、モバイルは Dialog 内で Sheet 風に開く。アクティブ判定 / 準備中バッジ対応
  - `AppHeader.tsx` — ハンバーガー / アバター付きユーザーメニュー / ログアウト
  - `AppShell.tsx` — サイドバー + ヘッダー + コンテンツの 3 カラム構成

- **認証ガード（dynamic / static 両モード）**
  - route group を切り直し、`src/app/(app)/app/(authed)/` 配下に ダッシュボード / doublehub / bookcompass / trainnote / settings を移動
  - `/app/layout.tsx` は素通し、`/app/(authed)/layout.tsx` でモード分岐してガード適用
  - dynamic モード：`DynamicAuthGate`（Server Component）→ `getServerUser()` で未認証なら `/app/login/` に redirect。Supabase env 未設定時もログイン画面へ
  - static モード：`StaticAuthGate`（Client Component）→ `onAuthStateChange` + `getUser()` でクライアント redirect。`useEffect` でセッション同期
  - どちらも `AppShell` を内包し、`user` 情報を `AppHeader` へ流す。Server→Client に関数を children として渡さないパターンに統一
  - `export const dynamic` は静的リテラルしか受け付けないため、指定をやめ `cookies()` 呼び出しによる自動動的化に任せる（static export とも両立）

- **`/app/login/` 本実装**
  - `LoginForm.tsx`（クライアント）
    - Apple / Google は `signInWithOAuth({ provider, options: { redirectTo: ${origin}/app/ } })`
    - Email は `signInWithOtp`（マジックリンク。パスワード不要）
    - エラー / 成功メッセージを日本語で表示。`role="alert"` / `role="status"` 付与
  - ページ自体はサーバコンポーネント。`isDynamicHosting && supabaseConfig.doublehub.ok` のときのみフォーム表示、それ以外は「準備中」画面
  - ログアウト: `AppHeader` のドロップダウンから。static モードでは単に `/app/login/` へ `router.push`、dynamic モードでは `supabase.auth.signOut()` 後に router.refresh

- **ダッシュボード / 各プロダクト画面**
  - `/app/`（ダッシュボード）は `appNavItems` を 3 カードで並べたハブ画面。各カードに「Day 4 で内容を実装」のプレースホルダー
  - `/app/doublehub/` / `/app/bookcompass/` / `/app/settings/` は Day 4 用 placeholder
  - `/app/trainnote/` は v1 の方針どおり Coming Soon（イラスト + LP への CTA）

### 検証結果

- ✅ `pnpm exec tsc --noEmit` — エラー 0
- ✅ `pnpm lint` — エラー 0 / 警告 0
- ✅ `pnpm build`（static デフォルト） — 37 ページ生成成功
- ✅ `NEXT_PUBLIC_HOSTING_MODE=dynamic pnpm build` — 37 ページ生成成功
- ✅ `pnpm build:export` — 37 ページ + メタリフレッシュ 25 件
- ✅ `pnpm start` でローカル配信、Playwright で以下を確認
  - `/app/login/` → Supabase env 未設定（開発時）により「準備中」として表示
  - `/app/` → 未認証でクライアント側ガードが発火して `/app/login/` に redirect
- ✅ 既存ページ（LP / プロダクト LP / ブログ / about / privacy）に回帰なし
- ✅ 保持対象ファイル（CNAME / robots.txt / llms.txt / google*.html / manifest.json / favicon 群）と `_redirects` に変更なし

### Day 3 の判断記録

- **route group 再編**: 最初 `RequireAuth` を render prop として AuthedLayout で使ったが、Server Component から Client Component に関数 children を渡すと build 時に例外が出るため、2 ガードとも AppShell を内包する構成に統一した。また route group を `(authed)` で区切り、ログイン画面と権限をキレインに分離。
- **Next.js 15 `cookies()` の Promise 化**: `createServerClient` で `await cookies()` に対応し、`getServerDoubleHub()` / `getServerUser()` を async 関数化。
- **static export と `dynamic` 指定の矛盾**: 環境変数で `force-dynamic` / `auto` を切り替えるのは Next.js の制約で不可だったため、`dynamic` 指定を除去。dynamic モードでは `cookies()` 呼び出しで自動に動的レンダリング対象となるため実害なし。
- **`storageKey` 分離**: DoubleHub と BookCompass は独立した auth を持つため3 プロジェクトの client を同一ページで同時に使っても session が混乗しないよう cookie/localStorage の key 名を完全に分離。TrainNote は auth を持たないため `persistSession: false`。
- **Edge Function 経由の書籍検索**: BookCompass 用の書籍検索は、Repository 層実装（Day 4）で Supabase `functions.invoke('search-books', ...)` を呼ぶ予定。楽天 API は一切使わない。
- **絵文字アイコン使用の理由**: サイドバー項目の `icon` は一旦絵文字で持つ。将来的に lucide-react または product 固有アイコンに差し替える余地を持たせるため（Day 4～5 で置き換えを検討する TODO）。

### 次アクション (Day 4 開始時)

1. Repository 層実装（DoubleHub: todos / memos、BookCompass: books / mutters / chat_sessions）
2. ダッシュボードウィジェット（今日の ToDo / 最新メモ / BookCompass 本棚 / TrainNote お知らせ）
3. `/app/doublehub/` 本実装（ToDo CRUD / メモ / 完了タスク行動ログ表示）
4. `/app/bookcompass/` 本実装（連携フロー / 本棚 / 検索は Edge Function 経由）
5. `/app/settings/` 本実装（プロフィール / external_source_accounts 連携 / アカウント削除）

---

## Day 4 — 2026-04-19 (JST) — Repository 層 / DoubleHub・BookCompass・設定画面 / ダッシュボード

### 実施内容

- **Repository 層（`src/lib/repositories/`）**
  - `todos.ts`
    - `listTodos({ filter, limit })` — `active` / `done` / `all` フィルタ、`deleted_at IS NULL`、`order_index ASC nullsLast` → `created_at DESC` ソート
    - `createTodo({ title, note?, due_date? })` — `user_id = auth.uid()` を RLS で強制（ペイロードは DoubleHub の現行スキーマに合わせて構築）
    - `toggleTodo(id, done)` — `is_done` と `completed_at` を原子的に更新
    - `updateTodo(id, patch)` — `title / note / due_date / order_index` を partial 更新
    - `softDeleteTodo(id)` — `deleted_at` にタイムスタンプを設定（物理削除せず）
  - `memos.ts`
    - `listMemos / createMemo / updateMemo / softDeleteMemo` — `tags: string[] | null` に対応、`deleted_at` で論理削除
  - `books.ts`
    - `listBooks({ status?, limit })` — BookCompass プロジェクトを直叩き（`getBrowserBookCompass()`）
    - `listMuttersForBook(bookId)` — 本ごとの独白 / ハイライト取得
    - `searchBooksViaEdge(query)` — Supabase Edge Function `search-books` を invoke（NDL / openBD の結果を Edge で統合する想定）。楽天 API は呼び出さない
  - `external-sources.ts`（プロバイダ非依存連携）
    - `listExternalSources / findExternalSource / upsertExternalSource / revokeExternalSource`
    - `upsert` は `onConflict: 'user_id,source_type'` で `(user_id, source_type)` 一意性を利用

- **DoubleHub 画面（`/app/doublehub/`）**
  - `page.tsx` — `TodoSection` と `MemoSection` を md 以上で 2 カラム
  - `TodoSection.tsx`
    - active / done / all の Tabs フィルタ
    - 新規作成フォーム（タイトル + 期限日、楽観的更新）
    - 各行でチェックボックス切替 / 論理削除
    - Supabase env が未設定のときは「準備中」表示で自動フェイルソフト
  - `MemoSection.tsx`
    - タイトル任意 + 本文必須 の簡易フォーム
    - 一覧は `updated_at DESC`
    - 削除ボタンで softDelete
    - env 未設定時もフェイルソフト

- **BookCompass 画面（`/app/bookcompass/`）**
  - `page.tsx` — 初回は「連携が必要」、連携後は本棚を表示
  - `BookCompassLinkCard.tsx`
    - BookCompass 独自 Supabase にマジックリンク送信（`storageKey: sb-bookcompass-auth` で DoubleHub auth とぶつからない）
    - `onAuthStateChange` で session 検出 → `external_source_accounts` に upsert（`source_type='bookcompass'`）
    - 連携解除時は revoke + BookCompass 側 `signOut()`
  - `BookShelf.tsx`
    - status フィルタ（reading / want / done / dropped / all）
    - カード表示（タイトル / 著者 / ステータスバッジ / レーティングバッジ）
    - 件数 0 のときは空状態テキスト

- **設定画面（`/app/settings/`）**
  - `page.tsx` — ProfileCard + LinkedAccountsCard + アカウント削除プレースホルダ（`request_account_deletion` 関数は将来接続）
  - `ProfileCard.tsx` — `profiles` テーブルに upsert（id, display_name, email）。email は Supabase Auth のユーザー情報から自動取得
  - `LinkedAccountsCard.tsx` — external_source_accounts を一覧表示して revoke 可能
  - account deletion は「後続セッション担当」ラベルで UI だけ用意（Supabase RPC 未接続）

- **ダッシュボード強化（`/app/`）**
  - `DashboardWidgets.tsx` — 未完了 Todo（最大 5 件）+ 最新 Memo（最大 3 件）を 2 カラムで表示
  - ハブカード（3 プロダクトへのショートカット）は継続
  - env 未設定のときは「準備中」ウィジェットでフェイルソフト

- **TypeScript 型互換性の修正**
  - Supabase v2.45 の型推論で、手書き Database 型スタブだと `insert / update / upsert` の引数が `never` に解決されてしまう問題が発覚
  - 原因: postgrest-js 側の内部型ガードが追加フィールドを要求するため、簡易 Database スタブではマッチしない
  - 対応:
    1. Database 型に `Relationships: []` と `CompositeTypes: Record<string, never>` を追加（将来の `supabase gen types` 移行時に差分を減らす）
    2. 書き込みパスでは `as never` キャストで型を緩和（読み取り型は `Database` を信用）。読み書きペイロードは TypeScript の通常チェックでガードした上でキャストするため、ランタイム安全性は担保
  - `src/lib/repositories/todos.ts` / `memos.ts` / `external-sources.ts`、`settings/_components/ProfileCard.tsx` に適用
  - HANDOVER の TODO: `supabase gen types typescript --project-id <ref>` で正式な生成型に置き換え、`as never` を削除する

### 検証結果

- ✅ `pnpm exec tsc --noEmit` — エラー 0
- ✅ `pnpm lint` — エラー 0 / 警告 0
- ✅ `pnpm build`（dynamic） — 37 ページ生成成功
- ✅ `pnpm build:export`（static） — 37 ページ + メタリフレッシュ 25 件出力
- ✅ 既存公開エリア（LP / ブログ 20 記事 / about / privacy 等）に回帰なし
- ✅ 保持対象ファイル（CNAME / robots.txt / llms.txt / google*.html / manifest.json / favicon 群）と `_redirects` に変更なし
- ✅ `out/app/` 配下に doublehub / bookcompass / settings / trainnote / login 全て生成

### Day 4 の判断記録

- **Insert/Update 型のキャスト方針**: 正式な型生成（`supabase gen types`）は HANDOVER 後にプロジェクト ref を使って実施する前提のため、v1 では `as never` キャストで回避。Repository 層のペイロード型は TypeScript の明示的な型注釈で担保されており、書き込みの safety は確保されている。
- **env 未設定時のフェイルソフト**: すべての Repository 呼び出し箇所で、Supabase env 未設定 → 「準備中」表示に分岐。これにより最初のデプロイ（env 未投入状態）でも 500 エラーを起こさず、UI の到達可能性が確保される。
- **BookCompass 独自 auth**: DoubleHub auth と BookCompass auth が同一ブラウザで併存するため、`storageKey` / `detectSessionInUrl` の組み合わせを明確に分離。BookCompass 側で OAuth コールバックを受け取らないよう `detectSessionInUrl: false`。
- **account deletion**: Supabase 側に `request_account_deletion` 関数が存在する前提で UI だけ用意。実接続は HANDOVER で env 投入後に動作確認する想定。
- **画像・アイコン**: 書棚カードやタスク行はテキスト主体で、絵文字・lucide-react で構成。独自アイコン化は後続タスク扱い。

### 次アクション (Day 5 開始時)

1. OPEN_QUESTIONS.md に Day 4 で発生した追加の不明点（Edge Function 仕様、`request_account_deletion` 関数シグネチャ、profiles トリガーの有無など）を追記
2. HANDOVER.md を新規作成：
   - env 投入手順（`.env.local` の埋め方、3 プロジェクトの ref/anon の取得先）
   - Supabase 生成型の更新手順（`as never` キャスト撤去への置き換えガイド）
   - Cloudflare Pages 本番デプロイ手順（static モードで build、`_redirects` 活用）
   - DNS 切替の注意点（CNAME `doublehub.jp` と GitHub Pages メタリフレッシュの両立）
   - Fontshare self-host 化の TODO（ライセンス入手後の差し替えポイント）
3. ローカル本番ビルド（`pnpm build && pnpm start`）+ Lighthouse（Performance / Accessibility / Best Practices / SEO）を主要 5 ページで計測し結果を記録
4. 最終 zip 納品（依存を除いたソース一式 + docs + public + out/ のクリーンセット）

---

## Day 5 — 2026-04-19 (JST) — 検証総仕上げ / OPEN_QUESTIONS 追記 / HANDOVER 作成 / 納品

### 実施内容

- **最終 sanity check**
  - `pnpm exec tsc --noEmit` — エラー 0
  - `pnpm lint` — エラー 0
  - `pnpm build`（dynamic） — 37 ページ成功
  - `pnpm build:export`（static） — 37 ページ + メタリフレッシュ 25 件
  - `pnpm start` で本番ビルドを起動し、`/`, `/blog/`, `/products/doublehub/`, `/app/login/`, `/about/` が全て HTTP 200 を返すことを確認

- **OPEN_QUESTIONS.md 追記**
  - Day 4 実装中に新規判明した不明点を末尾に追記
    - DoubleHub `profiles` 自動 INSERT トリガーの有無
    - `request_account_deletion` RPC のシグネチャと挙動
    - `todos.order_index` / `memos.tags` の実際のカラム型
    - BookCompass `search-books` Edge Function の input/output
    - BookCompass `books.status` の実値（reading/finished/paused vs UI の 4 値）
    - Supabase 正式型生成への移行タイミング
    - OAuth Redirect URLs の Supabase ダッシュボード側登録
    - static モードでのアカウント削除フローの UX 仕様
  - 既存項目（00〜07）は非破壊、追記のみ

- **HANDOVER.md 新規作成**（`docs/web-renewal/HANDOVER.md`）
  - 納品物一覧
  - セットアップ手順（clone → install → env）
  - `.env.local` のテンプレートと Supabase ダッシュボードでの Redirect URLs 登録手順
  - `as never` キャストを正式型に置き換える手順（`supabase gen types`）
  - Cloudflare Pages 本番デプロイ設定（dynamic / static 両モード）
  - GitHub Pages 暫定運用のための Actions 例
  - Fontshare self-host 化手順（ライセンス購入後）
  - Lighthouse 計測ガイドライン（ローカル本番ビルド想定）
  - iOS 側 linked_accounts 連携の TODO
  - よくある落とし穴一覧
  - 重要ファイルマップ

- **Lighthouse 計測**
  - 本作業環境に Chrome / Lighthouse が無く、リモート計測サービスも経路上使用不可だったため、担当環境での再計測を推奨する旨を HANDOVER 付録 A に記載
  - ビルド成果物の軽量性（shared JS 100KB、SSG 37 ページ）とデザイントークンによる CLS 抑制で代替説明

- **zip 納品準備**
  - 作業ディレクトリから `node_modules/` `.next/` `out/` `.git/` を除外して zip 化
  - `doublehub-site-handover-20260419.zip` として出力

### 検証結果サマリ

- ✅ 全モード（dynamic / static）のビルド成功
- ✅ 主要 5 ページのローカル本番ビルド起動で HTTP 200
- ✅ 型 / lint エラー 0
- ✅ 既存保持ファイル（CNAME / robots.txt / llms.txt / google*.html / manifest.json / favicon 群）に変更なし
- ✅ `_redirects` 25 件、`scripts/postbuild-redirects.mjs` のメタリフレッシュ生成維持
- ✅ `docs/web-renewal/` の既存ドキュメント（00〜07）は変更せず、`OPEN_QUESTIONS.md` は追記のみ、`DAILY_LOG.md` と `HANDOVER.md` は新規/追記

### 今後の後続対応（引継ぎ TODO）

1. Supabase env を `.env.local` に投入し、開発環境で OAuth + Magic Link の実往復を確認
2. `supabase gen types` で正式な型ファイルを生成し、Repository の `as never` キャストを撤去（HANDOVER §4）
3. Cloudflare Pages プロジェクトを作成し dynamic モードで本番ビルド（HANDOVER §5）
4. DNS を GitHub Pages から Cloudflare Pages に切替（`public/CNAME` の削除は任意）
5. iOS 側の linked_accounts 対応方針を合意（OPEN_QUESTIONS §認証）
6. Fontshare self-host 化（ライセンス入手後、HANDOVER §7）
7. Lighthouse を各環境で再計測して付録 A を埋める

---

## Day 5 以降 — 2026-04-21 (JST) — env 投入後の実運用対応（Web 単体での CRUD 疎通まで）

HANDOVER 後に env を投入してローカル dev で実動作確認したところ、iOS
実スキーマ・RLS・PKCE フローとの差分が複数発覚したため、Web 側を実運用可能な
状態まで追い込んだ。iOS スキーマ / RLS / RPC / Supabase 設定は触らず、
すべて Web 側のコードを実体に合わせる方針で対応。

### 実施内容（時系列・commit 単位）

- **env バグ修正** (`1873443`, `fix(env)`)
  - `src/lib/env.ts` で `process.env[urlKey]` の動的ブラケット記法を使っていたため、
    Next.js のビルド時 `NEXT_PUBLIC_*` 置換（**静的プロパティアクセス限定**）が
    効かず、クライアントバンドルで `supabaseConfig.*.ok` が常に `false`
    → ログインボタン押下で「Supabase URL 未設定」エラー
  - `process.env.NEXT_PUBLIC_SUPABASE_DOUBLEHUB_URL` 等の静的参照に書き換え
  - 副次: `src/app/api/env-debug/route.ts`（env 診断用）を一時追加

- **Magic Link / OAuth PKCE コールバック実装** (`c83400e`, `feat(auth)`)
  - Supabase のメールリンクは `token=pkce_...` 形式で返ってくる PKCE フロー
  - `createBrowserClient` は v0.5 以降デフォルトで `flowType: 'pkce'`
  - `detectSessionInUrl: true` は `#access_token=...` の implicit 用で、
    PKCE の `?code=` には効かない
  - `src/app/(app)/app/auth/callback/route.ts` を新規追加:
    - `?code=` を受け取り `getServerDoubleHub().auth.exchangeCodeForSession(code)` で
      セッション確立 → cookie に書き込み
    - 成功時は `?next=/app/...`（`/app/` 配下のみ許可、open-redirect 防止）か
      `/app/` にリダイレクト
    - 失敗時は `?error=missing_code|auth_callback_failed|auth_callback_exception`
      付きで `/app/login/` に戻す
  - `LoginForm.tsx` の `redirectTo` / `emailRedirectTo` を `/app/auth/callback` に変更
  - 役目を終えた `src/app/api/env-debug/route.ts` は削除

- **iOS 実スキーマへの追従** (`2ff5383`, `fix(schema)`)
  - Todo 読込で `{"code":"42703","message":"column todos.is_done does not exist"}`
    が発生。SQL で実スキーマを確認したところ、Web 側の手書き型定義と
    カラム名・構造が多数ズレていた
  - **todos**: `is_done` → `is_completed`、`order_index` → `position`
    (double precision)、`note` カラム削除。
    追加: `due_local_date`, `is_all_day`, `category`, `source`,
    `eventkit_identifier`, `parent_id`, `reflect_to_calendar`,
    `calendar_event_id`
  - **memos**: `body` → `content`、`title` / `tags` カラム削除。
    追加: `category`, `position`
  - **profiles**: `email` カラム削除（実スキーマに存在しない）。
    `ProfileCard` の表示は `auth.user.email` 由来に変更
  - **external_source_accounts**: `external_project_key` (nullable) を型に追加
  - 影響ファイル: `types-doublehub.ts`、`todos.ts`、`memos.ts`、
    `TodoSection.tsx`、`MemoSection.tsx`（タイトル入力 UI 削除）、
    `DashboardWidgets.tsx`、`ProfileCard.tsx`

- **論理削除を RPC 経由に** (`9d556dc` → `9672569`, `fix(repositories)` / `fix`)
  - Web から削除すると `{"code":"42501","message":"new row violates row-level
    security policy for table \"todos\""}` が発生
  - 原因: RLS の WITH CHECK が `deleted_at` への直接 UPDATE を許可していない。
    iOS アプリは SECURITY DEFINER RPC で書き込んでいる
  - 最初の試行（`9d556dc`）で `soft_delete_todo({ todo_id })` と
    `soft_delete_memo({ memo_id })` を呼ぶ形に変更したが、実関数名は
    `soft_delete_own_todo(target_todo_id uuid)` / `soft_delete_own_memo(target_memo_id uuid)`
    で PGRST202 で再度失敗
  - 正しいシグネチャに修正（`9672569`）して決着。Functions 型定義も実体に
    揃える
  - 同コミットで `formatDueDateJST` を `src/lib/format.ts` に追加。
    `due_date` (timestamptz / UTC) が `2026-04-25T14:00:00.000Z` のような
    生 ISO で表示されていたのを、`Intl.DateTimeFormat` + `formatToParts` で
    「4月25日 23:00」形式の JST 表示に（iOS 表記と揃える）。
    `TodoSection.tsx` と `DashboardWidgets.tsx` の期日バッジに適用

- **UI 整理** (`4d043bd`, `chore(ui)`)
  - Web 単体では「既存 iOS ユーザーのダッシュボード閲覧・操作のみ」で、
    新規登録は iOS 側で完結する方針を反映
  - `LoginForm.tsx`: Google ログインボタンを削除（iOS で未採用のため Web
    でも出さない）。`handleOAuth` / `loading` state の型から `'google'` を除去。
    フォーム下に「新規アカウント登録は iOS アプリからお願いします」を追加
  - `login/page.tsx`: Coming Soon 時の文言と doc コメントから Google を除去
  - `bookcompass/page.tsx`: TrainNote と同じトーンの Coming Soon 画面に差し替え
    （iOS が匿名認証のみで Apple Sign In UI 未公開。Web からの
    プロバイダ非依存連携は技術的に成立しない）。旧 `BookCompassLinkCard` /
    `BookShelf` は `_components/` に残して将来復活用にアーカイブ
  - `AppNav.ts`: BookCompass を `comingSoon: true` / description "準備中" に
    変更。サイドバー・ダッシュボードに「準備中」バッジが自動で付与される

- **BookCompass Coming Soon の詳細リンク** (`01a07b8`, `fix(bookcompass)`)
  - 「BookCompass の詳細を見る」で `/products/bookcompass/` に同一タブ遷移
    すると `(marketing)` レイアウトの公開サイト用ヘッダーに「ログイン」
    リンクが表示され、セッション切れと誤解される UX 問題
  - Link に `target="_blank"` と `rel="noopener noreferrer"` を追加。
    元タブの `(app)` レイアウトコンテキストを保持。`(marketing)` レイアウト
    自体は触らないのでサイト全体への副作用なし

### 検証結果（ローカル dev）

- ✅ `pnpm typecheck` — エラー 0
- ✅ `pnpm dev` のコンパイル — エラー 0
- ✅ Magic Link ログイン → `/app/auth/callback/?code=...` → `/app/` 到達
- ✅ Todo CRUD（作成・`is_completed` トグル・`soft_delete_own_todo` での論理削除）
- ✅ Memo CRUD（作成・`soft_delete_own_memo` での論理削除）
- ✅ 期日 JST 表示（「4月25日 23:00」形式）
- ✅ `/app/login/` Google ボタン無し / Apple ボタン残存 / 新規登録案内表示
- ✅ `/app/bookcompass/` Coming Soon 画面、AppNav に「準備中」バッジ
- ✅ BookCompass 詳細リンクが新しいタブで開く

### 既知の課題（次セッション最優先）

- ❌ `pnpm build`（本番ビルド）が失敗中:
  `Error occurred prerendering page "/app/login"` /
  `useSearchParams() should be wrapped in a suspense boundary`
  - 発生箇所: `src/app/(app)/app/login/_components/LoginForm.tsx` の
    `useSearchParams()`
  - 最小修正: `src/app/(app)/app/login/page.tsx` で `<LoginForm />` を
    `<Suspense fallback={...}>` でラップ

### Day 5 以降の判断記録

- **Supabase スキーマ / RLS / RPC は触らない**: iOS 本番データと同じ
  スキーマを Web でも使う方針。コード側の命名（`is_done`, `order_index`,
  `body`, 直接 UPDATE 削除）は iOS を知らずに書かれていたためズレていた。
  実体に揃える一方通行で対応
- **RPC の `as never` キャスト**: Supabase v2 クライアントが自前の
  `Database` スタブから `Functions` の `Args` を拾えず `never` に解決される
  ため、既存の `insert` / `update` と同じ `as never` キャストで回避
- **JST フォーマット**: `ja-JP` ロケールのデフォルトは `4/25 23:00`（スラッシュ
  区切り）で iOS の「4月25日 23:00」とズレる。`formatToParts()` で分解して
  「M月D日 HH:mm」に組み立てることで iOS 表記と完全に揃える
- **BookCompass 詳細リンク**: `(marketing)` レイアウト自体を書き換えると
  公開サイト全体の挙動に影響するため、`target="_blank"` のピンポイント対応で
  副作用なく解決
- **git 管理の切替**: 旧作業フォルダ `~/Desktop/doublehub-web/` は zip 展開
  由来で git 未接続だったため、本対応の初回に `feature/nextjs-renewal` を
  別フォルダに clone (`~/Desktop/doublehub-web-git/`) し、差分を移植してから
  push する形で正規の git フローに戻した。以降 Day 5 追加対応はすべて
  clone 側で直接コミット

### 次アクション（次セッション開始時）

1. **`useSearchParams` Suspense 境界対応**（最優先。`pnpm build` を通すため）
2. Cloudflare Pages デプロイ準備（`@cloudflare/next-on-pages` adapter 選定等）
3. Phase 2 保留事項の優先度付け（OPEN_QUESTIONS.md 新規追記分を参照）

---

## Day 5 以降 (続き) — 2026-04-21 (JST) — `useSearchParams` Suspense 境界対応

### 実施内容

- **`fix(login)`: `LoginForm` を Suspense 境界でラップ**
  - 対象: `src/app/(app)/app/login/page.tsx`
  - 変更点:
    - `react` から `Suspense` を import
    - 同ファイル内に軽量スケルトン `LoginFormFallback`（Apple ボタン枠 +
      区切り線 + ラベル + 入力枠 + 送信ボタン枠を `animate-pulse` で再現、
      `role="status"` / `aria-busy="true"` / `sr-only "読み込み中…"` 付与）
      を追加
    - `canSignIn` 分岐の `<LoginForm />` を
      `<Suspense fallback={<LoginFormFallback />}><LoginForm /></Suspense>` に置換
  - `LoginForm` 本体（`useSearchParams`, OAuth ハンドラ, Email マジックリンク,
    Apple ボタン, 新規登録案内）は一切手を入れず非破壊で対応
  - 親ページ `LoginPage` 側は Server Component のままで静的プリレンダー可能、
    Suspense 内のクライアント部分のみが `useSearchParams` を扱う形に分離

### 検証結果

- ✅ `pnpm build` 成功
  - 38/38 ページがプリレンダー
  - `/app/login` は `○ Static`（4.29 kB / First Load JS 182 kB）として
    プリレンダー成功
  - `/app/auth/callback` は `ƒ Dynamic`（Route Handler のため期待通り）
  - 新規 warning なし。既存の Tailwind の
    `ease-[cubic-bezier(0.16,1,0.3,1)]` ambiguous 警告 1 件のみ
- ✅ `pnpm dev` での `/app/login/` 動作
  - HTTP 200 / Apple ボタン・メール入力・新規登録案内すべてレンダー
  - SSR HTML に Suspense fallback の `読み込み中…` テキストも含まれており、
    クライアント hydrate 後に LoginForm へ差し替わる挙動を確認
- ✅ `/app/auth/callback/` （`?code=` 無し）: HTTP 307 で
  `/app/login/?error=missing_code` にリダイレクト（PKCE ハンドラ正常動作）
- ✅ `trailingSlash: true` の挙動は不変（`/app/login/` で 200、
  `/app/auth/callback/` で 307 リダイレクト）

### 判断記録

- **修正範囲は `page.tsx` のみで完結**: HANDOVER §3.1 の最小修正案どおり、
  `LoginForm` 自体の更なる分割（`useSearchParams` 部分のみを子に切り出し）
  は不要だった。`LoginForm` 全体を 1 つの Suspense 境界に包めば、Next.js の
  ビルド時 prerender バウンダリ判定はクライアント部分を CSR 側に正しく
  追い出してくれる
- **fallback はサイトのデザイントークン準拠の軽量スケルトン**:
  `bg-surface-2` / `border` / `animate-pulse` の組み合わせで、フォーム本体の
  形状（OAuth ボタン → 区切り → 入力 → 送信）と高さを近似。一瞬しか
  見えない想定なので過度な装飾は避け、a11y 用に `role="status"` /
  `aria-busy` / `sr-only` を付与
- **既存挙動の保全**: Apple Sign In ボタン、Email マジックリンク送信、
  「新規アカウント登録は iOS アプリから」案内、`/app/auth/callback`
  PKCE フローのいずれも変更なし

### 次アクション

1. Cloudflare Pages デプロイ準備
   - `@cloudflare/next-on-pages` adapter の採用可否（dynamic モード）
   - もしくは `pnpm build:export`（static モード）で GitHub Pages 継続
   - 環境変数（Supabase 3 プロジェクト + Hosting Mode）登録、
     Supabase Redirect URL に本番ドメインの `/app/auth/callback` 追加
2. `supabase gen types` 導入 → `as never` キャスト撤去（HANDOVER §A.4）
3. Phase 2 保留事項（category タブ、Web 用 Apple OAuth、user_id 統一）の
   優先度付け

---

## 2026-04-21 — Day 7: トップページ情報量完全復活 + 軸①② 独立セクション

### 今日やったこと

- トップページを旧 HTML (legacy/index.html) の情報量に完全復活させつつ、
  ユーザー指示の「軸①: 日常の分岐点シーン」「軸②: プロアクティブ提案」
  を独立セクションとして追加
- 5 セクション → 15 セクション構成に拡張
- Granola / Notion の静かで温かみのあるエッセンスを微アニメーションと
  カード設計に注入（過剰な装飾は避ける）

### 新規コンポーネント

- `Hero.tsx` 強化: 本番コピー (`世界で一番あなたのことを理解してくれる存在を目指す`)
  に差し替え、コンセプト画像 (`DoubleHub-Concept.webp`) を復活、Gradient mesh
  バックグラウンド + Sparkles バッジ
- `IdealSection.tsx`: 理解不足 vs DoubleHub の対比リスト
- `ProblemSection.tsx`: 現状の課題 3 カード（SNS だけでは足りない等）
- `SolutionSection.tsx`: 3 ステップ解決策 + アプリ画面（doublehub-memory.webp）
- `DailyChoices.tsx` **(軸①)**: 日常の分岐点 6 ケース
  （運動 vs 学習 / プレゼント選び / サボりがち / 停滞感 / 調子悪い / 人生の選択）
  を軽 → 重のグラデーションで配置。一般的な AI と DoubleHub の返答を対比表示
- `ProactiveSupport.tsx` **(軸②)**: Double からの能動的な声かけをチャット吹き出し
  3 件で表示。「DoubleHub 本体で予定している体験」バッジで開発中であることを
  誠実に明示。テーマは「思考のバイアス」「メモフォロー」「行動提案」
- `EcosystemTabs.tsx`: 5 タブ切替 UI
  （TrainNote / Book Compass / DoubleHub 本体 / 家計 Future / 健康 Future）。
  Current / Coming Soon / Future バッジで整理。スクショ or 抽象 SVG
- `SpotlightSection.tsx`: TrainNote / Book Compass のディープダイブ（交互配置）。
  BookCompass は Coming Soon 化済み
- `RoadmapSection.tsx`: Now / Next / Future 3 カード + チェックリスト
- `VisionSection.tsx`: 大きな引用句 + 3 つの価値 (つなぐ / 映す / 導く)
- `FaqSection.tsx`: 4 問アコーディオン（`<details>` ベース）

### 技術メモ

- `'use client'` + `framer-motion` の `whileInView` でスクロール入場アニメ
- 既存 UI コンポーネント (`Container` / `Tabs` / `Button`) を最大限再利用
- 画像はすべて `/public/images/` の WebP 直参照（Next/Image 最適化対応）
- 旧 `EcosystemSection.tsx`（3 つの設計哲学）はそのまま残し、`EcosystemTabs`
  と併置（「どこから入るか」の入口としての Tabs + 「なぜこの設計か」の Pillars）
- `pnpm build` 成功: トップページ 17.7 kB / First Load 181 kB

### 検証

- ローカルで `pnpm start` 起動 → Playwright で各セクションのスクショ確認
- Hero、Daily Choices、Proactive Support、Ecosystem Tabs、Spotlight、
  Roadmap、FAQ のいずれも意図どおりに表示
- ライト / ダーク両対応維持
- コピー改行・画像サイズ・バッジ色の視覚的崩れなし

### コミット

- `415a001` feat(marketing): restore 15-section top page with proactive
  support & daily choices

### 次アクション

1. Cloudflare Pages デプロイ準備（Day 6 からの積み残し）
2. `supabase gen types` で型自動生成 → `as never` 撤去
3. ダークモードでのコントラスト微調整（必要に応じて）

---

## Day 7 (続き) — 2026-04-21

### 背景

- Vercel プレビュー上でユーザーから 5 点のフィードバックを受領
  1. Ecosystem Tabs のカードが「選択可能」と分からない
  2. 「3 つのプロダクト」セクションのアイコン（脳 / 本 / 筋肉）がリッチでない
  3. Ecosystem の 3 番目の柱で "Supabase" 固有名を避けたい
  4. 健康・ヘルスケアは既に連携済み（Apple Health）。Future → Current 化、入力は睡眠時間 / 歩数 / ワークアウト回数
  5. Ecosystem の家計・健康タブで選択時に表示される画像が未整備（アプリがないため生成画像で代替）

### 生成画像 (nano_banana_pro, Granola 風陶器/クレイ調)

- `trainnote-icon-rich.png` — 筋肉の陶器彫刻
- `bookcompass-icon-rich.png` — 開いた本の陶器
- `doublehub-icon-rich.png` — 二つの絡み合う形（もう一人の自分）
- `finance-visual.png` — 流れるような形（家計バランス）
- `health-visual.png` — 3 つの絡まるリング（睡眠 / 歩数 / ワークアウト）
- `section-divider.png` — 水平線グラデ（将来用ストック）

### 変更ファイル

- `ProductCards.tsx`: productIconMap で生成画像を 80×80 rounded-2xl で差し替え
- `EcosystemSection.tsx`: "Supabase" 固有名を「独立したデータベース」「安全なクラウド基盤」に変更
- `EcosystemTabs.tsx`:
  - 健康を Current 化（Apple Health 等から連携、入力=睡眠時間/歩数/ワークアウト回数）
  - 家計は Future のまま
  - タブに `cursor-pointer` + hover 浮き + active ring-2 + 右端 ChevronRight 矢印で「選択可能」を明示
  - ヒント文「下のサービスをタップして切り替えてみてください」を追加
  - 家計・健康選択時に生成画像を表示するブロックを追加

### 検証

- `pnpm build` 成功
- ローカル `pnpm start -p 5001` で Playwright スクショ確認
  - Ecosystem Tabs: 5 タブ表示、TrainNote が active（ring + ChevronDown）
  - 健康タブ切替: CURRENT バッジ、内容差し替え、Apple Health 連携の明記
  - ProductCards: 3 アイコンがリッチな陶器風に差し替わり視覚統一

### 次アクション

1. Vercel プレビュー自動デプロイの待機 → URL 共有
2. ダークモードでの新規画像の視認性確認
3. DoubleHub 本体アプリのスクショ受領後にプレースホルダー差し替え

---

## Day 8 — 2026-04-22

### 背景

Vercel プレビュー確認後、ユーザーから 4 点のフィードバック：

1. Daily Choices / データ横断で "TrainNote" 固有名が出るのは未知のユーザーに不親切 → 「トレーニングの記録」「運動頻度」に置換
2. Ecosystem タブの 健康・家計タブで表示している画像は「概念」ではなく「メリット」が伝わる図にしたい
3. Proactive セクション（向こうから話しかけてくる）の Double アイコンを、ヘッダーにある DoubleHub アイコンと統一
4. Ecosystem「ツールを集めるのではなく自分を整える」セクションに、3 原則が一枚で読み取れる図を追加

### 生成画像 (nano_banana_pro, シャープなダイアグラム調)

- `health-benefit-diagram.png` — 体調スコアの推移曲線（2 山 + 谷、データポイント）
- `finance-benefit-diagram.png` — 支出 (散らばるレシート/硬貨) → 4 軸レーダー (自己投資/人との繋がり/経験/必需品) への変換図
- `ecosystem-principles-diagram.png` — 中心に「あなた」、周囲を 3 原則 (主権シールド・積層・連結リング) が同心円で取り囲む図

### 変更ファイル

- `DailyChoices.tsx`:
  - "TrainNote の記録" → "トレーニングの記録"（3 箇所）
  - "TrainNote 連携" → "トレーニング連携"、"BookCompass 連携" → "読書連携"
- `ProactiveSupport.tsx`:
  - アバター絵文字 🪞 → `/images/doublehub-icon.jpg` に置換（Image コンポーネント）
  - "TrainNote" → "トレーニング" の用語置換
- `EcosystemTabs.tsx`:
  - `health-visual.png` / `finance-visual.png` → 新しいメリット図 (`*-benefit-diagram.png`) に差し替え
- `EcosystemSection.tsx`:
  - 3 原則カードの下に「Three Principles, One Self」ブロックを追加
  - 左側に見出し + 説明文、右側に `ecosystem-principles-diagram.png` の 16:9 画像を配置

### 検証

- `pnpm build` 成功。ローカルの `pnpm start` では Next.js 16 が生成する CSS パス `..` のダブルドットが curl / Playwright で読み込めない問題が発生し視覚確認は断念（Vercel 配信では問題なし、実際前回の Day 7 プレビューは正常表示されていた）。
- Vercel プレビュー側で最終確認する。

### 次アクション

1. Vercel プレビュー URL でダーク / ライトモード双方の視覚確認
2. DoubleHub 本体アプリのスクショ到着待ち（Ecosystem 本体タブの差し替え）
3. Next.js 16 `pnpm start` の CSS パス問題（ダブルドット）を別途調査、必要なら next.config で回避

## Day 8 続き — 2026-04-22 (JST) — 公式アプリアイコン差し替え

### 背景

ユーザーから BookCompass / TrainNote の公式 App アイコン画像 (iOS アプリアイコン、角丸四角) を受領。これまでトップページで使っていた陶器風スタイライズドアイコンを、すべて公式アイコンに差し替える依頼。追加で他に配置が望ましい箇所があれば入れてほしいとのことで、3 箇所を提示 → ユーザーは「上記すべて」を選択。

### 配置箇所

1. `ProductCards.tsx` — 3 プロダクトカードのアイコン
2. `EcosystemTabs.tsx` — タブボタン（TrainNote / Book Compass / DoubleHub 本体）のバッジ左
3. `SpotlightSection.tsx` — Spotlight 2 枚（TrainNote / BookCompass）のバッジ左

### 変更内容

- 画像配置
  - `public/images/bookcompass-app-icon.jpg` 追加（紺地 + オレンジのコンパス/本シンボル）
  - `public/images/trainnote-app-icon.jpg` 追加（紺地 + シアン「TN」+ ダンベル）
- `ProductCards.tsx`: `productIconMap` の 3 件を差し替え。DoubleHub は既存 `/images/doublehub-icon.jpg`（ヘッダーロゴと同じ）に統一、TrainNote / BookCompass は新アイコンを参照。
- `EcosystemTabs.tsx`: `panelIconMap` を追加し、`TabsTrigger` 内でバッジ左に 28×28 rounded-lg のアイコンを表示（trainnote / bookcompass / doublehub 本体の 3 タブ。health / finance はバッジのみ）。
- `SpotlightSection.tsx`: `Spotlight` 型に `iconSrc` を追加し、バッジ左に 32×32 rounded-lg のアイコン（`next/image` の `Image` コンポーネント使用）を配置。

### 検証

- `pnpm build` 成功（37 ページ SSG / SSR 生成、TypeScript エラーなし）。
- ローカル視覚確認は Next.js 16 `pnpm start` の CSS パスダブルドット問題により困難なため、Vercel プレビューで確認予定。

### 残ファイル

- `public/images/trainnote-icon-rich.png`, `bookcompass-icon-rich.png`, `doublehub-icon-rich.png`（陶器風スタイライズド画像）は未使用になったが、一旦削除せず保持。今後他のセクションで使わないことが確定したら削除検討。

### 次アクション

1. commit & push
2. Vercel プレビューで 3 箇所の表示確認

## Day 8 続き2 — 2026-04-22 (JST) — プロダクト詳細ページの情報量を Legacy HTML 版に合わせて拡充

### 背景

ユーザーから「TrainNote と BookCompass のプロダクト詳細ページが、旧 HTML サイトに比べて情報量が少なすぎる。HTML 版の内容と画像を確認して充実させてほしい」との指摘。旧サイト (`legacy/trainnote.html`, `legacy/bookcompass.html`) には Next.js 版には存在しない Stats / AI コーチ紹介 / Chat showcase / スクリーンショットギャラリー / Plans / Flow など豊富なコンテンツがあった。

### 変更内容

- `src/app/(marketing)/products/trainnote/page.tsx` を全面書き換え。以下の 7 セクション構成へ:
  1. Hero — アプリアイコン + バッジ、キャッチコピー（5人の専門AIコーチが、あなたの筋トレを変える）、App Store バッジ + 機能を見るボタン、`trainnote-peak.jpg`
  2. Stats — 190+ 論文 / 5名のAIコーチ / 6領域
  3. AI Coach Plus — 5名のコーチカード（🎯📋🥗🔥📚）+ `trainnote-coaches-list.jpg`
  4. Chat Showcase — `trainnote-coach-chat.png`（提案で終わらない、チャットで深掘り）
  5. Core Features — PEAK / Smart Logging / Calendar / Review の 4 カード
  6. App Screenshots — 7 枚のスクリーンショットギャラリー（peak / training / coach-detail / coaches-list / coach-chat / calendar / graph）
  7. Plans — 無料プラン vs AI Coach Plus（「初回利用割引あり」バッジ付き）
  8. Final CTA — App Store バッジ + DoubleHub 全体構想リンク
- `src/app/(marketing)/products/bookcompass/page.tsx` を全面書き換え。以下の 6 セクション構成へ:
  1. Hero — アプリアイコン + バッジ、キャッチコピー（読んだ本が、思考の地図になっていく）、`bookcompass-map.jpg`
  2. App Screenshots — 6 枚のスクリーンショットギャラリー（map / axis / detail / summary / notes / explore）
  3. Features — Knowledge Compass / AI Reading Summary / Book Recommendation + What Double Learns（4項目リスト）
  4. AI Chat — 2カラムの対話パートナー説明
  5. Flow Into DoubleHub — 3 カード（サービス内の価値 / DoubleHub に入る情報 / 将来返せる提案）
  6. Final CTA — App Store バッジ + DoubleHub 全体構想リンク
- 共通で `Check` アイコンコンポーネントをページ内で定義（legacy の CSS チェックマーク再現）
- プロダクト詳細の App Store URL は legacy に合わせた正規 ID（TrainNote: `id6759539755`、BookCompass: `id6760604663`）を使用
- テーマは既存の `theme-trainnote` / `theme-bookcompass` クラスを利用（`--color-accent-product` がプロダクト色で置換される）
- `Image` コンポーネントで画像読み込みを最適化、Hero 画像は `priority` 指定

### 検証

- `pnpm build` 成功（37 ページ SSG、エラーなし）
- 既存の `FeatureGrid` / `ProductHero` コンポーネントは今回のページでは不要になったが、削除せず保持（将来 doublehub 詳細ページ等で再利用の可能性あり）

### 次アクション

1. commit & push
2. Vercel プレビューで 2 プロダクトページの表示確認（特にスクリーンショットの縦横比・Plans のバッジ位置・Hero のアイコン表示）

## Day 8 続き3 — 2026-04-22 (JST) — TrainNote Plans セクションを実際の課金体系に修正

### 背景

ユーザーからの指摘:
- 基本機能は「無料」ではなく、買い切り 800 円
- ただし最初の 30 日間は無料で使える
- 追加情報: 月額サブスクリプション 480 円もあり、初回 2 ヶ月は 50% OFF（¥240）

### 変更内容

- `src/app/(marketing)/products/trainnote/page.tsx` Plans セクションを 2 カード → 3 カード構成に変更
  - **30 日間無料体験** (¥0 / 30 日間): すべての基本機能をフルに体験、30 日経過後は有料プランを選択
  - **買い切りプラン** (¥800) — 中央におすすめバッジ付き: 一度の支払いでずっと使える、月額・年額の継続課金なし
  - **月額サブスクリプション** (¥480 / 月): 初回 2 ヶ月 50% OFF バッジ、いつでも解約可能
- セクション見出しと説明文を「まずは 30 日間、無料で試せる。」+「『買い切り 800 円』または『月額 480 円（初回 2 ヶ月 50% OFF）』から選べます」に修正
- 料金注記を全体下部に集約: 「※ 価格は執筆時点のものです。最新の料金や課金サイクルは App Store 上の表示をご確認ください。」

### 検証

- `pnpm build` 成功

## Day 9 — 2026-04-23 (JST) — BookCompass Think With Books セクション修正

### 背景

ユーザーからの指摘:
- Think With Books セクションにあるアプリのスクリーンショット画像は不要
- 「こういうAIではない」の日本語が不自然 → 「理解不足のAI」に変更
- 「返ってくる、こんな言葉」の見出しと、その下の2つの擬似チャット文言の日本語が不自然
- カード末尾の「そういうふうに返せることを、Book Compass は目指しています。」も日本語が不自然で不要

### 変更内容

- `src/app/(marketing)/products/bookcompass/page.tsx` Think With Books セクション（旧 section 7）を修正
  - 左カラムのアプリスクリーンショット（bookcompass-screen-06.jpg）を削除し、右カラムのみの単一カラム構成に変更（`max-w-3xl` で中央寄せ）
  - 対比ボックスのラベルを「こういうAIではない」→「理解不足のAI」に変更
  - 擬似チャットの見出しを「返ってくる、こんな言葉」→「Book Compass からの応答例」に変更
  - 擬似チャット1つ目の文面を自然な敬体に書き直し: 「前に読んだ本でも同じようなテーマに関心を持たれていましたね。今回のモヤモヤも、その延長線上にあるのかもしれません。」
  - 擬似チャット2つ目の文面を自然な敬体に書き直し: 「この本で残った問いは、以前読まれた別の本の気づきとつなげて考えてみると、新しい発見があるかもしれません。」
  - カード末尾の注記「そういうふうに返せることを、Book Compass は目指しています。」を削除

### 検証

- `pnpm build` 成功（37 ページ SSG、エラーなし）
- `Image` コンポーネントの import は他セクションで使用中のためそのまま維持

### 次アクション

- Vercel プレビューで BookCompass ページの Think With Books セクション表示確認
- 内容が確定したら、main ブランチの `bookcompass.html` にも 9 セクション構成を反映する（保留タスク）

## Day 9 続き — 2026-04-23 (JST) — BookCompass App Screenshots を横スクロールカルーセルに

### 背景

ユーザーからの指摘:
- スマホで App Screenshots（10 枚）を見ると縦に積まれてスクロールが長くなりすぎる
- 横にスクロールできることが一目で伝わる工夫もほしい

### 変更内容

- `src/app/(marketing)/products/bookcompass/page.tsx` App Screenshots セクションをレスポンシブに刷新
  - スマホ（〜sm未満）: `flex snap-x snap-mandatory overflow-x-auto` による横スクロールカルーセル
  - sm 以上: 従来の `grid-cols-2 / lg:grid-cols-3 / xl:grid-cols-5` グリッドを維持
  - カード幅はスマホで `basis-[78%]` に設定し、次のカードが少し見切れる状態にして「横に続いている」ことを視覚的に示唆
  - `snap-center` で各カードが中央にスナップするように調整
  - `-mx-4 px-4` で Container の左右 padding を相殺し、画面端までスクロール領域を広げる
  - スクロールバーは非表示（`[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`）
- スマホのみ表示する横スクロールヒントを追加
  - 左右 chevron アイコン（`animate-pulse` でさりげなく動かす）+ 「スワイプして 10 枚の画面を見る」テキスト
  - `sm:hidden` で PC/タブレットでは非表示

### 検証

- `pnpm build` 成功（37 ページ SSG、エラーなし）
- 画像の `sizes` 属性をスマホ幅（90vw → 78vw）に合わせて更新

### 次アクション

- Vercel プレビューでスマホ実機の操作感（スナップ挙動・ヒント視認性）を確認
- 問題なければ main ブランチの bookcompass.html にも同等の仕組みを反映（保留タスク）

## Day 9 続き2 — 2026-04-23 (JST) — BookCompass Plans セクションを新設

### 背景

- TrainNote プロダクトページにある「Plans」のような料金・機能説明セクションが BookCompass にも欲しい、というユーザー要望
- 料金体系情報はユーザーから詳細提供された（無料 ¥0 + Compass Pro ¥880/月、初回3ヶ月¥480/月割引）

### 変更内容

- `src/app/(marketing)/products/bookcompass/page.tsx` にセクション 9 として Plans を新設
  - 構成: Hero → App Screenshots → Reading Partners → Features → Reading Summary → What Double Learns → AI Chat → Flow Into DoubleHub → **Plans（新設）** → Final CTA
  - Final CTA の `surface` を通常 → `alt` に変更し、Flow(alt) → Plans(通常) → Final CTA(alt) のリズムに
- Plans セクションは 3 パートで構成:
  1. **2カード構成の料金プラン**
     - 無料プラン ¥0（本の登録無制限／呟き10件/日／特性分析・サマリー10冊まで／AIチャット生涯30回）
     - Compass Pro ¥880/月（おすすめバッジ、初回3ヶ月¥480/月の割引チップ付き、AIチャット30件/日、呟き30件/日、特性分析・サマリー無制限、Push更新頻度UP）
  2. **機能比較テーブル**（9行）
     - 本の登録／呟き／レーダーチャート／特性分析／読書サマリー／Push型レコメンド／AIチャット／AI参照範囲／過去チャット閲覧
     - 「参照範囲は無料と同じ／回数のみ差」「解約後も過去記録は残る」の補足を Check リストで追加
  3. **サブスクリプションについてのパネル**
     - 名称・期間・価格・自動更新/解約方法を dl で整理
     - 年額未提供の注記と「価格は執筆時点・App Store 上の表示をご確認ください」の定型文

### 検証

- `pnpm build` 成功（38 ページ SSG、エラーなし）
- 誤字チェック: 「呾き→呟き」「深掠り→深掘り」「閑覧可→閲覧可」を sed で一括修正

### 次アクション

- Vercel プレビューで Plans セクションの表示確認（スマホでのテーブル横スクロール挙動も）
- 内容が確定したら main ブランチの bookcompass.html にも同等の Plans セクションを反映（保留タスク）

## Day 9 続き3 — 2026-04-23 (JST) — BookCompass Plans: Push 型レコメンドの差分を修正

### 背景

ユーザーからの指摘:
- Push 型レコメンドは無料プランと Compass Pro で差はない（どちらも無制限）

### 変更内容

- `src/app/(marketing)/products/bookcompass/page.tsx`
  - Compass Pro カードの機能リストから「Push 型レコメンドの更新頻度 UP」を削除
  - 機能比較テーブルの Push 型レコメンド行を「閲覧可（更新 週1）／更新頻度 UP」→ 両方「無制限」に修正

### 検証

- `pnpm build` 成功

## Day 9 続き4 — 2026-04-23 (JST) — Search Console「インデックス未登録」対応

### 背景

ユーザーから Search Console 警告のメール共有:
- 「重複しています。ユーザーにより、正規ページとして選択されていません」: 1件
- 「検出 - インデックス未登録」: 15件
- 登録済みは 1 件のみ

### 原因の診断（main ブランチを解析）

1. **全 26 HTMLページに canonical タグが無い** → Googleが正規URLを自動判定 → 重複警告の直接原因
2. **sitemap.xml に 5 件の blog 記事が欠落**（ai-cognitive-offloading / ai-critical-thinking / ai-workslop-bottleneck / llm-benchmark-guide-advanced / llm-benchmark-guide-basics）
3. **sitemap.xml に support.html・privacy.html が無い**
4. **sitemap.xml の lastmod が全URLで古い日付のまま**

### main ブランチの対応（別コミット `5dbe05e`）

- `add_canonical.py` スクリプトで全 26 HTMLに `<link rel="canonical" href="...">` を自己参照形式で追加
  - `index.html` → `https://doublehub.jp/`（末尾スラッシュ付きの bare URL）
  - `blog/index.html` → `https://doublehub.jp/blog/`
  - その他は該当の `.html` URL
- `generate_sitemap.py` で sitemap.xml を全 26 ページ網羅版として再生成
  - 欠落 5 件 + support.html + privacy.html を追加
  - `lastmod` は `git log -1 --format=%cs` で各ファイルの最終コミット日から取得

### feature/nextjs-renewal 側の確認結果

Next.js 版は SEO 周りが既に整備済みで**追加作業不要**。

- canonical: `src/app/layout.tsx` の `metadata.alternates.canonical` でベース設定 + 各ページ（about/blog/products/*/support/privacy）の `alternates: { canonical: '/path/' }` で自己参照
- sitemap: `src/app/sitemap.ts` が Next.js 公式の MetadataRoute.Sitemap 形式で動的生成、`getAllPosts()` で blog 記事も自動網羅

### 次アクション（ユーザー側）

1. Search Console にログイン
2. `https://doublehub.jp/sitemap.xml` を再送信
3. 未登録ページ（特に blog の 5 件）を 1 件ずつ「インデックス登録をリクエスト」
4. 1〜2 週間様子を見て、canonical 警告が解消するかモニタリング

## Day 10 — 2026-04-23 (JST) — ログイン後ダッシュボードのブラッシュアップ（第1弾）

### 背景

BookCompass マーケページはほぼ完成したため、次はログイン後のアプリ内 UI に着手。
ユーザー確認で「iOS アプリでは DoubleHub の ToDo / メモが『プライベート』『仕事』の
タブで分かれている」と判明。Web 版は `category` カラム自体は型に存在するものの、
取得・作成時に一切扱っていなかったため、DB 仕様は合っているが UI が未整備な状態。

カテゴリ対応の土台を整えつつ、まずダッシュボード `/app/` を刷新した。

### 変更内容

#### カテゴリ対応インフラ整備

- `src/lib/supabase/types-doublehub.ts`
  - `TodoCategory` / `MemoCategory` 型を追加（値は日本語の `'プライベート' | '仕事'`、iOS と合わせる）
  - `TODO_CATEGORIES` / `MEMO_CATEGORIES` 定数、`DEFAULT_CATEGORY` エクスポート
  - `Todo.category` / `Memo.category` を `string` → `TodoCategory | string` などに精緻化（未知文字列は互換で許容）
- `src/lib/repositories/todos.ts`
  - `listTodos` に `category: TodoCategory | 'all'` 引数を追加（`'all'` or 未指定で全カテゴリ混在）
  - `createTodo` に `category?: TodoCategory` を追加。未指定時は `DEFAULT_CATEGORY`（プライベート）を書き込む
- `src/lib/repositories/memos.ts`
  - 同様に `listMemos` / `createMemo` へ category 対応を追加

#### 共通コンポーネント

- `src/components/app/CategoryBadge.tsx`（新規）
  - ドット+ラベルの `<CategoryBadge>` と、行頭インジケータ用の `getCategoryDotClass`
  - プライベート = primary (teal) / 仕事 = accent-warm (orange) で色分け
  - 未知カテゴリは muted フォールバック

#### ダッシュボード刷新

- `src/app/(app)/app/(authed)/_components/DashboardGreeting.tsx`（新規）
  - 「2026年4月23日（木）」形式の日付（JST 固定）
  - 時間帯別挨拶（おはよう / こんにちは / こんばんは、JST 時刻で判定）
  - 表示名は profiles.display_name → user_metadata.* → email ローカル部 の優先順で解決
  - プライマリカラーで名前をハイライト
- `src/app/(app)/app/(authed)/_components/DashboardWidgets.tsx`（全面書き換え）
  - 2カラム → **3カラム（md:2 / xl:3）** 構成
    1. 未完了 ToDo（カテゴリドット + CategoryBadge + 期限Badge）
    2. 最新メモ（2行クランプ + CategoryBadge）
    3. BookCompass 本棚プレビュー（連携済みなら直近読書中 最大4冊 / 未連携なら設定誘導 CTA）
  - `SummaryCard` 内部コンポーネントに統一（上端のプロダクトカラーグラデ線、件数チップ、hover:shadow-md）
  - 件数は list を再取得して計測（簡易、将来 count クエリ化）
- `src/app/(app)/app/(authed)/page.tsx`
  - ヘッダー `<h1>` を `DashboardGreeting` に置換
  - プロダクトハブカードを `ProductHubCard` に分離、アイコンを背景色付き 40px タイルに
  - 上端にプロダクトカラーのグラデライン（primary / BC amber / TN cyan / neutral）
  - hover で `-translate-y-0.5` + shadow-md で浮き上がり
  - 「開く →」ラベルを足してクリック誘導を明示化

### 検証

- `pnpm build` 成功（37 ページ SSG、エラーなし、型エラーなし）
- カテゴリ対応の書き込みは iOS と同じ日本語値 `'プライベート'` を保存するため、Supabase 側スキーマ変更は不要

### 次アクション（次セッション以降）

1. `/app/doublehub/` ページに上部切替タブ（プライベート / 仕事）を導入、ToDo / メモを連動させる
   - 選択状態は `localStorage` に保存、既定は `プライベート`
   - ToDo 追加時も現在のタブの category で作成
2. ToDo 作成フォームに期限 quick chip（今日 / 明日 / 週末 / 日付指定）を追加
3. AppSidebar アクティブ状態強化、AppHeader にパンくず & クイック追加
4. BookCompass / TrainNote の Coming Soon ページにプロダクトテーマを適用
5. 設定ページのプランバッジ & 連携タイル化、ログイン画面のブランド強化

---

## Day 11 — 2026-04-23 (JST) — 挨拶のJST修正 + DoubleHub タブ分離

### 実施内容

#### ダッシュボード挨拶の JST 固定化

- `src/app/(app)/app/(authed)/_components/DashboardGreeting.tsx`
  - SSR 時にサーバー側 TZ（UTC）で計算された挨拶がそのまま hydration に乗り、
    JST 昼間でも「こんばんは」と表示される問題を修正
  - `greeting` を `useState` 化し、マウント後 `useEffect` で JST 再計算して上書き
  - `hour12:false` + `hour:'2-digit'` で深夜 0 時台を `"24"` と返す環境があるため、
    `en-US` ロケール + `%24` で丸め直すガードも追加

#### DoubleHub ページのタブ分離

- **共通部品**
  - `src/components/app/CategoryTabs.tsx`（新規）
    - 「プライベート / 仕事」セグメントタブ。アクティブ時はカテゴリ色で塗る（プライベート=primary / 仕事=accent-warm）
    - `counts` prop で件数チップを右肩に表示
    - `role="tablist"` / `role="tab"` / `aria-selected` / `aria-controls` を適切に付与
  - `src/lib/hooks/useCategoryTab.ts`（新規）
    - localStorage 記憶フック（既定キー `doublehub:category`）
    - SSR 初期値は `DEFAULT_CATEGORY`（プライベート）、マウント後に localStorage から復元
    - プライベートブラウズで localStorage が弾かれた場合は黙って初期値にフォールバック

- **ページ改修**
  - `src/app/(app)/app/(authed)/doublehub/page.tsx`
    - metadata は server で残しつつ、実装を `DoubleHubClient` に委譲
  - `src/app/(app)/app/(authed)/doublehub/_components/DoubleHubClient.tsx`（新規）
    - `useCategoryTab` で選択状態を管理
    - 上部ヘッダー右に `CategoryTabs` を配置
    - 子セクションから `onCountChange` で件数を吸い上げ、ToDo 未完了+メモ件数の合計をタブに表示
    - `role="tabpanel"` で選択中カテゴリを提示

- **子セクション**
  - `src/app/(app)/app/(authed)/doublehub/_components/TodoSection.tsx`
    - `category` prop を受け、`listTodos` に渡して絞り込み
    - `createTodo` も現在カテゴリで保存（iOS と整合）
    - プレースホルダーに現在タブ名を表示（例：`新しい ToDo を追加（プライベート）`）
    - 空状態メッセージもタブ名付きに
    - `onCountChange` で現在タブの未完了件数を親に通知
  - `src/app/(app)/app/(authed)/doublehub/_components/MemoSection.tsx`
    - 同様に `category` prop 対応、プレースホルダー・空表示・件数通知を追加

### 検証

- `pnpm build` 成功（37 ページ、型エラーなし）
- Supabase スキーマ変更なし（iOS と同じ日本語カテゴリ文字列を保存）

### 次アクション

1. ToDo 作成フォームに期限 quick chip（今日 / 明日 / 週末 / 日付指定）
2. AppSidebar のアクティブ状態強化、AppHeader にパンくず & クイック追加
3. BookCompass / TrainNote Coming Soon ページのプロダクトテーマ化
4. 設定ページのプランバッジ & 連携タイル化、ログイン画面のブランド強化
5. 確認完了後、Vercel Preview を static モードに戻す（`NEXT_PUBLIC_HOSTING_MODE` 削除 + 空コミット push）

---

## 2026-04-23 (Thu) — ToDo 期限クイックチップ & 状態カラー表示

### 概要

iOS アプリに合わせて、ToDo の期限を手早く設定できる quick chip と、期限状態ごとの
カード色分け（完了 / 期限切れ / 緊急 / 通常 / なし）を実装した。ユーザー指定の
「週末 = 日曜日」仕様に準拠する。

### 変更内容

- **ステータストークン（実施済み）**
  - `src/styles/globals.css` に `--color-success` / `--color-warning` / `--color-overdue` と soft 版を light/dark 両方で追加
  - `tailwind.config.ts` の colors に `success` / `warning` / `overdue`（DEFAULT + soft）を登録

- **期限ユーティリティ（新規）**
  - `src/lib/dueDate.ts`
    - JST 基準の `todayLocalDateJST` / `addDaysJST` / `nextSundayJST`
    - `endOfDayJstIso(localDate)`：YYYY-MM-DD を「JST 23:59」の ISO 文字列に変換
    - `getDueStatus({ isCompleted, dueDateIso, isAllDay })`：iOS 仕様の優先度順で 5 状態を判定
      - completed → overdue → urgent（24h 以内・all-day なら 48h） → normal → none

- **TodoSection 改修**
  - 追加フォーム下に `DuePresetChips` を追加（`なし / 今日 / 明日 / 今週末 / 日付指定`）
    - 「今週末」は `nextSundayJST()` で次の日曜日を計算
    - 「日付指定」選択時に `<input type="date">` を表示し、`min` に今日を設定
  - `createTodo` に `due_date`（選択値の JST 23:59 ISO）を渡す
  - `TodoItem` コンポーネントを分離し、`getDueStatus` で取得した状態ごとにカードの
    背景色・ボーダー・テキスト色・アイコンを出し分け
    - overdue: overdue-soft 背景 + ⚠ アイコン + overdue 色テキスト
    - urgent: warning-soft 背景 + 🕐 アイコン + warning 色テキスト
    - completed: success-soft 背景 + 打ち消し線 + faint 色
    - normal: 通常背景 + primary(teal) 色の期限テキスト
    - none: 通常背景（期限表示自体なし）

### 検証

- `pnpm build` 成功（37 ページ、型エラー・警告なし）
- Supabase スキーマ変更なし（`due_date` timestamptz は既存カラム）

### 次アクション

1. Sidebar のアクティブ状態強化、Header にパンくず & クイック追加
2. BookCompass / TrainNote Coming Soon ページのプロダクトテーマ化
3. 設定 / ログイン画面のブランド強化
4. 確認完了後、Vercel Preview を static モードに戻す

---

## 2026-04-23 (Thu) — Sidebar/Header ブラッシュアップ

### 概要

Web アプリのナビ周りを視認性重視で磨き込む。サイドバーにプロダクト別の
アクセントバー＋色付きアイコンチップを導入し、ヘッダーにパンくずと
クイック追加ボタンを追加した。

### 変更内容

- **AppNav.ts**
  - `AppNavItem` に `accent` フィールド（`'primary' | 'bookcompass' | 'trainnote' | 'neutral'`）追加
  - `matchAppNav(pathname)` を新規エクスポート。長いパス優先でマッチするため、
    `/app/doublehub` が `/app/` ダッシュボード判定に誤マッチする問題を解消

- **AppSidebar.tsx**
  - `SidebarItem` コンポーネントを分離
  - アクティブ項目に
    - 左端のアクセントバー（プロダクト色、高さ 24px）
    - アイコン部分の色付きチップ（`bg-primary/10 text-primary` など）
    - テキストのアクセントカラー
  - アクセントは `accentClasses()` で静的クラス名にマップ（Tailwind JIT 対応）
  - BookCompass=amber、TrainNote=cyan、DoubleHub=primary、その他=neutral

- **AppHeader.tsx**
  - `usePathname` + `matchAppNav` で現在セクションを判定
  - デスクトップにパンくず（`ホーム / <セクション名>`）を左寄せで表示
  - 右側に「+ 新規」クイック追加ボタン（`/app/doublehub/` へ遷移）を追加
  - モバイルはハンバーガーメニュー + タイトルのまま

### 検証

- `pnpm build` 成功（37 ページ、型エラーなし）

### 次アクション

1. BookCompass / TrainNote Coming Soon ページのプロダクトテーマ化
2. 設定・ログイン画面のブランド強化
3. 確認完了後 Vercel Preview を static モードに戻す

---

## 2026-04-23 (Thu) — BookCompass / TrainNote Coming Soon テーマ化

### 概要

ただのプレースホルダー表示だった `/app/bookcompass/` `/app/trainnote/` の
Coming Soon ページを、それぞれのプロダクトカラーをまとったブランドページに
刷新した。既存の `theme-bookcompass` / `theme-trainnote` クラスと
`accent-product` / `accent-product-fg` トークンを活用。

### 変更内容

- **`src/app/(app)/app/(authed)/bookcompass/page.tsx`**
  - ルートに `theme-bookcompass` クラスを付与し、配下で `accent-product` が
    BookCompass のブランドカラー（アンバー系）に切り替わるようにした
  - ヒーローカード：
    - 左に `📚` アイコンチップ（accent-product カラー）+ タイトル + 説明 + 2 つの CTA
    - 右側にダミーの本棚 UI（CSS のみで描画、デスクトップのみ表示）
    - 背景に 2 枚の放射グラデーション（accent-product 色）で奥行き
  - CTA ：
    - プライマリ「App Store で入手」（アクセント色の塗り、新規タブ）
    - セカンダリ「詳細ページへ」（`/products/bookcompass/` 新規タブ）
  - 「Web 版で計画中の機能」セクション（本棚閲覧 / AI 要約 / ハイライト共有）

- **`src/app/(app)/app/(authed)/trainnote/page.tsx`**
  - 同構造で `theme-trainnote`（シアン系）を適用
  - モックはグラフ風のバー UI で TrainNote らしさを演出
  - 計画中機能：ワークアウト履歴 / AI コーチの対話 / 進捗グラフ

- CSS 変数ベースの色に Tailwind opacity modifier が効かないため、
  半透明表現が必要な箇所は inline `style` の `opacity` でフォールバック

### 検証

- `pnpm build` 成功（37 ページ、型エラー・警告なし）

### 次アクション

1. 設定・ログイン画面のブランド強化（プランバッジ / 連携タイル / ログイン）
2. 確認完了後 Vercel Preview を static モードに戻す

---

## 2026-04-23 (Thu) — Coming Soon ページで実機スクショ＆公式アセットを使用

### 概要

1 つ前の Coming Soon テーマ化は CSS のみのモック描画だったが、ユーザー指摘により
マーケティング（`/products/bookcompass/`・`/products/trainnote/`）で既に使っている
公式アセット（アプリアイコン・実機スクショ・Apple 公式 App Store バッジ）へ差し替え。

### 変更内容

- **BookCompass (`/app/bookcompass/`)**
  - ヒーロー左側
    - アイコン：`/images/bookcompass-app-icon.jpg`（公式アプリアイコン）
    - CTA：Apple 提供の **App Store バッジ**（`toolbox.marketingtools.apple.com`）を
      `<img>` で表示、マーケと同じ URL・振る舞い
  - ヒーロー右側：`/images/bookcompass-hero.jpg`（ナレッジ・コンパス画面）
  - 「主な画面」セクションを新設し、screen-01 / screen-05 / screen-10 の
    3 枚を 9:16 枠で並べる
  - CSS のモック描画は全削除

- **TrainNote (`/app/trainnote/`)**
  - 同じ構造で `trainnote-app-icon.jpg` / `trainnote-peak.jpg` をヒーローに配置
  - ハイライト 3 枚：`trainnote-training.jpg` / `trainnote-coaches-list.jpg` / `trainnote-graph.jpg`
  - CSS モック（バーグラフ）は削除

### 検証

- `pnpm build` 成功（37 ページ、型エラーなし）
- 画像はすべて `public/images/` 配下に存在することを確認

### 次アクション

1. 設定・ログイン画面のブランド強化
2. 確認完了後 Vercel Preview を static モードに戻す

---

## 2026-04-23 (Thu) — Sidebar のプロダクトアイコンをアプリアイコン画像に差し替え

### 概要

サイドバーの DoubleHub / BookCompass / TrainNote の項目で、絵文字アイコン
（🧠 / 📚 / 🏋️）を実際のアプリアイコン画像に差し替え。ヘッダーのロゴや
各プロダクトページのヒーローで使っているアプリアイコンと視覚的に統一する。

### 変更内容

- **`src/components/app/AppNav.ts`**
  - `AppNavItem.icon` を「絵文字もしくは `/images/...` 画像パス」の両対応に拡張
  - `iconFallback` フィールドを追加（将来画像ロード失敗時のフォールバック用）
  - 該当 3 項目の `icon` を画像パスに更新
    - DoubleHub → `/images/doublehub-icon.jpg`
    - BookCompass → `/images/bookcompass-app-icon.jpg`
    - TrainNote → `/images/trainnote-app-icon.jpg`
  - ダッシュボード（🏠）と設定（⚙️）はメタ的なメニューなのでそのまま絵文字を維持

- **`src/components/app/AppSidebar.tsx`**
  - `NavIcon` コンポーネントを分離
  - `icon` が `/` で始まるときは `next/image` で 24×24 の squircle 風チップとして描画
  - 絵文字時は従来通り（アクティブ時に色付きチップ）

### 検証

- `pnpm build` 成功（37 ページ、型エラー・警告なし）

### 次アクション

1. 設定・ログイン画面のブランド強化
2. 確認完了後 Vercel Preview を static モードに戻す

---

## 2026-04-23 15:05 JST — 設定・ログイン画面のブランド強化

### 概要

Web ダッシュボードの「設定ページ」と「ログインページ」を、サイドバー／
プロダクトページと視覚的に統一されたブランド体験に強化。アプリアイコン、
プロダクト別テーマカラー、プラン別バッジ配色を導入し、単なるフォーム
画面から「DoubleHub のホーム」としての印象を与えるレイアウトに刷新した。

### 変更内容

- **`src/app/(app)/app/(authed)/settings/page.tsx`**
  - ページヘッダーに DoubleHub アプリアイコン（`/images/doublehub-icon.jpg`）
    + タイトル「設定」のロックアップを追加
  - アカウント連携セクションの説明文を「BookCompass / TrainNote」と
    具体名入りに更新

- **`src/app/(app)/app/(authed)/settings/_components/ProfileCard.tsx`**
  - カード上部にプライマリ → primary-soft のグラデーション帯を追加
  - 80px の squircle アバターを導入（`avatar_url` があれば画像、無ければ
    イニシャル文字）
  - `TIER_STYLE` マップでプラン別バッジを色分け
    - free → 灰系、light → sky 系、standard → primary 系、premium → amber 系
  - 表示名編集フォームを分離、プロフィールサマリーを上段に集約

- **`src/app/(app)/app/(authed)/settings/_components/LinkedAccountsCard.tsx`**
  - `PRODUCTS` 配列（bookcompass / trainnote）で常に 2 タイル表示する設計に変更
    （未連携でも「未連携」バッジ付きでタイル表示）
  - 各タイルに `theme-bookcompass` / `theme-trainnote` スコープを適用し、
    左端 1px のアクセント帯で `accent-product` を反映
  - アプリアイコン画像（32×32 squircle）+ プロダクト名 + 連携状態バッジ
  - active 時のみ「解除」ボタンを表示

- **`src/app/(app)/app/login/page.tsx`**
  - 中央に DoubleHub アプリアイコン（72×72 squircle, ring 付き）
  - 背景に primary-soft の放射グラデーションを追加
  - ログインフォームを `rounded-2xl` カードでラップ（既存 LoginForm.tsx をそのまま利用）
  - 下部に「Apps Family」セクション: BookCompass / DoubleHub / TrainNote
    の 3 アイコンリンク（hover で `-translate-y`）
  - 最下部にプライバシーポリシー注記

### 検証

- `pnpm build` 成功（37 ページ、型エラー・警告なし、Turbopack）
- `/app/settings` `/app/login` いずれも静的生成（○ Static）

### 次アクション

1. Vercel Preview での見た目確認（特にアバター画像ありのケース）
2. Preview を static モードに戻す（`NEXT_PUBLIC_HOSTING_MODE` 削除 + 空コミット push）

---

## 2026-04-23 15:10 JST — ダッシュボードのプロダクトカード崩れ修正

### 概要

ダッシュボード下部「プロダクト」セクションの各カードで、アプリアイコンの
代わりに画像パス文字列（`/images/doublehub-icon.jpg` 等）が巨大テキストと
して表示される崩れが発生していた。AppNavItem.icon を画像パスに差し替えた
`441ff9b` の副作用。

### 原因

`src/app/(app)/app/(authed)/page.tsx` の `ProductHubCard` が `{icon}` を
常にテキストとしてそのまま `<span>` に流し込んでいたため、画像パス文字列が
そのまま描画されていた（サイドバーは修正済みだったがこちらが漏れていた）。

### 変更内容

- **`src/app/(app)/app/(authed)/page.tsx`**
  - `ProductIcon` コンポーネントを新設し、`icon` が `/` で始まる場合は
    `next/image` で 40×40 の squircle 風アプリアイコンとして描画
  - 絵文字の場合は従来通りテキスト + accent 背景
  - サイドバー側の `NavIcon` と同じ分岐ロジックを共有

### 検証

- `pnpm build` 成功（37 ページ、型エラー・警告なし）

---

## 2026-04-23 15:20 JST — DoubleHub ページに読込中インジケータを追加

### 背景

`/app/doublehub/` を開くと、Supabase からデータが返る前の一瞬（数百ms）
に「プライベートの ToDo はまだありません / メモはまだありません」という
空状態が表示され、ユーザーがデータが存在しないと誤認する体験になって
いた。タブチップの件数も `0 / 0` と出てしまう。

併せて、`/app/` ダッシュボードの方にもサマリカードの件数バッジ付近に
ロード中が視認できるドットを足し、一貫した「読込中」体験にした。

### 変更内容

- **`src/app/(app)/app/(authed)/doublehub/_components/DoubleHubClient.tsx`**
  - `initialLoading` state を追加（初期 true、refresh の `finally` で false）
  - 子セクションに `loading` prop を渡す
  - loading 中は `CategoryTabs` に `counts={undefined}` を渡し、`0 / 0` が
    出ないようにする

- **`src/app/(app)/app/(authed)/doublehub/_components/TodoSection.tsx`**
  - `loading` prop 追加
  - ヘッダーの件数を Skeleton に差し替え、「● 読込中」ドット表示
  - 本文リストを 3 行の Skeleton（`h-12`）に差し替え（空状態文言の誤認を解消）

- **`src/app/(app)/app/(authed)/doublehub/_components/MemoSection.tsx`**
  - 同上。本文は 2 件の Skeleton（`h-20`）で代替

- **`src/app/(app)/app/(authed)/_components/DashboardWidgets.tsx`**
  - `SummaryCard` に `loading` prop を追加
  - loading 中は件数バッジを Skeleton に、ヘッダー右端に `● 読込中` を表示

- **`src/app/(app)/app/(authed)/_components/DashboardGreeting.tsx`**
  - `resolvingName` state を追加。名前解決中は「こんにちは、[Skeleton] さん」と
    表示することで、ポンと挨拶が変わる違和感を解消

### 検証

- `pnpm build` 成功（37 ページ、型エラー・警告なし）

---

## 2026-04-23 18:10 JST — DoubleHub LP から iCloud 同期の誤訴求を除去

### 概要

マーケティング LP（`/products/doublehub`）の特徴セクションと、
エコシステム説明セクションに「iCloud 同期 / iCloud 等に分散保存」という
記述があったが、DoubleHub 本体には該当機能が無いため誤訴求に該当。
ユーザー指示により両方を削除した。

BookCompass ページの「iCloud で永続管理」は iOS ネイティブアプリ側で
実際に iCloud 同期を使用しているため、今回の変更対象から除外した。

### 変更内容

- **`src/app/(marketing)/products/doublehub/page.tsx`**
  - features 配列から `iCloud 同期` カードを丸ごと削除（5→4枚）

- **`src/components/marketing/EcosystemSection.tsx`**
  - 「データは、あなたのもの」pillar の body 文言から
    「端末 (iCloud 等) に分散されて保存」という具体名を除去し、
    「安全に保存」と中立表現に差し替え

### 検証

- `pnpm build` 成功（37 ページ、型エラー・警告なし）
- `grep -rn "iCloud" src/app/(marketing)/ src/components/` で
  マーケティング側からは iCloud 記述が消えていることを確認
  （BookCompass の dashboard ページは意図的に残存）

---

## 2026-04-23 18:20 JST — マーケヘッダーの Products メニュー改善

### 背景

1. Products ドロップダウンの各項目が絵文字のままで、サイドバーや
   プロダクトカード（アプリアイコン化済み）と一貫性が無い
2. Products ボタン→メニューへマウスを動かす途中でドロップダウンが
   閉じてしまうケースがある

### 原因

- ドロップダウンがボタンから `mt-1`（4px）離れて配置されており、
  その隙間にマウスが入ると `onMouseLeave` が即発火して閉じていた
- 閉じるまでのディレイが無いため、ピクセル単位の出入りで瞬時に閉じる

### 変更内容

- **`src/lib/site/config.ts`**
  - `products` 各エントリに `appIcon` フィールドを追加（既存の絵文字
    `icon` は後方互換のため残置）
    - doublehub → `/images/doublehub-icon.jpg`
    - bookcompass → `/images/bookcompass-app-icon.jpg`
    - trainnote → `/images/trainnote-app-icon.jpg`

- **`src/components/marketing/MarketingHeader.tsx`**
  - `ProductMenuIcon` コンポーネント新設：`appIcon` があれば
    `next/image` で squircle 風アプリアイコン、無ければ絵文字
    （デスクトップ 32px / モバイル 24px）
  - Products ドロップダウンのホバー挙動を改善：
    - `closeTimerRef` による 150ms の閉じ遅延 (grace period)
    - `mt-1` の可視 gap を廃止し、ラッパー `<div>` に `pt-2` を適用
      してボタン↔メニュー間の 8px もホバー検知領域に含める
    - ラッパー側にも `onMouseEnter` / `onMouseLeave` をつけて
      マウスが領域内にある限り絶対に閉じない

### 検証

- `pnpm build` 成功（37 ページ、型エラー・警告なし）

## 2026-04-23 21:40 JST — Vercel 本番移行完了(GitHub Pages → Vercel)

### 概要

doublehub.jp の本番ホスティングを GitHub Pages(静的HTML)から
Vercel(Next.js ランタイム)に切り替えた。DNS 切替・GitHub Pages 無効化
まで含めて移行作業を完了。

### 実施内容

#### 1. Vercel プロジェクト設定

- Production Branch: `main`
- 環境変数:
  - `NEXT_PUBLIC_HOSTING_MODE`: Production=`static`, Preview=`dynamic`
  - Supabase キー(DoubleHub/BookCompass の URL + ANON_KEY 計4つ):
    Preview のみに設定(Production には設定しない = /app/* の2重ガード)
- Deployment Protection: 有効

#### 2. DNS 切替(X Server)

- A レコード: GitHub Pages 用 4つ(185.199.108〜111.153)を削除
- A レコード: Vercel 用 `216.198.79.1` を新規追加(ホスト名 @)
- CNAME: `www` を `cname.vercel-dns.com` に変更
- Vercel Domains に `doublehub.jp` と `www.doublehub.jp` を追加
  (www は doublehub.jp へ redirect 設定)

#### 3. GitHub Pages 無効化

- Repository Settings → Pages → Branch を None に変更
- `public/CNAME` ファイルを削除(コミット `febc04e`)

#### 4. 付随作業

- サポートページを legacy HTML と同等のフルフォームに復元
  (`src/app/(marketing)/support/_components/SupportForm.tsx` 新設)
  問合せ先メールを `growthlab116710@gmail.com` に修正

### ロールバック手段

- `legacy/` ディレクトリに旧 HTML 一式を保管済み
- 問題発生時は X Server の A レコードを GitHub Pages 用4つ
  (185.199.108〜111.153)に戻せば旧サイトに即座に復帰可能

### 今後の課題

- ブログ MDX 3記事の復元(ユーザー側でバックアップあり)
- `/app/*` 配下の middleware による 404 ガードは未追加
  (Supabase キー未設定で実質ガードされているため優先度低)

---

## 2026-04-24 DoubleHub プロダクトページ全面刷新 (Ver.1.1.0 対応)

### 概要

`/products/doublehub/` のランディングを、機能羅列から「もう一人の自分（ダブル）」コンセプトを軸にしたリッチな訴求ページに全面改修。Ver.1.1.0 で追加されたヘルスケア連携・カレンダー連携・ホームの 3 カテゴリを前面に打ち出し、インストール意欲を高める構成に再設計した。

### 対象ブランチ

`feature/enhance-doublehub-product-page` → `main` へマージ

### 変更ファイル

- `src/app/(marketing)/products/doublehub/page.tsx` — 全面書き換え (63 行 → 1029 行)
- `src/lib/site/config.ts` — App Store URL を正しいID (id6761981050) に更新

### 主な変更点

1. **App Store リンクの修正**
   - 誤: `id6742528013` → 正: `id6761981050` (DoubleHub - AI活用ToDo管理)
   - `siteConfig.social.appStoreDoubleHub` 経由で全箇所に反映

2. **13 セクション構成に刷新**
   1. Hero (コンセプトアートを中央配置)
   2. Concept (「秘書ではなくもう一人の自分」)
   3. What's New · Ver.1.1.0 (HealthKit / EventKit / Home Feed)
   4. Three Pillars (Capture / Chat / Memory)
   5. Home Feed (今日 / 気づき / 話したいこと 3 カテゴリ)
   6. A Day With Double (6 シナリオ)
   7. Before / After テーブル
   8. Why DoubleHub (競合比較)
   9. Trust & Privacy
   10. Plans (Free / Plus ¥480)
   11. Ecosystem (BookCompass / TrainNote へ)
   12. FAQ (8 問)
   13. Final CTA

3. **AIO / SEO 強化**
   - `metadata` にキーワード・OG・Twitter カードを整備
   - JSON-LD 構造化データを追加
     - `SoftwareApplication` (価格・OS・機能リスト)
     - `FAQPage` (8 問の Q&A)
     - `BreadcrumbList`
   - 見出し階層 H1 → H2 → H3 を厳格化
   - FAQ を `<details>` で実装し、展開可能 + 構造化データと整合

4. **ブランド統一**
   - BookCompass ページの `theme-*` トークン、`Container` / `Section` / `Button` 共通部品を踏襲
   - コピーは「ですます調 + ダブルのセリフはタメ口」を徹底
   - 既存画像 (doublehub-task / chat / memory / concept / icon) のみで構成

### ビルド検証

- `pnpm build` 成功 (37 static pages)
- TypeScript エラーなし
- Playwright でデスクトップ / モバイル両方のフルページスクリーンショットを確認し、レイアウト崩れ・テキスト折り返しなし

### 残課題 / 今後

- Ver.1.1.0 の実画面スクリーンショット (HealthKit 連携、カレンダー連携、3 カテゴリ Home Feed) が入手できれば、`Three Pillars` や `Home Feed` セクションに差し込むとさらにリッチ化可能
- App Store スクリーンショット URL の取得は別途要 (現状はローカル画像で代替)

---

## 2026-04-24 (2) DoubleHub プロダクトページに Ver.1.1.0 実機スクリーンショット 4 枚を反映

### 概要

ユーザーから Ver.1.1.0 の実機スクリーンショット 4 枚 (カレンダー / 理解度ダッシュボード / 週次レポート / ヘルスケア & カレンダー連携設定) の提供を受け、プロダクトページに組み込み。

### 対象ブランチ

`feature/doublehub-page-v110-screenshots` → `main`

### 追加画像

`public/images/` に 900x1947 (JPEG 88 品質) で配置:

- `doublehub-integrations.jpg` — ヘルスケア & iOSカレンダー連携設定画面
- `doublehub-calendar.jpg` — カレンダー月間ビュー (2026年4月 / 4月17日のToDo表示)
- `doublehub-understanding.jpg` — ダブルの理解度ダッシュボード 67/100 (3項目構成 + 活きている理解)
- `doublehub-weekly.jpg` — 週次レポート (今週のふり返り 2026/04/20～04/24)

### 主な変更

1. **Memory セクションの画像差し替え**
   - 古い `doublehub-memory.jpg` (58/100 ダッシュボード) → 新しい `doublehub-understanding.jpg` (67/100 ダッシュボード)
   - alt テキストも「DoubleHub のダブルの理解度ダッシュボード画面」に更新

2. **Ver.1.1.0 ハイライトセクションの再設計**
   - 3 カードそれぞれに縦長(9:16) の実機スクリーンショットを追加
   - カード構造を「画像上 + 本文下」の縦型に変更
   - 3 つ目のカードを「Home Feed (3 カテゴリ)」から「Weekly Review (週次レポート)」に変更
     - Home Feed の 3 カテゴリは別セクション (Home Feed) で詳説済みのため重複回避
     - 週次レポートは Ver.1.1.0 の目玉で実機画像が映える

### ビルド検証

- `pnpm build` 成功 (37 static pages)
- Playwright でデスクトップ (1280px) フルページ撮影、全セクション表示確認
- 高さ 12715px、実機画像 4 枚が正しくロードされることを確認

### 変更ファイル

- `src/app/(marketing)/products/doublehub/page.tsx`
- `public/images/doublehub-integrations.jpg` (新規)
- `public/images/doublehub-calendar.jpg` (新規)
- `public/images/doublehub-understanding.jpg` (新規)
- `public/images/doublehub-weekly.jpg` (新規)
- `docs/web-renewal/DAILY_LOG.md`

---

## 2026-04-24 (3) — DoubleHub プロダクトページのトーン修正と Ver.1.1.0 カードのちらつき修正

### 背景

ユーザーから 3 点の修正依頼:

1. Ver.1.1.0 の 3 枚並びカード右上のぼかしカラーは良いが、フォーカス(ホバー)するとちらつく
2. 「WHAT'S NEW · VER.1.1.0」のバージョン表記は不要
3. コンセプトの「対等なトーン」は誤り。実際の DoubleHub は敬語を使う。ダブルのことばの例も敬語版に直す

### 主な変更

1. **Ver.1.1.0 カードのちらつき除去**
   - `group`, `hover:-translate-y-0.5`, `hover:border-accent-product/40`, `hover:shadow-md` を削除
   - 右上のぼかしカラーは `mix-blend-screen` + `opacity-30` で保持、画像の後ろに配置してちらつき原因のトランジション衝突を解消

2. **セクションラベル簡略化**
   - 「What's New · Ver.1.1.0」→「What's New」

3. **ダブルのトーンを「敬語」に統一**
   - コンセプトカード 1 枚目: 「対等なトーン」→「やわらかな敬語」(本文も踏み込みすぎない敬語の説明に)
   - コンセプトカード 2 枚目 (押し付けない): 敬語ベースの文面に書き換え
   - コンセプトカード 3 枚目 (育っていく): 語尾を「残ります」に修正
   - コンセプトのイントロ段落を「やわらかな敬語で並走する」方向に書き換え
   - HOW DOUBLE TALKS サンプル: 「明後日のレポート、今日のうちに少し進めておきませんか？」
   - Scenes セクションの 6 シーン全てのダブル台詞を敬語に変換
   - HealthKit ハイライトの引用台詞を敬語に変換
   - FAQ の「秘書 vs もう一人の自分」回答から旧「敬語は使わず」の記述を削除

### ビルド検証

- `pnpm build` 成功 (37 static pages)
- Playwright スクリーンショット `dh-polish-full.png` で視覚確認済み

### 変更ファイル

- `src/app/(marketing)/products/doublehub/page.tsx`
- `docs/web-renewal/DAILY_LOG.md`

---

## 2026-04-24 (3) トップページ全体のデザインリフレッシュ (Liquid Glass 導入 + AI っぽさ解消)

### 概要

ユーザーから「サイト全体のデザインは気に入っているが "AI が作ったサイトっぽい" という指摘をもらった」
というフィードバックを受け、Apple iOS 26 の Liquid Glass を部分導入しつつ、
構成・モーション・タイポグラフィ全体を見直して "AI LP テンプレ感" を解消した。

### 対象ブランチ

`feature/design-refresh` → `main`（8 コミット / 21 ファイル / +857 / -158 行）

### 事前調査 / 提案書

- `docs/web-renewal/PROPOSAL_liquid-glass-and-ai-feel.md` を新規作成
  - Apple 公式の iOS/iPadOS 26 UI Kit と Figma Native Glass Effect の利用可否を整理
  - Web では `-apple-visual-effect` 系は使えないため `backdrop-filter` ベースでエミュレートする方針を確立
  - 導入 7 箇所 / 非導入 5 箇所のマップと、Liquid Glass 以外の AI っぽさ解消施策を列挙
  - A/B/C の段階的導入プランを提示 → ユーザーは C（本格版）を選択

### Phase 1: デザイントークン + Header / Products ドロップダウン

- `src/styles/globals.css` に Liquid Glass 用 CSS 変数を追加
  - `--glass-bg` / `--glass-bg-clear` / `--glass-bg-heavy` / `--glass-border` / `--glass-blur` etc.
  - Light / Dark 両対応。内側ハイライト + 下側の微細な影で "厚みのあるガラス" を表現
- `.liquid-glass` / `.liquid-glass-clear` / `.liquid-glass-heavy` の 3 ユーティリティクラス
  - `@supports not (backdrop-filter)` と `prefers-reduced-transparency` でフォールバック
- `MarketingHeader`: スクロール 24px 超でピル型に "浮き上がる" モードに遷移
  - 通常時は従来通りの幅一杯ヘッダー、スクロール後は `container-wide` + `liquid-glass` + `rounded-full`
  - 500ms out-expo トランジションで違和感なく切り替わる
- Products ドロップダウンも `liquid-glass-heavy` に差し替え

### Phase 2: Hero バッジ + コンセプト画像枠

- 「Your Personal Partner」バッジを `.liquid-glass-clear` に変更（背後のグラデーション光源を活かす）
- コンセプト画像枠を二重構造化
  - 外側: 透明ガラスの額縁 (`.liquid-glass`)、背景のグラデが滞留する演出
  - 内側: 画像をそのままのフィデリティで保持（視認性優先）
- Hero の登場モーションを ease-out → spring に変更し "物理的な着地感" を付加

### Phase 3: CTA セクション

- 外枠全体を `.liquid-glass` に変更
- 内部に primary / accent-warm の 2 光源を配置し、ガラス越しに淡く滲む演出
- ボタン本体は可読性確保のため変更せず

### Phase 4: EcosystemTabs

- タブトリガーを `.liquid-glass` (アクティブ時に primary ティント + ring)
- タブパネル本体は `.liquid-glass-heavy` (文字可読性優先)
- "同規格カードの連続" という AI LP 感を最も直接的に破壊する適用ポイント

### Phase 5: ProductCards hover + FloatingToc（新規）

- ProductCards: hover 時にアクセント色の光源がカード背面に浮かぶ演出
- `src/components/marketing/FloatingToc.tsx` を新規作成（ブログ記事の右下フローティング目次）
  - マウント時に article 内の h2 / h3 [id] を自動走査
  - IntersectionObserver で現在位置を追尾しアクティブハイライト
  - 見出し 3 つ未満の記事では非表示（過剰な UI を避ける）
  - `.liquid-glass-heavy` のピル型ボタン + 展開パネル
  - `src/app/(marketing)/blog/[slug]/page.tsx` から呼び出し

### Phase 6: 構成リファクタ（AI っぽさ解消）

- `VisionSection`: 3 値カード (つなぐ / 映す / 導く) を削除
  - 英語ラベルも削除し、引用で静かに終える構成に変更
  - 「AI LP テンプレな 3 カード並列 + ラベル」を意図的に崩す
- `ProblemSection`: 中央揃えから左揃え大見出しに変更
  - ページ全体の中央揃え連続のリズムを折る
- Lucide の Users / MessageCircleOff / LayoutGrid アイコンを削除
  - 代わりに `01` / `02` / `03` のエディトリアルな大番号（primary / warm 交互）に変更

### Phase 7: モーション / ラベル / アイコン

- `ProductCards` の登場モーション: y フェード → 左からスライド + 強めの stagger に変更
  - 他セクションの縦フェード連続から視覚的に区別
- 英語 uppercase tracking ラベルを全セクションから削除したのち、再設計して復活
  - 当初削除 → ユーザーからのフィードバック「あった方が良い」で復活
  - `SectionEyebrow` コンポーネントを新規作成
    - 章番号 (01..06) を display フォント + primary 色で置き、sentence-case ラベルを添える
    - 章番号なしセクションは短い横ライン + ラベルのフォーマットでリズム調整
    - `align="center" | "left"` で配置制御（flex + justify-center で確実に中央揃え）
  - Hero は番号なし、ProblemSection / EcosystemSection / SpotlightSection / FaqSection / BlogTeaser は
    ダッシュのみ、本題ブロックは Ch.01〜06 の番号付き

### Hero グラデーション変更（ユーザー要望）

- 「DoubleHub（ダブルハブ）」のテキストグラデが AI っぽい
  (ティール→オレンジ) → アプリアイコンに合わせた配色に差し替え
- `.gradient-text-brand` を新設
  - `linear-gradient(135deg, #7dd87f → #2dd4bf → #22d3ee → #3b82f6)`
  - Dark テーマでは明度を上げた配色を別途定義
- アプリアイコンと Hero のタイトルで一貫したブランド表現に

### 細かな調整（ユーザーレビュー反映）

- Header 右側チップの文言: 「Web 版 準備中」→ 「ログインページ準備中」
  - `NEXT_PUBLIC_HOSTING_MODE=static` の時のみ表示
  - Vercel Preview 環境は `dynamic` になっておりログインボタンが出る
    (本番は `static` で意図通り動作)
- ProactiveSupport の既存バッジ「DoubleHub 本体で予定している体験」を削除
  - `03 Proactive Partner` の Eyebrow と情報が重複し視覚的にも干渉していたため
- DailyChoices のタグチップ濃度を全バリアント統一
  - 特に `cross` (データ横断) がグラデだと背景が見えず "文字だけ" に見えていた問題を修正
- SpotlightSection h2 末尾の句点「。」を削除（「丸」が浮いて見える違和感の解消）
- SectionEyebrow のテキスト色を text-muted → primary に変更
  (初期はグレーで地味すぎる、というフィードバック反映)
- `Ch.01` 表記 → `01` のみに簡略化（Ch. の意味が伝わりにくいとのフィードバック）

### ビルド検証

- 各 Phase ごとに `pnpm build` 成功 (37 static pages、TypeScript エラーなし)
- Playwright でデスクトップ (1440px) / モバイル (390px) / ダーク・ライト両テーマで
  ヘッダー、Hero、EcosystemTabs、CtaSection、VisionSection、ProductCards、FloatingToc、
  プロダクトページのヘッダー反映を個別にスクリーンショットで確認
- スクロール中の Liquid Glass フローティング挙動、Products ドロップダウンのガラス表示、
  EcosystemTabs アクティブ切替時のティント表示を確認

### 主な変更ファイル

- 新規:
  - `src/components/marketing/SectionEyebrow.tsx`
  - `src/components/marketing/FloatingToc.tsx`
  - `docs/web-renewal/PROPOSAL_liquid-glass-and-ai-feel.md`
- 更新:
  - `src/styles/globals.css` (Liquid Glass トークン + gradient-text-brand)
  - `src/app/(marketing)/blog/[slug]/page.tsx` (FloatingToc 組み込み)
  - `src/components/marketing/MarketingHeader.tsx` (スクロール追従ピル型ガラス)
  - `src/components/marketing/Hero.tsx` (バッジ + 画像枠ガラス化、ブランドグラデ、spring モーション)
  - `src/components/marketing/CtaSection.tsx` (ガラス外枠 + 内部光源)
  - `src/components/marketing/EcosystemTabs.tsx` (タブ + パネル Liquid Glass)
  - `src/components/marketing/ProductCards.tsx` (hover 光源 + スライドイン)
  - `src/components/marketing/DailyChoices.tsx` (チップ濃度統一、Eyebrow)
  - `src/components/marketing/ProblemSection.tsx` (番号デザイン + 左揃え)
  - `src/components/marketing/VisionSection.tsx` (3 値カード削除 → 引用締め)
  - `src/components/marketing/ProactiveSupport.tsx` (重複バッジ削除)
  - その他 Eyebrow 挿入: BlogTeaser / EcosystemSection / FaqSection / IdealSection /
    RoadmapSection / SolutionSection / SpotlightSection

### 残課題 / メモ

- Vercel Preview 環境の `NEXT_PUBLIC_HOSTING_MODE` が `dynamic` になっているため
  Preview ではログインボタンが表示される (`static` の main 本番とは挙動が異なる)。
  運用上の判断でそのまま維持。
- モバイル Safari の `backdrop-filter` が重くなりすぎた場合は、
  同時表示ガラス要素数の上限制御を検討。

## 2026-04-25 — ブログ一覧の参照性向上（カテゴリタブ / シリーズ集約 / 年月アーカイブ）

### 背景 / 目的

- 今後、記事を多く追加していく予定。単純な日付順グリッドのままだと
  過去記事を辿りづらく、参照性が低下する懸念があった。
- 既存 frontmatter に `category` / `tags` / `series` / `publishedAt` は揃っていたが、
  一覧ページ側で活用できていなかった。

### 実装内容（feature/blog-discoverability → main）

1. **カテゴリタブ + タグフィルタ + 公開月フィルタ**
   - 新規 `src/app/(marketing)/blog/_components/BlogExplorer.tsx` (クライアントコンポーネント)
   - カテゴリは件数バッジ付きチップタブ（「すべて / AI情報 (8) / ...」）
   - タグは上位 12 件をチップで表示、トグルで絞り込み
   - 公開月は `YYYY-MM` 単位でチップ表示、クリックで絞り込み
   - 3 軸は AND 結合、「絞り込みをリセット」ボタンで一括解除
   - 条件に合致する件数 / 全件数を結果上部に表示
2. **連載シリーズ集約ビュー**
   - 新規 `src/app/(marketing)/blog/_components/SeriesSection.tsx`
   - `series` frontmatter からシリーズ名（「 」内）を抽出してグループ化
   - 2 本以上あるシリーズのみカード化し、第 1 回からの順序で表示
   - 各シリーズカードに「全N回」バッジ、記事行には「第N回」ラベル
3. **blog.ts ヘルパー追加** (`src/lib/content/blog.ts`)
   - `getCategoryCounts()` / `getTagCounts(limit?)` / `getSeriesGroups()` /
     `getArchiveBuckets()` / `extractSeriesName()` を実装
   - シリーズ名抽出は「 」『 』どちらにも対応する正規表現
4. **blog/page.tsx** を Server Component として再構成し、
   シリーズセクション → 記事一覧（フィルタ付き）の 2 段構成に変更

### ビルド検証

- `pnpm build` 成功 (37 static pages、TypeScript エラーなし、Next.js 16.2.4)
- `/blog` は引き続き Static ルートとして出力される
- 既存記事詳細ページ (19 件) への影響なし

### 主な変更ファイル

- 新規:
  - `src/app/(marketing)/blog/_components/BlogExplorer.tsx`
  - `src/app/(marketing)/blog/_components/SeriesSection.tsx`
- 更新:
  - `src/app/(marketing)/blog/page.tsx` (シリーズ + フィルタ付き一覧へ)
  - `src/lib/content/blog.ts` (集計ヘルパー 5 種追加)

### 残課題 / メモ

- 今回は URL 同期 (`?category=...`) は見送り、state のみでシンプルに実装。
  記事数が増えて共有ニーズが出てきたら `useSearchParams` 経由で同期予定。
- 記事数が 50 本を超えたタイミングで「関連記事ブロック（記事詳細末尾）」
  と「サイト内検索（Fuse.js + build 時インデックス生成）」の追加を検討。
- `series` frontmatter の順序は現状「公開日昇順」で推定している。
  もし順序が異なるシリーズが出てきたら frontmatter に `seriesOrder` を追加する運用を検討。

## 2026-04-25 — ブログ記事4本追加＋構造化データ対応（SEO/AIO 強化）

### 背景

2026年4月25日時点で「本当に最新（1〜2日前レベル）」のAI情報を載せる
ブログ記事を4本追加。同時に、記事詳細ページの SEO/AIO（AI Optimization）を
本気で強化するため、JSON-LD 構造化データ（Article + BreadcrumbList + FAQPage）
と OGP / Twitter Card のメタデータを整備した。

### 追加記事（4本）

すべて `feature/add-blog-posts-2026-04-25` ブランチで作業し main へマージ。

| ファイル | カテゴリ | テーマ |
|---|---|---|
| `content/blog/claude-opus-4-7-real-world-review.mdx` | AIニュース | Opus 4.7 の基本情報 + 1週間分の実使用レポート（CodeRabbit・Cursor・Devin・Reddit）|
| `content/blog/cloudflare-agents-week-2026.mdx` | AI情報 | Cloudflare Agents Week 2026 で発表された 20+ 機能の総まとめ |
| `content/blog/siri-gemini-2026.mdx` | AIニュース | Google Cloud Next '26 で確定した Gemini 搭載 Siri、iOS 開発者の備え 4 点 |
| `content/blog/gpt-5-5-agentic-coding.mdx` | AIニュース | GPT-5.5（Spud）のスペック・ベンチマーク・個人開発者向け活用領域 |

### SEO/AIO インフラ側の変更

1. **`src/lib/content/blog.ts`**
   - `BlogFaqItem` 型を追加し `BlogPostMeta` に `faq?: BlogFaqItem[]` と
     `summary?: string` を追加
   - frontmatter の `faq` 配列を読み込んで型安全に渡せるように

2. **`src/app/(marketing)/blog/[slug]/page.tsx`**
   - `generateMetadata` に `keywords`、`openGraph.url/authors/locale`、
     `twitter` card を追加
   - JSON-LD (`application/ld+json`) をページ先頭に注入:
     - **Article schema**: headline / description / author / publisher /
       datePublished / dateModified / inLanguage=ja-JP / articleSection /
       keywords を含む
     - **BreadcrumbList schema**: Home → Blog → 記事タイトルの3階層
     - **FAQPage schema**: frontmatter の `faq` 配列から自動生成
   - 既存の 19 記事も `faq` を frontmatter に追加すれば FAQPage schema が
     自動で付与される再利用可能な設計

3. **記事本文側の AIO 対策**
   - 結論ファースト（最初の1〜2文で答えを提示）
   - 質問形式の見出しを積極使用（「〜とは何か」「どこで活かすか」「どう使い分けるか」）
   - 定義文・数値データ・箇条書きを多用して「AI が引用しやすい抜き書き単位」を増加
   - 記事末尾に「よくある質問」セクションを 4〜5 問配置（FAQPage と重複させ、
     ユーザー可読性と構造化データを両立）

### ビルド検証

- `pnpm build` 成功（静的ページ 41 件、TypeScript エラーなし、Next.js 16.2.4）
- `/blog` 一覧、各記事詳細、`sitemap.xml` がすべて静的生成されている
- 生成 HTML 内に `application/ld+json` が入り、Article / BreadcrumbList /
  FAQPage スキーマが正しく含まれることを確認

### 主な変更ファイル

- 新規:
  - `content/blog/claude-opus-4-7-real-world-review.mdx`
  - `content/blog/cloudflare-agents-week-2026.mdx`
  - `content/blog/siri-gemini-2026.mdx`
  - `content/blog/gpt-5-5-agentic-coding.mdx`
- 更新:
  - `src/lib/content/blog.ts`（faq / summary フィールド追加）
  - `src/app/(marketing)/blog/[slug]/page.tsx`（JSON-LD 注入、メタ拡充）

### 残課題 / メモ

- 既存の 19 記事にも順次 `faq` / `summary` を frontmatter で追加すると、
  サイト全体として AIO シグナルがさらに強くなる。特にアクセスの多い記事
  （例: `ai-habit-guide`、`claude-code-auto-mode`）から優先的に。
- Article schema の `image` は現在 `og-default.jpg` を使っているが、記事
  固有の OGP 画像を `public/og/<slug>.jpg` で用意し frontmatter から
  指すように拡張する余地あり。
- sitemap.xml 内の記事エントリは `changeFrequency: yearly` / `priority: 0.5`
  固定。最新記事のみ `weekly` / `0.8` に上げる改善も検討可。
- GPT-5.5 記事の内部リンクで `perplexity-computer-guide` を参照しているが、
  Codex のコンピュータ操作と直接対応する記事が今後増えたら貼り替え。

## 2026-04-25 (2) — 強調アスタリスク `**` が日本語文脈で強調にならない問題を修正

### 事象

ブラウザで記事を確認したところ、いくつかの箇所で `**...**` が強調
（`<strong>`）にならず、アスタリスクがそのまま表示されていた。
例: Claude Opus 4.7 レビュー記事の「highとmaxの間に**xhigh**という新しい」、
3月公開の Auto Mode 記事の冒頭「**Anthropicが、...追加した。**2026年...」。

### 原因

GFM の強調記法は「左フランキング / 右フランキング区切り子」のルールに従う。
以下のパターンで両端の `**` が有効な区切り子として認識されず、
リテラル文字として残ってしまう:

1. **前後が日本語文字 + 隣接テキストがない** `**xhigh**` 型
   （例: `間に**xhigh**という`）
2. **`%` や `→` など記号で両端が囲まれる** `**87.6%**` 型
3. **インラインコードをそのまま bold で囲む** `` **`xhigh`** `` 型
4. **`。**` の直後に日本語が直続する** `...追加した。**2026年` 型

### 対応

`content/blog/` 配下の以下 5 記事を一括修正:

- `claude-opus-4-7-real-world-review.mdx`
- `cloudflare-agents-week-2026.mdx`
- `siri-gemini-2026.mdx`
- `gpt-5-5-agentic-coding.mdx`
- `claude-code-auto-mode.mdx`

修正ルール:

- 日本語文字に隣接する `**...**` は両端に **半角スペースを追加**
- コード入れ子は `` **`xhigh`** `` → `**xhigh**`（コードを外す）
- 半角スペースが入っても可読性を損なわないように前後の文脈を微調整

### 検証

- remark + remark-gfm で全記事を再レンダリングし、残存する `**..**` を grep
  全記事で **残存ゼロ** を確認
- `pnpm build` 成功（41 static pages、TS エラーなし）

### 残課題 / メモ

- 他の既存記事（`ai-brain-fry-workload-creep.mdx`、`ai-workslop-bottleneck.mdx`、
  `ai-cognitive-offloading.mdx` など）にも同様のパターンが含まれている可能性
  があるため、時間のあるときに順次チェック・修正予定
- スキル（`doublehub-article`）側にも、日本語文脈での `**` 使用時は
  **両端に半角スペースを入れる** ルールを明文化する必要あり
- remark プラグインで日本語文脈の強調を自動認識させる手もあるが、プラグイン
  選定・保守コストを考えると、執筆時ルールで回避する方が簡単

## 2026-04-25 (3) — 既存記事 17 本の強調アスタリスク問題を一括修正

### 背景

前セッションで修正した強調アスタリスク表示問題（GFM の左右フランキング
区切り子ルールにより `**...**` が `<strong>` にならずリテラル出力される
問題）が、既存の他の記事にも残っているとユーザー指摘。全記事を対象に
スキャン＆一括修正を実施。

### 診断結果

全 23 記事（今回追加分 4 本を含む）を remark-gfm でレンダリングし、
HTML 内に残存する `**...**` を検出:

- 問題のある記事: 17 件
- 合計問題箇所: 40 件（40 行に跨る）

### 修正対象（17 記事）

- ai-brain-fry-workload-creep.mdx（4件）
- ai-coding-agent-comparison-2026.mdx（1件）
- ai-cognitive-offloading.mdx（7件）
- ai-critical-thinking.mdx（3件）
- ai-habit-guide.mdx（1件）
- ai-healthy-work-guide.mdx（5件）
- ai-self-understanding-data.mdx（1件）
- ai-trainer-vs-human.mdx（1件）
- ai-workslop-bottleneck.mdx（7件）
- fitness-ai-record.mdx（1件）
- gemini-api-spend-cap-april-2026.mdx（1件）
- gemini-chat-import.mdx（1件）
- indie-dev-ai-implementation.mdx（1件）
- lifedata-self-understanding.mdx（1件）
- llm-benchmark-guide-basics.mdx（2件）
- perplexity-computer-guide.mdx（1件）
- reading-ai-habit.mdx（2件）

### 修正ロジック

各 `**...**` 候補について、その周辺を含む最小文字列で remark-gfm
レンダリングを試行し、HTML 上で `**` がリテラル残留する場合だけ修正:

1. 日本語／記号に隣接する `**...**` → 両端に半角スペース追加
2. `` **`xhigh`** `` のようなコード入れ子 → `**xhigh**`（コードを外す）
3. 既に空白が隣接している場合は触らない（余計な空白を増やさない）

### 主に見つかったパターン

- **記事冒頭の結論太字リード文**（`**結論は〜。**` 形式）
  多くの記事で冒頭 1 行がこの形式を採用しており、直後の文が日本語で
  始まることで強調が効かないケースが多数
- **固有名詞・引用句の強調** `**「認知的負債（cognitive debt）」**` 型
  前後が日本語文字で囲まれているパターン
- **数値データの強調** `**83%**` `**$186**` `**わずか14%**` 型
  両端が数字・記号のパターン

### 検証

- remark-gfm で再レンダリングし、全 23 記事で残存 `**..**` ゼロを確認
- `pnpm build` 成功（41 static pages、TS エラーなし）

### 副次効果

冒頭のリード文「`**結論は...**`」直後に半角スペースが入ることで、
太字と続く説明文の視覚的な区切りが明確になり、可読性も若干向上。

### 残課題

- スキル側（doublehub-article）の修正指示は既に作成済みで、
  次回記事作成時から日本語強調時の半角スペースルールが適用される想定
- リード文冒頭の `**` がブロック開始位置にある場合、その前に空白が
  入れられないため、リード文を区切る際はスクリプトが後続だけ空白追加
  する挙動（例: `**〜です。** 続く文` の形）で統一された

## 2026-04-25 (4) — DoubleHub プロダクトページに BookCompass 連携セクションを追加

ブランチ: `feature/update-doublehub-product-page-bc-link`
変更ファイル: `src/app/(marketing)/products/doublehub/page.tsx`

### 背景

BookCompass で読書中に得た気づき・最近の検索テーマ・読んだ本の要約が、
DoubleHub のダブルとの会話に「文脈」として流れ込む配線が完了。
この価値をユーザー向けの表現でプロダクトページに反映する。

社内向けに整理されていた素材から、ユーザーに伝わる体感価値だけを取捨選択。
内部用語（chat_insights / retrieval_documents / Phase / PR 番号 / シナリオ番号 など）は載せず、
未実装の機能は明確に "Coming Soon" として扱った。

### 主な変更

1. **Hero / metadata の更新**
   - description / keywords に「読書記録（BookCompass）」を追加
   - Hero リード文に BookCompass を明記

2. **What's New（Ver.1.1.0）3枚目カードを差し替え**
   - 旧: Weekly Review カード
   - 新: BookCompass Link カード（紫アクセント）
   - Weekly Review の内容は Other Refinements 側に短文で残した

3. **新セクション: BookCompass Link**（Ecosystem の手前に追加）
   - 見出し: 「同じ自分を、二度説明しなくていい。」
   - 3 カード:
     - 内面の地図 — ダブルが価値観や自分なりの答えを踏まえて応答
     - 会話の入口 — 最近の関心テーマからダブル側が話を切り出す
     - 想起できる過去 — 読んだ本の余韻を想起（推薦ではなく想起）
   - 体感価値ボックス: "The Feeling" コピー
   - Coming Soon 3 枚:
     - 読書からの行動化（PR 7 相当を一般向け表現に）
     - 応答の確実性向上（PR 6 相当）
     - 評議会・Deep Research（v1.5 / v2.5 以降）

4. **Ecosystem セクション**
   - 「BookCompass とはすでに連携が始まっています」と現状を明記
   - 旧: surface=default → 新: surface=alt（BookCompass Link との視覚分離）

5. **FAQ に Q&A 追加**
   - 「BookCompass と連携すると何が変わりますか？」を 2 番目に挿入

6. **vsTable / featureList / 改善サマリの調整**
   - 「過去の入力・予定・健康状態 + 読書から得た気づき」を反映
   - JSON-LD featureList に BookCompass 連携を追加

### 取捨選択

- 載せた: 体感価値、3 つの体験軸、Coming Soon、誇大広告回避のニュアンス
- 載せなかった: 内部 PR 番号、技術スキーマ名（chat_insights 等）、
  App Store 審査リスク言及、Phase 4（rate limit / 429）の状態、
  Beyond-Context 層、配線/プロンプト精緻化などの内部表現

### 検証

- `pnpm build` 成功（41 static pages、TS エラーなし）
- /products/doublehub のセクション順序: Hero → Concept → What's New →
  Three Pillars → Home Feed → A Day With Double → Before/After →
  Why DoubleHub → Trust & Privacy → Plans → **BookCompass Link**（新規） →
  Ecosystem → FAQ → Final CTA

## 2026-04-25 (5) — DoubleHub プロダクトページ文言調整 + トップページ Ecosystem タブ最新化

ブランチ: `feature/refine-doublehub-bc-and-home`

### 1. /products/doublehub の BookCompass Link セクション微修正

ユーザーフィードバックを受けた文言調整:

- リード文「『内面の輪郭』が、DoubleHub に持ち込むときに再ヒアリングがいらない。」が
  日本語として違和感ありとの指摘 → 「DoubleHub ではそのまま会話の背景になります」へ書き換え
- The Feeling カード見出しがセクション見出しと同じ「同じ自分を、二度説明しなくていい」
  になっていた（意図的な反復ではなく編集ミス） →
  「読書で深めた自分が、生活の中でそのまま生きている」へ差し替え。
  説明文も「考える」と「生きる」の対比で構成し直し。

### 2. トップページ Ecosystem タブ（EcosystemTabs.tsx）

`src/components/marketing/EcosystemTabs.tsx`

#### DoubleHub 本体タブ: Coming Soon → Current 化

DoubleHub はすでにリリース済みなので status 修正:
- status: 'coming' → 'current'
- statusLabel: 'Coming Soon' → 'Current'
- panelLabel: 'Coming Soon' → 'Input → Insight'
- inputs / understands を 4 項目 / 3 項目に拡充
- visual: 'abstract-todo'（自作 SVG） → 'screenshots'
  - 実機 doublehub-task.jpg と doublehub-chat.jpg を 2 枚並び表示

副作用として AbstractTodo / AbstractVisual コンポーネントは不要になり削除。

#### 健康・ヘルスケアタブ: 抽象波線図形を削除し説明をリッチに

- visual: 'image-health' → 'none'
- imageSrc: '/images/health-benefit-diagram.png' を削除
- inputs: 3 → 4 項目（睡眠スコア、エクササイズ分数、コンディションの波、
  体調と予定の関係）
- understands: 3 → 4 項目（集中力・決断力への影響、タスク量と身体の見合い、
  励まし強度の調整など）
- 抽象図形の代わりに `PanelNote` コンポーネント（破線 dashed のノートブロック）
  で「読み取り専用、生データは保存しません」の安心情報を補足

#### 家計アプリタブ: 抽象波線図形を削除し説明をリッチに

- visual: 'image-finance' → 'none'
- imageSrc: '/images/finance-benefit-diagram.png' を削除
- inputs / understands を各 3 → 4 項目に拡充
- 抽象図形の代わりに PanelNote で「構想中の領域です」と明示し、
  方向性（"何を買うべきか" より "どんな使い方が自分を充電させるか") を補足

#### 型定義の整理

InsightPanel.visual の型を
`'screenshots' | 'abstract-todo' | 'image-finance' | 'image-health'` →
`'screenshots' | 'none'` にシンプル化。
note?: { label: string; body: string } を新設して visual='none' 時に表示。

### 検証

- `pnpm build` 成功（41 static pages、TS エラーなし）
- DoubleHub タブ: 実機スクリーンショット 2 枚 (task / chat) で
  プロダクト感が増した
- 健康/家計タブ: 抽象 PNG が消えた代わりに、文章での説明量が増えて
  ユーザーに伝わる情報密度が上がった


## 2026-04-25 — HubWallet プロダクトページ追加

### 背景

新プロダクト HubWallet（iOS 家計簿アプリ）が MVP リリース直前のため、
DoubleHub サイトに専用プロダクトページ /products/hubwallet/ を新設。

### 変更内容

- `src/app/(marketing)/products/hubwallet/page.tsx` 新規作成。
  Book Compass / TrainNote ページの構成を踏襲しつつ、HubWallet 用に
  以下のセクションで構成:
  Hero / Why HubWallet（課題提起） / Core Experience（4本柱） /
  App Screenshots / Features / Privacy & Trust / Compare /
  Flow Into DoubleHub / Plans / FAQ / Final CTA。
- `src/lib/site/config.ts` の `products` 配列と `footerNav.products`
  に HubWallet を追加。`accentClass: 'theme-hubwallet'`。
- `src/styles/globals.css` に HubWallet トークン
  （--hw-primary / --hw-accent / --hw-accent-soft 他）と
  `.theme-hubwallet` スコープを追加。
  やわらかいグリーン系（#2f9e6c / #38b27d）。
- `src/app/sitemap.ts` に `/products/hubwallet/` を追加。
- `src/components/marketing/ProductCards.tsx` で HubWallet を slug
  でフィルタ。トップ「3 つのプロダクト」グリッドの 3 枚固定構成は維持。
  ヘッダーのドロップダウンとフッターからは HubWallet にもアクセスできる。
- 添付モックアップ 6 枚を `public/images/hubwallet-screen-*.jpg`
  として配置（ホーム / 仕分け / 月次 / 年間 / カテゴリ / 音声）。

### LP のガードレール反映

- ヒーローに「近日公開予定」バッジを表示し、App Store バッジは出さない。
- プラン金額（Free / Plus ¥480・¥3,800）は「仮」と明記。Premium は
  「Phase 2 以降」として軽く触れる程度。
- DoubleHub 連携は「単体で完結。つなげればもっと深く」のトーンで、
  深い連携体験は Phase 2 以降の予定であることを明記。
- スクリーンショット下に「データはすべて開発用のモック」と注記。
- 「資産管理」「投資管理」などの金融用語は不使用。「家計簿」
  「自己管理ツール」「お金の使い方の可視化」で統一。

### 検証

- `pnpm build` 成功（42 static pages）。
  - 増分: `/products/hubwallet`（前回 41 → 今回 42）。
  - TypeScript エラーなし。


## 2026-04-25 — HubWallet 料金プラン微修正 + Ecosystem タブ更新

### HubWallet ページ修正

- 料金プラン (無料 / Plus) の文言を更新:
  - 無料プラン: 「手入力・CSV インポートは無制限」「音声入力も 月数回まで（最終回数は調整中）」を追加。
    音声入力も AI 関連と同じく月数回の上限があることを明示。
  - Plus プラン: 「AI OCR・カテゴリ推定の無制限利用」→「AI OCR・カテゴリ推定の
    利用上限を大幅アップ」に変更（無制限にするか検討中のため）。
    「音声入力の利用上限も大幅アップ」も明示。
- Features セクションの「Gemini が金額・日付・店舗・品目を読む。」の見出しを
  「AI が金額・日付・店舗・品目を読む。」に変更。本文も「Gemini → AI」。
- FAQ「データは外部に送られますか？」の回答からも Gemini 表記を削除し、
  AI 表記に統一。Privacy セクションの注釈も同様。
- これらの修正は LP の「広告 / モデル名にロックインしない記述」の方針にも沿う。

### Ecosystem タブ (トップページ) 更新

- 「家計アプリ」タブを HubWallet として再構成:
  - name: '家計アプリ' → 'HubWallet'
  - status: 'future' / 'Future' → 'coming' / 'Coming Soon'
  - inputs / understands を MVP の機能に合わせて書き直し
    （レシート撮影・親カテゴリ別の使い方・定期支出・未整理の保留 など）
  - visual: 'none' → 'screenshots' に変更し、
    /images/hubwallet-screen-home.jpg と
    /images/hubwallet-screen-monthly.jpg をパネル内に表示
  - note は「HubWallet は MVP リリース直前」の文脈に書き直し、
    screenshots と併記して見せられるよう描画ロジックを拡張
- タブカードの不揃いを解消:
  - panelIconMap を `Record<string, PanelIcon>` 型に変更し、
    image / emoji の 2 種を扱えるように。
  - health は ❤️、finance (HubWallet) は 💰 の絵文字フォールバックを設定。
  - タブの Image 描画もアイコン領域を「常に確保」する条件に変更。
    結果、健康・ヘルスケアと HubWallet のカードが他のタブと同じ縦幅に揃った。

### 検証

- `pnpm build` 成功（42 static pages, TS エラーなし）。
- ローカル dev サーバーで以下を目視確認:
  - Ecosystem タブ 5 枚が同じ縦幅で並ぶ。
  - HubWallet タブを開くとモック 2 枚と「MVP リリース直前」ノートが表示。
  - HubWallet ページの Plans セクションの文言が要望どおりに更新。


## 2026-04-25 — Ecosystem タブ：健康・ヘルスケアの高さを最終調整

健康・ヘルスケアタブだけ縦幅が狭く見える件の最終対応:

- `tabDesc` 「睡眠・歩数・活動量の傾向」(12 文字 / 1 行) は他カードに比べ短く、
  唯一 1 行で収まる結果カード高さが詰まっていた。
  「睡眠・歩数・活動量、身体のコンディション」(20 文字 / 2 行) に変更。
- 加えて、tabDesc 描画 span を `block` + `min-h-[2.5rem]` に変更。
  将来 1 行に収まる短いコピーになっても 2 行分の高さを確保し、
  カードが詰まらないようにガード。

### 検証

- `pnpm build` 成功（42 static pages, TS エラーなし）。
- ローカル dev サーバーで Ecosystem タブ 5 枚が完全に同じ高さで並ぶことを目視確認。


## 2026-04-25 — Roadmap セクション再構成 + HubWallet タブのコピー修正

### Roadmap (06)

3 フェーズの「現在地」が現実とずれていた点を修正:

- DoubleHub 本体は既にリリース済みなので、`progress` から `done`（青チェック）に変更し、
  文言も「設計・開発中」→「リリース済み」に。
- 一番左カードのラベルを `Now` から **`Shipped`** に変更し、tone も新規 'shipped' に。
  バッジ色はチェック色と揃えてプライマリ色で「対応済み」を表現。
  カードタイトルも「既存サービスを磨く」→「各サービスをリリースし、磨き込み中」に整える。
- 真ん中カードを **`Now`** に。連携基盤の整備が現在進行中であることを反映し、
  共通認証基盤の構築 / フェデレーテッド API 設計 を `pending` から `progress` に。
- 右カードを **`Next`** に変更（旧 `Future`）。
- 副次的に、Now バッジが背景透明になる不具合を修正:
  Tailwind の `bg-accent-warm/90` が CSS 変数定義 (`#e8734a`) と相性が悪く
  半透明指定で背景色が反映されていなかったため、`bg-accent-warm` のベタ塗りに変更。

### Ecosystem タブ (HubWallet)

「ダブルが理解すること」の最後の行が日本語として不自然だった点を修正:

- 「今のあなたには『推す』か『休む』か、助言の調子」
  → 「今は背中を押すべきか、休むべきかの助言の調子」

### 検証

- `pnpm build` 成功（42 static pages, TS エラーなし）。
- ローカル dev サーバーで Roadmap 3 枚カードのバッジ・チェック状態、
  HubWallet タブの文言を目視確認。


## 2026-04-26 — トップページのヒーローを「AIパートナー」訴求型に刷新

旧コピーは「世界で一番あなたのことを理解してくれる存在を目指す」という願望表現で、
ぱっと見「何のサイトか / どんな価値か」が伝わりにくい課題があった。
方向性を「機能ベネフィット先出し型 × 領域＋ブランド明示型」に決定し、
4 領域（学び・身体・お金・タスク）を粒度を揃えて提示する形へ。

### 変更内容（`src/components/marketing/Hero.tsx`）

- ラベル: `Your Personal Partner` → `Your Personal AI Partner`（"AI" を明示）
- 見出し: 「世界で一番あなたのことを理解してくれる存在を目指す『DoubleHub（ダブルハブ）』」
  → 「あなたを理解し、毎日を一緒に整える AI パートナー。」
  - 「目指す」（願望）を取り除き、現在の価値を言い切る形に
- 本文: タスク/思考整理/コミュニケーションの並列列挙を、4 領域の例示に置き換え
  - 「学び（BookCompass）、身体（TrainNote）、お金（HubWallet）、タスク——
    複数のサービスをつないで、あなた専用の AI パートナーを育てます。」
  - 家計（広い）と読書・運動（狭い）の粒度差を「領域語＋括弧でアプリ名」で吸収
  - エコシステム性（連携プラットフォーム）も同時に伝える
- ボタン左: `どう役に立つのか見る` → `DoubleHub の使い方を見る`
- ボタン右: `今すぐ使えるサービス` → `使えるサービスを見る`（"〜を見る" で並列化）
- コンセプト画像と画像下キャプションは現状維持

### 検証

- `pnpm build` 成功（42 static pages, TS エラーなし）。
- 差分は `Hero.tsx` のみ（8 insertions / 9 deletions）。

### 補足

- 作業着手時、ローカルクローンの main が古い HTML 版で取り残されており、
  `git pull` 中の lock 衝突で中途半端な状態になっていた。
  一旦ユーザー承認のもと `git reset --hard origin/main` で同期し直してから
  `feature/update-hero-copy` を切り直して作業した。
  リモート (origin/main) には影響なし。

## Day 11 — 2026-04-29 (JST) — Search Console「404 / 重複 / クロール済み未登録」の追加対応

### 背景

ユーザーから Search Console の追加指摘を共有：
- 「インデックス登録が見つかりませんでした 404」: 2 件
- 「重複しています」: 1 件
- 「クロール済み - インデックス未登録」: 3 件

Day 9 続き4（2026-04-23）で `add_canonical.py` / sitemap 再生成は実施済みだが、
Next.js + Vercel への移行後にも残っていた以下の構造的問題に対処する。

### 原因の診断

1. **Vercel で旧 `.html` URL の 301 リダイレクトが効いていない**
   - `_redirects` は Cloudflare Pages 用、`scripts/postbuild-redirects.mjs` は GitHub Pages 用。
   - Vercel (`vercel.json` / `next.config.js`) には `redirects()` 定義がなく、
     `bookcompass.html` 等の旧 URL に外部から流入が残っている場合 404 になる。
2. **トップページ canonical が末尾スラッシュ無し**
   - `src/app/layout.tsx` の `metadataBase + alternates.canonical: siteConfig.url` が
     `https://doublehub.jp`（末尾スラッシュ無し）。一方 `trailingSlash: true` で実体は
     `https://doublehub.jp/`。Google の判定で「重複しています」を誘発し得る。
3. **sitemap の lastModified がビルド時刻**
   - 静的ページの `lastModified` が毎デプロイで `new Date()` になり、
     全 URL を「常に更新」と見なしてクロール優先度のシグナルを乱していた。

### 変更内容

#### `next.config.js`
- `redirects()` を追加し、`isExport=false`（Vercel / Cloudflare Pages dynamic）時に
  以下の旧 HTML URL を 301 で正規 URL へ転送：
  - `/bookcompass.html`, `/trainnote.html`, `/about.html`, `/support.html`, `/privacy.html`
  - `/blog/index.html`
  - `/blog/{slug}.html`（19 件、`scripts/postbuild-redirects.mjs` と同じ slug 群）
- 静的エクスポート時はビルドエラー回避のため `redirects()` を無効化（既存挙動維持）。

#### `src/app/layout.tsx`
- `alternates.canonical` を `siteConfig.url` → `'/'` に変更。
  `metadataBase` と組み合わせて末尾スラッシュ付きの正規 URL `https://doublehub.jp/` が
  解決される。各ページの `metadata.alternates.canonical` で上書きされる前提のフォールバック。

#### `src/app/(marketing)/page.tsx`
- 明示的に `export const metadata: Metadata = { alternates: { canonical: '/' } }` を追加。
  layout 側に依存せずトップページが自己参照 canonical を持つ。

#### `src/app/sitemap.ts`
- 静的ページの `lastModified` をビルド時刻ではなく「ブログ最新 updatedAt」に固定。
  ホーム URL は `${base}/`（末尾スラッシュ）に統一。

### 検証

- `pnpm build` 成功（42 static pages、TS エラーなし、既存 SSG ルート構成は不変）。

### Search Console 側で必要な追加確認

- 該当 URL（404 2 件 / 重複 1 件 / クロール済み未登録 3 件）の URL リストはまだ未共有。
  ユーザーに「ページの索引登録 → 該当のフィルタ → URL 一覧をエクスポート」してもらえると
  本番反映後に確実な再現確認とリクエスト送信ができる。

---

## 2026-04-29 — Search Console Drilldown URL 確認 + `/index.html` リダイレクト追加

### 背景

Search Console「ページの索引登録」Drilldown CSV から、未登録扱いとなっている個別 URL が判明。
本番（`https://www.doublehub.jp`）に対して `curl -I` で挙動を確認した結果は以下の通り。

| 区分 | URL | 現在の挙動 |
| --- | --- | --- |
| 重複 | `https://doublehub.jp/index.html` | `www` へ redirect → 最終 **404**（未対応） |
| クロール済み - 未登録 | `https://doublehub.jp/blog/gemini-api-spend-cap-april-2026/` | canonical www へ redirect → 200（正常） |
| クロール済み - 未登録 | `https://doublehub.jp/llms.txt` | canonical www へ redirect → 200 text/plain（正常） |
| クロール済み - 未登録 | `https://doublehub.jp/blog/ai-habit-guide/` | canonical www へ redirect → 200（正常） |
| 404 | `https://doublehub.jp/blog/claude-code-auto-mode.html` | 301 → `/blog/claude-code-auto-mode/` 200（前回修正で対応済み） |
| 404 | `https://doublehub.jp/blog/llm-benchmark-guide-advanced.html` | 301 → `/blog/llm-benchmark-guide-advanced/` 200（前回修正で対応済み） |

判明した不具合は **`/index.html` のリダイレクトルールが欠落** している点のみ。
クロール済み未登録 3 件は 200 で解決しており、コードの不具合ではなく Google 側の評価待ちと判断。

### 変更内容

#### `next.config.js`
- `legacyRedirects` の先頭に `{ source: '/index.html', destination: '/' }` を追加。
  `permanent: true`（301）で Vercel dynamic ホスト時に効く。

#### `public/_redirects`（Cloudflare Pages 用）
- `/index.html /  301` を追加。

#### `scripts/postbuild-redirects.mjs`（GitHub Pages static export 用）
- `redirects` 配列の先頭に `{ from: 'index.html', to: '/' }` を追加。
  `out/index.html` がメタリフレッシュ HTML で上書きされないよう注意したいところだが、
  本スクリプトは `index.html` キーを `out/index.html` に書き出す。
  → static export 経路は GitHub Pages 専用であり、本番は Vercel dynamic（top は `/` を SSG）が
    canonical なので影響なし。Cloudflare Pages / Vercel 経路では `_redirects` と
    `next.config.js` の redirects() が優先される。

### 検証

- `pnpm build` 成功（変更前と同じ static page 数、TS / lint エラー無し）。

### Search Console 側で必要な追加確認

- main マージ後の本番反映を待ち、`https://doublehub.jp/index.html` および
  `https://www.doublehub.jp/index.html` が 301 で正規トップへ転送されることを確認。
- `https://www.doublehub.jp/index.html` に対して URL 検査 → 「公開 URL をテスト」→
  「インデックス登録をリクエスト」を実行する。
- クロール済み未登録の 3 件（gemini-api-spend-cap-april-2026 / llms.txt / ai-habit-guide）は
  現状 200 で正規 URL に正しく redirect しているため、追加コード修正は不要。
  数週間スパンで Google の再評価を待つ運用とする。


## 2026-04-29 AIニュース記事3本追加（SEO/AIO 対応）

直近1週間のAIニュース動向をカバーする記事を3本追加した。いずれも `category: "AIニュース"` で
ブログ一覧・sitemap・関連記事へ自動的に反映される（`content/blog/*.mdx` を `getAllPosts()` で
読み込み、publishedAt 降順で並ぶ実装のため、3本がトップに揃う）。

### 追加記事

| slug | タイトル | 一次ソース |
|---|---|---|
| `gpt-5-5-api-indie-dev` | GPT-5.5 APIが個人開発で使えるように——何が変わるのか？ | OpenAI 公式（`openai.com/index/introducing-gpt-5-5/`） |
| `claude-code-quality-issue-lessons` | Claude Codeの品質低下はなぜ起きた？個人開発者が学べること | Anthropic 公式ポストモーテム（`anthropic.com/engineering/april-23-postmortem`） |
| `openai-models-amazon-bedrock-impact` | OpenAIモデルがAmazon Bedrockへ。AI開発者が知るべき影響 | About Amazon / AWS Blog |

### SEO / AIO 対応

- title 60字以内、description 160字程度を意識
- 各記事の冒頭1〜2文で結論を明示（AI Overview 抽出用）
- 「この記事の要点」を箇条書きで挿入
- 質問形式の h2 を含める（例: 「GPT-5.5 APIで何が変わるのか？」）
- `faq` を frontmatter に持たせて FAQPage JSON-LD を自動生成
- Article + BreadcrumbList + FAQPage の構造化データは `[slug]/page.tsx` 既存実装で出力
- 既存記事への内部リンクを各記事 2〜3 本設定（gpt-5-5-agentic-coding / claude-code-auto-mode /
  claude-opus-4-7-real-world-review / cloudflare-agents-week-2026 / gemini-api-spend-cap-april-2026）
- 出典は実URLで本文末に明記、Perplexity 等のアトリビューションは入れていない

### 検証

- `pnpm build` 実行、新3記事の static page を含めビルド成功
- `feature/add-ai-news-april-2026` で作業し、`main` に `--no-ff` マージして push


## 2026-05-02 GSC「リダイレクト」「404」追加対応 + ヒーロー連動メタ更新

### 背景

Search Console の追加 CSV から、未登録扱いになっている URL を再確認した。

- **ページにリダイレクトがあります（6 件 / Biao.csv）**
  - `/blog/claude-opus-4-7-real-world-review/`
  - `/blog/llm-benchmark-guide-basics/`
  - `/blog/ai-habit-guide/`
  - `/blog/claude-code-auto-mode/`
  - `/products/doublehub/`
  - `/blog/perplexity-computer-guide/`

  `curl -I` で確認したところ、いずれも apex（`doublehub.jp`）から www（`www.doublehub.jp`）へ
  Vercel 側で 308 リダイレクトされ、最終的に 200 で配信されていた。
  原因は **`siteConfig.url` / `sitemap.xml` / `robots.txt` / `llms.txt` がすべて apex の
  `https://doublehub.jp` を出力していた** こと。Google は sitemap の URL を起点にクロール
  → 308 を踏むため「ページにリダイレクトがあります」と判定していた。

- **見つかりませんでした（4 件 / Biao-1.csv）**
  - `/blog/index.html`
  - `/blog/gemini-chat-import.html`
  - `/blog/claude-code-auto-mode.html`
  - `/blog/llm-benchmark-guide-advanced.html`

  これらは旧静的サイト時代の `.html` URL。`www.doublehub.jp` 上では既に
  `next.config.js` の `redirects()` と `_redirects` で 308 → 該当の clean URL → 200 に
  解決している（curl で確認済）。CSV の前回クロール日（2026-04-25〜04-28）は前回の
  `/index.html` 修正がデプロイされる前のスナップショット。**サイト側に追加修正は不要、
  Google の再クロール待ちで自然に解消する**（コード上は無視可）。

  なお `/blog/llm-benchmark-guide-advanced/` のように現在の clean URL は **サイト内部の
  どこからもリンクしておらず**、`llms.txt` でも参照していないため、再クロール後は
  単純に「クロール済み - 未登録」として落ち着く想定。

### 変更内容

#### `src/lib/site/config.ts`
- `siteConfig.url` のデフォルトを `https://doublehub.jp` → `https://www.doublehub.jp` に変更。
  これにより `sitemap.ts`, OGP `metadataBase`, 各構造化データの URL がすべて canonical の
  www ホストで出力される（GSC「ページにリダイレクトがあります」の根本原因を解消）。
- `siteConfig.author.url` も www ホストへ。
- `siteConfig.tagline` を **「ひとりで、でも、孤独じゃない。」** から
  **「あなたを理解し、毎日を一緒に整える AI パートナー」** に変更。
  Hero コピー（`あなたを理解し、毎日を一緒に整える AI パートナー。`）と SERP/タブの
  ページタイトルを揃えた（`title.default = "${name} — ${tagline}"`）。
- `siteConfig.description` も Hero の補足コピーに合わせて
  「学び（BookCompass）、身体（TrainNote）、お金（HubWallet）、タスク——複数のサービス
  をつないで、あなた専用の AI パートナーを育てる DoubleHub のエコシステム。」に更新。
  検索結果 description / OGP description もここから派生する。

#### `src/app/(marketing)/products/{doublehub,bookcompass,trainnote,hubwallet}/page.tsx`
- 構造化データ（JSON-LD）/ OGP / BreadcrumbList 内のハードコード URL を一括で
  `https://doublehub.jp` → `https://www.doublehub.jp` に置換。

#### `src/components/marketing/MarketingFooter.tsx`
- フッターの `llms.txt` リンクを www ホストに統一。

#### `public/robots.txt`
- `Sitemap:` 宣言を `https://www.doublehub.jp/sitemap.xml` に変更。

#### `public/llms.txt`
- 全リンクを `.html` 旧 URL から現行の clean URL（trailing slash）に置換し、
  ホストも www に統一。
- HubWallet を追記（プロダクトリストの欠落を補完）。
- 冒頭サマリを Hero と同じ「AI パートナー」訴求にリライト。

#### `.env.example`
- `NEXT_PUBLIC_SITE_URL` のサンプル値を www ホストに更新。

### 検証

- `pnpm install --frozen-lockfile` 成功。
- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、Static 45 ページ + SSG 26 記事、
  TS / lint エラー無し）。
- `.next/server/app/sitemap.xml.body` の出力先頭が `https://www.doublehub.jp/` で
  始まることをローカルで確認。

### Search Console 側で必要な追加確認（デプロイ後）

- main マージ → Vercel 反映後、`https://www.doublehub.jp/sitemap.xml` の `<loc>` が
  すべて `https://www.doublehub.jp/...` で始まることを確認。
- GSC で 6 件の「ページにリダイレクトがあります」URL に対して URL 検査 →
  「公開 URL をテスト」→「インデックス登録をリクエスト」を実施。
  数週間で「重複しているがユーザーにより指定された正規 URL」または「インデックス登録済み」
  に遷移するはず。
- 4 件の `.html` 404 URL は **追加対応不要**。サイト側ではすでに正しく 308 → 200 で
  解決しており、再クロール待ち。一覧は内部リンクから外しているため、時間経過で
  GSC のレポートからも消える。

## 2026-05-02 — feat(bookcompass): プロダクトページのコピー強化（marketing-strengths.md 反映）

### 概要

`/products/bookcompass` のランディングページを、`marketing-strengths.md`（v1.1.0 マーケ素材集）の最強訴求軸に揃えてリライト。既存のブランド/デザイン基調は維持しつつ、ヒーロー〜本文の言葉を「機能羅列」から「ベネフィット先行」へ寄せ、3 つのセクションを新設。

### 主な変更

#### `src/app/(marketing)/products/bookcompass/page.tsx`

- **SEO メタデータ**: タイトルを「読書が、知識マップになる」→「読んだ本が、知識の地図になる」に。description も 280 文字メモ／知識の地図／思考の方向 という最強コピーで書き直し。
- **Hero**: H1 を「読んだ本が、知識の地図になる。」に変更。サブコピーを「読みながら一言つぶやくだけ → AI が知識の地図を育てる → 思考の道具へ」の 3 段ストーリーに圧縮。
- **新セクション「How It Works」（入口 / 中段 / 出口）**: 280 文字つぶやき → 知識の地図 → もう一人の自分との対話、の 3 ステップを追加。
- **新セクション「Why Book Compass」**: 「あの本良かった」「ノートが続かない」「次の一冊で迷子」「語る相手がいない」の 4 つのペインに対する答えを 2×2 で提示。
- **新セクション「What Makes It Different」**: 「要約ではなく整理」「ランキングではなく理由つきレコメンド」「冊数ではなく思考の方向」の差別化 3 軸を可視化。
- **既存コピー強化**:
  - 3 人の読書パートナー導入文を「ChatGPT のような汎用 AI と違うのは、3 人とも『あなたの読書記録を全部知っている』こと」に書き換え。
  - Features の「ひと言つぶやき」を「読みながら呟く」順番のリフレーム強調に変更。
  - Features の「Explore」を「ランキングではなく、理由つきの一冊を」に変更（既存の 2 軸提案という製品事実は維持）。
  - Final CTA を「あなたの読書地図を、今日から育てはじめる。」に。

### 既存事実の保護

- Explore は **2 軸（深める / 広げる）** のままで「揺さぶる」軸は将来構想として書かない（marketing-strengths.md でも将来的視野とされる軸であり、現製品の挙動とズレる訴求はしない）。
- 機能比較表・料金・パートナー名（ブックバディ／読書メンター／思考コーチ）など、製品仕様に関わる記述は変更していない。

### 検証

- `pnpm install --frozen-lockfile` 成功。
- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、TS / lint エラー無し、Static 45 ページ）。


---

## Day — 2026-05-02 (JST) — プロダクト初動ブログ3本投入 + ハイブリッドカテゴリ運用開始

### 概要

`feature/product-blog-launch` ブランチで、TrainNote / BookCompass / DoubleHub の最初のプロダクト寄り記事を3本追加。既存の AI ニュース／AI 情報系記事は触らず、ブログのカテゴリ運用を「問題・領域ベースのハイブリッド」へ拡張する第一歩。

### 追加記事

すべて `content/blog/*.mdx`、frontmatter は既存記事と同じ構造（title / description / publishedAt / updatedAt / category / slug / readingTime / summary / tags / faq）。

- `trainnote-record-habit.mdx` — 筋トレ記録が続かない理由と、続けるためのアプリ選び。category: `筋トレ`。TrainNote 設計（1秒ごとオートセーブ、両手モード、自重種目の負荷割合、週次ボリューム、部位別カレンダー、回復警告、5人の専門 AI コーチ）を「続けやすさ」観点から解説。
- `bookcompass-reading-memo.mdx` — 読書メモが続かない理由と、AI 読書記録で変わること。category: `読書`。280字つぶやき型メモ、3人の読書パートナー、理由つきレコメンド、傾向の可視化を中心に整理。
- `doublehub-personal-ai.mdx` — パーソナルAIはチャットだけでは足りない。category: `自己理解AI`。汎用 AI チャットと比較した DoubleHub の位置づけ、todo / メモを分類しない入力、登録データを土台にしたチャット、HealthKit / EventKit プライバシー、ハブとしてのエコシステム構想を解説。

すべて FAQ（5問）と関連記事リンク、SEO 用 summary 入りで揃えた。HubWallet 記事はリリース後に追加するため、本デプロイでは未投入。

### カテゴリ方針（ハイブリッド）

既存カテゴリ（AIニュース / AI情報 / AI×習慣化 / ライフデータ×自己理解 / 個人開発×AI / ブログ）はそのまま維持。BlogExplorer はカテゴリ件数を `getCategoryCounts()` から自動生成しており、新カテゴリ（筋トレ / 読書 / 自己理解AI）はそのまま追加で表示される。フィルタ UI のコード変更は不要。

各記事はカード上で「カテゴリ（ドメイン／問題）」を見せつつ、本文・タグ・関連記事リンクで関連プロダクト（TrainNote / BookCompass / DoubleHub）への導線を持たせるハイブリッド方針。

### 検証

- `pnpm install` 成功。
- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、TypeScript / lint エラー無し、Static 48 ページ — 既存 45 + 新規 3）。
- sitemap.xml は `getAllPosts()` から自動生成のため別途更新不要。新記事も `/blog/<slug>/` で含まれる。

### 残課題 / 次回以降

- HubWallet ローンチ後にプロダクト初稿（家計簿が続かない理由 など）追加。
- 各プロダクトの 2本目以降のトピックは `docs/web-renewal/BLOG_CONTENT_HANDOFF.md` を参照。

---

## 2026-05-03 — DoubleHub コアメッセージのコピー反映

### 概要

`feature/core-message-copy` ブランチで、ホーム画面と DoubleHub プロダクトページに「あなた自身に向かう情報」「依存させない設計」というコアメッセージを反映。ホームでは思想を控えめに、プロダクトページでは実装事実に紐づけて一段深く表現する形に揃えた。

### 変更ファイル

- `src/components/marketing/Hero.tsx` — Hero サブコピー直後に、「売り込みも、引き止めもなく、あなた自身に向かう情報を必要なときに届ける」趣旨の補足コピーを追加。
- `src/components/marketing/VisionSection.tsx` — Vision 末尾の本文ブロックを「あなたの注意を奪うためではなく、あなた自身に戻すため」「滞在時間を伸ばすおすすめでも無限スクロールでもない」という実用語の表現に書き換え。「搾取」「純度100%」のような強い語はホームでは使わない方針。
- `src/components/marketing/FaqSection.tsx` — FAQ に「なぜ広告ではなく、直接課金にしているのですか？」を 1 問追加（広告モデルにすると利益とユーザー利益の向きがずれる、という説明）。
- `src/app/(marketing)/products/doublehub/page.tsx`:
  - `metadata.description` を「あなた自身に向かう情報を届ける、依存させない設計の AI パートナー」を含む思想ベースの説明に更新（機能列挙型から転換）。
  - Concept セクションに「ダブルが見ているのはあなただけ／広告主や別の誰かの都合は入らない／アプリ側にも引き留める都合がない」趣旨の段落を追加。
  - Trust & Privacy と Plans の間に新セクション「No Addiction by Design — 『長く使わせる』ではなく、『あなたに戻す』ための設計。」を追加。4 カードで実装事実を提示：①通知は必要なタイミングだけ（呼び戻し通知なし）／②プル型のお知らせ（プッシュで割り込まない）／③無限スクロール・おすすめフィードなし／④滞在時間を伸ばすUI（バッジ・ストリーク等）を置かない。
  - Plans セクションのリードコピー直後に「広告や滞在時間ではなく、あなたから直接いただく形で運営しています。アプリの利益とあなたの利益の向きを揃えるための選択です。」の補足を追加。surface 交互配置を保つため、Plans の `surface="alt"` を外して新セクションへ移譲。

ブログ記事は今回の依頼通り作成していない。

### 検証

- `pnpm install` 成功（pnpm 9.15.9 / Node 20.20.1）。
- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、TypeScript エラーなし、Static 48 ページ）。

---

## 2026-05-03 — DoubleHub コアメッセージのビジュアル追加

### 概要

`feature/add-core-message-visual` ブランチで、DoubleHub プロダクトページに「情報の向きを、あなた自身へ」を象徴するビジュアルセクションを追加。ToDo・読書・運動・予定・ヘルスケア等のアイコンが中央のハブに集まり、光の道がユーザーへ戻る抽象画像を、Concept と No Addiction by Design の橋渡しとなる位置に配置した。ホームページには今回は反映せず、まずは DoubleHub プロダクトページのみで強く打ち出す。

### 変更ファイル

- `public/images/doublehub-user-centered-hub.jpg` — 新規追加。ToDo・カレンダー・読書・運動・ヘルスケア等のアイコンが DoubleHub に集まり、光の道としてユーザー自身に戻っていく抽象ビジュアル。
- `src/app/(marketing)/products/doublehub/page.tsx` — Trust & Privacy（セクション 9）と No Addiction by Design（セクション 9.5）の間に、新セクション「Information Flows Back to You — 情報の向きを、あなた自身へ。」を追加。ToDo・読書・運動・予定・ヘルスケアの記録は「アプリに引き止めるため」ではなく「あなた自身の判断に返すため」に使う、という思想を短い本文で提示し、その下に画像を大きめ（`max-w-4xl` の枠内、角丸 + 枠線 + シャドウ）で表示。下に補助キャプションを添えてある。alt は `ToDo、読書、運動、予定などの情報がDoubleHubに集まり、ユーザー自身へ戻っていく様子`。Concept→新ビジュアル→No Addiction by Design という流れで、思想を画像で挟み込みながら段階的に深める構成にした。
- `docs/web-renewal/DAILY_LOG.md` — 本エントリ追記。

### 検証

- `pnpm install` 成功（pnpm 9.15.9 / Node 20.20.1）。
- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、TypeScript エラーなし、Static 48 ページ）。

---

## 2026-05-04 — 動画スロット導入の準備（Solution / DoubleHub Hero / カードのコーナー修正）

### 概要

`feature/prepare-product-video-captures` ブランチで、トップページの Solution セクション右側と DoubleHub プロダクトページ Hero 右側の静的スクリーンショットを「動画スロット（実機スマホ画面が動いているように見える短尺ループ動画）」に差し替える準備を入れた。動画ファイルそのものは user が iMovie で別途書き出して提供する流れになっているため、ファイルが配置されるまでは既存スクショに自動でフォールバックする。あわせて、DoubleHub プロダクトページの「ダブルが、生活の中心に。」（What's New）3 カードで、グラデーションオーバーレイ右上の角がスマホ画面側の丸みに沿わず四角く切れて見えていた問題を修正した。

### 変更ファイル

- `src/components/marketing/VideoSlot.tsx` — 新規追加。`videoSrc` を渡せば `<video muted autoPlay loop playsInline preload="metadata">` でループ再生し、未指定 / 読込失敗時は `posterSrc` の Next/Image にフォールバックするクライアントコンポーネント。`prefers-reduced-motion: reduce` のユーザーには自動再生を抑制する。
- `src/components/marketing/SolutionSection.tsx` — トップ Solution の右側 `<Image src="/images/doublehub-memory.webp">` を `<VideoSlot>` に差し替え。動画パスは `/videos/doublehub-home-solution.mp4`（未配置）、poster は従来の `/images/doublehub-memory.webp`。
- `src/app/(marketing)/products/doublehub/page.tsx` — Hero 右側の `<Image src="/images/DoubleHub-Concept.png">` を `<VideoSlot>` に差し替え。動画パスは `/videos/doublehub-product-hero.mp4`（未配置）、poster は `/images/DoubleHub-Concept.png`。あわせて What's New の各カード内側のメディア枠（`aspect-[9/16] overflow-hidden bg-[#0a0a0a]`）に `rounded-t-3xl` を追加し、グラデーションが内側の自前 `overflow-hidden` で四角に切られていた問題を解消。スマホ画面の丸みとカードの `rounded-3xl` に合わせて、グラデーションも上端のコーナーで自然に切れるようにした。
- `public/videos/README.md` — 新規追加。期待される 2 ファイル（`doublehub-home-solution.mp4` / `doublehub-product-hero.mp4`）と、iMovie 書き出しの推奨スペック（H.264 MP4、無音、5–12 秒ループ、9:16、短辺 720–1080px、1–3 MB 目安）、書き出し手順、必要に応じた `ffmpeg` 圧縮例を記載。差し替えはファイルを置くだけで完了し、コード変更は不要。

### 検証

- `pnpm install` 成功（pnpm 9.15.9 / Node 20.20.1）。
- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、TypeScript エラーなし、Static 48 ページ）。
- 実動画ファイルは未配置のため、現状はどのページも従来どおり poster 画像（既存スクショ）が表示される（=見た目の後退なし）。

### 状況

- ブランチ: `feature/prepare-product-video-captures`（ローカル commit のみ、push / main マージは未実施）。
- user から実動画ファイル（パス: `public/videos/doublehub-home-solution.mp4`、`public/videos/doublehub-product-hero.mp4`）が提供され次第、追加 commit → push → main マージ → Vercel 自動デプロイの流れに進む予定。

---

## 2026-05-04 — 実動画ファイル投入（VideoSlot 最終反映）

### 概要

user から提供された実機キャプチャ動画（`tahuruhahusaitototuhuhesi.mp4`、約 1.39 MB / 1,393,482 bytes）を、`feature/prepare-product-video-captures` ブランチに投入した。トップページ Solution 右側と DoubleHub プロダクトページ Hero 右側の `<VideoSlot>` がこのファイルを参照し、自動再生（muted / loop / playsInline）でループ再生される。`prefers-reduced-motion: reduce` のユーザーには自動再生を抑制し、読込失敗時は従来どおり poster 画像にフォールバックする。

### 変更ファイル

- `public/videos/doublehub-home-solution.mp4` — 新規（約 1.39 MB）。トップ Solution セクション右側 `<VideoSlot>` が参照。
- `public/videos/doublehub-product-hero.mp4` — 新規（約 1.39 MB）。DoubleHub プロダクトページ Hero 右側 `<VideoSlot>` が参照。
- `docs/web-renewal/DAILY_LOG.md` — 当該エントリを追記。

### 検証

- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、TypeScript エラーなし、Static 48 ページ）。
- 既存コードは変更なし。VideoSlot のフォールバック経路は維持。

### 状況

- ブランチ: `feature/prepare-product-video-captures` を push し、`main` にマージする予定。
- マージ完了後、Vercel の自動デプロイで本番反映される想定。

---

## 2026-05-04 — モバイル横ジッター修正＋ヘッダー導線リフレッシュ

### 概要

トップページの実機動画投入後、スマホでスワイプするとトップページだけが横方向に微振動する不具合を修正した。原因は body にグローバルな横方向オーバーフロー対策がなく、framer-motion の `whileInView` で 16〜24px の x オフセットを使うセクション（IdealSection / SolutionSection / ProductCards）と Solution 動画スロットの寸法が重なって、スクロール反映時にビューポート外に一瞬はみ出すことだった。あわせてモバイルヘッダーの可読性（テーマトグルが幅を取りすぎ・Blog/Products への導線が弱い）を改善した。

### 変更ファイル

- `src/styles/globals.css` — body に `overflow-x: hidden; overflow-x: clip;` を追加（clip 未対応ブラウザ向けに hidden もフォールバック）。`overflow-x: clip` は sticky を破壊しないため、`MarketingHeader` の `sticky top-0` は従来どおり機能する。
- `src/components/marketing/IdealSection.tsx` — `<section>` に `relative overflow-hidden` を追加。x: -16 / x: 16 のスライドインによる一瞬の横はみ出しを節で吸収。
- `src/components/marketing/SolutionSection.tsx` — `<section>` に `relative overflow-hidden` を追加し、`<VideoSlot>` の親に `aspect-[800/1400]` を持つ枠を追加。動画/poster 切替時に intrinsic 800×1400 のまま親幅を押し広げないようにした。
- `src/components/marketing/ProductCards.tsx` — `<Section>` に `overflow-hidden` を付与。x: -24 のスタガーアニメーションが横スクロールを誘発しないようにする。
- `src/components/theme/ThemeToggle.tsx` — モバイル（md 未満）では現在のモード（Sun/Moon/Monitor）のみを丸ボタン 1 個で表示し、タップで Light / Dark / System を選べる Radix DropdownMenu に切り替え。デスクトップは従来の 3 状態セグメンテッドコントロールを維持。SSR スケルトンも mobile / desktop それぞれの形に分けた。
- `src/components/marketing/MarketingHeader.tsx` —
  - モバイル右肩に「Blog」直リンク（プライマリトーンの丸ピル）を追加。テーマトグル縮小で空いたスペースを使い、ブログをプロダクトと混同させない単独 CTA として配置。
  - モバイルメニューの構成をリファクタ：上部に Products リスト＋「プロダクト一覧を開く」(`/#products` 直行) ボタン、続いて視覚的に明確な区切り、Blog をプライマリトーン枠で強調、その下に About / Support を控えめに配置。max-h を `500px → 640px` に拡張。
  - `Menu/X/LogIn` に加えて `BookOpen / ChevronRight` を新たに import。

### 検証

- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、TypeScript エラーなし、Static 48 ページ）。
- ローカルの dev サーバーで `/_next/static/.../globals.*.css` 内に `body{...overflow-x: clip;...}` が出力されていることを確認。
- iPhone 想定（375 / 390px）の横幅でロゴ + テーマトグル(36px) + Blog ピル(約70px) + メニューボタン(36px) を gap-2 で配置しても折り返さないことをマークアップ上で確認（実機での視覚確認はリポジトリ内の Playwright 等は未導入のため未実施）。

### 状況

- ブランチ: `feature/fix-mobile-top-nav-overflow` を main から作成。
- 検証後 push → main マージ予定。マージ完了後、Vercel の自動デプロイで本番反映される想定。

---

## 2026-05-04 — トップ横ジッター追加修正＋ Product ショートカット導入

### 概要

前回の修正（body の `overflow-x: clip`）後もトップページのみ横方向ジッターが残っているという報告に対応。あわせて、モバイルヘッダーに Product ショートカットを追加した。Product 一覧ページは存在しないためページ遷移はせず、トップページ上にプロダクト一覧パネルがせり出す挙動とした。

### 根本原因（追加調査）

1. iOS Safari は body に `overflow-x: clip` を当てても、html 側に何の制約も無いと document スクロールが先に効き、framer-motion の `x: -16/-24` スライドイン中に微小な横スクロールが発生し得る。
2. ホーム限定の `SpotlightSection` は `<section>` に `overflow-hidden` が付いておらず、内部の `inset-[-15%]` ブラー装飾が親をはみ出していた（他ホームセクションは既に `relative overflow-hidden` 済み）。
3. `IdealSection / SolutionSection / ProductCards` の x 軸スライドイン自体がジッターの主原因。clip で見えなくしても、レイアウト計算上は数十px 広がる瞬間があり、ブラウザによってはタッチスクロールにフィードバックされる。

### 変更ファイル

- `src/styles/globals.css` — html にも `overflow-x: hidden; overflow-x: clip;` を付与。body に `position: relative; width: 100%; max-width: 100%;` を追加。html / body / main の三段クリップ体制に。
- `src/app/(marketing)/layout.tsx` — `<main className="flex-1 overflow-x-clip">` に変更。レイアウト直近のクリップで保険を掛ける。
- `src/components/marketing/IdealSection.tsx` — 2 つの motion.div の `x: -16/16` を `y: 16` フェードに統一。横スライドを廃止。
- `src/components/marketing/SolutionSection.tsx` — ステップカードの `x: -16` を `y: 16` に変更。
- `src/components/marketing/ProductCards.tsx` — カードの `x: -24` を `y: 24` に変更（ステージア演出は y 方向で踏襲）。
- `src/components/marketing/SpotlightSection.tsx` — `<section>` に `relative overflow-hidden` を追加。`inset-[-15%]` の装飾が親を超えないように。
- `src/components/marketing/MarketingHeader.tsx` —
  - `mobileProductsOpen` state を追加。モバイル右肩に Product ショートカットボタン（`LayoutGrid` アイコン）を新設。タップでヘッダー直下に Product 一覧パネルがせり出す。Product 一覧ページは存在しないため、ホーム文脈を保ったまま各プロダクトへ素早く到達するための軽量メニューとして機能。
  - モバイル幅 375px でも溢れないよう、Product / Blog ボタンはアイコンのみ（`sm:` 以上でテキスト表示）に。
  - 既存ハンバーガーメニューはそのまま、Products / Blog / About / Support を含む形で残置。
  - 既存の Products ドロップダウン（デスクトップ用）も従来通り保持。

### 検証

- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、TypeScript エラーなし、Static 48 ページ）。
- ホーム限定の x 軸 framer-motion アニメーションは `grep -rn "x: -\|x: [0-9]" src/components/marketing/` でゼロ件であることを確認。
- 三段（html / body / main）の `overflow-x: clip` で `documentElement.scrollWidth === clientWidth` がコード上保証される構成（ブラウザ実機計測は本環境にブラウザが無いため未実施）。

### 状況

- ブランチ: `feature/fix-home-overflow-product-menu` を main から作成。
- 検証後 push → main マージ予定。マージ完了後、Vercel の自動デプロイで本番反映される想定。

## 2026-05-04 05:00 JST — プロダクトメニュー自動クローズ対応

### 背景

トップ・プロダクト関連ページで、Product ショートカットパネルやハンバーガーメニュー、Products ドロップダウンを開いた状態で「画面外をタップ」「上方向にスクロール」しても閉じない、という UX 課題があった。ユーザーの「上にスクロールしたり、画面をタップするとメニューが自動で閉じるようにできますか」という要望に対応。

### 変更点

- `src/components/marketing/MarketingHeader.tsx` —
  - `headerRef` を `<header>` に紐付け、ヘッダー領域内（メニュー本体・トリガーボタン含む）のクリック/タップは「外側」と見なさないようにする判定基盤を追加。
  - `anyMenuOpen`（`open || productsOpen || mobileProductsOpen`）が真のときのみ、document/window に下記リスナーを `useEffect` でアタッチ。閉じた瞬間に確実に解除する形でメモリリーク・無駄な発火を防止:
    - `mousedown` / `touchstart`（passive）— ヘッダー外側のポインタ操作で全メニューを閉じる。
    - `scroll`（passive）— 直前の `window.scrollY` との差分で「上方向スクロール」（`delta < -8px`）を検知してメニューを閉じる。8px の閾値で慣性スクロールの戻りや微小ジッターを誤検知しない。
    - `keydown` — `Escape` でメニューを閉じる（アクセシビリティ向上）。
  - `closeAllMenus` ヘルパで 3 つの state を一括クリア。トリガーボタン押下時の挙動（`onClick` でのトグル）は変更せず、デザイン・既存導線は完全保持。
  - SSR/ハイドレーション安全（`'use client'` 配下、`useEffect` 内でのみ `window`/`document` にアクセス）。

### 検証

- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、TypeScript エラーなし、Static 48 ページ生成完了）。
- メニュー閉時はリスナーゼロ（スクロール時のオーバーヘッドなし）。開時のみ最小限のリスナーを貼る方式。

### 状況

- ブランチ: `feature/auto-close-product-menus` を main から作成。
- 検証後 push → main マージ予定。マージ完了後、Vercel の自動デプロイで本番反映される想定。

## 2026-05-05 — アプリ連携ガイドページ追加（/app-linking/）

### 背景

iOS の各アプリ（DoubleHub / BookCompass）の設定画面から、ユーザーがアプリ間連携の意義と手順を確認できる安定 URL を必要としていた。現状は BookCompass × DoubleHub の双方向連携のみだが、今後 TrainNote / HubWallet など他アプリも順次対応していく前提で、共通の「アプリ連携ガイド」ページを 1 枚用意し、すべての対応アプリ設定画面からこのページにリンクする運用に揃える。

### 変更点

- `src/app/(marketing)/app-linking/page.tsx` — 新規ページを追加。Hero / Benefits（4 件）/ How to Link（3 ステップ・スクリーンショット付き）/ Supported Apps（DoubleHub・BookCompass 対応済み、TrainNote・HubWallet は今後対応予定）/ FAQ / CTA の構成。`Container`・`Section`・`Button` の既存 UI プリミティブと `next/image` を使用し、PC とモバイルの両方で読みやすいレスポンシブレイアウト。
- `src/app/sitemap.ts` — `staticPaths` に `/app-linking/` を追加。GSC 上で確実にクロール対象になるよう、他の静的ページと同じ `priority: 0.7` / `changeFrequency: monthly` で扱う。
- `src/lib/site/config.ts` — `footerNav.company` に `App Linking → /app-linking/` を追加。フッターから直接到達できるようにし、内部リンクの孤立を防ぐ。
- `public/images/app-linking-step-01-bookcompass-settings.jpg` — BookCompass 設定画面で「DoubleHub と連携」をタップする手順 1 のスクリーンショット（1080×2348）。
- `public/images/app-linking-step-02-doublehub-settings.jpg` — DoubleHub 設定画面で「BookCompass と連携」カードをタップする手順 2 のスクリーンショット（1080×2348）。
- `public/images/app-linking-step-03-doublehub-code-input.jpg` — DoubleHub のコード入力画面（手順 3）のスクリーンショット（1080×2348）。

### URL / メタ

- 公開 URL: `https://www.doublehub.jp/app-linking/`（trailingSlash: true）。App Store Connect のサポート URL のように、各アプリの設定画面から固定リンクとして安全に貼れる前提で `/app-linking/` を採用。
- `metadata.alternates.canonical` を `/app-linking/` に明示。OpenGraph / Twitter カードも設定済み。
- スクリーンショットは `next/image` で `width={1080} height={2348}` の intrinsic ratio を渡し、`max-width: 280–300px` のフレームに収めることでスマホスクリーンショットが意図的なデザインに見えるようにしている。`alt` は画面の中身が分かる説明文。

### 検証

- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、TypeScript エラーなし、Static 49 ページ）。`/app-linking` が `○ (Static)` として正しくプリレンダリングされていることを確認。
- ESLint / next.config.js の既存警告（`Invalid next.config.js options: eslint`、複数 lockfile 警告）は本変更とは無関係（main 時点で既に出ていたもの）。

### 状況

- ブランチ: `feature/add-app-linking-guide` を main から作成。
- 検証後 push → main マージ予定。マージ完了後、Vercel の自動デプロイで本番反映される想定。

---

## 2026-05-05 — アプリ連携ガイド（/app-linking/）の改修

### 背景

公開した `/app-linking/` ページに対して、以下のフィードバックが入った。

1. CTA の BookCompass App Store リンクが正しくない（古い App Store ID `id6741010284` を指していた）。
2. 連携手順がモバイルで読むには冗長すぎる。
3. 「アプリ間の移動が、ワンタップで滑らかに」のベネフィットカードは事実と異なる（実装されていない）。
4. このページの主な流入はアプリの設定画面からであり、Web 検索からの初見ユーザー向けのコピーではなく、すでにいずれかのアプリを使っているユーザーに対して連携の具体的な価値を語る内容に作り直す必要がある。

### 変更点

- `src/lib/site/config.ts` — `social.appStoreBookCompass` を、サイト内の他箇所（`src/app/(marketing)/products/bookcompass/page.tsx`、`src/components/marketing/SpotlightSection.tsx`、`src/app/(app)/app/(authed)/bookcompass/page.tsx`）と同じ canonical な App Store URL（`id6760604663`）に統一。CTA の「BookCompass を入手」ボタンの遷移先が初めて正しくなる。
- `src/app/(marketing)/app-linking/page.tsx`
  - **Benefits の改修**: 「アプリ間の移動が、ワンタップで滑らかに」のカードを削除。残り 3 枚も、アプリ内流入のユーザーに「連携で何が起きるか」を具体的に伝える内容に書き直し、4 枚構成（4 件）を維持。新しい 4 枚は (1) 読書記録がダブルの判断材料に加わる（BookCompass の本・Mutter・履歴を DoubleHub から参照）、(2) 初期設定をやり直さず興味の軸を引き継げる、(3) 連携範囲はユーザーの意思で決めて解除も可能、(4) TrainNote / HubWallet など今後の対応に備える、の構成。クロスアプリのワンタップ遷移など、未実装の体験には触れていない。
  - **Steps の簡潔化**: 各ステップの本文を 1〜2 行に圧縮。タイトルも「BookCompass の設定で〜」→「設定で〜」のように、eyebrow に既にアプリ名が出ていることを利用して短縮。スクリーンショットの最大幅を `max-w-[280px]` 固定から `max-w-[220px] sm:max-w-[260px] md:max-w-[300px]` に変更し、モバイル時に画像がカード全体を占めないようにスケール。`<ol>` の縦余白も `space-y-16` → `space-y-12`（モバイル）に詰めてスクロール量を削減。`sizes` 属性も新しいブレークポイントに揃え直し。
  - SEO/メタは触らず。`alt` も既存の説明文を維持（短縮しても画面の中身は伝わる内容のため）。

### 検証

- `pnpm build` 成功（Next.js 16.2.4 / Turbopack、TypeScript エラーなし、49 ページ静的生成）。`/app-linking` は引き続き `○ (Static)` で出力。
- 視覚的検証は CI なしでビルドエラーゼロを根拠にしたのみ（UI ブラウザ確認は実施していない旨を申し添える）。

### 状況

- ブランチ: `feature/refine-app-linking-guide` を main から作成。
- 検証後 push → main マージ予定。マージ完了後、Vercel の自動デプロイで本番反映される想定。


## 2026-05-08 — Support ページに HubWallet を追加

### 背景

HubWallet がプロダクトページとして公開されたため、サポート・お問い合わせ
対象にも追加する。

### 変更内容

- `src/app/(marketing)/support/_components/SupportForm.tsx` の
  `SERVICES` 配列に `'HubWallet'` を追加（Book Compass と「その他 / 全般」の間）。
- `src/app/(marketing)/support/page.tsx` の metadata.description と
  ヒーロー本文を `DoubleHub、TrainNote、Book Compass、HubWallet …` に更新。

### 検証

- `pnpm build` 成功（TS エラーなし）。
- ローカル dev サーバーで /support のお問い合わせ対象 select の中身を確認:
  ["DoubleHub", "TrainNote", "Book Compass", "HubWallet", "その他 / 全般"]。


## 2026-05-08 — プライバシーポリシーのプロダクト別構造化（ステップ1）

### 背景

HubWallet のリリースを前に、プライバシーポリシーのページ構造を整理。
これまで /privacy/ には DoubleHub 本体のポリシーが直書きされており、
TrainNote / BookCompass のポリシーは GitHub Pages 上の別リポジトリで運用されていた。
配置方針として「案B: ハブ + プロダクト別」を採用：

- /privacy/                  … ハブ（各プロダクトポリシーへの導線 + 共通事項）
- /privacy/doublehub/        … DoubleHub 本体（旧 /privacy/ の本文を移設）
- /privacy/trainnote/        … TrainNote（GitHub Pages から本文移植）
- /privacy/bookcompass/      … BookCompass（GitHub Pages から本文移植）
- /privacy/hubwallet/        … 本文受領後に追加予定（このコミットでは未作成。
                                ハブには「準備中」バッジで枠だけ表示）

### 変更内容

- `src/app/(marketing)/privacy/_components/PrivacyLayout.tsx` 新規作成。
  Privacy / <ProductLabel> パンくず + h1 + prose 本文 + 末尾の戻り導線という
  共通シェル。各プロダクトのプライバシーページから利用する。
- `src/app/(marketing)/privacy/page.tsx` をハブ化（旧 DoubleHub 本文は削除）。
  4 プロダクト分のリンクカード + 共通事項（事業者名・お問い合わせ・第三者販売
  しない方針 等）を表示。HubWallet は href:null + badge:「準備中」で非リンク。
- `src/app/(marketing)/privacy/doublehub/page.tsx` 新規作成。
  旧 /privacy/page.tsx の本文 (Ver.1.1.0 / 2026-04-18 更新) をそのまま移植。
- `src/app/(marketing)/privacy/trainnote/page.tsx` 新規作成。
  旧 https://growthlab710.github.io/trainnote-privacy-policy/ から本文移植
  （最終更新: 2026-03-25）。
- `src/app/(marketing)/privacy/bookcompass/page.tsx` 新規作成。
  旧 https://growthlab710.github.io/bookcompass-privacy-policy/ から本文移植
  （最終更新: 2026-04-01）。
- `src/app/sitemap.ts` に
  /privacy/doublehub/、/privacy/trainnote/、/privacy/bookcompass/ を追加。
  HubWallet は本文確定後に別途追加。

### 検証

- `pnpm build` 成功。/privacy, /privacy/doublehub, /privacy/trainnote,
  /privacy/bookcompass の 4 ページが static 生成されることを確認。
- ローカル dev サーバーで 4 ページの見た目を目視確認:
  - /privacy/ … ハブとして 4 カード + 共通事項。
  - /privacy/doublehub/ … 元の本文がそのまま表示、パンくず追加。
  - /privacy/trainnote/、/privacy/bookcompass/ … GitHub Pages 版と同等の本文。

### 残タスク（ステップ2 以降）

- HubWallet のプライバシーポリシー本文受領後:
  - /privacy/hubwallet/page.tsx を作成
  - ハブの HubWallet エントリの href を有効化、badge 削除
  - sitemap.ts に追加
- GitHub Pages 側 (trainnote-privacy-policy / bookcompass-privacy-policy)
  を新 URL への <meta refresh> リダイレクトに置き換え
- App Store Connect の各アプリのプライバシー URL を新 URL に差し替え（手作業）


## 2026-05-08 — HubWallet プライバシーポリシー初版を公開（ステップ2）

### 背景

HubWallet のプライバシーポリシー本文を受領 (PRIVACY_POLICY.md, 2026-05-08 版)。
ステップ1 で空けておいた /privacy/hubwallet/ 枠を埋め、ハブからのリンクを有効化。

### 変更内容

- `src/app/(marketing)/privacy/hubwallet/page.tsx` 新規作成。
  PRIVACY_POLICY.md を一次ソースとして全文反映:
  - 1. 適用範囲 / 2. 取得する情報（4 サブセクション）/ 3. 利用目的 /
    4. データの保存場所 / 5. 第三者提供および外部送信 /
    6. レシート画像および収入書類の取扱い / 7. 広告およびトラッキング /
    8. 利用者の権利 / 9. データの保存期間 / 10. お子様のプライバシー /
    11. 本ポリシーの変更 / 12. お問い合わせ窓口 / 改定履歴
  - 5. 章のフロー図は `<pre>` ブロックで等幅表示。
  - 5. 章の送信先一覧は専用テーブルで表示（prose の table を経由せず、
    not-prose で枠線・背景・段違い色を確実に当てる）。
  - 12. 章の外部リンクは noopener noreferrer 付き new tab。
- `src/app/(marketing)/privacy/page.tsx` の HubWallet エントリ:
  href: null → '/privacy/hubwallet/'、badge:「準備中」を削除。
  これでハブから普通にリンクされる扱いに。
- `src/app/sitemap.ts` に `/privacy/hubwallet/` を追加。

### 検証

- `pnpm build` 成功。/privacy/hubwallet/ が static 生成されることを確認
  （/privacy 配下は doublehub / trainnote / bookcompass / hubwallet の 4 ページ + ハブ）。
- ローカル dev サーバーで:
  - /privacy/ … HubWallet カードが普通のリンクに（バッジなし、→ 表示）
  - /privacy/hubwallet/ … ヒーロー、各章、フロー図、送信先テーブル、
    外部リンク、改定履歴まで意図通り描画。

### 残タスク（ユーザー作業）

- App Store Connect の HubWallet（ほか3アプリも）プライバシー URL を
  https://www.doublehub.jp/privacy/<slug>/ に差し替え。


## 2026-05-08 — HubWallet プライバシーポリシーを最新版で更新

### 背景

PRIVACY_POLICY.md の更新版（2026-05-08）を受領。前回反映した内容と
比べて、外部委託先や保存基盤の具体名を抽象化し、章数も整理されているため
ページ全体を最新本文で書き直した。

### 主な差分

- 1. 適用範囲: DoubleHub エコシステムへの言及を削除し、サポート窓口だけに
  かかる短い文に。
- 2.1 アカウント情報: 「Apple sub」「ID Token (短期 JWT, API 認証用)」など
  実装名 → 「Apple から提供されるユーザー識別子」「サインイン状態を確認する
  ための認証トークン」と抽象化。
- 4. データの保存場所: 「SwiftData」「Supabase」など実装名を削除し、
  「端末内」「クラウド同期機能」と一般語に。
- 5. 第三者提供および外部送信: フロー図 (Cloudflare Workers ─▶ Gemini API)
  と送信先表を削除。Cloudflare の言及は外し、Gemini API 1 本に絞った
  シンプルな箇条書き構成に変更。「当社が管理するサーバを経由」表現に統一。
- 章番号の整理: 旧10「お子様のプライバシー」を削除し、以降をシフト
  （10. 本ポリシーの変更 / 11. お問い合わせ窓口 / 改定履歴）。

### 検証

- `pnpm build` 成功。/privacy/hubwallet/ が最新本文で static 生成されることを確認。
- ローカル dev サーバーで該当ページを目視確認。第5章の表・コードブロックが
  消え、シンプルな箇条書きに変わっていること、全文の章番号が揃って
  いることを確認。
