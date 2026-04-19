# 03. デザイン方針

## 3.1 基本方針：ハイブリッド・デザイン

> **Web 全体は DoubleHub 統一デザインでハブ感を出す。各プロダクトページ・各プロダクトアプリ画面だけ、iOS 版から「色・ロゴ・キービジュアル」をアクセントとして継承する。**

iOS 版と同じデザインをそのまま踏襲すると工数と確認コストが過大になり、各プロダクトでデザインシステム 3 つ分を作ることになる。ハブサイトとしての一貫性も失われる。逆に完全統一だと各プロダクトの個性が消える。

中庸を取って「**DoubleHub を軸にした統一レイアウト + プロダクトカラーのアクセント**」を採用する。

| 要素 | 方針 |
|---|---|
| **レイアウト（グリッド、スペーシング）** | Web で統一 |
| **タイポグラフィ（フォント、サイズスケール）** | Web で統一 |
| **UI コンポーネント（ボタン、カード、フォーム、ナビ）** | Web で統一 |
| **インタラクション・アニメーション** | Web で統一 |
| **ベースカラー（bg、text、border、muted）** | Web で統一 |
| **アクセントカラー** | プロダクトごとに切替（ページ/画面単位で CSS 変数を上書き） |
| **ロゴ・アイコン** | プロダクトごとに iOS 版から継承 |
| **キービジュアル（Hero 画像等）** | プロダクトごとに iOS 版から流用・新規作成 |

## 3.2 デザイントークン継承（既存 styles.css から）

既存 `site/doublehub-site/styles.css` から以下を **CSS 変数として Tailwind に統合**する。

### カラー（ライトモード）

| 変数 | 既存値（参考） | 用途 |
|---|---|---|
| `--color-bg` | `#FAFAFA` | ページ背景 |
| `--color-bg-elevated` | `#FFFFFF` | カード、モーダル |
| `--color-text` | `#1A1A1A` | 主要テキスト |
| `--color-text-muted` | TBD（styles.css 要確認） | 補助テキスト |
| `--color-border` | TBD | 枠線 |
| `--color-primary` | `#0A8A8A`（teal） | DoubleHub ブランドプライマリ |
| `--color-accent-warm` | `#E8734A`（オレンジ） | アクセント |

### カラー（ダークモード）

`[data-theme="dark"]` で上記の全変数を上書き。既存実装に準拠。

### タイポグラフィ

| 変数 | 内容 |
|---|---|
| `--font-sans` | `'General Sans', system-ui, sans-serif`（本文） |
| `--font-display` | `'Cabinet Grotesk', ...`（見出し） |
| `--text-xs` 〜 `--text-6xl` | `clamp()` を使った流動型スケール |

**重要**: フォントは **self-hosted** に切り替える（`fontshare.com` からダウンロード → `public/fonts/` に配置 → `next/font/local` で読み込み）。既存の CDN リンクはパフォーマンスとプライバシーで不利。

### スペーシング

| 変数 | 値 |
|---|---|
| `--space-1` | `0.25rem` (4px) |
| `--space-2` | `0.5rem` (8px) |
| ... `--space-32` | 4px 基準で累進 |

Tailwind のデフォルトと重なる部分はそちらを活用。

### ブレークポイント

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 3.3 プロダクトアクセントカラー（iOS 版から継承）

各プロダクトページ・アプリ画面では、CSS 変数を上書きしてヒーロー・CTA・タブアクティブ状態等に反映する。

### 3.3.1 DoubleHub 本体

ハブ色 = DoubleHub 色。既存 `styles.css` のプライマリ（`#0A8A8A` teal）と accent-warm（`#E8734A` orange）をそのまま使う。

### 3.3.2 BookCompass（ウォームクリーム系・落ち着いたトーン）

定義元: `BookCompass/UI/Theme/AppColor.swift`（iOS 別リポ）

| 変数 | HEX | 用途 |
|---|---|---|
| `--bc-primary` | `#1B2B4A` | ダークネイビー。ナビ / 見出し / アイコン |
| `--bc-accent` | `#E8911A` | ウォームアンバー。ボタン / XP バー |
| `--bc-bg` | `#F7F2E8` | ウォームクリーム。画面背景 |
| `--bc-surface` | `#FFFFFF` | カード / シート |
| `--bc-text-primary` | `#1B2B4A` | primary と同色 |
| `--bc-text-secondary` | `#9BA3B5` | 補助テキスト / タイムスタンプ |
| `--bc-tag-bg` | `#EDE5D0` | タグ背景 |
| `--bc-tag-fg` | `#6B5C3E` | タグテキスト |
| `--bc-destructive` | `#D83B3B` | 破壊的操作 |
| `--bc-unexplored` | `#C7C9CD` | 未探索 / 無効グレー |

### 3.3.3 TrainNote（サイバー / HUD 系・ダークトーン）

定義元: `TrainNote/App/CyberTheme.swift`（iOS 別リポ）

| 変数 | HEX | 用途 |
|---|---|---|
| `--tn-cyan` | `#00E5FF` | メインアクセント。HUD / ボーダー / 数値 |
| `--tn-emerald` | `#00FF99` | セカンダリ。パルス / 成功 |
| `--tn-amber` | `#FFBF00` | 警告 |
| `--tn-danger` | `#FF4059` | 破壊的操作 / アラート |
| `--tn-bg0` | `#0D0D14` | 最暗背景 |
| `--tn-bg1` | `#171A24` | カード背景 |
| `--tn-bg2` | `#212430` | インナーカード背景 |
| `--tn-border` | `rgba(255,255,255,0.08)` | ボーダー |
| `--tn-text-dim` | `rgba(255,255,255,0.45)` | 補助テキスト |
| `--tn-text-faint` | `rgba(255,255,255,0.25)` | 最弱テキスト |

部位カラー（カレンダードット / グラフ凡例 / バッジ用、`TrainNote/App/Models.swift` の `MuscleGroup.color`）:

| 部位 | HEX |
|---|---|
| 胸 | `#FF6B6B` |
| 背中 | `#4DABF7` |
| 脚 | `#69DB7C` |
| 肩 | `#FFD43B` |
| 腕 | `#CC5DE8` |
| 腹筋 | `#A87B5D` |
| 有酸素 | `#20C997` |

TrainNote には `CyberTheme.swift` 側にも別系統の部位カラー（`MuscleGroup.cyberColor`、バッジ/グロー演出用でやや彩度高め）がある。Web でどちらを採用するかは要判断（カレンダー等は `Models.swift` 側、HUD 演出は `CyberTheme` 側、が iOS 側の使い分け）。**v1 では TrainNote 画面が「近日公開」扱いのため、LP 側で使う色のみで足りる**。

### 3.3.4 トーン差への対応（重要）

BookCompass（**ウォームクリーム、明るく落ち着いた**）と TrainNote（**サイバー、ダーク、高彩度**）は**真逆の方向性**。ハブサイトの統一デザインの中にこの2つを取り込むには工夫が必要。

**推奨アプローチ**:
- **LP 側の「各プロダクト紹介セクション」は、プロダクト色をあくまでアクセントとして使う**。背景はハブの共通色（白 / オフホワイト / ダーク）のまま
- **プロダクト専用ページ（`/products/bookcompass/`, `/products/trainnote/`）のヒーロー部分**のみ、プロダクト色を大きく使う（その方が「そのプロダクトの世界観」が伝わる）
- **Web アプリ内のプロダクト画面（`/app/bookcompass/`, `/app/trainnote/`）**でも、ヒーロー・タブ・CTA・グラフ配色にプロダクト色を使うが、レイアウト・フォント・コンポーネント形状は統一
- **TrainNote のダーク背景を Web アプリ画面で全面採用するのは避ける**（ダッシュボードやハブとの遷移で違和感が大きい）。タイトル部分のみダークアクセントを入れる程度が現実的

### 3.3.5 実装例

```css
/* globals.css */
:root {
  --bc-primary: #1B2B4A;
  --bc-accent: #E8911A;
  --bc-bg-tint: #F7F2E8;
  --tn-cyan: #00E5FF;
  --tn-emerald: #00FF99;
  /* ... */
}

/* /app/bookcompass/ ルートや /products/bookcompass/ ルートの scope */
.theme-bookcompass {
  --color-accent-product: var(--bc-accent);
  --color-accent-product-fg: var(--bc-primary);
}

.theme-trainnote {
  --color-accent-product: var(--tn-cyan);
  --color-accent-product-fg: var(--tn-bg0);
}
```

## 3.4 既存資産から必ず引き継ぐもの

- **ロゴ**: `images/logo.jpg`, `images/doublehub-icon.jpg`
- **OGP 画像**: `images/og-default.jpg`（デザイン刷新時に作り直してよい、ただし 1200x630 維持）
- **ファビコン**: `favicon.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
- **PWA マニフェスト**: `manifest.json`（内容を維持・必要に応じて更新）
- **ダークモード実装**: `data-theme` 属性での切替、`matchMedia('(prefers-color-scheme: dark)')` 同期

## 3.5 共通 UI コンポーネント

以下を `components/ui/` に実装する（Radix UI ベース + Tailwind）：

| コンポーネント | 備考 |
|---|---|
| `Button` | variants: primary / secondary / ghost / destructive / link。size: sm/md/lg |
| `Card` | ヘッダー、ボディ、フッターの slot |
| `Input` / `Textarea` / `Select` | フォーム統一 |
| `Dialog` / `AlertDialog` | Radix UI ベース |
| `DropdownMenu` | Radix UI ベース |
| `Tabs` | Radix UI ベース |
| `Tooltip` | Radix UI ベース |
| `Avatar` | プロフィール画像 |
| `Badge` | ステータス表示 |
| `Skeleton` | ローディング表示 |
| `Toast` | Sonner 推奨 |
| `ThemeToggle` | ライト/ダーク/システム切替（既存実装の移植） |

## 3.6 レイアウトコンポーネント

| コンポーネント | 用途 |
|---|---|
| `MarketingHeader` | LP 用ヘッダー |
| `MarketingFooter` | LP 用フッター |
| `AppShell` | アプリ用レイアウト（サイドバー + ヘッダー） |
| `AppSidebar` | アプリ内ナビ |
| `AppHeader` | アプリ内ヘッダー |
| `Container` | 幅制限とパディング |
| `Section` | LP 内の各セクション共通 |

## 3.7 アニメーション・インタラクション方針

**「Next.js らしいかっこよさ」を入れてよい**。ただし以下の制約を守る：

- ✅ `static export` モードでも動く（クライアントサイドで完結）
- ✅ LCP/CLS を悪化させない（初期描画をブロックしない）
- ✅ モバイルで滑らか（60fps 目標、重い 3D/パーティクルは控えめに）
- ✅ `prefers-reduced-motion: reduce` に従う
- ✅ ダークモード切替時に色が滑らかに遷移する

### 推奨アニメーション

- **ページ遷移**: Framer Motion の `AnimatePresence` + fade + slight translate
- **Hero セクション**: 視差スクロール（パララックス）、グラデーションアニメ、`mix-blend-mode` 演出
- **カード Hover**: `translate-y` + `shadow` 拡張 + 内側グロー
- **ボタン**: Ripple or Glow（控えめに）
- **Scroll Reveal**: Intersection Observer ベースのフェードイン（既存実装をアップグレード）

### 推奨ライブラリ

- **Framer Motion**: 基本アニメ
- **`@studio-freight/lenis`**: スムーススクロール（必要なら）
- **`tailwindcss-animate`**: 小さなユーティリティ

### 使わないもの

- 重い 3D（Three.js / React Three Fiber）は v1 では不要
- `GSAP` は Framer Motion で代替

## 3.8 画像の扱い

### 既存画像の最適化

- `images/DoubleHub-Concept.png`（4.7MB）→ WebP/AVIF に変換し 200KB 以下を目指す
- `images/coach-chat.png`（2MB）等の TrainNote 画像 → 同上
- `next/image` の static export 互換設定（`unoptimized: true` を部分的に）で対応

### 新規画像

- OGP 画像: 1200x630、各ページ固有のもの（トップ、各プロダクト、ブログ個別記事）
- スクリーンショット: iOS 端末フレームに収めたアプリ画像

## 3.9 アクセシビリティ（a11y）

- コントラスト比 4.5:1 以上（本文）、3:1 以上（大きいテキスト）
- キーボード操作: Tab で全操作可能、フォーカスリング明示
- スクリーンリーダー: 画像 `alt`、`aria-label`、見出し階層
- フォーム: `<label>` を明示、エラーメッセージを `aria-describedby` で紐づけ
- 動き: `prefers-reduced-motion: reduce` でアニメ無効化

## 3.10 既存 LP との視覚的連続性

リニューアル前後で「同じサイトの延長」と感じられるように、以下を変えない：

- ブランドカラー（teal と warm orange）
- ロゴデザイン
- 見出しフォント（Cabinet Grotesk）

変えてよい：

- レイアウト構造（グリッド、カードの並べ方）
- 各セクションの表現（よりリッチに）
- アニメーション（大幅強化）

## 3.11 要確認事項（デザイン関連）

OPEN_QUESTIONS.md 参照。ブランドカラーは判明済み。残る主な項目：

- [ ] DoubleHub 本体 LP 用の Hero ビジュアル（既存 `DoubleHub-Concept.png` を使うか、新規作るか）
- [ ] ロゴの SVG 版があるか（現状 JPG）→ SVG 化を検討
- [ ] TrainNote の `MuscleGroup.color` 系と `cyberColor` 系、Web でどちらをどの用途に使うか（v1 では LP 側だけで足りる）
- [ ] DoubleHub 本体のプライマリ（teal）と BookCompass primary（`#1B2B4A` ダークネイビー）の違いが LP で明確に伝わるか（どちらもダーク系で近い印象になる可能性あり）

---

**次に読む**: [04-data-layer.md](./04-data-layer.md)
