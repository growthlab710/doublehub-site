# 05. コーディング規約・制約・禁止事項

## 5.1 ディレクトリ構造

```
doublehub-site/                    ← 既存リポジトリルート（そのまま使う）
├── app/                           ← Next.js App Router
│   ├── (marketing)/               ← 公開エリア（LP / ブログ）
│   │   ├── layout.tsx
│   │   ├── page.tsx               ← トップ /
│   │   ├── products/
│   │   │   ├── bookcompass/page.tsx
│   │   │   ├── trainnote/page.tsx
│   │   │   └── doublehub/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx           ← 一覧
│   │   │   └── [slug]/page.tsx    ← 個別記事
│   │   ├── about/page.tsx
│   │   ├── support/page.tsx
│   │   └── privacy/page.tsx
│   ├── (app)/                     ← 認証必須エリア
│   │   └── app/
│   │       ├── layout.tsx         ← 認証ガード + サイドバー
│   │       ├── page.tsx           ← ダッシュボード
│   │       ├── login/page.tsx
│   │       ├── doublehub/...
│   │       ├── bookcompass/...
│   │       ├── trainnote/...
│   │       └── settings/...
│   ├── layout.tsx                 ← ルートレイアウト（html, body, font）
│   └── globals.css                ← Tailwind + CSS 変数
├── components/
│   ├── ui/                        ← 共通 UI プリミティブ（Button, Card, ...）
│   ├── marketing/                 ← LP 用コンポーネント
│   ├── app/                       ← アプリ用コンポーネント
│   └── blog/                      ← ブログ用コンポーネント
├── lib/
│   ├── supabase/
│   │   ├── client.ts              ← ブラウザ用クライアント
│   │   ├── server.ts              ← サーバー用クライアント
│   │   ├── clients.ts             ← 3 プロジェクト分の初期化
│   │   ├── types-doublehub.ts
│   │   ├── types-bookcompass.ts
│   │   └── types-trainnote.ts
│   ├── repositories/
│   │   ├── doublehub/
│   │   ├── bookcompass/
│   │   └── trainnote/
│   ├── hooks/                     ← カスタムフック
│   ├── utils/                     ← 汎用ユーティリティ
│   └── i18n/                      ← 日本語テキスト集約
├── content/
│   └── blog/                      ← MDX 記事（既存 20 記事を移行）
├── public/
│   ├── fonts/                     ← self-hosted フォント
│   ├── images/                    ← 既存画像を移行（最適化必須）
│   ├── _redirects                 ← Cloudflare Pages 用 301
│   ├── robots.txt
│   ├── favicon.png, icon-*.png, apple-touch-icon.png
│   └── manifest.json
├── docs/
│   └── web-renewal/               ← 本ドキュメント群
├── scripts/
│   ├── migrate-legacy-html.ts     ← 既存 HTML → meta refresh 生成スクリプト
│   └── generate-sitemap.ts        ← サイトマップ生成
├── .env.example                   ← 環境変数テンプレート
├── .env.local                     ← 開発用キー（.gitignore）
├── .eslintrc.json
├── .prettierrc
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml
```

## 5.2 既存ファイルの扱い

### 残す（リネーム・移動はしない）

- `CNAME`, `robots.txt`, `llms.txt`, `google*.html`（Search Console 認証ファイル）, `manifest.json`
- `favicon.png`, `icon-*.png`, `apple-touch-icon.png`
- `images/` 配下（Next.js 化後は `public/images/` へ移動）

### 退避・削除

- `index.html`, `bookcompass.html`, `trainnote.html`, `about.html`, `support.html`, `privacy.html`, `blog/` 配下 HTML → **`git rm` する前に、メタリフレッシュで新 URL にリダイレクトする退避 HTML を残す**か、`public/_redirects` で 301 を設定する
- `styles.css`, `script.js` → 参考資料として削除（デザイントークンは Tailwind に移行）

### 既存サイトのリポジトリ

- `site/doublehub-site/` は **親リポジトリとは別の独立 Git リポジトリ**（リモート: `https://github.com/growthlab710/doublehub-site.git`）
- Next.js 化の作業はこのリポジトリ内で直接行う
- 既存の GitHub Pages デプロイが動いている間に Next.js 化を進めるため、**作業ブランチ**（例: `feature/nextjs-renewal`）で進め、`main` にマージする前に検証する

## 5.3 コーディング規約

### 言語・フォーマット

- **TypeScript strict mode**
- **Prettier**: デフォルト設定 + `printWidth: 100`, `singleQuote: true`, `semi: true`
- **ESLint**: `next/core-web-vitals` + `@typescript-eslint/recommended`
- 関数名・変数名: `camelCase`
- 型名・コンポーネント名: `PascalCase`
- 定数: `UPPER_SNAKE_CASE`（環境変数、設定定数のみ）
- ファイル名: コンポーネントは `PascalCase.tsx`、それ以外は `kebab-case.ts` または `camelCase.ts`

### React / Next.js

- **Server Components をデフォルト**に、インタラクティブ要素のみ `'use client'`
- データフェッチ: Server Components で直接 Supabase を叩く（`lib/supabase/server.ts`）
- フォーム: `'use client'` + React Hook Form + Zod
- 状態管理: ローカル状態で完結させる。グローバルは `React Context` のみ、Redux 等は使わない
- ルーティング: App Router の `<Link>` を使う（`next/link`）

### 命名

- Server Component: そのままファイル名（例: `ProductCard.tsx`）
- Client Component: `'use client'` ディレクティブをファイル先頭に
- フック: `useXxx.ts`
- Repository: `xxxRepository.ts`

### コメント

- 基本的に書かない。命名で意図を表現する
- **必要なときのみ書く**:
  - Why（なぜこの実装になっているか、特に非自明な場合）
  - 制約（「この API は month 単位のみ、day は非対応」等）
  - TODO（`// TODO(後続): ...` の形式で、誰がいつ対応するか明示）

### Tailwind の使い方

- クラスの順序は `prettier-plugin-tailwindcss` で自動整形
- 長いクラスは `cn()` ユーティリティ（`clsx` + `tailwind-merge`）で条件分岐
- 色は CSS 変数経由（`bg-[var(--color-primary)]` ではなく、Tailwind config で `primary: 'var(--color-primary)'` と定義して `bg-primary` と書く）

## 5.4 Hosting Mode Guard

`NEXT_PUBLIC_HOSTING_MODE` 環境変数で 2 つのモードを切替る：

```typescript
// lib/hosting-mode.ts
export type HostingMode = 'static' | 'dynamic';
export const hostingMode: HostingMode =
  (process.env.NEXT_PUBLIC_HOSTING_MODE as HostingMode) ?? 'static';
export const isDynamic = hostingMode === 'dynamic';
```

### モード別の挙動

| 機能 | static | dynamic |
|---|---|---|
| LP / ブログ表示 | ✅ | ✅ |
| ログインボタンの表示 | 「準備中」ラベル | 通常 |
| `/app/*` 配下のアクセス | `/` にクライアントリダイレクト | 認証チェック後に表示 |
| Supabase クライアントの初期化 | スキップ（anon key なしでも落ちない） | 正常初期化 |
| OGP メタタグ | ✅ | ✅ |

### 実装例

```tsx
// components/marketing/LoginButton.tsx
'use client';
import { isDynamic } from '@/lib/hosting-mode';

export function LoginButton() {
  if (!isDynamic) {
    return <button disabled className="opacity-50">ログイン（準備中）</button>;
  }
  return <Link href="/app/login">ログイン</Link>;
}
```

## 5.5 環境変数

### `.env.example`

```
# ホスティングモード: 'static' または 'dynamic'
NEXT_PUBLIC_HOSTING_MODE=static

# DoubleHub 本体 Supabase（dynamic モードで必須）
NEXT_PUBLIC_SUPABASE_DOUBLEHUB_URL=
NEXT_PUBLIC_SUPABASE_DOUBLEHUB_ANON_KEY=

# BookCompass Supabase（連携時に必須）
NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_URL=
NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_ANON_KEY=

# TrainNote Supabase（連携時に必須）
NEXT_PUBLIC_SUPABASE_TRAINNOTE_URL=
NEXT_PUBLIC_SUPABASE_TRAINNOTE_ANON_KEY=

# GA4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-DJW7K08F6F

# オプション: サイト URL（OGP 絶対 URL 生成用）
NEXT_PUBLIC_SITE_URL=https://doublehub.jp
```

### `.gitignore` に追加

```
.env.local
.env*.local
```

## 5.6 Git・ブランチ戦略

- メインブランチ: `main`
- 作業ブランチ: `feature/nextjs-renewal` （本プロジェクト期間中の作業はここに集約）
- 小さな検証ブランチを作るのは任意だが、最終的に `feature/nextjs-renewal` にマージ
- コミットメッセージ: **Conventional Commits**
  - `feat: トップページの Hero を刷新`
  - `fix: ブログ MDX のコードブロックが崩れる問題を修正`
  - `refactor: Supabase クライアント初期化を整理`
  - `chore: Next.js 15 に更新`
  - `docs: README を更新`
- コミットメッセージは **日本語** で書く

## 5.7 パフォーマンス・品質の自主チェック

### ビルド・Lint

```bash
pnpm install
pnpm lint
pnpm build
pnpm build:export   # static export のビルド確認
```

いずれもエラー 0 を維持。

### Lighthouse

主要ページ（トップ / BookCompass LP / TrainNote LP / Blog 一覧 / Blog 個別記事）で Lighthouse を実行し、目標値（[01-overview.md#17-パフォーマンス目標](./01-overview.md#17-パフォーマンス目標) 参照）に達するか確認。

### アクセシビリティ

- キーボードのみで全操作可能か手動確認
- `axe DevTools` で検証

## 5.8 禁止事項

### 絶対に触らないもの

- **親リポジトリ（`../` 以上）のファイル**: iOS アプリのコード、`project.yml`、`Info.plist`、`.entitlements` など
- **`docs/supabase/*.sql`**: Web 側から Supabase のスキーマ変更 SQL を書かない
- **App Store Connect の登録情報**（support.html / privacy.html の URL は維持する必要あり）
- **既存の CNAME, robots.txt, google*.html**（GitHub Pages の設定や Search Console 認証に影響）

### やらない

- `Vercel Hobby プラン` での本番デプロイ（商用利用は Pro 必須）
- `service_role` キーの Web 側での使用
- 認証なしでの本番 Supabase への書き込み（anon key 含めて注意）
- 動作未確認状態での `main` マージ
- 本番環境で `NEXT_PUBLIC_HOSTING_MODE=dynamic` を設定（DNS 切替前なので）

### 慎重に

- 既存の 20 記事の内容を勝手に改変しない（誤字修正も要確認）
- ブログ画像の差し替え・削除
- OGP 画像のデザイン大幅変更（SEO に影響）

## 5.9 ログ・エラーハンドリング

- クライアント側エラー: `console.error` のみ。Sentry 等は v1 では導入しない
- Supabase エラー: Repository 層でキャッチし、ユーザー向けエラーメッセージに変換
- フォームエラー: React Hook Form のエラー表示
- グローバルエラー: `app/error.tsx`, `app/not-found.tsx` を実装

## 5.10 アクセス解析・外部サービス

### GA4（継承）

- 測定 ID: `G-DJW7K08F6F`
- `app/layout.tsx` でスクリプト読み込み（`next/script` の `strategy="afterInteractive"`）
- Consent Mode は v1 では未対応（GDPR 対象外想定）

### MailerLite（既存 Newsletter フォーム）

- 既存の埋め込みコードを React コンポーネント化
- フォーム送信は MailerLite 側で完結

### Search Console

- `google*.html` 認証ファイルは `public/` に配置したまま維持

## 5.11 要確認事項（規約関連）

- [ ] BookCompass / TrainNote の Supabase プロジェクト ID（型生成用）
- [ ] Newsletter の MailerLite Form ID / Embed Code
- [ ] 料金プラン表示で使う価格・プラン名の表現（既存は App Store 準拠）

---

**次に読む**: [06-tasks.md](./06-tasks.md)
