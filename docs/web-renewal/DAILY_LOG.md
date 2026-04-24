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
