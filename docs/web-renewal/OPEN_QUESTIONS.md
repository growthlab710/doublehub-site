# 要確認事項リスト（Open Questions）

本プロジェクト期間中に発見した「依頼者または後続セッションの判断が必要な項目」を集約する。

5 日エージェントは、作業中に新しい疑問が出たら即座にここへ追記すること。推測で進めない。

---

## 🔴 高優先度（ブロッカーになり得るもの）

### データ層

- [x] **BookCompass Supabase プロジェクトの URL と anon key**（Cloudflare Pages での動作検証に必要）
    - URL: `https://njwakqmwcuoxqosjjwio.supabase.co`（iOS 側 `BookCompass/Info.plist` および `scripts/*.sh` に公開済み）
    - anon key: iOS リポジトリの `BookCompass/Config/Secrets.xcconfig`（gitignore 済み）にユーザーが保管。Supabase ダッシュボード > Settings > API からも取得可能
    - project ref: `njwakqmwcuoxqosjjwio`
- [x] **TrainNote Supabase プロジェクトの URL と anon key**
    - URL: `https://tvqvkvcqkigpmvzrmywl.supabase.co`
    - project ref: `tvqvkvcqkigpmvzrmywl`
    - anon key: iOS 側は scheme 環境変数 `AICOACH_SUPABASE_ANON_KEY` で受け渡し（`AICOACH_LLM_BACKEND=supabase_proxy` とセットで使う）。Supabase ダッシュボード > Settings > API からも取得可能
    - 重要: TrainNote 側 Supabase は現状 **AI Coach の LLM 中継専用**で、PostgREST 経由のデータ参照は行っていない。Web で「TrainNote 領域」を表示する場合、現時点では参照できる Supabase データはほぼ無い（後述）
    - **今後の計画**: 現在 Phase 1（LLM 中継のサーバー化）が完了済み。Phase 2 で **ユーザーアカウント（Supabase Auth）導入 + トレーニングデータ本体のクラウド同期**を予定（`profiles`, `training_sessions`, `training_exercises`, `training_sets`, `body_metrics`, `ai_chat_*` 等）。Phase 3 で DoubleHub 連携用の `export-for-double` API を追加予定。詳細は [docs/trainnote-supabase-migration-plan.md](../../../../../TrainNote/docs/trainnote-supabase-migration-plan.md)
    - **Web 連携を本格化させたいタイミング = TrainNote Phase 2 の優先度を上げたいタイミング**になるので、DoubleHub Web の TrainNote 連携スコープと Phase 2 の着手時期は連動して検討する必要がある
- [x] **BookCompass のテーブル構造**（`books`, `book_notes`, `knowledge_compass_recommendations` 等の推測スキーマの実体）
    - 実際のテーブル名は推測と異なる。マイグレーションは `BookCompass/supabase/migrations/` に集約。主要テーブル:
        - `books` — ユーザー蔵書。主要カラム: `id uuid`, `user_id uuid`, `title`, `author`, `authors text[]`, `isbn`, `genre_ndc`, `publisher`, `published_year_month`, `cover_url`, `metadata_fetched_at`, `is_favorite`, `status`（`reading`/`finished`/`paused`）, `created_at`
        - `book_metadata_cache` — ISBN 単位の書誌メタキャッシュ。`cover_status`, `cover_checked_at` 等を持つ（`20260307170000_add_book_metadata_cover_warmup_fields.sql`）
        - `profiles` — `auth.users.id` を参照するユーザープロファイル（多数のテーブルが `profiles(id)` を FK）
        - `chat_sessions` — `user_id`, `book_id`（nullable）, `title`, `agent_type`（`buddy`/`mentor`/`coach`/NULL=フリーチャット）, `last_insight_message_id`, `last_search_intent_message_id`
        - `chat_messages` — `session_id`, `role`（`user`/`assistant`）, `content`, `created_at`
        - `chat_insights` — `insight_type`（`interest`/`value`/`question`/`realization`/`connection`）, `parent_id`, `source_book_id`, `tags text[]`, `confidence numeric(3,2)`
        - `chat_search_intents` — `intent_type`（`similar`/`contrast`/`expand`/`theme`）, `stage`（`exploring`/`ready`/`used`/`dismissed`）, `clarified_axes jsonb`, `suggested_queries text[]`
        - `chat_daily_usage` — 日次チャット回数カウンタ（課金制限用）
    - Swift 側モデル定義の一覧: [BookCompass/Core/Models/](../../../../BookCompass/BookCompass/BookCompass/Core/Models/)（`Book`, `BookProfile`, `ChatSession`, `Mutter`, `Recommendation`, `SearchBooks`, `Subscription`, `UserBookTrait`, `UserBookTraitScore`, `UserProfile` ほか）
    - 注意: 想定していた `book_notes` / `knowledge_compass_recommendations` は存在しない。メモ機能は `mutters` テーブル、レコメンドは `recommendations` 系で扱う
    - 全テーブルに RLS が有効で、`auth.uid() = user_id` をポリシーとする方式が徹底されている
- [x] **TrainNote のテーブル構造**（`workouts`, `workout_sets` 等の推測スキーマの実体）
    - **想定していた `workouts` / `workout_sets` テーブルは Supabase 上に存在しない**。TrainNote のトレーニング記録は iOS 端末内の **SwiftData が正本**で、現状クラウド同期されていない（[supabase/README.md](../../../../../TrainNote/supabase/README.md), [docs/trainnote-supabase-migration-plan.md](../../../../../TrainNote/docs/trainnote-supabase-migration-plan.md)）
    - 現存する Supabase テーブル（`supabase/migrations/` 配下、すべて AI Coach 関連）:
        - `ai_coach_request_logs` — LLM 中継のレート制限 / 利用量ログ。`client_hash`, `request_type`（`chat_reply`/`supplement`）, `provider_id`, `model_id`, `success`, `latency_ms`, `input_chars`, `output_chars` などを保存。**会話本文は保存しない**。`service_role` のみアクセス可、anon/authenticated は revoke 済み
        - `ai_coach_knowledge_*` — AI Coach のナレッジ埋め込み（`20260407000000_ai_coach_knowledge_embeddings.sql`, `20260407100000_ai_coach_knowledge_add_motivation.sql`）
    - SwiftData モデル定義（[App/Models.swift](../../../../../TrainNote/App/Models.swift)）:
        - `TrainingSession` — `syncID: UUID?`, `date: Date`, `exercises: [ExerciseEntry]`
        - `ExerciseEntry` — `exerciseName`, `muscleGroup`（enum raw value）, `order`, `exerciseTypeRaw`（`weighted`/`bodyweight`/`cardio`）, `bodyweightPercentage`, `isBothHands`, `sets: [SetEntry]`
        - `SetEntry` — `weight: Double`, `reps: Int`, `isCompleted`, `order`, 有酸素用に `duration: Int?`（分）, `distance: Double?`（km）, `calories: Int?`
        - `CustomExercise` — ユーザー追加のカスタム種目マスタ（`name`, `muscleGroup`, `order`, `isPreset`, `exerciseType`, `bodyweightPercentage`）
    - Phase 2 計画では `profiles` / `training_sessions` / `training_exercises` / `training_sets` / `body_metrics` / `ai_chat_*` を Supabase に複製予定だが、未着手（[trainnote-supabase-migration-plan.md](../../../../../TrainNote/docs/trainnote-supabase-migration-plan.md) §3.2）
    - **Web 側の影響**: TrainNote データを Web で表示するには Phase 2（データ基盤クラウド化）の完了を待つか、Web 用に別途エクスポート機能を追加する必要がある
- [x] **各プロジェクトが DoubleHub と同じ `auth.users.id` を共有しているか**（linked_accounts 実装方針に直結）
    - BookCompass は**独立した Supabase プロジェクト**（`njwakqmwcuoxqosjjwio`）で、DoubleHub とは `auth.users.id` を**共有していない**
    - 認証方式: Apple Sign In（`signInWithIdToken`）、匿名サインイン（`signInAnonymously`）、Email/Password の3系統（[SupabaseService.swift:486-518](../../../../BookCompass/BookCompass/BookCompass/Core/Services/SupabaseService.swift#L486-L518)）
    - linked_accounts 方針: DoubleHub 側で「同一 Apple ID → 別プロジェクトの user_id」をマッピングするテーブルが必要。Web でログインしたユーザーが自分の BookCompass データを見るには、Apple Sign In の共通 `sub` などをキーにマッピングする設計が前提になる
    - **TrainNote も独立した Supabase プロジェクト**（`tvqvkvcqkigpmvzrmywl`）。さらに現状 **TrainNote 側は Supabase Auth 自体を導入していない**（LLM 中継のレート制限は端末識別子ベースの `client_hash` で実装）。よって `auth.users.id` の共有という議論以前に、TrainNote 側にユーザーアカウント概念が無い。Phase 2（データ基盤クラウド化）で Supabase Auth を導入予定（[supabase/README.md](../../../../../TrainNote/supabase/README.md) 「運用上の未着手: Supabase Auth 導入後の JWT 検証」）
    - linked_accounts 設計上の意味: TrainNote の Web 連携は、まず TrainNote 側に Auth を入れた後に DoubleHub とのマッピングを考える 2 段階になる。BookCompass よりさらに先の話

### 認証

- [ ] **Apple Sign In の Service ID と Team ID**（Supabase Auth プロバイダ設定に必要、ただし Supabase ダッシュボード側設定のため後続セッションで対応可）
- [ ] **Google OAuth Client ID** （同上）

---

## 🟡 中優先度（仮実装で進めるが後日確定したい）

### デザイン

- [x] **BookCompass のブランドカラー HEX 値**（iOS 版から正確な値を取りたい）
    - 定義元: [BookCompass/UI/Theme/AppColor.swift](../../../../BookCompass/BookCompass/BookCompass/UI/Theme/AppColor.swift)
    - primary（ダークネイビー、ナビ/見出し/アイコン）: `#1B2B4A`
    - accent（ウォームアンバー、ボタン/XP バー）: `#E8911A`
    - background（ウォームクリーム、画面背景）: `#F7F2E8`
    - surface（カード/シート面）: `#FFFFFF`
    - textPrimary: `#1B2B4A`（primary と同色）
    - textSecondary（補助テキスト/タイムスタンプ）: `#9BA3B5`
    - genreTagBackground（タグ背景）: `#EDE5D0`
    - genreTagForeground（タグテキスト）: `#6B5C3E`
    - destructive（破壊的操作）: `#D83B3B`
    - unexplored（未探索/無効グレー）: `#C7C9CD`
- [x] **TrainNote のブランドカラー HEX 値**
    - 全体トーンは「クール・サイバー / HUD」系のダークテーマ。BookCompass のウォームクリームとは正反対の方向性
    - サイバーUIテーマ定義: [App/CyberTheme.swift](../../../../../TrainNote/App/CyberTheme.swift)
        - cyan（メインアクセント、HUD/ボーダー/数値）: `#00E5FF`
        - emerald（セカンダリ、パルス/成功）: `#00FF99`
        - amber（警告）: `#FFBF00`
        - danger（破壊的操作 / アラート）: `#FF4059`
        - bg0（最暗背景）: `#0D0D14`
        - bg1（カード背景）: `#171A24`
        - bg2（インナーカード背景）: `#212430`
        - border: `rgba(255,255,255,0.08)`
        - textDim（補助テキスト）: `rgba(255,255,255,0.45)`
        - textFaint（最弱テキスト）: `rgba(255,255,255,0.25)`
    - 部位カラー（カレンダードット / グラフ凡例 / バッジ）— [App/Models.swift](../../../../../TrainNote/App/Models.swift) `MuscleGroup.color`:
        - 胸 chest: `#FF6B6B`
        - 背中 back: `#4DABF7`
        - 脚 legs: `#69DB7C`
        - 肩 shoulder: `#FFD43B`
        - 腕 arms: `#CC5DE8`
        - 腹筋 abs: `#A87B5D`
        - 有酸素 cardio: `#20C997`
    - 注意: `CyberTheme.swift` 側にも別系統の部位カラー（`MuscleGroup.cyberColor`）があり、こちらはバッジ/グロー演出用にやや彩度を上げた値になっている。Web ではどちらを採用するか要判断（カレンダー等は `Models.swift` 側、HUD 演出は `CyberTheme` 側、というのが iOS 側の使い分け）
- [ ] **DoubleHub 本体 LP の Hero ビジュアル**（既存 `DoubleHub-Concept.png` を使うか、新規作成か）
- [ ] **ロゴの SVG 版**（現状 JPG のみ、SVG 化したい）
- [ ] **OGP 画像の統一テンプレート**（各ページ / 各ブログ記事で固有画像を用意するか、共通テンプレに自動挿入か）

### コンテンツ

- [ ] **DoubleHub 本体 LP の文言**（既存 `index.html` の Ecosystem タブを独立ページ化する際のキャッチコピー・説明文）
- [ ] **Newsletter の MailerLite Form ID / Embed Code**
- [ ] **料金プランの Web 表示**（iOS 版は App Store 準拠、Web で独自に表示する場合の価格・文言）

### 機能

- [x] **ナレッジコンパス**（BookCompass）の API 仕様
    - BookCompass 本体は Supabase Postgres 直アクセス（PostgREST）＋ Supabase Edge Functions（Deno）で構成されている。REST API は独自定義していない
    - Edge Functions（`BookCompass/supabase/functions/` 配下）:
        - `chat-agent` — チャット対話（ブックバディ/読書メンター/思考コーチの 3 エージェント）
        - `chat-extract` — チャット履歴から `chat_insights` / `chat_search_intents` を抽出
        - `search-books` — 書籍検索（NDL Search / openBD をバックエンドに統合）
        - `warm-book-metadata` — 書誌メタの先読み/補完
        - `analyze-book-profile` — ユーザーの読書傾向分析ジョブ（`scripts/batch_analyze_book_profiles.sh` から叩かれる）
    - Web 側で「ナレッジコンパス相当の機能」を実装する場合は、同じ Edge Function を anon key 経由で叩く想定でよい（RLS が効くため、認証済みユーザー以外のデータは見えない）
    - 参考: [LLM_SYSTEM_DESIGN_OVERVIEW.md](../../../../BookCompass/BookCompass/LLM_SYSTEM_DESIGN_OVERVIEW.md), [AGENT_CHAT_DESIGN.md](../../../../BookCompass/BookCompass/BookCompass/AGENT_CHAT_DESIGN.md)
- [x] **楽天ブックス API 連携**が BookCompass のどこで動いているか（Web 側で本追加時に利用するか、BookCompass iOS 側の Edge Function 経由か）
    - **iOS アプリ本体および Edge Function では楽天 API を使用していない**。iOS 側の書籍検索は NDL Search / openBD が主
    - 楽天 API は**ローカル実行の bash スクリプト**（[scripts/supplement-covers.sh](../../../../BookCompass/BookCompass/scripts/supplement-covers.sh)）で、表紙画像未取得本の **カバー画像補完バッチ専用**
    - 重要な制約: 楽天 API はアカウント単位で強い累積レート制限があり、1 日 100 件程度が実運用の上限。詳細は [RAKUTEN_API_NOTES.md](../../../../BookCompass/BookCompass/BookCompass/RAKUTEN_API_NOTES.md)
    - **Web 側での扱い方針**: Web の書籍追加フローで楽天 API を直に叩くのは非推奨（レート制限を食いつぶし、iOS 側のカバー補完が動かなくなる）。Web でも NDL Search / openBD、または BookCompass の `search-books` Edge Function 経由にするのが安全
- [x] **TrainNote のワークアウト種別マスターデータ**の在り処
    - **外部マスターサービスやデータベーステーブルは存在しない**。すべて iOS アプリ内に静的定義 + 端末ローカル DB
    - デフォルト種目（プリセット）: [App/Models.swift](../../../../../TrainNote/App/Models.swift) の `MuscleGroup.defaultExercises`（部位ごとの配列としてハードコード）
        - 胸: ベンチプレス / インクラインベンチ / ダンベルフライ / ケーブルクロスオーバー / チェストプレス
        - 背中: ラットプルダウン / デッドリフト / ベントオーバーロウ / シーテッドロウ
        - 脚: スクワット / レッグプレス / レッグカール / カーフレイズ
        - 肩: ショルダープレス / サイドレイズ / フロントレイズ / リアレイズ
        - 腕: バーベルカール / ハンマーカール / トライセプスプレスダウン / スカルクラッシャー
        - 腹筋: クランチ
        - 有酸素: ランニング / ウォーキング / サイクリング / 水泳 / ローイング / HIIT / 縄跳び
    - ユーザー追加種目: SwiftData の `CustomExercise` モデル（端末ローカルのみ、Supabase 同期なし）
    - 種目タイプ（`ExerciseType`）: `weighted`（重量×rep）/ `bodyweight`（体重×換算%×rep）/ `cardio`（距離・時間）
    - **Web 側で同等のマスターを使う場合**: `MuscleGroup` enum と `defaultExercises` を JSON に書き出して同梱するのが最も速い。共通化したくなったら、TrainNote Phase 2 で `exercise_master` 相当のテーブルを Supabase 側に作る議論を起こす流れになる

---

## 🟢 低優先度（v1 では見送り可能）

- [ ] **v2 以降の多言語対応**（英語版の優先度）
- [ ] **Stripe 等の Web 決済導入時期**
- [ ] **Web でのチャット機能対応**（`gemini-proxy` Edge Function との連携）
- [ ] **Web 版独自機能**（PC で便利な一括操作、CSV エクスポート等）
- [ ] **カスタムドメイン `app.doublehub.jp` 分離のタイミング**

---

## 📋 作業手順の判断が必要

- [ ] **GitHub Pages から Cloudflare Pages への本番切替タイミング**（本プロジェクト後、ユーザー都合の良いタイミング）
- [ ] **Search Console の「アドレス変更」申請のタイミング**（旧 HTML → 新パス移行に伴う）
- [ ] **iOS 側の linked_accounts 対応**（Web 版がリリースされる前に iOS 側で何を対応するか）

---

## 追記時のフォーマット

```markdown
### {カテゴリ}
- [ ] **{質問の見出し}**: {背景・補足}。回答先: {誰が決めるか}
```

回答済みになったら `[ ]` → `[x]` に変え、回答内容を下にインデントで残す。

---

## 🆕 Day 4 実装中に新規判明した不明点（2026-04-19 追記）

### データ層

- [ ] **DoubleHub 本体 `profiles` テーブルに `auth.users` 作成時の自動 INSERT トリガーがあるか**: 現状の ProfileCard 実装はユーザーが「保存」ボタンを押した瞬間に upsert する（`onConflict: 'id'`）。トリガーがあるなら `insert` を試みず `update` でも良い。ユーザーアカウント初回ログイン時の挙動を env 投入後に動作確認して確定したい
- [ ] **`request_account_deletion` RPC のシグネチャと挙動**: Settings 画面にプレースホルダ UI を置いているが、関数が存在するか / 引数は `Args: Record<string, never>` で良いか / 成功時に自動的に `auth.signOut()` されるか、未確定。Day 5 以降で実動作確認して UI を完成させる必要がある
- [ ] **DoubleHub `todos` の `order_index` 設計**: 新規 Todo 作成時に `null` で insert しているが、ドラッグ並び替え UI を将来足す際に `order_index` の型（`bigint` / `numeric`）と空き番運用（間隔 1024 で挿入等）が必要
- [ ] **DoubleHub `memos` の `tags` カラム**: `text[]` 想定で実装しているが、実際のスキーマが `jsonb` / `text` カンマ区切りの可能性。env 投入後に `information_schema.columns` で確認して必要なら型を合わせる

### BookCompass 連携

- [ ] **`search-books` Edge Function の input/output 仕様**: 現在は `{ q: query }` を渡して `{ books?, items?, results?: any[] }` を受ける楽観的実装。BookCompass 本家の signature（引数名、ページング、エラーコード）を確認したい
- [ ] **BookCompass の `books.status` カラム値**: UI で `reading / want / done / dropped` の 4 値を想定したが、スキーマでは `reading / finished / paused` の 3 値（OPEN_QUESTIONS §データ層参照）。UI フィルタの文言を揃えるか、DoubleHub Web 側で独自ラベルに写像するかを要決定
- [ ] **BookCompass の「本棚の書誌メタ」取得順序**: `books.cover_url` が空の場合に `book_metadata_cache` を結合する必要があるかを確認。現状は `books` 単体 SELECT のみ
- [ ] **匿名サインイン / メール OTP / Apple の優先順位**: BookCompass は 3 方式を持つが、Web の連携フローでは現在 Email OTP のみ。Apple Sign In を Web でも揃えるかどうか

### TypeScript / 型生成

- [ ] **Supabase 正式型生成への移行タイミング**: 現状は Day 4 の回避策として Repository 層で書き込み時に `as never` キャスト。`supabase gen types typescript --project-id <ref> --schema public` で生成した型に差し替えれば完全型化できる。env 投入（= project ref 確定）後、HANDOVER 手順の一環として置き換えたい

### 認証 / UX

- [ ] **`/app/login/` の OAuth リダイレクト先**: `redirectTo: ${origin}/app/` で AppShell に戻す設計だが、Supabase ダッシュボード側で Redirect URLs に `https://doublehub.jp/app/*` を登録する必要がある（env 投入時のチェックリストに追加）
- [ ] **static モードでのアカウント削除フロー**: static ビルド（GitHub Pages）は Server action 不可。Account deletion は Edge Function 経由で叩く形になるが、Cloudflare Pages に移行するまでは「dynamic モード時のみ動作、static 時は非活性」という UX 仕様を明示する必要がある
