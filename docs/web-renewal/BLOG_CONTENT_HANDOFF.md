# BLOG_CONTENT_HANDOFF — DoubleHub ブログ運用引き継ぎ

ブログ運用のカテゴリ方針、初動記事、HubWallet の取り扱い、各プロダクト 2 本目以降の候補トピックを共有するための引き継ぎドキュメント。後続セッションで記事追加するエージェントは、まずこれを読んでから記事を書き始めること。

---

## カテゴリ方針（ハイブリッド）

ブログのカテゴリ運用は **「問題・領域ベース（プライマリ） × 各記事内でプロダクトを明示（セカンダリ）」** のハイブリッドで進める。

### 既存カテゴリ（そのまま維持）

- `AIニュース`
- `AI情報`
- `AI×習慣化`
- `ライフデータ×自己理解`
- `個人開発×AI`
- `ブログ`

### プロダクト寄り初動記事で追加した新カテゴリ

- `筋トレ` → TrainNote 関連
- `読書` → BookCompass 関連
- `自己理解AI` → DoubleHub 関連

将来的に HubWallet 記事を追加する際は `家計` を新カテゴリとして使う想定。

### 実装上の注意

- BlogExplorer (`src/app/(marketing)/blog/_components/BlogExplorer.tsx`) は `getCategoryCounts()` から件数を自動集計する。新カテゴリの追加は frontmatter の `category` を書くだけで反映される（コード変更不要）。
- 各記事は frontmatter で 1 カテゴリ、複数 `tags` を持つ。プロダクト名は tags 側に入れることで、領域カテゴリとプロダクトの両軸で発見性を上げる。
- カード／本文でプロダクト導線（`/products/trainnote/` など）を貼ることで、領域カテゴリで来た読者をプロダクトへ動かす。

---

## 初動 3 記事（公開済み）

すべて 2026-05-02 公開、`feature/product-blog-launch` で投入。

| プロダクト | slug | category | 主テーマ |
| --- | --- | --- | --- |
| TrainNote | `trainnote-record-habit` | 筋トレ | 筋トレ記録が続かない理由と、続くアプリの条件 |
| BookCompass | `bookcompass-reading-memo` | 読書 | 読書メモが続かない理由と AI 読書記録で変わること |
| DoubleHub | `doublehub-personal-ai` | 自己理解AI | パーソナルAIはチャットだけでは足りない |

各記事は SEO title / description / OGP / Twitter / Article+Breadcrumb+FAQ JSON-LD / 関連記事リンク / FAQ セクションを `[slug]/page.tsx` の既存実装にそのまま乗せて反映している。

### HubWallet について

ユーザーの指示により、HubWallet の記事は **アプリリリース後** に追加する。今回のデプロイには含まれていない。

---

## 各プロダクト 2 本目以降の候補トピック

### TrainNote（category: `筋トレ`）

- 「ボリューム計算とは——重量×回数×セット数の見方と落とし穴」
- 「自重トレを正しく数値化する——懸垂・ディップス・腕立ての負荷割合の考え方」
- 「ジムで今日何をやるか迷う問題——AI 提案で『判断の回数』を減らす」
- 「TrainNote の AI コーチの使い方——5 人をどう使い分けるか」
- 「部位別回復管理の基本——休む日はサボりではなく戦略」

### BookCompass（category: `読書`）

- 「読んだ本を忘れる理由——記憶のメカニズムと記録の役割」
- 「読書メモの書き方——『良かった』で止めずに、引っかかりを残すコツ」
- 「AI 読書ノートとは——要約サービスと何が違うのか」
- 「要約ではなく自分の読み方——AI を 一般論製造機 にしない使い方」
- 「次の一冊を理由つきで選ぶ——レコメンドに納得感を持たせる」

### DoubleHub（category: `自己理解AI`）

- 「自己理解 AI とは——『質問して答える』だけでは深まらない理由」
- 「ライフログと AI——分散した記録を 1 ヶ所に寄せる価値」
- 「タスク／メモを分類しない入力——仕分けコストを AI 側に寄せる」
- 「AI エージェントがプロアクティブに気づきを出す価値——押し付けない通知設計」
- 「『ダブルのあなた理解度』をどう育てるか——記録の積み上げ方」

### HubWallet（リリース後に着手 / category: `家計`）

- 「家計簿が続かない理由——記録ハードルと振り返り設計の問題」
- 「レシート撮影と仕分けの分離——『撮るだけで止められる』運用」
- 「銀行連携なし家計簿の意義——どこまで手で残し、どこから AI に任せるか」
- 「広告なし家計簿という選択——ユーザー体験とビジネスモデル」
- 「収入／支出の整理——カテゴリ設計の最小構成」

---

## 記事執筆チェックリスト

新規記事を追加するときの最低限のチェック。

- [ ] frontmatter に title / description / publishedAt / updatedAt / category / slug / readingTime / summary / tags / faq（5 問前後）を入れる
- [ ] 本文末尾に「関連記事」セクションと「よくある質問」セクションを置く（FAQ JSON-LD は frontmatter から自動生成される）
- [ ] 内部リンクは存在する slug／パスのみ使う（`/products/<id>/`、`/blog/<slug>/`、`/privacy/` など）
- [ ] 製品事実は `marketing-strengths.md` などの既存資料、または既存プロダクトページの記述に揃える
- [ ] 「必ず」「絶対」など断定的な誇張表現を避ける
- [ ] です／ます調、フレンドリーかつ実務的なトーン
- [ ] `pnpm build` 成功を確認してから push

---

## 参考

- 既存カテゴリ実装: `src/lib/content/blog.ts` の `getCategoryCounts()`
- フィルタ UI: `src/app/(marketing)/blog/_components/BlogExplorer.tsx`
- 記事ページ（メタデータ・JSON-LD・関連記事）: `src/app/(marketing)/blog/[slug]/page.tsx`
- sitemap: `src/app/sitemap.ts`（`getAllPosts()` から自動）
