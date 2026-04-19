# 07. 納品方法と引き継ぎ手順

> **本ドキュメントは 5 日エージェント向けの必読指示**。作業開始前に通読し、作業完了時に本ドキュメントの内容を踏まえた `HANDOVER.md` を生成すること。

## 7.1 5 日エージェントの運用前提

本プロジェクトを担当する 5 日エージェントは、以下の制約下で作業する：

- **クラウド環境で動作している**。依頼者のローカル環境には直接アクセスできない
- **作業の受け渡しは「フォルダ丸ごと」**で行われる。依頼者が `site/doublehub-site/` フォルダを ZIP 等に固めてエージェントに渡し、エージェントは作業後のフォルダ一式を成果物として返す
- **依頼者は手作業で既存フォルダを置き換える**。この置き換えが事故らないように、エージェントは明確な引き継ぎ資料を残す必要がある
- **親リポジトリ（iOS アプリコード等）には一切アクセスできない**。本ドキュメント群で参照している `../BookCompass/...` 等の相対パスは **iOS 別リポジトリ** のため、エージェントからは開けない

## 7.2 iOS リポジトリ参照の取り扱い

`04-data-layer.md` などで以下のようなパス参照がある：

- `../../../../BookCompass/BookCompass/BookCompass/...`
- `../../../../../TrainNote/App/Models.swift`
- `BookCompass/supabase/migrations/` 等

**これらはすべて iOS 別リポジトリへの参照**で、エージェントは開けない。該当情報はドキュメント本文中の抜粋・要約で十分実装を進められるよう記述してあるが、足りない情報があれば **推測せず `OPEN_QUESTIONS.md` に追記する**こと。

## 7.3 納品物（エージェントが提供すべき成果物）

作業完了時、以下のフォルダ構成で成果物を返すこと。

```
site/doublehub-site/                    ← 既存フォルダを Next.js 化したもの
├── app/                                ← 新規：Next.js App Router
├── components/                         ← 新規：React コンポーネント
├── lib/                                ← 新規：ユーティリティ・Supabase・Repository
├── content/blog/                       ← 新規：既存 20 記事を MDX 化
├── public/                             ← 既存画像・アセットを移行
│   ├── _redirects                      ← Cloudflare Pages 用 301
│   ├── CNAME                           ← ★保持必須：既存ファイル
│   ├── robots.txt                      ← ★保持必須：既存ファイル
│   ├── llms.txt                        ← ★保持必須：既存ファイル
│   ├── google060a06d7f9469fbc.html     ← ★保持必須：Search Console 認証
│   ├── manifest.json, favicon.png, icon-*.png, apple-touch-icon.png ← ★保持必須
│   └── images/                         ← 既存画像を最適化配置
├── scripts/                            ← 新規：ビルドスクリプト類
├── docs/
│   └── web-renewal/                    ← ★保持必須：本ドキュメント群
│       ├── README.md                   ← 既存（変更不可）
│       ├── 01-*.md〜07-*.md            ← 既存（変更不可）
│       ├── OPEN_QUESTIONS.md           ← ★エージェントが更新する
│       ├── DAILY_LOG.md                ← ★エージェントが新規作成する
│       └── HANDOVER.md                 ← ★エージェントが新規作成する（最重要）
├── .env.example                        ← 新規
├── .eslintrc, .prettierrc, tsconfig.json, tailwind.config.ts, next.config.mjs ← 新規
├── package.json, pnpm-lock.yaml        ← 新規
└── README.md                           ← 既存を更新（開発手順追記）
```

**ビルド生成物は含めない**（`.next/`, `node_modules/`, `out/`）。

## 7.4 HANDOVER.md に必ず含める項目

エージェントは作業完了時に `docs/web-renewal/HANDOVER.md` を作成し、以下を必ず含めること。**依頼者（人間）がこれを読んで手作業でファイル置き換えを行う前提**で書くこと。

### 7.4.1 作業サマリ

- 実装した機能の一覧と動作検証状況
- 未実装 / 仮実装の機能とその理由
- 既知のバグ・制約
- Lighthouse スコア（主要ページ 5 つ以上）
- `pnpm lint` / `pnpm build` / `pnpm build:export` の実行結果

### 7.4.2 【最重要】ファイル置き換え手順（依頼者向け）

依頼者が手作業で既存フォルダを置き換える際に従うべき手順を、**省略せず具体的に**記述すること。

#### 置き換え時に保持すべきもの（既存フォルダから取り出す）

- `.git/`（Git リポジトリ履歴。**これが無くなると履歴消失**）
- `.gitignore`（エージェントが新版を提供した場合は差分を確認してマージ）
- Search Console / GitHub Pages 設定:
  - `CNAME`
  - `robots.txt`
  - `llms.txt`
  - `google060a06d7f9469fbc.html`
- PWA / ファビコン:
  - `manifest.json`
  - `favicon.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
- 本ドキュメント群（`docs/web-renewal/` の既存 `00`〜`07` ファイル）

エージェントはこれらを成果物にも含めて返す想定だが、**差分が発生する可能性を考慮して依頼者が照合できるように**、「既存と同じ内容にしているつもり」のファイルをリスト化すること。

#### 推奨される置き換え手順

HANDOVER.md には以下のような手順を **依頼者が迷わず実行できるレベルの具体性で** 記述すること：

```markdown
### 置き換え手順（推奨）

1. 既存 site/doublehub-site/ の状態を確認
   cd site/doublehub-site
   git status                    # クリーンな状態か確認
   git checkout -b feature/nextjs-renewal   # 作業ブランチ作成

2. エージェント成果物（生成されたフォルダ）を一時ディレクトリに展開

3. 保持対象のファイルを既存フォルダから取り出して退避
   （具体的なファイルリストは上記参照）

4. 既存フォルダの中身を削除（.git は残す）
   cd site/doublehub-site
   find . -mindepth 1 -not -path './.git*' -delete
   # 注意: 上記は強力なので、実行前に pwd で場所を確認

5. エージェント成果物を site/doublehub-site/ にコピー

6. 退避していた保持対象を戻す（エージェント成果物のものと内容を照合）

7. 差分確認とローカル検証
   git status
   git diff
   pnpm install
   pnpm build
   pnpm dev    # http://localhost:3000 で動作確認

8. コミット・push
   git add .
   git commit -m "feat: Webサイトを Next.js 化"
   git push origin feature/nextjs-renewal

9. Cloudflare Pages プレビューで動作確認後、main にマージ
```

#### 置き換え時のチェックリスト

HANDOVER.md には **依頼者向けチェックリスト** を含めること。例：

```markdown
- [ ] .git/ が消えていない
- [ ] CNAME の内容が "doublehub.jp" のまま
- [ ] robots.txt と sitemap.xml の内容が期待通り
- [ ] google*.html が残っている（Search Console 認証）
- [ ] manifest.json, favicon, icon-* が残っている
- [ ] docs/web-renewal/ の README.md〜07-*.md が残っている
- [ ] pnpm install がエラーなく完走する
- [ ] pnpm build がエラーなく完走する
- [ ] pnpm build:export がエラーなく完走する
- [ ] pnpm dev で http://localhost:3000 が表示される
- [ ] /privacy, /support のコンテンツが App Store 登録と矛盾しない
```

### 7.4.3 トラブルシュート（依頼者向け）

HANDOVER.md に以下を含めること：

- **ビルドエラーが出た時の診断フロー**（例: `pnpm install` 再実行、Node バージョン確認、`.env.local` の値確認）
- **ページが表示されない時の原因候補**（例: `next.config.mjs` の `basePath` 設定、`_redirects` の位置）
- **Cloudflare Pages でデプロイが失敗した時の見るべき場所**

### 7.4.4 Cloudflare Pages プレビュー環境情報

- プレビュー URL（`*.pages.dev`）
- リポジトリ連携の設定内容（ビルドコマンド、出力ディレクトリ、環境変数）
- 使用している開発用 Supabase anon key の素性（「依頼者から受領したもの」等、実際の値は書かない）
- `noindex` メタタグの設置状況

### 7.4.5 後続セッション（Claude）への引き継ぎ事項

**依頼者と別の AI エージェント（後続セッション）が、この成果物を受け取って次のフェーズを進める**想定で、以下を記述：

- Supabase ダッシュボードで後続セッションが設定すべき項目
  - OAuth プロバイダ（Apple, Google）の設定
  - Allowed Origins / CORS
  - Email テンプレート
- 本番環境変数として Cloudflare Pages に投入すべき値（キー名リストのみ、実際の値は書かない）
- DNS 切替手順の概要
- iOS 側で対応が必要な項目（あれば）
- Web v2 以降で実装予定の機能（BookCompass 連携を含む場合）

### 7.4.6 要確認事項リスト全体

`OPEN_QUESTIONS.md` を別途更新しつつ、`HANDOVER.md` には「本プロジェクト中に発見した未解決の質問」を一度ここに列挙してサマリするのが親切。

### 7.4.7 推奨される次のステップ

依頼者と後続セッションが取るべき次のアクションを、**日数 or 所要時間のざっくり見積もりとともに**提示：

- 例: 「Cloudflare Pages のリポジトリ連携設定（依頼者、所要 15 分）」
- 例: 「Supabase ダッシュボードでの OAuth プロバイダ設定（後続セッション補助、所要 30 分）」
- 例: 「Apple Developer での Service ID 作成（依頼者、所要 30 分）」
- 例: 「DNS 切替（依頼者、所要 10 分、その後反映まで最大 24 時間）」

## 7.5 成果物の受け渡し方法

エージェントは以下のいずれかの方法で成果物を返すこと：

- フォルダ一式を ZIP に固めて依頼者に渡す
- 代替として、ファイル一覧と各ファイルの内容をテキストとして出力する（依頼者がコピペで復元できる形式）

いずれの場合も、**エントリポイントは `HANDOVER.md`**。依頼者はこのドキュメントを最初に読む。

## 7.6 DAILY_LOG.md の書き方

毎日の終わりに `DAILY_LOG.md` に以下を追記：

```markdown
## Day N: YYYY-MM-DD

### 完了したこと
- ...

### 未完了・持ち越し
- ...

### 発見した問題 / ブロッカー
- ...

### 翌日の計画
- ...

### 質問事項（OPEN_QUESTIONS.md に追加したもの）
- ...
```

これにより、依頼者は毎日の進捗を追える。

## 7.7 作業完了の最終チェック

`HANDOVER.md` の末尾に、エージェント自身が確認した以下のチェックリストを含めること：

```markdown
## 作業完了チェック（エージェント自己申告）

- [ ] すべての README 指示を読んだ
- [ ] 06-tasks.md の Day 1〜5 のタスクをすべて完了した
- [ ] docs/web-renewal/ 配下の既存ファイル（00〜07）を変更していない
- [ ] CNAME, robots.txt, llms.txt, google*.html を成果物に含めた
- [ ] manifest.json, favicon, icon-* を成果物に含めた
- [ ] pnpm lint / build / build:export がすべて通る
- [ ] Lighthouse スコアを記録した
- [ ] Cloudflare Pages プレビューで認証フローを検証した
- [ ] OPEN_QUESTIONS.md を最新化した
- [ ] DAILY_LOG.md を完成させた
- [ ] HANDOVER.md を完成させた（本セクションを含む）
```

---

**本ドキュメントに書かれた指示は、5 日エージェントの必須守備範囲。逸脱する場合は HANDOVER.md に理由を明記すること。**
