# 01. プロジェクト概要・技術スタック

## 1.1 背景

DoubleHub は AI 秘書アプリを中心に、複数の生活領域特化アプリ（BookCompass＝読書、TrainNote＝筋トレ）を持つエコシステム。今後もサービスが増える計画。現状、各プロダクトは iOS アプリとして独立しており、Web プレゼンスは `doublehub.jp`（静的 HTML の LP）のみ。

## 1.2 本プロジェクトのゴール

**DoubleHub ブランドを軸にしたハブサイトへ刷新し、Web アプリ版の骨格を同時に構築する**。

目的の優先順位：

1. **エコシステム全体の認知向上**（ブランド訴求・将来サービス追加への拡張性）
2. Web アプリ版の下地整備（ログイン後のダッシュボード、基本機能、認証仕組み）
3. ブログ等コンテンツマーケティング基盤の保守性向上

獲得導線（今すぐ大量ユーザーを取りに行く）は本プロジェクトの直接目標ではない。

## 1.3 スコープ

### 含むもの

- **LP の刷新**: doublehub.jp の全ページを Next.js 化、ハブサイト構造へ再編
- **Web アプリ本体の骨格**: ログイン、ダッシュボード、各プロダクト画面、設定
- **認証仕組み**: Supabase Auth SDK の組み込み、Apple / Google / Email ログイン UI
- **データ連携の API クライアント層**: 3 プロジェクトの Supabase に接続する TypeScript クライアント
- **linked_accounts UX**: 連携ボタン、状態表示、解除画面（iOS 側改修は含まない）
- **ブログ MDX 化**: 既存 20 記事を MDX に変換、Contentlayer 等で管理
- **SEO 基盤の保守**: OGP、sitemap、構造化データ、GA4 継承

### 含まないもの（後続セッション担当）

- Supabase 側のスキーマ変更、RLS ポリシー調整
- iOS アプリの改修（linked_accounts 対応など）
- 本番 DNS 切替、本番環境の Supabase 環境変数投入
- Supabase ダッシュボード側の CORS / OAuth プロバイダ設定
- 実 Supabase プロジェクトに接続した統合動作検証
- Stripe 等の決済導入

## 1.4 Web アプリの機能スコープ

以下は「**Web 上で動く画面を作る**」の範囲。実データでの統合検証は後続セッション。

| 画面 | 内容 | 優先度 |
|---|---|---|
| ログイン / サインアップ | Apple / Google / Email（Supabase Auth UI） | 最優先 |
| DoubleHub ダッシュボード | 各サービスの要素をウィジェット表示、遷移カード | 最優先 |
| 設定 / linked_accounts | 連携管理、テーマ、アカウント、サブスクリプション | 最優先 |
| DoubleHub 本体 | ToDo / メモの閲覧・追加（チャットは除外） | 高 |
| BookCompass | 本棚閲覧、Mutter、インサイト閲覧、本追加（`search-books` Edge Function 経由） | 高 |
| TrainNote | **v1 では「近日公開」プレースホルダのみ** | 低 |

**判断基準**: 「シンプルに情報の確認ができるダッシュボード + 基本的な記録作成」を満たす最小機能。チャット、AI サマリー等の複雑な機能は除外。

### TrainNote が「近日公開」になる理由

TrainNote は 3 プロダクトの中で唯一、以下の制約がある：

- **Supabase Auth 未導入**（ユーザー識別できない）
- **トレーニングデータが iOS 端末内の SwiftData のみに存在**（クラウド未同期）
- **Supabase 上のテーブルは AI Coach のレート制限ログと Knowledge 埋め込みのみ**

このため、Web からアクセスできるユーザーデータが存在しない。Phase 2（TrainNote 側のクラウド化）完了後に本格実装予定。詳細は [04-data-layer.md §4.4](./04-data-layer.md#44-trainnote-supabase-スキーマv1-では限定利用) を参照。

## 1.5 技術スタック

| 項目 | 採用 | 理由 |
|---|---|---|
| **フレームワーク** | Next.js 15（App Router） | LP + 動的アプリ両対応、static export 可 |
| **言語** | TypeScript（strict） | 型安全、Supabase 型生成との親和性 |
| **スタイリング** | Tailwind CSS + CSS Variables | 既存 `styles.css` のデザイントークンを CSS 変数で継承し、Tailwind でコンポーネント化 |
| **UI プリミティブ** | Radix UI（必要な部分のみ） | アクセシブルな Dialog/Dropdown/Select |
| **アニメーション** | Framer Motion | ページ遷移・スクロール演出 |
| **データ層** | `@supabase/supabase-js` v2 | Supabase 公式 |
| **認証 UI** | 自作コンポーネント（`@supabase/auth-ui-react` は使わない） | デザイン統一性のため |
| **フォーム** | React Hook Form + Zod | 型安全なバリデーション |
| **コンテンツ** | Contentlayer 2 または `@content-collections/mdx`（最新動向を確認して選択） | ブログ MDX 管理 |
| **画像最適化** | `next/image`（static export 互換の設定） | LCP 改善 |
| **アイコン** | Lucide React | 軽量・一貫性 |
| **Linter / Formatter** | ESLint + Prettier | 標準 |
| **パッケージマネージャ** | **pnpm** | monorepo 将来拡張にも対応 |
| **Node バージョン** | 20 LTS | Vercel / Cloudflare Pages 共通ベース |

### 除外したもの

- **`@supabase/auth-helpers-nextjs`**: App Router 環境では非推奨のパターンが多い。`@supabase/ssr` を使用
- **`tRPC` / `urql` 等**: Supabase 直叩きで十分
- **Vercel Hobby プラン**: 非商用限定のため使わない。検証は Cloudflare Pages

## 1.6 ホスティング方針

### フェーズ 1: 本プロジェクト期間中〜当面

```
[git push to main]
    ↓
[GitHub Actions] → static export (`pnpm build && pnpm export`) → GitHub Pages
    └→ [Cloudflare Pages リポジトリ連携] → プレビュー環境（フル機能 SSR 可能）
```

- **GitHub Pages**: `doublehub.jp` で公開。LP / ブログ / 静的ページのみ機能。認証ボタンは置くが押しても反応しない（Supabase 環境変数なし）
- **Cloudflare Pages**: `*.pages.dev` で公開。検証用にフル機能動作。`noindex` メタタグで SEO 除外

### フェーズ 2: 切替後（本プロジェクト範囲外、後続セッション担当）

- DNS を Cloudflare Pages 向けに変更
- Supabase 本番環境変数を Cloudflare Pages の環境変数に設定
- Supabase ダッシュボードで CORS / Allowed URLs を追加

### 重要な実装要件

- `next.config.js` で `output: 'export'` を指定しつつ、**環境変数 `NEXT_PUBLIC_HOSTING_MODE` で挙動を切り替えられるようにする**
  - `static`: GitHub Pages 向け。動的機能は無効化、認証ボタンは「準備中」表示
  - `dynamic`: Cloudflare Pages 向け。すべての機能有効
- 両モードで **ビルドが通る** ことを CI で確認

## 1.7 パフォーマンス目標

| 指標 | 目標 | 備考 |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | 既存 4.7MB 画像は `next/image` + AVIF/WebP で 200KB 以下に圧縮 |
| CLS (Cumulative Layout Shift) | < 0.1 | 画像・フォントは明示的にサイズ指定 |
| FID / INP | < 200ms | JS バンドルを分割、重いアニメは遅延読み込み |
| Lighthouse Performance | ≥ 85 | モバイル基準 |
| Lighthouse SEO | ≥ 95 | OGP・構造化データ維持 |
| Lighthouse Accessibility | ≥ 90 | Radix UI 採用で高水準維持 |

## 1.8 ブラウザサポート

- モダンブラウザ（Chrome / Safari / Firefox / Edge）最新 2 バージョン
- iOS Safari 16+（iOS 16 以降）
- Android Chrome 最新
- IE サポートなし

---

**次に読む**: [02-architecture.md](./02-architecture.md)
