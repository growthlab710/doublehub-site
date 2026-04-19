# 02. 情報アーキテクチャ・URL 設計・画面一覧

## 2.1 サイト全体の構造

```
doublehub.jp/
├── /                          ← ハブトップ（Hero + Ecosystem + 遷移カード）
├── /products/
│   ├── /bookcompass/          ← BookCompass LP（旧 /bookcompass.html を移行）
│   ├── /trainnote/            ← TrainNote LP（旧 /trainnote.html を移行）
│   └── /doublehub/            ← DoubleHub 本体 LP（新規）
├── /blog/                     ← ブログ一覧
│   └── /[slug]/               ← 個別記事（20 件 MDX 移行）
├── /about/                    ← 著者・開発思想（既存 about.html を移行）
├── /support/                  ← サポート（既存 support.html を移行、App Store 審査用に維持必須）
├── /privacy/                  ← プライバシーポリシー（同上）
└── /app/                      ← Web アプリ本体（認証必須エリア）
    ├── /login/                ← ログイン画面
    ├── /                      ← ダッシュボード（ログイン後のトップ）
    ├── /doublehub/            ← DoubleHub 本体画面（ToDo / メモ）
    ├── /bookcompass/          ← BookCompass 画面（本棚 / ナレッジコンパス）
    ├── /trainnote/            ← TrainNote 画面（ワークアウト履歴 / 記録）
    └── /settings/             ← 設定（linked_accounts、テーマ、アカウント）
        ├── /linked-accounts/
        ├── /subscription/
        └── /account/
```

## 2.2 URL 移行と 301 リダイレクト

既存 URL を新 URL にマッピング。**static export 環境でも動くように**、各旧 HTML ファイルに `<meta http-equiv="refresh">` リダイレクトを配置し、かつ Cloudflare Pages 側では `_redirects` ファイルで 301 を返す。

| 旧 URL | 新 URL |
|---|---|
| `/bookcompass.html` | `/products/bookcompass/` |
| `/trainnote.html` | `/products/trainnote/` |
| `/about.html` | `/about/` |
| `/support.html` | `/support/` |
| `/privacy.html` | `/privacy/` |
| `/blog/index.html` | `/blog/` |
| `/blog/記事名.html` | `/blog/記事名/` |

### 実装手順

1. Next.js の App Router で新 URL をすべて実装
2. `public/_redirects`（Cloudflare Pages 用）に 301 マッピングを記述
3. GitHub Pages 用に、`out/` への書き出し時、旧ファイル名位置にメタリフレッシュ HTML を配置するスクリプトを追加
4. `sitemap.xml` を新 URL のみで再生成
5. Google Search Console で「アドレス変更」の申請は後続セッションが担当（本プロジェクトでは対応不要）

### 注意

- **support.html と privacy.html は App Store Connect のサポート URL / プライバシー URL として登録されている**。旧 URL へのアクセスが必ず新 URL に到達するように、リダイレクトの動作を必ずテストする。

## 2.3 ナビゲーション構造

### 公開エリア（LP）ヘッダー

```
[DoubleHub ロゴ]   Products ▾   Blog   About   [テーマ切替]   [ログイン]
                    ├ DoubleHub
                    ├ BookCompass
                    └ TrainNote
```

- **ログイン ボタン**: `NEXT_PUBLIC_HOSTING_MODE=static` のときは「準備中」表示 or 非表示。`dynamic` のときのみ `/app/login` へ遷移
- **テーマ切替**: ライト / ダーク / システム追従（既存仕様を継承）

### 公開エリア フッター

```
[DoubleHub ロゴ + GrowthLab]
Products: DoubleHub / BookCompass / TrainNote
Company: About / Blog / Support / Privacy
© GrowthLab
```

### アプリエリア（`/app/*`）のレイアウト

```
┌────────────────────────────────────────┐
│ [ロゴ] DoubleHub Dashboard   [Profile ▾] │  ← 固定ヘッダー
├──────┬─────────────────────────────────┤
│ Nav  │                                  │
│      │  メインコンテンツエリア             │
│ 🏠   │                                  │
│ 📘   │                                  │
│ 💪   │                                  │
│ 💬   │                                  │
│ ⚙   │                                  │
└──────┴─────────────────────────────────┘
```

- デスクトップ：左サイドバー固定
- モバイル：下部タブバー（または折りたたみドロワー）

## 2.4 画面一覧（Web アプリ）

### 2.4.1 ログイン / サインアップ（`/app/login/`）

**目的**: ユーザーを DoubleHub 本体 Supabase プロジェクトで認証する

**要素**:
- DoubleHub ロゴ + キャッチコピー
- **Apple でサインイン** ボタン
- **Google でサインイン** ボタン
- Email + パスワード入力（優先度中、Apple を持たないユーザー向けに必須）
- 利用規約 / プライバシーポリシーへのリンク

**挙動**:
- 認証成功 → `/app/` へリダイレクト
- `NEXT_PUBLIC_HOSTING_MODE=static` 時はボタンを無効化し「Coming Soon」表示

**iOS との関係（プロバイダ別）**:

| プロバイダ | iOS ユーザーが Web で同じプロバイダで再サインインした場合 |
|---|---|
| Apple | 同じ `auth.users.id` になり自動同期される（Apple `sub` が共通のため） |
| Google | 同じ Google アカウントなら同じ `auth.users.id`（Email ベース） |
| Email + パスワード | 同じ Email なら同じ `auth.users.id` |

**プロバイダが異なる場合**（例：iOS では Apple、Web では Google を使う場合）は別アカウントとして扱われる。同一ユーザーとして認識させたい場合は、**ログイン後に設定画面で「他の認証方法を追加する」から Identity Linking** で紐づける（v1 では UI 実装は見送り可、コードは将来拡張しやすい構造に）。

**iOS で匿名ログインしているユーザー**は、Web でログインする前に iOS 側で Apple / Google / Email のいずれかでアカウントを昇格する必要がある（匿名アカウントは Web でサインインする手段がないため）。

### 2.4.1b 他プロダクト（BookCompass / TrainNote）との関係

DoubleHub 本体の認証とは**完全に独立**している：

- **BookCompass**（本番稼働中）: 独自の Supabase Auth を持つ。DoubleHub とは別の `auth.users.id`。Web 側でダッシュボードに BookCompass データを表示したい場合、`/app/settings/linked-accounts/` で「BookCompass と連携」を実行する必要がある
- **TrainNote**（Phase 2 で独自 Auth 導入予定）: 現状 Auth 未導入のため v1 では連携機能を提供しない

**プロジェクト間の連携は「プロバイダ非依存の連携アクション方式」で行う**。DoubleHub で使っているプロバイダと BookCompass / TrainNote で使っているプロバイダが異なっていても連携可能。詳細は [04-data-layer.md §4.5.2](./04-data-layer.md#452-プロジェクト間の連携フロープロバイダ非依存) を参照。

### 2.4.2 ダッシュボード（`/app/`）

**目的**: DoubleHub エコシステム全体の「今日の状態」を一望する

**ウィジェット構成**（縦積みのカード、モバイルでも同じ順序）：

1. **挨拶カード**: 「おはよう/こんにちは/こんばんは、{display_name}さん」+ 今日の天気や予定のサマリー（v1 は時刻による挨拶のみで OK）
2. **DoubleHub 本体ウィジェット**:
   - 今日の ToDo（最大 3 件、完了チェック可）
   - 最新メモ（最大 2 件、クリックで全文表示）
   - 「DoubleHub 画面を開く」リンク
3. **BookCompass ウィジェット**（linked_accounts に 'bookcompass' が active なら表示）:
   - 直近追加した本（`books` テーブルから最大 3 件、書影付き）
   - 最新の Mutter（`mutters` テーブルから最大 1 件）
   - 直近のチャットインサイト（`chat_insights` から最大 1 件、v1 では閲覧のみ）
   - 「BookCompass 画面を開く」リンク
   - **未連携の場合**: 「BookCompass と連携する」ボタン（`/app/settings/linked-accounts/` へ）
4. **TrainNote ウィジェット**（**v1 では「近日公開」表示**）:
   - 「TrainNote の Web 対応は準備中です」メッセージ
   - プロダクト説明（1-2 行）
   - App Store バナー
   - 理由: TrainNote は Supabase Auth 未導入、トレーニングデータがクラウド未同期のため Web からアクセス不可。Phase 2 完了後に本格対応予定
5. **お知らせ / アップデート**（ecosystem 全体の新機能・リリース情報）

**データソース**:
- DoubleHub Supabase（プロジェクト A）: `todos`, `memos`, `profiles`
- BookCompass Supabase（プロジェクト B、`njwakqmwcuoxqosjjwio`）: `books`, `mutters`, `chat_insights` 等。**別途 BookCompass セッションが必要**（[04-data-layer.md §4.5.2](./04-data-layer.md#452-bookcompass-連携ログインweb-側の重要機能) 参照）
- TrainNote Supabase（プロジェクト C、`tvqvkvcqkigpmvzrmywl`）: **v1 では使わない**（AI Coach ログ専用テーブルしか存在しないため）

### 2.4.3 DoubleHub 本体画面（`/app/doublehub/`）

**タブ構成**:

- **ToDo**（デフォルト）:
  - 未完了リスト
  - 完了済みタブ（トグル切替）
  - インライン追加入力
  - 完了チェック、削除（論理削除 RPC `soft_delete_own_todo`）
- **メモ**:
  - カード一覧（category=private/work でタブ）
  - 新規作成モーダル
  - 編集、削除（`soft_delete_own_memo`）
- **チャット**（v1 では除外。タブを UI 上置くが「近日公開」表示）

**iOS との機能差**:
- 音声入力、HealthKit、カレンダー連携、パターン分析は Web では対応しない
- 「iOS で見る / iOS アプリをダウンロード」への誘導リンクを配置

### 2.4.4 BookCompass 画面（`/app/bookcompass/`）

**前提**:
- `external_source_accounts` に `source_type='bookcompass'` の active レコードが存在する
- **`supabaseBookCompass` クライアントに BookCompass 側のセッションが確立している**（詳細: [04-data-layer.md §4.5.2](./04-data-layer.md#452-bookcompass-連携ログインweb-側の重要機能)）

**タブ構成**:

- **本棚**:
  - 書影グリッド（`status` = `reading` / `finished` / `paused` でフィルタ）
  - お気に入り（`is_favorite`）での絞り込み
  - 本詳細モーダル（`books` + 関連 `mutters`）
- **Mutter**（呟き）:
  - 本への短文感想一覧
  - 新規作成
- **インサイト閲覧**（v1 では読み取り専用）:
  - `chat_insights` を `insight_type` でフィルタ表示
- **本を追加**:
  - `search-books` Edge Function 経由で ISBN / タイトル検索（NDL Search / openBD がバックエンド）
  - **楽天 API は使わない**（レート制限の問題、[04-data-layer.md §4.3.5](./04-data-layer.md#435-楽天ブックス-api-について重要) 参照）

**未連携時**: `/app/settings/linked-accounts/` への誘導画面

### 2.4.5 TrainNote 画面（`/app/trainnote/`）

**v1 の方針**: **UI は置くが中身は「近日公開」扱い**。トレーニングデータ本体が iOS 端末の SwiftData に閉じており、クラウド未同期のため。

**画面構成**:

- プロダクト紹介セクション（TrainNote とは何か）
- 「Web 対応は Phase 2 完了後」のお知らせ
- App Store ダウンロードバナー
- （将来枠）ワークアウト履歴タブ・記録タブは UI レイアウトのみ用意し、「Coming Soon」プレースホルダ

**TrainNote Phase 2 完了後の想定スコープ**（本プロジェクト範囲外）:
- ワークアウト履歴閲覧（`training_sessions` テーブル）
- 簡易記録（`training_sessions` + `training_exercises` + `training_sets` テーブル）
- カレンダーヒートマップ

**データソース（v1）**: なし。`supabaseTrainNote` クライアントは初期化するが実用しない

### 2.4.6 設定（`/app/settings/`）

サブセクション：

- **プロフィール**: display_name, avatar_url（編集）、apple_email 表示
- **linked_accounts**: [04-data-layer.md](./04-data-layer.md#35-linked-accounts-ux) 参照
- **サブスクリプション**: 現プラン表示、管理（v1 では App Store 経由の旨を表示し、Web 決済は未対応）
- **テーマ**: ライト / ダーク / システム
- **言語**: v1 は日本語のみ（UI は置くが disabled）
- **アカウント削除**: RPC `request_own_account_deletion` を呼ぶ確認モーダル

## 2.5 LP 側のセクション構造

### トップページ（`/`）

```
1. Hero
   - キャッチコピー、ビジュアル、CTA（「アプリを見る」「Blog を読む」）
2. What is DoubleHub?
   - エコシステムの思想を 3 カード程度で説明
3. Products
   - DoubleHub / BookCompass / TrainNote の紹介カード
   - 各プロダクトページへの遷移
4. How it Works
   - 各プロダクトがどう連携するかの図解
5. Blog Teaser
   - 最新 3 記事
6. Newsletter / CTA
   - MailerLite 埋め込み
7. Footer
```

既存 `index.html` の Ecosystem Tabs の思想は維持し、「プロダクトカード」へ発展させる。

### プロダクトページ（`/products/[product]/`）

共通構造：

```
1. Hero（プロダクト色を強調）
2. 主要機能（3-5 点）
3. スクリーンショット / デモ
4. 使い方の流れ
5. FAQ
6. CTA（App Store、ブラウザで使う→/app/）
7. Footer
```

各プロダクトで色・ビジュアルを変える（[03-design.md](./03-design.md) 参照）。

## 2.6 Next.js ルーティング実装方針

- **App Router**（`app/` ディレクトリ）を使用
- 公開エリアとアプリエリアで **Layout を分離**:
  - `app/(marketing)/layout.tsx` → LP / ブログ共通
  - `app/(app)/app/layout.tsx` → 認証必須エリア、サイドバー付き
- 認証チェック:
  - `app/(app)/app/layout.tsx` 内で `getUser()` を呼び、未ログインなら `/app/login` へ `redirect()`
  - `static` モード時は middleware が動かないので、クライアント側のガードに倒す（[05-conventions.md](./05-conventions.md#hosting-mode-guard) 参照）
- **動的ルート**（ブログ個別記事）は `generateStaticParams` で全記事を列挙し、static export 可能にする

## 2.7 多言語対応

- **v1 は日本語のみ**
- ただし将来の多言語化を妨げないよう、以下を守る:
  - テキストはコンポーネント内で直接書かず、`lib/i18n/ja.ts` にキーで集約
  - 日付・数値フォーマットは `Intl.DateTimeFormat` / `Intl.NumberFormat` を使う
  - `<html lang="ja">` を指定

---

**次に読む**: [03-design.md](./03-design.md)
