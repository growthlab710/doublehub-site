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
