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
