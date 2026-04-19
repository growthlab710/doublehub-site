# DoubleHub Web リニューアル プロジェクト ドキュメント

このディレクトリは、**doublehub.jp の Web リニューアル + Web アプリ版構築プロジェクト**の実装エージェント向け指示書群である。

> **読者**: 実装を担当するエージェント（およびその作業をレビューする人間）。

## プロジェクトのひとことゴール

**DoubleHub エコシステムのハブサイトとして doublehub.jp を再編し、各プロダクト（BookCompass / TrainNote / DoubleHub 本体）のランディングページ集約と、ログイン後の Web アプリ版（ダッシュボード中心）を実装する。**

## 絶対に守ってほしい前提

1. **期限は 5 日以内**（本ドキュメント作成日を起点）。工数配分はこれに収める。
2. **認証・API 疎通は「コードレベルで動く状態」まで作る**。環境変数投入と本番ドメイン DNS 切替は後続セッションが担当する。
3. **既存 iOS アプリのコードベース・データベーススキーマは変更しない**。Web 側は既存スキーマに合わせる。
4. **Supabase プロジェクトは各アプリで独立しており、認証も独立維持が全体方針**:
   - **DoubleHub 本体**: Supabase Auth 有効（Apple / Google / Email / Anonymous）。Web 側のメイン認証先
   - **BookCompass**: 独自の Supabase Auth（`auth.users.id` が DoubleHub と別）。今後もずっと独立運用。Web 側は **「プロバイダ非依存の連携アクション方式」** でマッピング（Apple / Google / Email 等プロバイダが DoubleHub と異なっていても連携成立）
   - **TrainNote**: 現状 Auth 未導入。**Phase 2 で独自 Supabase Auth を導入予定**（DoubleHub 認証には寄せない）。v1 では「近日公開」扱い
   - 思想: **各プロダクトは独立プロダクトとして成立、DoubleHub はそれらを束ねるハブ**
5. **本番は当面 GitHub Pages（static export）**、**開発・検証は Cloudflare Pages プレビュー環境**。この二重構成を崩さない。
6. **破壊的変更禁止**: 既存 HTML や画像を消す前に `git mv` で退避、404 になる URL には 301 リダイレクトを設定する。
7. **秘密情報をコミットしない**。Supabase URL / anon key は `.env.local` と `.env.example` で分離。
8. **楽天ブックス API は Web から直接叩かない**。レート制限を iOS 側のカバー補完バッチと共有しているため。書籍検索は BookCompass の `search-books` Edge Function 経由で統一する

## ドキュメント構成

読む順番は上から推奨：

| # | ファイル | 内容 |
|---|---|---|
| 0 | [README.md](./README.md) | 本ファイル（目次） |
| 1 | [01-overview.md](./01-overview.md) | プロジェクト概要、ゴール、スコープ、技術スタック、ホスティング方針 |
| 2 | [02-architecture.md](./02-architecture.md) | 情報アーキテクチャ、URL 設計、画面一覧、ルーティング |
| 3 | [03-design.md](./03-design.md) | デザイン方針、デザイントークン継承、共通コンポーネント、ブランドアクセント |
| 4 | [04-data-layer.md](./04-data-layer.md) | Supabase スキーマ、認証フロー、linked_accounts、Web API クライアント設計 |
| 5 | [05-conventions.md](./05-conventions.md) | コーディング規約、ディレクトリ構造、制約、禁止事項 |
| 6 | [06-tasks.md](./06-tasks.md) | タスク分解、5 日間の推奨スケジュール、完了条件 |
| 7 | [07-delivery-and-handover.md](./07-delivery-and-handover.md) | **必読**: 納品方法、HANDOVER.md に書くべき内容、依頼者への引き継ぎ手順 |

## 既存資産の場所

- **既存 LP ソース**: `site/doublehub-site/`（このディレクトリの親）
  - リモート: `https://github.com/growthlab710/doublehub-site.git`（親リポとは別の独立 Git リポジトリ）
  - 現在のホスティング: GitHub Pages（`doublehub.jp`）
- **既存 iOS アプリ（参照のみ、変更禁止）**: リポジトリルート `/` 配下
- **既存 Supabase スキーマ SQL**: `docs/supabase/`（リポジトリルート下）

## 本プロジェクトの運用前提（必読）

- **5 日エージェントはクラウド環境で動作**する。依頼者のローカル環境にはアクセスできない
- **作業の受け渡しはフォルダ丸ごと**の形式。依頼者が既存 `site/doublehub-site/` を渡し、エージェントは成果物フォルダを返す
- **依頼者は手作業でファイル置き換え**する。エージェントは置き換えが事故らないよう `HANDOVER.md` に詳細な手順を記載すること
- **親リポジトリ（`../` 以上）の iOS アプリコードにはアクセスできない**。ドキュメント中の iOS リポ相対パスは参考情報扱い
- 詳細は [07-delivery-and-handover.md](./07-delivery-and-handover.md) を参照

## 作業完了の目安

- Cloudflare Pages プレビューで全ページが表示され、認証フローが動作する（ローカル `.env.local` に開発用 Supabase キーを入れた状態で）
- GitHub Pages に静的書き出しでデプロイでき、LP・ブログは完全に動く
- `docs/web-renewal/06-tasks.md` のチェックリストがすべて埋まる
- `pnpm build` / `pnpm lint` がエラーなく通る
- 主要ページで Lighthouse スコアが Performance ≥ 85, SEO ≥ 95 を維持

## 不明点がある場合

**推測で進めず、作業ログに「要確認事項」として列挙してから進む**。後続セッションまたは依頼者が解消する。

---

_最終更新: 2026-04-19_
