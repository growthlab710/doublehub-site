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
