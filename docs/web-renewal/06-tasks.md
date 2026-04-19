# 06. タスク分解・5 日スケジュール

## 6.1 作業完了の定義（DoD: Definition of Done）

本プロジェクトが「完了」と言える最低ラインは以下：

1. ✅ Next.js 15 プロジェクトが `site/doublehub-site/` 内に構築されている
2. ✅ `pnpm lint` と `pnpm build`（dynamic モード）と `pnpm build:export`（static モード）がすべてエラー 0 で通る
3. ✅ LP 全ページ（トップ / 3 プロダクト / About / Support / Privacy）が表示できる
4. ✅ ブログ 20 記事が MDX 化され一覧 / 個別記事ともに表示できる
5. ✅ Web アプリ主要画面（ログイン / ダッシュボード / DoubleHub / BookCompass / TrainNote / 設定）が UI 実装されている
6. ✅ ダミーデータ or 実 Supabase キー投入時に認証フローが動く（Cloudflare Pages プレビュー環境で確認）
7. ✅ GitHub Pages で static export 版が公開され、旧 URL から新 URL への 301 / メタリフレッシュが動く
8. ✅ Lighthouse Performance ≥ 85, SEO ≥ 95（モバイル、主要 5 ページ）
9. ✅ `_redirects` と `sitemap.xml` が新構造で生成されている
10. ✅ 要確認事項リストが `docs/web-renewal/OPEN_QUESTIONS.md` にまとまっている

## 6.2 推奨スケジュール（5 日間）

### Day 1: 基盤構築・LP 移行（公開エリア）

**ゴール**: Next.js プロジェクトが動き、LP の主要ページが表示できる

- [ ] 作業ブランチ `feature/nextjs-renewal` 作成
- [ ] Next.js 15（App Router）プロジェクトを `site/doublehub-site/` 内で初期化
- [ ] pnpm / TypeScript / ESLint / Prettier / Tailwind 設定
- [ ] Tailwind config にデザイントークン（既存 `styles.css` から抽出）を設定
- [ ] self-hosted フォント（General Sans / Cabinet Grotesk）を `public/fonts/` に配置、`next/font/local` でロード
- [ ] `lib/hosting-mode.ts` を実装（static/dynamic 切替）
- [ ] ルートレイアウト（`app/layout.tsx`）と `(marketing)` レイアウト実装
- [ ] `MarketingHeader` / `MarketingFooter` / `ThemeToggle` を既存 UX に合わせて移植
- [ ] ダークモード対応（CSS 変数 + `data-theme` 属性）
- [ ] トップページ（`/`）をハブ化した構成で実装
- [ ] プロダクトページ 3 つ（BookCompass / TrainNote / DoubleHub 本体）を既存コンテンツ移行しつつ実装
- [ ] `next.config.mjs` で `output: 'export'` と `images.unoptimized: true` を条件分岐設定

### Day 2: ブログ MDX 化・静的ページ・画像最適化

**ゴール**: 全公開コンテンツが Next.js 上で動く

- [ ] Contentlayer 2 もしくは `@content-collections/mdx` を導入
- [ ] 既存 20 記事を HTML → MDX に変換（`content/blog/*.mdx`）
- [ ] ブログ一覧（`/blog/`）と個別記事（`/blog/[slug]/`）を実装
- [ ] `generateStaticParams` で静的書き出し可能に
- [ ] About / Support / Privacy を移行
- [ ] 既存画像を `public/images/` へ移動、重い画像（4.7MB コンセプト、2MB coach-chat 等）を WebP/AVIF + リサイズで最適化
- [ ] OGP 画像を各ページ固有化（ブログ個別記事は自動生成も検討）
- [ ] `_redirects` ファイル + 旧 URL メタリフレッシュスクリプト実装
- [ ] `sitemap.xml` を動的生成（新 URL のみ）
- [ ] `robots.txt`, `llms.txt`, Search Console 認証ファイル, manifest.json, favicon を維持

### Day 3: 共通 UI・アプリシェル・認証

**ゴール**: Web アプリの骨格が立ち上がり、ログイン画面が動作する

- [ ] `components/ui/` に Radix UI ベースの共通コンポーネント実装（Button, Card, Input, Dialog, Tabs, Dropdown, Tooltip, Avatar, Badge, Skeleton, Toast）
- [ ] `AppShell` / `AppSidebar` / `AppHeader` 実装（認証必須エリアのレイアウト）
- [ ] `lib/supabase/client.ts` / `server.ts` / `clients.ts` を実装（3 プロジェクト分）
- [ ] `lib/supabase/types-doublehub.ts` 手書き型定義
- [ ] `lib/supabase/types-bookcompass.ts` / `types-trainnote.ts` 仮型定義
- [ ] ログイン画面（`/app/login/`）実装
  - Apple / Google OAuth ボタン
  - Email + パスワード（後回し可）
  - `static` モードでの無効化表示
- [ ] 認証ガード実装（`app/(app)/app/layout.tsx` + クライアント側フォールバック）
- [ ] ログアウト機能

### Day 4: Web アプリ画面実装

**ゴール**: 主要画面すべての UI が完成（ダミーデータで動く）

- [ ] Repository 層（`lib/repositories/doublehub/*`）実装
  - `todoRepository`, `memoRepository`, `profileRepository`, `externalSourceAccountRepository`
- [ ] ダッシュボード（`/app/`）実装
  - 挨拶カード、DoubleHub ウィジェット、BookCompass/TrainNote ウィジェット、お知らせ
  - 未連携時のバッジと CTA
- [ ] DoubleHub 本体画面（`/app/doublehub/`）実装
  - ToDo タブ（一覧、追加、完了、削除）
  - メモ タブ（一覧、追加、編集、削除）
- [ ] BookCompass 画面（`/app/bookcompass/`）仮実装
  - 本棚グリッド、検索、追加（ダミーデータ or 仮 Repository）
- [ ] TrainNote 画面（`/app/trainnote/`）仮実装
  - 履歴、記録（同上）
- [ ] 設定画面（`/app/settings/*`）実装
  - プロフィール編集、linked_accounts 管理、テーマ切替、サブスク表示、アカウント削除

### Day 5: 検証・仕上げ・デプロイ

**ゴール**: Cloudflare Pages プレビュー公開 + GitHub Pages へデプロイ + 引き継ぎ資料完成

- [ ] Cloudflare Pages でリポジトリ連携、プレビュー環境立ち上げ
  - 開発用 Supabase anon key を環境変数として設定（依頼者から取得）
  - `NEXT_PUBLIC_HOSTING_MODE=dynamic` でビルド
  - 認証フロー動作確認（Apple / Google / Email）
  - `noindex` メタタグで SEO 除外
- [ ] 主要ページで Lighthouse 実行、目標値達成を確認
- [ ] アクセシビリティ手動チェック（Tab 操作、axe DevTools）
- [ ] 旧 URL からの 301 リダイレクト動作確認
- [ ] GitHub Pages デプロイ（GitHub Actions ワークフロー）
  - `main` ブランチへのマージで `pnpm build:export` → `out/` を `gh-pages` にデプロイ
  - `NEXT_PUBLIC_HOSTING_MODE=static` でビルド
  - `doublehub.jp` での表示確認
- [ ] `docs/web-renewal/OPEN_QUESTIONS.md` を作成し、要確認事項をすべて転記
- [ ] `docs/web-renewal/HANDOVER.md` を作成し、以下を記述:
  - 未実装領域の明記
  - 後続セッションへの引き継ぎ事項
  - 動作検証済み / 未検証の切り分け
  - Cloudflare Pages プレビュー URL
- [ ] `pnpm lint`, `pnpm build`, `pnpm build:export` すべてクリーンな状態でコミット

## 6.3 スケジュール調整の考え方

工数に余裕ができた場合、以下の優先順位で対応：

1. **Blog 個別記事の OGP 画像自動生成**（社名 + タイトルのテンプレ）
2. **BookCompass / TrainNote 画面の仮実装を本実装に近づける**（ただし確実に動く範囲のみ）
3. **Framer Motion によるページ遷移アニメ強化**
4. **Storybook 導入**（後続運用のため）
5. **CI（GitHub Actions）での lint + build チェック**

逆に工数が足りない場合、以下から削る：

1. **BookCompass / TrainNote 画面の詳細機能**（ダッシュボードウィジェットまでで可）
2. **アニメーション強化**（基本の遷移のみで可）
3. **OGP 画像の個別化**（全ページ共通でも可）

## 6.4 毎日の終わりに確認すること

- [ ] `pnpm lint` がエラー 0
- [ ] `pnpm build` がエラー 0
- [ ] Git 作業ブランチに適切にコミット済み
- [ ] 要確認事項に今日発見した新しい項目を追記
- [ ] 翌日の最優先タスクを決めてメモ

## 6.5 引き継ぎ資料（HANDOVER.md）に必ず含める項目

Day 5 完了時に作成する `docs/web-renewal/HANDOVER.md` には以下を必ず含める：

- **動作検証済みの機能と環境**
- **未実装 / 仮実装の機能とその理由**
- **Supabase 側で後続セッションが設定する必要がある項目**（環境変数、CORS、OAuth プロバイダ等）
- **Cloudflare Pages プレビュー URL と認証方法**
- **既知のバグ・制約**
- **要確認事項リスト全体**
- **推奨される次のステップ**

## 6.6 コミュニケーション

- 作業開始時: 当日のタスクリストを `docs/web-renewal/DAILY_LOG.md` に追記
- 作業終了時: 完了タスク・未完了タスク・発見した問題・翌日の計画を同ファイルに追記
- ブロッカー発生時: 要確認事項リストに即時追加し、別案で進める or 作業をピボット

## 6.7 最終成果物チェックリスト

本プロジェクト完了時、以下がすべて揃っていること：

### リポジトリ

- [ ] `feature/nextjs-renewal` ブランチに全コミット
- [ ] `main` にマージしても動く状態（GitHub Pages デプロイ）
- [ ] `.env.example` が完備
- [ ] `package.json` のスクリプトが揃っている: `dev`, `build`, `build:export`, `lint`, `start`

### ドキュメント

- [ ] `docs/web-renewal/HANDOVER.md`
- [ ] `docs/web-renewal/OPEN_QUESTIONS.md`
- [ ] `docs/web-renewal/DAILY_LOG.md`
- [ ] ルート `README.md` に開発手順を追記

### デプロイ

- [ ] GitHub Pages で `doublehub.jp` が更新されている
- [ ] Cloudflare Pages のプレビュー環境が稼働している
- [ ] 旧 URL からの 301 リダイレクトが動いている

### 品質

- [ ] Lighthouse 主要 5 ページ Performance ≥ 85
- [ ] Lighthouse 主要 5 ページ SEO ≥ 95
- [ ] キーボード操作で全機能可能
- [ ] ダークモードが全画面で破綻しない

---

**以上**。不明点があれば `OPEN_QUESTIONS.md` に追記し、依頼者に確認すること。推測で突き進まないこと。
