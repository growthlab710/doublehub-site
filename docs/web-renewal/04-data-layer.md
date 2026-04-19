# 04. データ層（Supabase スキーマ・認証・linked_accounts）

> **重要**: 本ドキュメントは OPEN_QUESTIONS.md で判明した実情を反映した版（2026-04-19 更新）。以前の仮説から大きく修正されている部分があるので、古い理解がある場合は全面的に読み直すこと。

## 4.1 Supabase プロジェクト構成（重要）

DoubleHub エコシステムは **3 つの独立した Supabase プロジェクト** で構成されており、**各プロジェクトの認証状況が異なる**：

| プロダクト | Project Ref | 認証 | Web アプリからデータ参照 | 現状 |
|---|---|---|---|---|
| **DoubleHub 本体** | （自プロジェクト） | ✅ Apple / Google / Email / Anonymous | 主要ユーザーデータすべて | 本番稼働 |
| **BookCompass** | `njwakqmwcuoxqosjjwio` | ✅ Apple / Anonymous / Email（**独立**） | 蔵書・チャット・Mutter・推薦など本体機能一式 | 本番稼働 |
| **TrainNote** | `tvqvkvcqkigpmvzrmywl` | ❌ 未導入（Phase 2 で**独自 Auth 導入予定**） | 現状ほぼ無い（AI Coach のログのみ） | 移行計画 Phase 1 完了、Phase 2 未着手 |

### 重要な設計原則

1. **各プロダクトは独立した認証基盤を持つ**のが全体方針。DoubleHub 認証に統一しない。`auth.users.id` は各プロジェクトで別 UUID になる。
2. **プロジェクト間の紐づけは「プロバイダ非依存の連携アクション方式」で行う**。Apple `sub` や Email の一致による自動マッピングには依存しない。具体的には、Web 上で DoubleHub にログイン後、各プロダクトの Supabase に対しても個別にサインインしてもらい、その結果得られた `user_id` を DoubleHub の `external_source_accounts.external_user_key` に保存する（[§4.5.2](#452-プロジェクト間の連携フロープロバイダ非依存) 参照）。
3. **この方式なら Apple / Google / Email のどのプロバイダが使われていても連携できる**。プロダクトごとに別プロバイダを使っていても問題ない。
4. **TrainNote はトレーニングデータがクラウド未同期**（iOS SwiftData が正本）。Web 側で表示・記録できるデータはほぼ存在しないため、v1 では「近日公開」扱いで UI のみ用意。Phase 2 で独自 Supabase Auth 導入 + データクラウド化後に本格対応する。
5. **Web クライアントは 3 プロジェクト分の Supabase クライアントを持つ**が、用途が大きく異なる。

```typescript
// lib/supabase/clients.ts
export const supabaseDoubleHub = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_DOUBLEHUB_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_DOUBLEHUB_ANON_KEY!,
  { auth: { storageKey: 'sb-doublehub-auth' } }
);

export const supabaseBookCompass = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_ANON_KEY!,
  { auth: { storageKey: 'sb-bookcompass-auth' } }
);

// TrainNote は v1 では Auth を使わず、Web からはデータ参照もしない
// クライアントインスタンス自体は用意するが用途は限定的
export const supabaseTrainNote = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_TRAINNOTE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_TRAINNOTE_ANON_KEY!,
  { auth: { persistSession: false } }
);
```

**認証 Cookie / Storage Key の分離**: 2 つの Supabase プロジェクトで並行してセッションを保持するため、`storageKey` を別にする。そうしないと片方のセッションが上書きされる。

## 4.2 DoubleHub 本体 Supabase スキーマ

> 一次情報はリポジトリルートの `docs/supabase/*.sql` を参照。Web 側で必要な要点のみ。

### 4.2.1 主要テーブル（Web アプリから操作するもの）

| テーブル | 用途 | Web で必要な操作 |
|---|---|---|
| `profiles` | ユーザープロフィール、サブスク状態 | SELECT, UPDATE（display_name 等のみ） |
| `todos` | ToDo | SELECT, INSERT, UPDATE, 論理削除（RPC 経由） |
| `memos` | メモ | SELECT, INSERT, UPDATE, 論理削除（RPC 経由） |
| `external_source_accounts` | 他プロジェクト連携 | SELECT, INSERT, UPDATE（link_status='revoked' で解除） |
| `chat_usage_counts` | チャット上限 | **v1 では触らない**（チャット除外） |
| `account_deletion_requests` | アカウント削除 | SELECT, RPC 経由 INSERT |

### 4.2.2 各テーブルの主要カラム（Web 側で扱うもの）

#### profiles
| カラム | 型 | 備考 |
|---|---|---|
| `id` | UUID | `auth.users.id` と同一 |
| `timezone` | TEXT | 'Asia/Tokyo' |
| `subscription_tier` | TEXT | 'free' / 'light' / 'standard' / 'premium' |
| `display_name` | TEXT | 表示名 |
| `avatar_url` | TEXT | プロフィール画像 URL |
| `linked_providers` | TEXT[] | ['apple', 'google'] 等 |
| `is_anonymous` | BOOLEAN | 匿名ログインユーザーか |
| `apple_email` | TEXT | Apple Sign In のメール |

**注意**: `subscription_tier`, `marked_for_deletion_at` など **サーバー権威カラム**は Web からは UPDATE 不可（RLS WITH CHECK で保護）。

#### todos
主要カラム: `id`, `user_id`, `title`, `is_completed`, `completed_at`, `due_date`, `due_local_date`, `is_all_day`, `category` ('private'/'work'), `position`, `reflect_to_calendar`, `deleted_at`, `created_at`, `updated_at`

- **ソート**: `ORDER BY position ASC NULLS FIRST, created_at DESC`
- **削除**: RPC `soft_delete_own_todo(target_todo_id UUID)` を使う

#### memos
主要カラム: `id`, `user_id`, `content`, `category` ('private'/'work'), `position`, `deleted_at`, `created_at`, `updated_at`

- **削除**: RPC `soft_delete_own_memo(target_memo_id UUID)`

#### external_source_accounts（linked_accounts の実体）
| カラム | 型 | 備考 |
|---|---|---|
| `id` | UUID | 主キー |
| `user_id` | UUID | DoubleHub のユーザー ID |
| `source_type` | TEXT | `'bookcompass'` / `'trainnote'` / `'google_calendar'` 等 |
| `external_project_key` | TEXT | 外部 Supabase プロジェクト識別子（Web 側では任意、null でも可） |
| `external_user_key` | TEXT | **外部プロジェクト側の `auth.users.id`**（BookCompass 連携時はここに BookCompass 側 ID を保存） |
| `link_status` | TEXT | 'active' / 'revoked' / 'pending' |
| `metadata` | JSONB | 追加情報（apple_sub, 最終同期日時等） |

**一意制約**: `(user_id, source_type, external_user_key)`

### 4.2.3 RLS ポリシー概要

全テーブル共通：
- `auth.uid() = user_id` でのみ SELECT / INSERT / UPDATE
- 論理削除ありのテーブルは SELECT 時に `deleted_at IS NULL` 条件も課せられている
- 削除系は原則 RPC 経由（`soft_delete_own_*`）

### 4.2.4 使用する RPC

| RPC 名 | 用途 |
|---|---|
| `soft_delete_own_todo(target_todo_id)` | ToDo 論理削除 |
| `soft_delete_own_memo(target_memo_id)` | メモ論理削除 |
| `request_own_account_deletion(request_source)` | アカウント削除依頼（Web からは `request_source='web'` で呼ぶ） |

## 4.3 BookCompass Supabase スキーマ

> 一次情報: `BookCompass/supabase/migrations/` (iOS 別リポ)。以下は Web 側での参照/操作に必要な要点。

### 4.3.1 主要テーブル

| テーブル | 用途 | Web で必要な操作 |
|---|---|---|
| `profiles` | BookCompass 内ユーザープロファイル | SELECT |
| `books` | 蔵書 | SELECT, INSERT（本追加）, UPDATE（ステータス変更）, DELETE |
| `book_metadata_cache` | ISBN 単位の書誌メタキャッシュ | SELECT（参考） |
| `chat_sessions` | 書籍別チャットセッション | SELECT |
| `chat_messages` | チャット本文 | SELECT |
| `chat_insights` | チャットから抽出されたインサイト（興味/価値観/気づき等） | SELECT |
| `chat_search_intents` | チャットから抽出された検索意図（ナレッジコンパスの種） | SELECT |
| `chat_daily_usage` | 日次チャット回数カウンタ | v1 では触らない |
| `mutters` | 呟き（本への短い感想・メモ） | SELECT, INSERT, UPDATE, DELETE |
| `recommendations` | 推薦結果 | SELECT |

**想定と異なる点（Web 実装で注意）**:
- 旧仮説の `book_notes` は **存在しない**。本への短文メモは `mutters` テーブル
- 旧仮説の `knowledge_compass_recommendations` は **存在しない**。推薦系は `recommendations` + `chat_search_intents` の組合せで実現

### 4.3.2 主要カラム

#### books
| カラム | 型 | 備考 |
|---|---|---|
| `id` | UUID | 主キー |
| `user_id` | UUID | BookCompass の `auth.users.id` |
| `title` | TEXT | |
| `author` | TEXT | 単一著者表示用 |
| `authors` | TEXT[] | 複数著者 |
| `isbn` | TEXT | |
| `genre_ndc` | TEXT | 日本十進分類 |
| `publisher` | TEXT | |
| `published_year_month` | TEXT | |
| `cover_url` | TEXT | 書影 URL |
| `metadata_fetched_at` | TIMESTAMPTZ | |
| `is_favorite` | BOOLEAN | |
| `status` | TEXT | `'reading'` / `'finished'` / `'paused'` |
| `created_at` | TIMESTAMPTZ | |

#### chat_sessions
主要カラム: `id`, `user_id`, `book_id`（nullable）, `title`, `agent_type`（`'buddy'` / `'mentor'` / `'coach'` / NULL=フリーチャット）, `last_insight_message_id`, `last_search_intent_message_id`

#### chat_messages
主要カラム: `id`, `session_id`, `role`（`'user'` / `'assistant'`）, `content`, `created_at`

#### chat_insights
主要カラム: `id`, `session_id`, `insight_type`（`'interest'` / `'value'` / `'question'` / `'realization'` / `'connection'`）, `parent_id`, `source_book_id`, `tags text[]`, `confidence numeric(3,2)`

#### chat_search_intents（ナレッジコンパスの種）
主要カラム: `id`, `session_id`, `intent_type`（`'similar'` / `'contrast'` / `'expand'` / `'theme'`）, `stage`（`'exploring'` / `'ready'` / `'used'` / `'dismissed'`）, `clarified_axes jsonb`, `suggested_queries text[]`

### 4.3.3 RLS

全テーブルで `auth.uid() = user_id` ポリシーが徹底されている（`mutters` など user_id を持たないテーブルは `session_id` 経由で間接チェック）。anon key からでも、認証済みユーザーの JWT があれば自分のデータのみ取得可能。

### 4.3.4 Edge Functions（ナレッジコンパス相当の機能で使う）

| 関数 | 用途 | Web での想定利用 |
|---|---|---|
| `chat-agent` | チャット対話（ブックバディ/読書メンター/思考コーチの 3 エージェント） | v1 では未使用（Web チャット除外のため） |
| `chat-extract` | チャット履歴から `chat_insights` / `chat_search_intents` を抽出 | v1 では未使用 |
| `search-books` | 書籍検索（NDL Search / openBD をバックエンドに統合） | **Web の「本を追加」フローで使う** |
| `warm-book-metadata` | 書誌メタの先読み/補完 | v1 では未使用 |
| `analyze-book-profile` | ユーザー読書傾向分析バッチ | Web からは叩かない（バッチ専用） |

### 4.3.5 楽天ブックス API について（重要）

- **BookCompass iOS アプリ / Edge Function では楽天 API を使用していない**
- 楽天 API は **ローカル実行の bash スクリプトで、表紙画像未取得本の補完バッチ専用**
- 楽天 API は **アカウント単位で強いレート制限**（1 日 100 件程度）があり、**Web 側から直接叩くのは非推奨**
- Web の書籍追加は **`search-books` Edge Function 経由**（NDL Search / openBD を利用）で統一する

## 4.4 TrainNote Supabase スキーマ（v1 では限定利用）

### 4.4.1 現状の役割

TrainNote の Supabase プロジェクト（`tvqvkvcqkigpmvzrmywl`）は、**AI Coach の LLM 中継レート制限とナレッジ格納専用**であり、トレーニングデータ本体は格納していない。

**存在するテーブル**:
- `ai_coach_request_logs` — LLM 中継のレート制限 / 利用量ログ（**service_role のみアクセス可**、anon/authenticated は revoke 済み）。会話本文は保存しない
- `ai_coach_knowledge_*` — AI Coach のナレッジ埋め込み

**存在しないもの**:
- ユーザー認証（Supabase Auth 未導入）
- `workouts`, `workout_sets`, `body_metrics` などのトレーニングデータテーブル（すべて iOS SwiftData 側）
- `profiles`

### 4.4.2 トレーニングデータは iOS 端末内の SwiftData が正本

TrainNote のトレーニング記録は現状 iOS 端末内 SwiftData に閉じており、クラウド同期されていない。

**SwiftData モデル**（参考、iOS 別リポ `TrainNote/App/Models.swift`）:
- `TrainingSession`（date, exercises: [ExerciseEntry]）
- `ExerciseEntry`（exerciseName, muscleGroup, order, exerciseTypeRaw, bodyweightPercentage, isBothHands, sets: [SetEntry]）
- `SetEntry`（weight, reps, isCompleted, duration?, distance?, calories?）
- `CustomExercise`（ユーザー追加種目のマスタ）

### 4.4.3 Web v1 での扱い方針

**TrainNote 画面を作るが、中身は「近日公開」プレースホルダにする**。理由：

- データ本体がクラウドに無い ⇒ Web から参照する術が無い
- Supabase Auth 未導入 ⇒ ユーザー識別も出来ない
- TrainNote Phase 2（データ基盤クラウド化）完了を待つ必要がある

**v1 では以下を実装**:
- ダッシュボードに TrainNote ウィジェット（「近日公開」表示 + App Store へのリンク）
- `/app/trainnote/` ページ：プロダクト説明 + iOS 版を案内 + 「Phase 2 実装後に対応予定」の告知

**Phase 2 完了後のタスクは本プロジェクトの範囲外**で、後日 TrainNote 側との調整が必要になる。

### 4.4.4 Phase 2/3 の認証・データ設計方針（確定事項）

**認証方針**: **TrainNote も独自の Supabase Auth を導入する**（DoubleHub 認証には寄せない）。理由：

- BookCompass と同じ「独立プロダクト + プロバイダ非依存の連携アクション方式」パターンを全プロダクトで統一
- TrainNote が独立プロダクトとして iOS で提供されている実態と整合
- 将来他プロダクトが増えた場合も同じパターンで拡張できる

**TrainNote 側の計画**（`TrainNote/docs/trainnote-supabase-migration-plan.md`）:

- Phase 2: **独自 Supabase Auth 導入** + `profiles`, `training_sessions`, `training_exercises`, `training_sets`, `body_metrics`, `ai_chat_*` テーブル作成
- Phase 3: DoubleHub 連携用の `export-for-double` API 追加

**Web 側から TrainNote データを扱えるようになるのは Phase 2 完了後**。その時点で BookCompass と同じ「プロバイダ非依存の連携アクション方式」（[§4.5.2](#452-プロジェクト間の連携フロープロバイダ非依存)）で DoubleHub と紐づける。

**Phase 2 着手時期は DoubleHub Web リリース計画と連動する**。

### 4.4.5 ワークアウト種目マスター

- 外部マスターは無し。iOS アプリ内に静的定義 + `CustomExercise` で端末ローカル管理
- Web でワークアウトの選択肢を出す必要がある場合（Phase 2 以降）、`MuscleGroup.defaultExercises` を JSON に書き出して Web 側に同梱するのが最短

## 4.5 認証フロー

### 4.5.1 DoubleHub 本体ログイン（Web アプリのメイン認証）

**採用プロバイダ（v1）**:
1. **Apple でサインイン**（最優先、iOS 版と同じ ID になる）
2. **Google でサインイン**
3. **Email + パスワード**（優先度低）

**ライブラリ**:
- `@supabase/ssr` を採用（App Router 互換。`@supabase/auth-helpers-nextjs` は非推奨）
- `lib/supabase/client.ts`: Client Components から
- `lib/supabase/server.ts`: Server Components から（`cookies()` 経由）

**セッション管理**:
- Cookie ベース（`@supabase/ssr` のデフォルト）
- `storageKey: 'sb-doublehub-auth'` で BookCompass セッションと分離
- 有効期限: Supabase デフォルト（1h アクセストークン + 30d リフレッシュトークン）

**認証ガード**:
- `/app/*` 配下の全ページで要求
- `app/(app)/app/layout.tsx` でサーバー側チェック（dynamic モード時）
- `static` モード時はクライアント側ガード

**iOS ユーザーの初回 Web ログイン**:
- iOS で Apple Sign In 済みのユーザーが Web で Apple Sign In すると、**同じ `auth.users.id`** で認識される（Apple `sub` が同一のため）
- データは Supabase 上に既に存在 ⇒ ログイン直後からダッシュボードにデータ表示
- 特別な同期処理は不要

### 4.5.2 プロジェクト間の連携フロー（プロバイダ非依存）

**前提**: DoubleHub / BookCompass / TrainNote はそれぞれ独立した Supabase プロジェクトを持ち、独立した認証体系を維持する（各プロダクトが独立プロダクトとして成立する思想）。同じユーザーでも各プロジェクトで `auth.users.id` は別 UUID。

#### 基本方針：プロバイダ非依存の連携アクション方式

**Apple `sub` や Email の一致による自動マッピングには依存しない**。理由：

- Apple の **Hide My Email** を使うと、アプリ（bundleID）ごとに異なるリレー Email が発行される → Email ベースのマッピングが破綻する
- Apple ユーザーと Google ユーザーの混在時に対応できない
- プロジェクトによってユーザーが使うプロバイダが異なる可能性がある（DoubleHub は Apple、BookCompass は Email 等）

代わりに、**ユーザーが連携アクション中に各プロジェクトで個別にサインインし、その結果得られた `user_id` を保存する**方式を採用する。これなら Apple / Google / Email のどの組み合わせでも対応できる。

#### 連携フロー（BookCompass を例に）

```
1. ユーザーが DoubleHub Web にログイン済み
   └─ supabaseDoubleHub.auth に DoubleHub のセッション

2. ダッシュボードで「BookCompass と連携する」ボタン

3. 連携案内画面：
   - 「BookCompass で使っているアカウント（Apple / Google / メール）でサインインしてください」
   - プロバイダは DoubleHub と一致しなくて OK

4. ユーザーが BookCompass Supabase クライアントに対してサインイン
   └─ supabaseBookCompass.auth.signInWithOAuth({ provider: 'apple' | 'google' })
      または signInWithPassword({ email, password })
   └─ BookCompass の user_id が返る（bc_user_id）

5. 取得した BookCompass user_id を DoubleHub 側に保存
   └─ INSERT INTO external_source_accounts (user_id, source_type, external_user_key, link_status, metadata)
      VALUES (<DoubleHub user_id>, 'bookcompass', <bc_user_id>, 'active',
              jsonb_build_object('linked_at', now(), 'provider_used', '<apple|google|email>'))

6. 以降、supabaseBookCompass クライアントのセッションを保持したまま BookCompass データにアクセス可能
```

**重要な観点**:
- **プロジェクト間で異なるプロバイダを使っていても問題ない**。DoubleHub は Apple、BookCompass は Google、のような組み合わせでも連携成立
- **連携の真偽は「ユーザー自身が両方にサインインできたという事実」で判定する**。自動マッピングではない
- **Apple Hide My Email 問題を回避できる**（そもそも自動マッピングしないので関係ない）

#### 実装上の注意

- 2 つの Supabase セッションを並行保持するため `storageKey` を別にする（§4.1 参照）
- セッション期限切れ時の再認証 UX（ダッシュボードで「再連携してください」表示）
- DoubleHub ログアウト時は両方のセッションをクリアする
- **誤連携時の救済 UX**: ユーザーが別アカウントで連携してしまった場合に、解除 → 再連携できる導線を用意

#### 連携状態の判定

```typescript
// DoubleHub 側に連携レコードがあるか
const { data: accounts } = await supabaseDoubleHub
  .from('external_source_accounts')
  .select('*')
  .eq('source_type', 'bookcompass')
  .eq('link_status', 'active');

// BookCompass 側のセッションが生きているか
const { data: { session } } = await supabaseBookCompass.auth.getSession();

// external_user_key とセッションの user.id が一致するか（整合性チェック）
const isLinkedAndValid =
  accounts && accounts.length > 0 &&
  session !== null &&
  accounts[0].external_user_key === session.user.id;
```

セッション切れのみなら再サインインを促す、連携レコードがないなら連携フローへ、などの分岐に活用する。

### 4.5.3 TrainNote 連携（v1 では実装しない、Phase 2 で独自 Auth 導入後に実装）

TrainNote は現状 Supabase Auth 未導入のため、連携機能自体が成立しない。

**Phase 2 での方針**: TrainNote も**独自の Supabase Auth を導入**する（DoubleHub 認証には寄せない）。BookCompass と同じ「プロバイダ非依存の連携アクション方式」で DoubleHub と紐づける。

**v1 での対応**:
- 「連携ボタン」は置かず、「TrainNote Web 対応は Phase 2 完了後」の告知のみ
- ただし設計上、Phase 2 完了後に BookCompass と同じパターンで連携機能を追加できるよう、`external_source_accounts.source_type='trainnote'` の扱いは UI レベルで見越しておく（表示のみ対応）

### 4.5.4 複数認証プロバイダの紐づけ（同一プロジェクト内）

DoubleHub 単体で、1 ユーザーが複数のプロバイダ（Apple + Google + Email）を紐づけたい場合は、Supabase 標準の **Identity Linking** 機能を利用する：

```typescript
// ログイン済み状態で Google アカウントも追加
await supabase.auth.linkIdentity({ provider: 'google' });
```

- 同じ `auth.users.id` に `identities` テーブルで複数のプロバイダが関連付けられる
- 次回以降、Apple でも Google でも同じアカウントにログインできる
- 設定画面に「他の認証方法を追加する」UI を用意することで、ユーザーが柔軟に認証方法を増やせる
- **v1 ではこの機能の UI 実装は見送り可**（まず基本認証を確立）。ただしコード上で将来追加しやすい構造にしておく

### 4.5.4 ログアウト・退会

- ログアウト: `supabaseDoubleHub.auth.signOut()` + `supabaseBookCompass.auth.signOut()` → `/` へ
- 退会: `/app/settings/account/` で確認モーダル → RPC `request_own_account_deletion('web')` → 両方サインアウト → `/` へ
  - 注意: BookCompass 側のアカウント削除は別途 iOS アプリ or BookCompass 独自の仕組みが必要（DoubleHub からの削除要求は連携関係のみ解除する）

## 4.6 linked_accounts UX

### 4.6.1 連携の流れ（BookCompass）

```
[ダッシュボード]
  ↓ 「BookCompass と連携する」ボタン
[連携案内画面]
  - BookCompass とは何か説明
  - 連携すると何ができるか（ダッシュボードに本棚表示、Mutter 閲覧等）
  - 「BookCompass で使っているのと同じ Apple ID でサインインしてください」の注意書き
  ↓ 「連携を開始」ボタン
[Apple サインインダイアログ（BookCompass Supabase 宛）]
  ↓ 認証成功
[連携処理]
  - BookCompass user_id を取得
  - external_source_accounts に INSERT
  - metadata に apple_sub と linked_at を記録
  ↓
[連携完了画面]
  - ダッシュボードに戻る誘導
  - ウィジェットが表示される
```

### 4.6.2 連携状態の表示

- **ダッシュボード**: 各プロダクトウィジェットの上部に 🟢 連携中 / ⚪ 未連携 のステータスバッジ
- **TrainNote は「近日公開」**（未連携でも未連携でもない中間状態）
- **設定 > linked_accounts**: 全連携の一覧、解除ボタン

### 4.6.3 連携解除

- `external_source_accounts.link_status` を `'revoked'` に UPDATE
- `supabaseBookCompass.auth.signOut()` を実行し、BookCompass セッションもクリア
- Web 側の表示から該当ウィジェットを非表示に
- **BookCompass 側のデータは削除しない**（iOS で引き続き使えるように）

## 4.7 TypeScript 型定義

### 4.7.1 生成方法

```bash
# DoubleHub
pnpm supabase gen types typescript --project-id <DOUBLEHUB_PROJECT_REF> \
  > lib/supabase/types-doublehub.ts

# BookCompass
pnpm supabase gen types typescript --project-id njwakqmwcuoxqosjjwio \
  > lib/supabase/types-bookcompass.ts
```

TrainNote は v1 では型定義を書かない（データ参照しないため）。Phase 2 以降に追加する。

### 4.7.2 最小限の手書き型（型生成できない環境向け）

[04-data-layer.md の前バージョン](#)に記載の手書き型に加え、BookCompass 側の型を追加：

```typescript
// lib/supabase/types-bookcompass.ts
export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string | null;
  authors: string[];
  isbn: string | null;
  genre_ndc: string | null;
  publisher: string | null;
  published_year_month: string | null;
  cover_url: string | null;
  metadata_fetched_at: string | null;
  is_favorite: boolean;
  status: 'reading' | 'finished' | 'paused';
  created_at: string;
}

export interface Mutter {
  id: string;
  user_id: string;
  book_id: string | null;
  content: string;
  created_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  book_id: string | null;
  title: string;
  agent_type: 'buddy' | 'mentor' | 'coach' | null;
  last_insight_message_id: string | null;
  last_search_intent_message_id: string | null;
  created_at: string;
}
```

## 4.8 Repository パターン

```
lib/repositories/
├── doublehub/
│   ├── todoRepository.ts          ← list(), create(), update(), softDelete()
│   ├── memoRepository.ts
│   ├── profileRepository.ts
│   └── externalSourceAccountRepository.ts
├── bookcompass/
│   ├── bookRepository.ts          ← list(), create(), update(), delete()
│   ├── mutterRepository.ts
│   ├── chatSessionRepository.ts   ← 閲覧のみ（v1 ではチャット除外のため）
│   └── searchBooksRepository.ts   ← search-books Edge Function 呼び出し
└── trainnote/
    └── (v1 では空。Phase 2 対応時に追加)
```

各 Repository は対応する Supabase クライアント（`supabaseDoubleHub` or `supabaseBookCompass`）を DI で受け取る。

## 4.9 CORS と セキュリティ

- **Supabase ダッシュボード側の設定**（後続セッション担当）:
  - 各プロジェクトで Allowed Origins に `https://*.pages.dev`, `https://doublehub.jp` を追加
  - Email / Apple OAuth プロバイダの設定
  - Email Templates のカスタマイズ（日本語化）
- **Web 側の対応**:
  - anon key は公開されても問題ないキー。ただし `.env.local` に入れて git 管理対象外
  - `NEXT_PUBLIC_` プレフィックスで公開してよい
  - service_role key は **絶対に Web 側で使わない**

## 4.10 要確認事項（データ層）

OPEN_QUESTIONS.md を参照。高優先度の大部分は判明済み。残るのは：

- [ ] Apple Sign In の Service ID と Team ID（Supabase Auth 各プロジェクト設定用）
- [ ] Google OAuth Client ID
- [ ] 2 つの Supabase セッションを並行保持する際の Cookie / LocalStorage の具体的な書き込み方（`@supabase/ssr` の API を確認して実装）

---

**次に読む**: [05-conventions.md](./05-conventions.md)
