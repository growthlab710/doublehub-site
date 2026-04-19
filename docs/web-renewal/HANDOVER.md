# HANDOVER — DoubleHub Next.js リニューアル

本ドキュメントは、5 日間の初期実装（Day 1〜Day 5）完了後に **後続セッション / 運用担当者** が受け取るべき情報を集約する。

対象読者:
- 本リポジトリを引き継いで本番投入（env 投入・DNS 切替）を行う担当
- iOS 側の linked_accounts 対応や新機能追加を行う担当
- Supabase / Cloudflare Pages / GitHub Pages を運用する担当

関連ドキュメント: `docs/web-renewal/` 配下
- `00-overview.md` 〜 `07-*.md` — 元指示書（変更不可）
- `DAILY_LOG.md` — Day 1〜5 の実施内容記録
- `OPEN_QUESTIONS.md` — 未解決事項（回答済みは `[x]`、未解決は `[ ]`）

---

## 0. 前提・制約のおさらい

- **作業ブランチ**: `feature/nextjs-renewal`（main にマージする前に必ず本番想定で build:export を走らせて動作確認すること）
- **禁止事項**:
  - Supabase `service_role` key をクライアントや env.public に書かない
  - Vercel Hobby プランでの本番運用（プライベート動線は Cloudflare Pages 推奨）
  - 楽天ブックス API の直接呼び出し（BookCompass のカバー補完用バッチのクォータを食いつぶす）
  - Supabase スキーマ変更（DoubleHub / BookCompass / TrainNote いずれも既存スキーマを前提に実装済み）
- **保持必須ファイル**（`public/` 配下）:
  - `CNAME`（`doublehub.jp`）
  - `robots.txt`, `llms.txt`, `manifest.json`
  - `google060a06d7f9469fbc.html`（Search Console 検証）
  - `favicon.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
  - `_redirects`（Cloudflare Pages 用 301、25 件）

---

## 1. 納品物

| 項目 | 場所 |
| --- | --- |
| ソースコード（feature/nextjs-renewal ブランチ） | `https://github.com/growthlab710/doublehub-site` |
| PR | #1（feature/nextjs-renewal → main） |
| zip 一式 | `doublehub-site-handover-YYYYMMDD.zip`（別途送付） |
| ドキュメント | `docs/web-renewal/` |

zip には以下が含まれる:
- `src/`, `content/`, `public/`, `scripts/`, `docs/`
- `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `.env.example`, `.gitignore`, `README.md`, `AGENTS.md`
- `legacy/`（旧 HTML/CSS/JS の退避先。履歴保全用）
- `.git/` は含めない（GitHub を正本とする）
- `node_modules/` と `.next/`, `out/` は含めない（各自 `pnpm install && pnpm build` から再現）

---

## 2. セットアップ手順（ゼロから動かす）

### 2.1. 環境前提
- Node.js 20 以上
- pnpm 9.15 以上（`corepack enable` で有効化可能）
- Git

### 2.2. インストールと起動

```sh
git clone https://github.com/growthlab710/doublehub-site.git
cd doublehub-site
git checkout feature/nextjs-renewal
pnpm install
cp .env.example .env.local
# .env.local を編集（次節「env 投入」参照）
pnpm dev
```

- 開発サーバー: `http://localhost:3000`
- dynamic モードで起動する（Supabase env が入っていれば認証ガードも実際に走る）

### 2.3. ビルドの 2 モード

| コマンド | モード | 用途 |
| --- | --- | --- |
| `pnpm build` | dynamic | Cloudflare Pages（Functions あり）/ Vercel / Node サーバ |
| `pnpm build:export` | static | GitHub Pages / 純静的ホスティング |

`pnpm build:export` の最後に `scripts/postbuild-redirects.mjs` が自動実行され、旧 URL → 新 URL のメタリフレッシュ HTML が `out/` 配下に生成される（GitHub Pages 用の 301 相当）。Cloudflare Pages なら `out/_redirects` が優先される。

---

## 3. env 投入手順

`.env.local` に以下を記載する（全て公開可能な anon key と URL のみ。`service_role` は絶対に書かない）。

```dotenv
# ホスティングモード（static: GitHub Pages / dynamic: Cloudflare Pages 等）
NEXT_PUBLIC_HOSTING_MODE=dynamic

# DoubleHub 本体 Supabase
NEXT_PUBLIC_DOUBLEHUB_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_DOUBLEHUB_SUPABASE_ANON_KEY=<anon>

# BookCompass Supabase
NEXT_PUBLIC_BOOKCOMPASS_SUPABASE_URL=https://njwakqmwcuoxqosjjwio.supabase.co
NEXT_PUBLIC_BOOKCOMPASS_SUPABASE_ANON_KEY=<anon>

# TrainNote Supabase（v1 では UI が Coming Soon のため、入っていなくても動作する）
NEXT_PUBLIC_TRAINNOTE_SUPABASE_URL=https://tvqvkvcqkigpmvzrmywl.supabase.co
NEXT_PUBLIC_TRAINNOTE_SUPABASE_ANON_KEY=<anon>

# GA4（既存）
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-DJW7K08F6F
```

### 3.1. env 投入後にやること

1. Supabase ダッシュボード（DoubleHub 本体）で **Redirect URLs** に以下を追加:
   - `http://localhost:3000/app/`
   - `https://doublehub.jp/app/`
   - 必要に応じて `https://<preview>.pages.dev/app/`
2. Supabase Auth プロバイダを有効化:
   - Apple（Service ID, Team ID, Key ID, Private Key が必要。OPEN_QUESTIONS.md §認証）
   - Google（Client ID, Client Secret が必要）
   - Email（OTP マジックリンク。デフォルト ON のはず）
3. `pnpm dev` で `/app/login/` に遷移し、Magic link を送って認証の往復を確認

---

## 4. Supabase 型の正式化（重要 TODO）

Day 4 で、Supabase v2.45 の型推論対策として Repository 層で **書き込みパスのみ `as never` キャスト** している。

- 対象ファイル:
  - `src/lib/repositories/todos.ts`
  - `src/lib/repositories/memos.ts`
  - `src/lib/repositories/external-sources.ts`
  - `src/app/(app)/app/(authed)/settings/_components/ProfileCard.tsx`

### 4.1. 撤去手順（env 投入・project ref 確定後）

```sh
# Supabase CLI セットアップ
pnpm add -D supabase
pnpm exec supabase login

# DoubleHub 本体の型生成
pnpm exec supabase gen types typescript \
  --project-id <doublehub-ref> \
  --schema public \
  > src/lib/supabase/types-doublehub.generated.ts

# BookCompass
pnpm exec supabase gen types typescript \
  --project-id njwakqmwcuoxqosjjwio \
  --schema public \
  > src/lib/supabase/types-bookcompass.generated.ts
```

1. `types-doublehub.ts` を削除、または内部で `types-doublehub.generated.ts` を `export type { Database } from './types-doublehub.generated';` に置き換え
2. `src/lib/supabase/client.ts` / `server.ts` の import を generated 版に
3. 各 Repository の `.insert(payload as never)` を `.insert(payload)` に戻す
4. `pnpm exec tsc --noEmit` でエラーが出なくなることを確認
5. もし残る不整合があれば、ペイロード側の型を generated の `Database['public']['Tables']['<table>']['Insert']` で縛り直す

### 4.2. 簡易版で据え置く選択肢

急いでいない場合は v1 のまま運用しても実害は少ない。HANDOVER 後にスキーマを変える予定があるなら、変更のタイミングで generated 化するのが効率的。

---

## 5. Cloudflare Pages 本番デプロイ手順

### 5.1. プロジェクト作成

1. Cloudflare ダッシュボード → Pages → Create a project → Connect to Git
2. GitHub リポジトリ `growthlab710/doublehub-site` を接続
3. Production branch: `main`（または移行期間は `feature/nextjs-renewal`）

### 5.2. ビルド設定

**推奨: dynamic モード（Functions 有効、認証ガードがサーバ側で走る）**

| 項目 | 値 |
| --- | --- |
| Framework preset | Next.js |
| Build command | `pnpm install --frozen-lockfile && pnpm build` |
| Build output directory | `.next`（Cloudflare の Next.js アダプタが処理） |
| Node version | 20 |
| 環境変数 | 上記 `.env.local` と同じ key/value |
| 環境変数 `NEXT_PUBLIC_HOSTING_MODE` | `dynamic` |

**代替: static モード**（GitHub Pages と同等）

| 項目 | 値 |
| --- | --- |
| Build command | `NEXT_PUBLIC_HOSTING_MODE=static pnpm install --frozen-lockfile && pnpm build:export` |
| Build output directory | `out` |
| 環境変数 `NEXT_PUBLIC_HOSTING_MODE` | `static` |

### 5.3. DNS 切替

- 現状 `doublehub.jp` は GitHub Pages（CNAME → `growthlab710.github.io`）
- 切替時:
  1. Cloudflare Pages 側でカスタムドメイン `doublehub.jp` を追加
  2. DNS（恐らく Cloudflare DNS）の A/CNAME レコードを Pages 側に向ける
  3. `public/CNAME`（`doublehub.jp` と書かれたファイル）は Cloudflare Pages では無害。削除しなくても動くが、削除してもよい
- Search Console の「アドレス変更」申請はスキーマ変更を伴わないため不要（URL は維持）

---

## 6. GitHub Pages での暫定公開

dynamic モード環境（Cloudflare Pages）を用意するまでの間、`pnpm build:export` の結果を GitHub Pages に流す暫定運用も可能。

- 認証ガードは **クライアント redirect** が走るため、未ログインユーザーは `/app/login/` へ転送される
- Supabase env が未投入なら、`/app/login/` は「準備中」を表示してフェイルソフト
- メタリフレッシュによる旧 URL → 新 URL 301 相当は `scripts/postbuild-redirects.mjs` で生成済み

### デプロイ例（Actions を書く場合）

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9.15.9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build:export
        env:
          NEXT_PUBLIC_HOSTING_MODE: static
          NEXT_PUBLIC_DOUBLEHUB_SUPABASE_URL: ${{ secrets.DH_URL }}
          NEXT_PUBLIC_DOUBLEHUB_SUPABASE_ANON_KEY: ${{ secrets.DH_ANON }}
          NEXT_PUBLIC_BOOKCOMPASS_SUPABASE_URL: https://njwakqmwcuoxqosjjwio.supabase.co
          NEXT_PUBLIC_BOOKCOMPASS_SUPABASE_ANON_KEY: ${{ secrets.BC_ANON }}
          NEXT_PUBLIC_GA_MEASUREMENT_ID: G-DJW7K08F6F
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions: { pages: write, id-token: write }
    steps:
      - uses: actions/deploy-pages@v4
```

---

## 7. フォント（Fontshare self-host 化の TODO）

- 現状: Fontshare CDN を `<link>` で読み込み（`src/app/layout.tsx`）
- self-host 化の手順（ライセンス購入後）:
  1. Fontshare から商用ライセンス付きの WOFF2 を取得
  2. `public/fonts/` 配下に配置（`hubot-sans-variable.woff2`, `gambetta-variable.woff2` 等）
  3. `src/app/layout.tsx` の `<link>` を削除
  4. `src/styles/globals.css` 冒頭の `@import url('https://api.fontshare.com/...')` を削除
  5. `next/font/local` でラップし直す（`src/app/fonts.ts` を新設）:
     ```ts
     import localFont from 'next/font/local';
     export const display = localFont({
       src: '../../public/fonts/hubot-sans-variable.woff2',
       variable: '--font-display',
     });
     ```
  6. `layout.tsx` で `className={display.variable}` を `<html>` に付与

---

## 8. Lighthouse 計測（Day 5 実施）

- 計測方法: `pnpm build && pnpm start`（`http://localhost:3000`）に対して Chrome DevTools Lighthouse
- 対象ページ: `/`, `/products/doublehub/`, `/blog/`, `/blog/<slug>/`, `/about/`
- 結果は本ドキュメントの付録 A に記録（Day 5 で追記）

---

## 9. iOS 側連携 TODO（後続対応）

- **linked_accounts 設計**: DoubleHub 本体の `external_source_accounts` に、Web ログイン済みのユーザーが BookCompass / TrainNote と紐付けるためのレコードを置く設計（プロバイダ非依存、Apple sub 自動マッピング不可）
- **Web 側の現状**: `/app/bookcompass/` で BookCompass 独自 Supabase にログインし、onAuthStateChange → upsert external_source_accounts までは実装済み。link_status = 'active'
- **iOS 側で考慮すべきこと**:
  - iOS から BookCompass にログインするときも同じ `external_user_key` が書き込まれるか
  - Web でリンク済みなら iOS でのアカウント削除時に Web 側のセッションも revoke されるか
  - 多デバイス環境での `(user_id, source_type)` 一意性の扱い
- **TrainNote**: Phase 2（Supabase Auth 導入）が完了するまで Web 側は Coming Soon のまま

---

## 10. よくある落とし穴と解決策

| 症状 | 原因 | 解決策 |
| --- | --- | --- |
| `pnpm build` で Supabase 型エラー | `types-*.ts` を手動編集した | `supabase gen types` で正式生成に置き換える（§4） |
| ログイン後に画面が「準備中」のまま | `NEXT_PUBLIC_HOSTING_MODE=static` のままで Supabase env 未設定 | `dynamic` に変え、env を投入 |
| OAuth リダイレクトで 404 | Supabase ダッシュボードの Redirect URLs 未登録 | `/app/` を追加（§3.1） |
| 旧 URL にアクセスしても 404 | static モードで `scripts/postbuild-redirects.mjs` が走っていない | `pnpm build:export` で自動実行される。手動実行でも可 |
| Cloudflare Pages で `_redirects` が効かない | `out/_redirects` に出力されているか確認 | `public/_redirects` が build:export でコピーされるか確認 |

---

## 付録 A. Lighthouse 計測結果（Day 5 時点）

以下は、Day 5 のローカル本番ビルド（`pnpm build && pnpm start`）を対象に、Chrome Lighthouse（Desktop プリセット、Node 20）で計測した値。

> Day 5 実行時の参考値。本番環境（Cloudflare Pages）では値が変動することに留意。

| ページ | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | TBD | TBD | TBD | TBD |
| `/products/doublehub/` | TBD | TBD | TBD | TBD |
| `/blog/` | TBD | TBD | TBD | TBD |
| `/blog/ai-coding-agent-comparison-2026/` | TBD | TBD | TBD | TBD |
| `/about/` | TBD | TBD | TBD | TBD |

※ 本 zip 納品時点では Lighthouse の実計測は環境都合で省略し、ビルド成果物の軽量性（shared JS 100KB、SSG 37 ページ）とデザイントークンによる CLS 抑制で代替している。環境変数投入後、各担当環境での再計測を推奨する。

---

## 付録 B. 主要スクリプト一覧

| コマンド | 目的 |
| --- | --- |
| `pnpm dev` | 開発サーバ |
| `pnpm build` | dynamic ビルド |
| `pnpm build:export` | static ビルド + 301 メタリフレッシュ生成 |
| `pnpm start` | 本番サーバ起動（build 後） |
| `pnpm lint` | ESLint |
| `pnpm exec tsc --noEmit` | 型チェックのみ |
| `pnpm exec prettier --write .` | フォーマット（設定は `.prettierrc`） |
| `node scripts/migrate-blog-to-mdx.mjs` | レガシー HTML → MDX 一括変換（再実行時のみ使う） |
| `node scripts/optimize-images.mjs` | `public/images/` の一括最適化 |
| `node scripts/postbuild-redirects.mjs` | 301 メタリフレッシュ HTML 生成 |

---

## 付録 C. 重要ファイルマップ

```
src/
  app/
    layout.tsx                  — ルート。メタデータ、OGP、フォント、GA4
    (marketing)/                — 公開エリア（LP）
      layout.tsx                — MarketingHeader + MarketingFooter
      page.tsx                  — トップ
      products/[product]/       — DoubleHub / BookCompass / TrainNote LP
      blog/                     — ブログ一覧 + 個別記事（MDX）
      about/, privacy/, support/
    (app)/app/
      layout.tsx                — 素通し（モード分岐は authed 側）
      login/                    — OAuth + Magic Link
      (authed)/
        layout.tsx              — DynamicAuthGate / StaticAuthGate 分岐
        page.tsx                — ダッシュボード
        doublehub/              — Todo + Memo
        bookcompass/            — 連携カード + 本棚
        settings/               — プロフィール + 連携アカウント
        trainnote/              — Coming Soon
  lib/
    env.ts                      — hostingMode, supabaseConfig
    supabase/                   — 3 プロジェクトクライアント
    repositories/               — Todo / Memo / Book / ExternalSource
    content/                    — Markdown / MDX パイプライン
  components/
    ui/                         — プリミティブ（Button, Card, Tabs, Dialog 等）
    marketing/                  — LP 用（Hero, ProductCards, BlogTeaser 等）
    app/                        — AppShell / AppSidebar / AppHeader / AuthGate
content/
  blog/*.mdx                    — ブログ 19 記事
public/
  _redirects                    — Cloudflare 301
  CNAME, robots.txt, llms.txt   — 保持必須
  favicon.png, icon-*.png       — 保持必須
  manifest.json                 — 保持必須
  google060a06d7f9469fbc.html   — 保持必須
  images/                       — 最適化済み（WebP 併存）
legacy/                         — 旧 HTML/CSS/JS 退避
scripts/
  migrate-blog-to-mdx.mjs
  optimize-images.mjs
  postbuild-redirects.mjs
docs/web-renewal/
  00-overview.md 〜 07-*.md     — 元指示書（不変）
  OPEN_QUESTIONS.md             — 未解決事項
  DAILY_LOG.md                  — Day 1〜5 作業ログ
  HANDOVER.md                   — 本ドキュメント
```

---

## 最終メモ

- 本プロジェクトは「コードレベルで動く状態まで」を成果物とする契約。env 投入・DNS 切替・iOS 側対応は後続セッション担当。
- 問い合わせ先: PR #1 にコメントするか、`docs/web-renewal/OPEN_QUESTIONS.md` を更新して次セッション開始時に参照できるようにする。
- `docs/web-renewal/DAILY_LOG.md` を継続的に追記する文化を維持してほしい（Day 6 以降も同じ書式で追加）。
