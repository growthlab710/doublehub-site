# HANDOVER — DoubleHub Next.js リニューアル

本ドキュメントは、後続セッション / 運用担当者が受け取るべき情報を集約する。
最終更新: **2026-04-21 (JST) / Day 5 以降の env 投入後対応を反映**

対象読者:
- 本リポジトリを引き継いで本番投入（env 投入・DNS 切替・デプロイ）を行う担当
- iOS 側 linked_accounts 対応や新機能追加を行う担当
- Supabase / Cloudflare Pages / GitHub Pages を運用する担当

関連ドキュメント: `docs/web-renewal/` 配下
- `01-overview.md` 〜 `07-*.md` — 元指示書（不変）
- `DAILY_LOG.md` — Day 1〜5 および Day 5 以降の実施記録
- `OPEN_QUESTIONS.md` — 未解決事項（追記のみで育てる）

---

## 1. 現在の完了状況

### Day 1〜5 の成果物（2026-04-19 完了）

- **Day 1**: Next.js 15 (App Router) 初期化、デザイントークン移植、UI プリミティブ、
  公開エリア骨格（トップ / 3 プロダクト LP / about / privacy / support / blog 骨格 /
  ログイン骨格）、URL 301 設計、SEO / sitemap
- **Day 2**: ブログ 20 記事を MDX 化（unified/remark/rehype パイプライン）、
  about / privacy 本文完全移植、画像最適化（WebP 併存、15.84MB → 9.75MB）
- **Day 3**: UI プリミティブ追加（Radix ベース）、`src/lib/env.ts` / 3 プロジェクト
  Supabase クライアント、AppShell（サイドバー+ヘッダー）、認証ガード
  （dynamic / static 両モード）、`/app/login/` 本実装
- **Day 4**: Repository 層（todos / memos / books / external-sources）、
  DoubleHub / BookCompass / 設定の各画面、ダッシュボードウィジェット、
  `as never` キャストで型互換性確保
- **Day 5**: 最終 sanity check、OPEN_QUESTIONS / HANDOVER / DAILY_LOG 整備、
  zip 納品準備

### Day 5 以降（2026-04-21）の追加対応

env 投入後にローカル dev で実動作確認したところ、iOS 実スキーマ / RLS / PKCE
フローとの差分が複数発覚。Web 側を実運用可能な状態まで追い込んだ。
**Supabase スキーマ / RLS / RPC / Supabase 設定は変更せず、Web 側のコードを
実体に合わせる方針**で一貫。

| commit | 対応 |
|---|---|
| `1873443` | `fix(env)`: `NEXT_PUBLIC_*` を動的ブラケット → 静的参照へ。Next.js のビルド時置換が効くようにし、クライアントバンドルでの Supabase URL 未設定エラーを解消 |
| `c83400e` | `feat(auth)`: PKCE コールバック Route Handler `/app/auth/callback` を新規追加。Magic Link / OAuth 後の `?code=` を `exchangeCodeForSession` でセッション化。一時追加した env-debug ルートも本コミットで削除 |
| `2ff5383` | `fix(schema)`: iOS 実スキーマへの追従。todos: `is_done`→`is_completed`, `order_index`→`position`, `note` 削除 + 追加カラム。memos: `body`→`content`, `title`/`tags` 削除。profiles: `email` 削除（auth.user.email から取得）。external_source_accounts: `external_project_key` 追加 |
| `9d556dc` → `9672569` | `fix(repositories)`: 論理削除を `.update({ deleted_at })` から RPC 呼び出しへ。実関数名は `soft_delete_own_todo(target_todo_id uuid)` / `soft_delete_own_memo(target_memo_id uuid)`。`9672569` は同時に `formatDueDateJST` を追加し期日を「4月25日 23:00」形式の JST 表示に |
| `4d043bd` | `chore(ui)`: Google ログインボタン削除（iOS 未採用）。BookCompass を Coming Soon 化（iOS が匿名認証のみで linkIdentity 未実装）。LoginForm に「Web からは新規登録不可、iOS アプリで登録してください」の案内追加。AppNav に BookCompass「準備中」バッジ |
| `01a07b8` | `fix(bookcompass)`: 詳細リンクに `target="_blank"` と `rel="noopener noreferrer"` を付与。同一タブ遷移で (marketing) レイアウトのヘッダーが「ログイン」リンクを出しセッション切れと誤解される UX 問題を解消 |

---

## 2. 動作確認済み（Web 単体・ローカル dev 環境）

- ✅ **Magic Link ログイン**: メール送信 → リンク踏む → PKCE コールバック
  (`/app/auth/callback/?code=...`) → セッション確立 → `/app/` ダッシュボードに到達
- ✅ **Todo CRUD 全操作**: 作成 / 一覧表示（active / done / all フィルタ） /
  `is_completed` トグル / 論理削除（`soft_delete_own_todo` RPC 経由で RLS 通過）
- ✅ **Memo CRUD 全操作**: 作成 / 一覧表示（updated_at DESC） / 論理削除
  （`soft_delete_own_memo` RPC 経由）
- ✅ **期日 JST 表示**: UTC 保存の timestamptz を `Intl.DateTimeFormat` +
  `formatToParts` で「4月25日 23:00」形式に整形（iOS 表記と一致）
- ✅ **BookCompass Coming Soon 画面 + AppNav 準備中バッジ**: サイドバー /
  ダッシュボードカード / BookCompass 画面本体、いずれも整合
- ✅ **Google ボタン削除、新規登録案内表示**: `/app/login/` に Apple ボタンと
  Email フォームのみ、下部に「新規アカウント登録は iOS アプリからお願いします」
- ✅ **BookCompass 詳細リンク**: 新しいタブで `/products/bookcompass/` を開き、
  元タブはアプリコンテキストを保持

### 未検証（次セッションで検証 or 対応）

- ❌ **本番ビルド** `pnpm build` が失敗中（下記「既知の問題」参照）
- ⚪ Apple Sign In OAuth フロー: Supabase ダッシュボード側の Services ID /
  Return URL 設定が完了次第、Web でも動作確認可能
- ⚪ iOS ↔ Web のデータ同期: 現時点では iOS と Web は別 `auth.users.id` で
  動いており、iOS で作成した Todo は Web からは見えない。Phase 2 で解決予定

---

## 3. 既知の問題 / 次セッションの最優先タスク

### 3.1. 【最優先】`useSearchParams` Suspense 境界対応

**症状**: `pnpm build`（本番ビルド）が以下で失敗:

```
Error occurred prerendering page "/app/login"
useSearchParams() should be wrapped in a suspense boundary at page "/app/login"
Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
```

**原因**: `src/app/(app)/app/login/_components/LoginForm.tsx` が
`useSearchParams()` を使っているが、親ページ側で `<Suspense>` 境界で
囲まれていない。Next.js 15 の prerender では `<Suspense>` 必須。

**最小修正案**: `src/app/(app)/app/login/page.tsx` で `<LoginForm />` を
`<Suspense>` でラップ:

```tsx
import { Suspense } from 'react';
// ...
{canSignIn ? (
  <Suspense fallback={<div className="text-sm text-text-muted">読み込み中…</div>}>
    <LoginForm />
  </Suspense>
) : (
  /* Coming Soon UI */
)}
```

dev では問題なく動作するので機能検証には影響しないが、Cloudflare Pages 等で
本番デプロイするには先に解消が必要。

### 3.2. Cloudflare Pages デプロイ準備

- `package.json` に `build:export` script あり（`NEXT_PUBLIC_HOSTING_MODE=static
  NEXT_OUTPUT_MODE=export` で静的エクスポート）
- **認証ありの dynamic モードで Cloudflare Pages にデプロイするなら、
  `@cloudflare/next-on-pages` adapter が必要になる可能性が高い**（要調査）
- `next.config.js` の `trailingSlash: true` 設定は全体に影響。Cloudflare 側の
  `_redirects` / リダイレクト設定との相互作用に注意
- 環境変数（Supabase 3 プロジェクトの URL / anon + `NEXT_PUBLIC_HOSTING_MODE`）を
  Cloudflare Pages プロジェクトの Environment Variables に登録
- Supabase ダッシュボードの Redirect URLs 許可リストに本番ドメインの
  `/app/auth/callback` を追加する必要あり

詳細な手順は本ドキュメント付録 §A.5（元 Day 1-5 HANDOVER）を参照。

---

## 4. Phase 2 保留事項

Web 単体のリリースは 3.1 解消で可能だが、**iOS ↔ Web の真のクロスデバイス同期**
を実現するには以下を Phase 2 で対応する必要がある。

### 4.1. category（プライベート / 仕事）タブ対応

- 実スキーマの `todos.category` と `memos.category`（text, default `'private'`）は
  iOS で既に対応済み
- Web 側は現状フィルタ無し（全件表示）。サイドタブ or セレクタで切替できる
  ようにすると iOS との UX 整合が取れる
- 実装: `listTodos({ category })` / `listMemos({ category })` 引数追加、
  UI にタブ追加

### 4.2. Web 用 Apple OAuth プロバイダ設定

- 現在 `/app/login/` の Apple ボタンは UI としては存在するが、Supabase
  ダッシュボードの Auth → Providers → Apple 側が未設定 or 未検証のため
  押しても `invalid_request: Invalid client id or web redirect url` で返る
  可能性が高い
- 要作業:
  - Apple Developer Console で **Services ID**（App ID とは別）を作成 or 流用し、
    Return URL に `https://<supabase-ref>.supabase.co/auth/v1/callback` を登録
  - Supabase ダッシュボードに Services ID + Team ID + Key ID + `.p8` 秘密鍵を設定
  - iOS 側の Sign in with Apple 設定と**同じ App ID**を Primary App ID に
    指定して、`sub` が iOS と Web で一致する前提を作る（4.3 に直結）

### 4.3. iOS と Web で同一ユーザーの `user_id` を揃える

- 現状: Web から Magic Link で新規に匿名ログインすると `auth.users.id` が
  iOS の既存ユーザーと別物になり、iOS データが Web から見えない
- 方針候補:
  1. **`auth.linkIdentity` で Apple Sign In を既存匿名ユーザーに紐付ける**
     （iOS 側の匿名ユーザーに Apple ID を後付け）
  2. iOS 側を Apple Sign In 必須化し、Web でも同じ Apple Sign In で入れば
     Supabase が自動で同じ `auth.users.id` に解決される
- 設計判断が必要。iOS 側の実装変更（匿名ユーザーの `linkIdentity` 呼び出し）を
  伴うため計画側と合意が要る

### 4.4. `supabase gen types` による型生成 → `as never` キャスト撤去

- 対象ファイル:
  - `src/lib/repositories/todos.ts`
  - `src/lib/repositories/memos.ts`
  - `src/lib/repositories/external-sources.ts`
  - `src/app/(app)/app/(authed)/settings/_components/ProfileCard.tsx`
- 現在すべて `.insert(payload as never)` / `.rpc('...', args as never)` で
  書き込みパスの型を緩和している
- 手順: `pnpm exec supabase gen types typescript --project-id <doublehub-ref>
  --schema public > src/lib/supabase/types-doublehub.generated.ts` →
  `types-doublehub.ts` の `Database` をこれに置き換え → `as never` 撤去 →
  typecheck

### 4.5. Cloudflare Pages: 動的 vs 静的の採用判断

- dynamic（認証あり）: `@cloudflare/next-on-pages` adapter 必須、Functions 料金
  発生の可能性
- static + client-side auth: GitHub Pages でも可、`static` モードは既に
  `pnpm build:export` でビルド可能だが Server Component 認証ガードが無効化
- トレードオフを整理して計画側と合意

---

## 5. 重要な技術メモ

### 5.1. Supabase クライアント

- **storageKey 分離**: `sb-doublehub-auth` / `sb-bookcompass-auth` で cookie /
  localStorage が独立。同一ブラウザで 3 プロジェクトの auth を併存させても
  セッションが混ざらない
- **flowType**: デフォルト PKCE。メールリンクは `token=pkce_...` 形式で、
  コールバックで `?code=` として戻る → サーバ側で `exchangeCodeForSession` が必須
- **`detectSessionInUrl: true` は implicit 用**: `#access_token=...` フラグメント
  用で、PKCE の `?code=` には効かない。必ず Route Handler 側で処理する
- **サーバクライアント**: `src/lib/supabase/server.ts` で `await cookies()`
  対応済み（Next.js 15 で `cookies()` が Promise 化）
- **Route Handler 上での cookie set**: `getServerDoubleHub()` の
  `cookies.set` / `cookies.remove` は try/catch で握り潰されているが、
  Route Handler 上では正常に cookie が書き込まれる（Server Component
  以外からは set が効かないための保険）

### 5.2. RPC シグネチャ（実体）

| RPC 関数名 | 引数 | 用途 |
|---|---|---|
| `soft_delete_own_todo` | `target_todo_id uuid` | Todo 論理削除（RLS に弾かれない経路） |
| `soft_delete_own_memo` | `target_memo_id uuid` | Memo 論理削除 |
| `request_account_deletion` | 引数なし | アカウント削除（UI 側は未接続） |

**注意**: 初回実装時に `soft_delete_todo({ todo_id })` と推測して PGRST202 で
失敗した経緯あり。実関数名は必ず Supabase Dashboard → Database → Functions で
確認すること。

### 5.3. 実スキーマ（正）

**todos**:
- `id`, `user_id`, `title`, **`is_completed`**, `completed_at`, `due_date`,
  `due_local_date` (date), `is_all_day`, `category` (default `'private'`),
  `source` (default `'manual'`), `eventkit_identifier`, **`position`** (double
  precision), `parent_id`, `deleted_at`, `created_at`, `updated_at`,
  `reflect_to_calendar`, `calendar_event_id`
- `note` カラムは**存在しない**

**memos**:
- `id`, `user_id`, **`content`**, `category` (default `'private'`),
  `position` (double precision), `deleted_at`, `created_at`, `updated_at`
- `title` / `tags` カラムは**存在しない**

**profiles**:
- `id`, `timezone`, `subscription_tier`, `subscription_expires_at`,
  `revenuecat_customer_id`, `healthkit_enabled`, `healthkit_consent_given_at`,
  `is_anonymous`, `display_name`, `avatar_url`, `apple_email`,
  `linked_providers text[]`, `last_active_at`, `subscription_downgraded_at`,
  `marked_for_deletion_at`, `account_deletion_requested_at`, `created_at`,
  `updated_at`
- `email` カラムは**存在しない**。Web の表示用メールは `auth.user.email` から
  取得

**external_source_accounts**:
- 型定義に `external_project_key text | null` を追加済み

### 5.4. 型キャスト戦略

- Supabase v2 クライアントは自前の `Database` スタブから `Insert` / `Update` /
  `Functions.Args` 型を正しく拾えず `never` に解決する
- 書き込みペイロード・RPC 引数は TypeScript の型注釈で明示的にガードした上で
  `as never` でキャストしてランタイムに渡す
- Phase 2 で `supabase gen types` に差し替え次第、全キャスト撤去

### 5.5. iOS との真の同期状況

- 現状は **iOS と Web で `auth.users.id` が別**（DoubleHub 本体 Supabase 側で
  見れば別ユーザー扱い）。iOS 側の Todo / Memo は Web からは見えない
- Web 側コードは **iOS と同一スキーマ / 同一 RLS ポリシー / 同一 RPC** を
  利用しているので、ユーザー ID を揃えさえすれば即時に同期が成立する
- Phase 2 の 4.2 + 4.3 で解決予定

### 5.6. 日付フォーマット

- `due_date` / `completed_at` / `updated_at` 等の timestamptz カラムは UTC で
  返る
- 表示は必ず `src/lib/format.ts` の `formatDueDateJST` を経由して
  `Asia/Tokyo` の「M月D日 HH:mm」形式に整形（iOS 表記と揃える）
- ブラウザローカル TZ に依存しない実装（`timeZone: 'Asia/Tokyo'` 固定）

### 5.7. Git / 作業フォルダ

- **正本**: `feature/nextjs-renewal` ブランチ（`growthlab710/doublehub-site`）
- **ローカル主作業フォルダ**: `~/Desktop/doublehub-web-git/`
- 旧 `~/Desktop/doublehub-web/`（zip 展開由来、git 未接続）は Day 5 以降 touch しない
- `.env.local` は `doublehub-web-git/` に配置済み（gitignore）

---

## 付録 A. Day 1〜5 初期実装時の引き継ぎ情報（元 HANDOVER の内容）

Day 1〜Day 5 の納品時点で整備した運用ドキュメント。env 投入手順、Cloudflare
Pages デプロイ、正式型生成への置き換え手順、Fontshare self-host 化等は
ここを参照。

### A.0. 前提・制約

- **禁止事項**:
  - Supabase `service_role` key をクライアントや env.public に書かない
  - Vercel Hobby プランでの本番運用（プライベート動線は Cloudflare Pages 推奨）
  - 楽天ブックス API の直接呼び出し（BookCompass のカバー補完用バッチの
    クォータを食いつぶす）
  - Supabase スキーマ変更（DoubleHub / BookCompass / TrainNote いずれも
    既存スキーマを前提に実装済み）
- **保持必須ファイル**（`public/` 配下）:
  - `CNAME`（`doublehub.jp`）
  - `robots.txt`, `llms.txt`, `manifest.json`
  - `google060a06d7f9469fbc.html`（Search Console 検証）
  - `favicon.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
  - `_redirects`（Cloudflare Pages 用 301、25 件）

### A.1. ビルドの 2 モード

| コマンド | モード | 用途 |
| --- | --- | --- |
| `pnpm build` | dynamic | Cloudflare Pages（Functions あり）/ Node サーバ |
| `pnpm build:export` | static | GitHub Pages / 純静的ホスティング |

`pnpm build:export` の最後に `scripts/postbuild-redirects.mjs` が自動実行され、
旧 URL → 新 URL のメタリフレッシュ HTML が `out/` 配下に生成される。

### A.2. env 投入手順

`.env.local` に以下を記載（全て公開可能な anon key と URL のみ。
`service_role` は絶対に書かない）。実キーは iOS リポジトリの
`BookCompass/Config/Secrets.xcconfig` や各 Supabase ダッシュボードから取得。

```dotenv
NEXT_PUBLIC_HOSTING_MODE=dynamic

NEXT_PUBLIC_SUPABASE_DOUBLEHUB_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_DOUBLEHUB_ANON_KEY=<anon>

NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_URL=https://njwakqmwcuoxqosjjwio.supabase.co
NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_ANON_KEY=<anon>

NEXT_PUBLIC_SUPABASE_TRAINNOTE_URL=https://tvqvkvcqkigpmvzrmywl.supabase.co
NEXT_PUBLIC_SUPABASE_TRAINNOTE_ANON_KEY=<anon>

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-DJW7K08F6F
```

### A.3. Supabase ダッシュボード側の設定

1. **Redirect URLs** に以下を追加（DoubleHub 本体）:
   - `http://localhost:3000/app/auth/callback`
   - `https://doublehub.jp/app/auth/callback`
   - 必要に応じて `https://<preview>.pages.dev/app/auth/callback`
   - 上記に加え、フォールバックとして `http://localhost:3000/app/**` 等の
     ワイルドカード指定も可
2. **Auth プロバイダ**:
   - Apple: Services ID / Team ID / Key ID / `.p8` 秘密鍵（4.2 で詳細）
   - Email: Magic Link（デフォルト ON のはず）
3. `.env.local` 投入後、`pnpm dev` で `/app/login/` に遷移し Magic Link の
   実往復を確認

### A.4. 正式型生成（`as never` キャスト撤去）

```sh
pnpm add -D supabase
pnpm exec supabase login

pnpm exec supabase gen types typescript \
  --project-id <doublehub-ref> \
  --schema public \
  > src/lib/supabase/types-doublehub.generated.ts

pnpm exec supabase gen types typescript \
  --project-id njwakqmwcuoxqosjjwio \
  --schema public \
  > src/lib/supabase/types-bookcompass.generated.ts
```

1. `types-doublehub.ts` の `Database` を `export type { Database } from
   './types-doublehub.generated';` に置き換え
2. 各 Repository の `.insert(payload as never)` / `.rpc(..., args as never)` を
   `as never` 無しに戻す
3. `pnpm exec tsc --noEmit` で型エラーが出なくなることを確認

### A.5. Cloudflare Pages デプロイ手順

**dynamic モード（推奨）**:

| 項目 | 値 |
| --- | --- |
| Framework preset | Next.js |
| Build command | `pnpm install --frozen-lockfile && pnpm build` |
| Build output directory | `.next` |
| Node version | 20 |
| 環境変数 | A.2 と同じ |

**注**: 最新の Cloudflare Pages Next.js サポートは `@cloudflare/next-on-pages`
adapter を前提とする場合がある。要事前確認。

**static モード（代替）**:

| 項目 | 値 |
| --- | --- |
| Build command | `NEXT_PUBLIC_HOSTING_MODE=static pnpm install --frozen-lockfile && pnpm build:export` |
| Build output directory | `out` |
| 環境変数 `NEXT_PUBLIC_HOSTING_MODE` | `static` |

### A.6. フォント（Fontshare self-host 化の TODO）

ライセンス購入後に Fontshare CDN → `next/font/local` に切替。
手順の詳細は過去版の HANDOVER（git 履歴）を参照、または Fontshare 公式の
ガイドラインに従う。

### A.7. よくある落とし穴

| 症状 | 原因 | 解決策 |
| --- | --- | --- |
| Magic Link 踏んでも `/app/login/` に戻る | PKCE コールバックが未実装 | **Day 5 以降で解消済み**（`/app/auth/callback/route.ts`） |
| Todo 取得で 42703 エラー | Web 側の型と実スキーマのズレ | **Day 5 以降で解消済み**（is_completed / position 等） |
| Todo/Memo 削除で 42501 エラー | RLS が `deleted_at` 直接 UPDATE を禁止 | **Day 5 以降で解消済み**（`soft_delete_own_*` RPC 経由） |
| `/app/login/` で Supabase URL 未設定エラー | `process.env[key]` の動的参照で置換されていない | **Day 5 以降で解消済み**（静的参照に変更） |
| OAuth リダイレクトで 404 | Supabase ダッシュボードの Redirect URLs 未登録 | `/app/auth/callback` を追加（A.3） |
| `pnpm build` で useSearchParams エラー | Suspense 境界未設置 | **次セッション最優先（3.1 参照）** |

### A.8. 主要ファイルマップ

```
src/
  app/
    layout.tsx                  — ルート
    (marketing)/                — 公開エリア（LP）
    (app)/app/
      login/                    — Apple OAuth + Magic Link
      auth/callback/            — PKCE コールバック（Day 5 以降で追加）
      (authed)/
        layout.tsx              — DynamicAuthGate / StaticAuthGate 分岐
        page.tsx                — ダッシュボード
        doublehub/              — Todo + Memo
        bookcompass/            — Coming Soon（旧連携実装は _components/ に残置）
        settings/               — プロフィール + 連携アカウント
        trainnote/              — Coming Soon
  lib/
    env.ts                      — hostingMode, supabaseConfig（静的参照）
    format.ts                   — JST フォーマッタ（Day 5 以降で追加）
    supabase/                   — 3 プロジェクトクライアント + 型定義
    repositories/               — todos / memos / books / external-sources
  components/
    app/                        — AppShell / AppSidebar / AppHeader / AuthGate
    ui/                         — プリミティブ
    marketing/                  — LP 用
docs/web-renewal/
  01-overview.md 〜 07-*.md     — 元指示書（不変）
  OPEN_QUESTIONS.md             — 未解決事項
  DAILY_LOG.md                  — 作業ログ
  HANDOVER.md                   — 本ドキュメント
```
