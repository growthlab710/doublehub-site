# Liquid Glass 導入 + 「AIっぽさ」解消 提案書

作成日: 2026-04-24
作成: DoubleHub Agent (Computer)
状態: **提案のみ / 実装未着手**（別エージェントのリニューアル作業待ち）
対象: `doublehub.jp`（`src/app/(marketing)/` 以下のトップページを中心）

---

## 0. 前提整理: なぜ「AIっぽく見える」のか

まず、現状のコードと本番サイト（ファーストビュー）を読んだうえで、
「AIが作ったサイトっぽい」という指摘の原因を棚卸ししました。

デザインそのものは洗練されていますが、以下のような **「AIが量産するLPの型」**
が随所に現れているため、"既視感のある整いすぎた印象" になっています。

### 構造面（セクション構成）

- `Hero → Problem(3カード) → Solution(3ステップ) → Features(3カード) → Vision(3値) → FAQ → CTA`
  という **「3つずつ並ぶ説得フロー」** が 10 セクション以上連続している
- どのセクションも **「ラベル (Problem / Vision / Ecosystem ...) → 中央揃え見出し →
  本文 → 3カードグリッド」** という同じ型で、目線の休まる場所がない
- 15 セクションすべてに `border-t border-divider` の上線があり、区切りが均質

### ビジュアル面（装飾）

- Lucide のラインアイコン（Users / Link2 / Sparkles / Compass ...）が
  `ProblemSection` `VisionSection` `SolutionSection` で同じ丸アイコンボックスに入っている
- グラデーションblur光源（`bg-primary/20 blur-[140px]`）が
  `Hero` / `CtaSection` / `SpotlightSection` で **同じ作り方で3回出てくる**
- カードはすべて `rounded-2xl border border-border bg-surface shadow-sm` +
  `hover:-translate-y-0.5 hover:shadow-lg` で、全カードが同じ挙動

### モーション面

- 全コンポーネントで `initial={{ opacity: 0, y: 16~24 }}` → `y: 0`
  の同じイージング (`[0.16, 1, 0.3, 1]`) フェードイン
- 揺らぎや物理感がなく、"AI生成動画のような均質な動き" になっている

### コピー面（参考）

- `uppercase tracking-wider` の英語セクションラベル
  （Problem / Solution / Vision / Ecosystem / Products ...）が全セクションに付いており、
  これも典型的な「AI LPテンプレ」の癖

> **Liquid Glass を入れる目的は単なるトレンド追従ではなく、
> 上記の "平坦で均質な型" を崩し、"触覚のある / 物理感のある" 印象を与えて、
> 人の手が入っているように見せること** と再定義します。

---

## 1. Apple 公式素材の現状（調査結果）

今回活用を検討できる Apple 公式のリソースを整理しました。

| リソース | URL / 入手元 | 用途 |
| --- | --- | --- |
| **Apple Design Resources — iOS / iPadOS 26 UI Kit**（Figma） | Figma Community `Apple` 公式配布 (2025/7公開) | SF Symbols、Liquid Glass material variables、色・変数一式。**モック／画面デザイン用** |
| **Figma Glass Effect（Apple協業、ネイティブ機能）** | Figma のレイヤー効果（2025/7 公開） | Refraction / Depth / Frost / Dispersion の 4 パラメータで Liquid Glass を Figma 上で直接再現 |
| **Apple Developer Docs — Liquid Glass Technology Overview** | `developer.apple.com/documentation/technologyoverviews/liquid-glass` | 仕様・使いどころ・バリアント（`regular` / `clear`）のガイド |
| **WWDC25 Session 219** | `developer.apple.com/videos/play/wwdc2025/219` | Apple が推奨する Liquid Glass の正しい使い方 |
| **HIG — Materials** | Human Interface Guidelines（更新済み） | Light / Dark / Clear / Tinted の 4 appearance 指針 |

### ⚠️ 重要な制約 — Web では「純正」は使えない

- Apple には `-apple-visual-effect-*` に相当する **非公開 CSS プロパティ** があるが、
  **iOS / macOS 内部の WebView 専用** で、Safari / Chrome では動作しない
  （AppStore 審査で reject される可能性あり）
- そのため、Web では **Figma の公式キットはあくまでモック用**、
  実装は **標準の `backdrop-filter` + SVG filters でエミュレート** する方針になる

### Web 実装の選択肢

| アプローチ | 実装コスト | 本物らしさ | ブラウザ対応 |
| --- | --- | --- | --- |
| **A. `backdrop-filter: blur() saturate()` ベース**（glassmorphism 延長） | 低 | ★★☆☆☆ | ほぼ全ブラウザ |
| **B. A + `inset box-shadow` で specular highlight 模倣** | 中 | ★★★☆☆ | ほぼ全ブラウザ |
| **C. B + SVG `feDisplacementMap` で屈折を追加** | 高 | ★★★★☆ | Chrome/Safari◎、Firefox△、モバイル Safari は WebKit bug で一部動作せず |

**本提案では B をベースラインとし、Hero など極少数に C を検討** する方針を推奨します。
（A だと「ただの glassmorphism」で別方向の既視感が強く、C は保守コストとブラウザ差で割に合わない）

---

## 2. 導入方針（基本原則）

Apple の HIG と実装上の制約を踏まえ、以下を原則とします。

1. **全面的には適用しない**
   HIG でも "floating, high-value elements" に限定すべきと明記。
   サイト全体をガラス化すると逆に「2025年のトレンドを全部盛りした安いサイト」に見える。

2. **"浮いている要素" に限定する**
   ヘッダー、フローティングCTA、モーダル、タブなど
   「コンテンツの上に被さる／背景を透過する意味のある要素」だけに使う。

3. **可読性優先**
   テキストが乗るガラス面は必ずコントラスト比 4.5:1 以上を担保。
   `blur` だけでなく `saturate(140~180%)` と
   半透明単色レイヤー（`rgba(255,255,255,0.6)` など）を下に敷くのが鉄則。

4. **ダーク／ライトで別トークン**
   Liquid Glass は **ダークで映える**。
   既存の `[data-theme="dark"]` に `--glass-*` トークンを追加する。

5. **既存のグラデーション光源を "活かす"**
   Hero にある `bg-primary/20 blur-[140px]` などの光源は、
   ガラス越しに滲むほうがむしろ美しくなる。光源は削らず、前面にガラスを置く。

---

## 3. 導入候補マップ（7 箇所 + 除外 5 箇所）

現状のトップページ 15 セクションを全件見て、
**「入れると効く」箇所と「入れてはいけない」箇所** を分類しました。

### ✅ 導入を推奨（優先度順）

#### 【P1】MarketingHeader — スクロール時のフローティング化
**ファイル**: `src/components/marketing/MarketingHeader.tsx` L40
**現状**: `sticky top-0 bg-bg/80 backdrop-blur-md` — すでに簡易glassmorphism
**改善案**:
- `bg-bg/80` を `--glass-header-bg` トークン化し、`backdrop-filter: blur(20px) saturate(180%)` に強化
- スクロール位置に応じて top margin + rounded-full に変形し、"画面から少し浮いた" ピル型に
- 参考: `pill header` + `Liquid Glass material`（Apple 公式 Safari 26 の挙動）

**効果**: 最初に目に入る要素なので、ここがガラスになるだけで印象が大きく変わる。
**リスク**: 低。既に類似実装があるので互換性問題も少ない。

---

#### 【P2】Hero セクションのコンセプト画像枠 + バッジ
**ファイル**: `src/components/marketing/Hero.tsx` L35（バッジ）, L72（画像枠）
**現状**:
- L35: `bg-surface` の普通のピル型バッジ（"Your Personal Partner"）
- L72: `rounded-2xl border bg-surface shadow-xl` の普通のフレーム

**改善案**:
- **バッジ**: Liquid Glass `clear` variant（透過強め）を適用。
  背後のグラデーション光源が透けて見えるのが最大の魅力。
- **画像枠**: ダブルレイヤー構造にする
  - 外枠: Liquid Glass（背景のグラデーション光源を透過させる）
  - 内側: 画像
  - Apple が iPhone の写真を薄いガラス越しに見せる演出と同じ。Hero の既存の光源がそのまま活きる。

**効果**: Hero は "最初の印象" なのでここの変化が最も効く。
**リスク**: 中。画像が重要なセクションなので、ガラスで画像の視認性を落とさないように薄めの設定（blur 12〜16px）で。

---

#### 【P3】EcosystemTabs のタブボタン + アクティブパネル
**ファイル**: `src/components/marketing/EcosystemTabs.tsx` L204
**現状**:
- タブ: `border bg-surface` の普通のカード型タブ
- アクティブ時: `bg-primary/5 ring-2 ring-primary/20`
- このセクションだけは **インタラクティブ性がある**（タップで切り替え）ので、
  "物理的に動いている" 感覚を与えるのに最適

**改善案**:
- タブボタンを **Liquid Glass `regular`** にして、
  アクティブ時は **`clear` + primary tint** に切り替える
- パネル背景は薄いガラスで、下のスクロール背景がうっすら透けて見える設計

**効果**: **AIっぽさの元凶である「同じ見た目のカード連続」を破壊する** のに最も効く。
タブは "インタラクティブな部品" なので、ここに物理感を入れると「使う価値」が立ち上がる。

---

#### 【P4】CTA セクション（最終 CTA）
**ファイル**: `src/components/marketing/CtaSection.tsx` L11
**現状**: `bg-gradient-to-br from-primary/10 via-surface to-accent-warm/5 shadow-lg`
**改善案**:
- 外側のカード全体を Liquid Glass `clear` にし、
  **既存のグラデーション光源（右上 `bg-primary/20 blur-3xl`）を背面に移してガラス越しに透かせる**
- ボタン自体は変えない（ガラスボタンは可読性で苦戦するのでやらない）

**効果**: "閉じ" のセクションに "物理的な存在感" が出て、記憶に残る。
**リスク**: 低。周囲に空白が多く、背景が単純なので失敗しにくい。

---

#### 【P5】TOC / ScrollTop などのフローティング要素（新規追加を提案）
**現状**: 存在しない
**改善案**:
- ブログ記事 (`/blog/[slug]`) に "目次 (Table of Contents)" のフローティングパネルを右下に設置
- Liquid Glass `regular` で、スクロールすると追従
- これは **Liquid Glass が最も輝く "浮いた UI" の王道** パターン

**効果**: トップページだけでなくブログ側の価値も上がる。
**リスク**: 低。ブログのコンテンツ自体は触らない。

---

### ⚠️ 導入しても良いが慎重に

#### 【P6】ProductCards の個別カード
**ファイル**: `src/components/marketing/ProductCards.tsx` L51
**考察**:
- 3枚横並びで情報量が多いカードのため、全部ガラスにすると **読みづらくなる**
- 代わりに **ホバー時のみ** ガラス表情が強まる仕掛けが良い
  （普段は現状の `bg-surface` のまま、hover で `backdrop-filter` が発動）

---

#### 【P7】MarketingHeader 内 Products ドロップダウン
**ファイル**: `src/components/marketing/MarketingHeader.tsx` L89
**現状**: `bg-surface shadow-lg` の普通のメニュー
**改善案**: `regular` ガラスに差し替え。
**効果**: 小さい変更で Apple っぽさが一気に上がる。
**リスク**: 極低。

---

### ❌ 導入すべきでない（やると逆効果）

| セクション | 理由 |
| --- | --- |
| `ProblemSection` の3カード | テキスト中心。ガラスは可読性を落とす |
| `IdealSection` の対比カード | 同上。対比の明瞭さが損なわれる |
| `VisionSection` | 全面 `bg-surface-2/40` + 3値カード。静かに読ませる場なのでガラスは邪魔 |
| `FaqSection` | アコーディオンは "操作しやすさ" が命。透過は不要 |
| `BlogTeaser` | 記事カードは情報密度が高く、ガラスは可読性リスク |
| `DailyChoices` / `ProactiveSupport` | 構造化情報が詰まっており、視線が集中できる必要がある |

---

## 4. 「AIっぽさ」を減らす、Liquid Glass 以外の施策

Liquid Glass だけでは根本的な "AIっぽい型" は解消しません。
以下を **組み合わせて** 実施することで、"人が作ったサイト" に近づきます。

### 4-1. 構成のリズムを崩す（優先度: 高）

**問題**: 15 セクションがほぼ同じ「ラベル → 見出し → 3カード」の型。
**案**:
- 奇数セクション（Problem, FaqSection など）を **左揃え+大見出し** に変え、
  偶数セクションとの見た目のリズムを変える
- **2〜3 セクションに 1 回、異質なレイアウト**（引用だけの黒背景セクション、
  大きな写真だけのセクション、など）を挿入
- 現状の `VisionSection` はせっかく雰囲気が違うのに、結局3値カードで締めてしまっている。
  **3値カードを削除** し、引用文だけで終える案を推奨

### 4-2. モーションに "ムラ" を入れる（優先度: 中）

**問題**: 全要素が同じ `y: 16 → 0` フェード。
**案**:
- セクションごとに **1〜2 個だけ、少し違うモーション** を入れる
  - 例: `Hero` の画像は縦移動＋わずかな回転
  - 例: `ProductCards` は左からじわっとスライド（stagger 強め）
  - 例: `SpotlightSection` はズームインではなくパララックス（背景より遅く動く）
- Framer Motion の `spring` を使う場面を増やす（`ease-out` 一辺倒をやめる）

### 4-3. タイポグラフィの "手触り" を増やす（優先度: 中）

**案**:
- 大見出しに **Display フォントのイタリック／斜体の1単語ハイライト** を混ぜる
  （例: 「自分が *もう一人* いたら」の "もう一人" だけ別書体）
- 数字は tabular ではなく proportional にする
- 引用符（『 』や“ ”）を装飾として大きく使う

### 4-4. アイコンを "ロゴ・画像" に置き換える（優先度: 中）

**問題**: Lucide 線画アイコンの多用は AI LP の最大の特徴。
**案**:
- `ProblemSection` / `VisionSection` の Lucide アイコンを、
  **自作の SVG イラスト** または **プロダクトの実スクリーンショットの断片** に置き換える
- 「AI が拾ってくる最大公約数の線画アイコン」を使わないこと自体が、AIっぽさ対策として強い

### 4-5. 「英語ラベル＋日本語大見出し」パターンの削減（優先度: 低）

**問題**: `Problem` / `Vision` / `Ecosystem` ... の uppercase ラベルが全セクションに付いていて、これ自体がテンプレ感の象徴。
**案**:
- 重要セクション（Hero, EcosystemTabs, CtaSection）のみ残し、
  他は削除 or 日本語小キャプションに差し替え
- 例: `Problem` → 削除、または「よくある違和感」などの日本語

---

## 5. 実装フェーズ案（Go が出たら）

### Phase 1: デザイントークン追加（0.5日）
`src/styles/globals.css` に以下を追加:
```css
:root {
  /* Liquid Glass tokens — light */
  --glass-bg: rgba(255, 255, 255, 0.55);
  --glass-bg-clear: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.8);
  --glass-blur: 20px;
  --glass-saturate: 180%;
  --glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.8),
                     inset 0 -1px 0 rgba(0, 0, 0, 0.04);
}
[data-theme='dark'] {
  --glass-bg: rgba(28, 28, 32, 0.55);
  --glass-bg-clear: rgba(28, 28, 32, 0.25);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.15),
                     inset 0 -1px 0 rgba(0, 0, 0, 0.3);
}

@layer components {
  .liquid-glass {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-highlight), 0 8px 32px rgba(0, 0, 0, 0.06);
  }
  .liquid-glass-clear { /* 透過強め版 */ }
  .liquid-glass-regular { /* 不透明寄り版 */ }
}
```

### Phase 2: Header（P1）+ Products ドロップダウン（P7） — 最小安全な先行適用（0.5日）
既存コードへの影響が最小。本番に出して様子見できる。

### Phase 3: Hero（P2）+ CTA（P4） — 印象を大きく変える適用（1日）
最も効果が高いが、画像の視認性テストが必要。ライト／ダーク両方で確認。

### Phase 4: EcosystemTabs（P3） — 最大の "AIっぽさ潰し"（1日）
タブという能動的な要素に物理感を与える。工数はある程度必要。

### Phase 5: 「AIっぽさ」撲滅の構成リファクタ（2〜3日）
4-1, 4-2, 4-4 をまとめて実施。これが最も重い作業だが、本質的な改善。

**合計: 5〜6日（Liquid Glass だけなら 3日、AIっぽさ解消も含めるなら 5〜6日）**

---

## 6. リスクと判断ポイント

| リスク | 対策 |
| --- | --- |
| モバイル Safari で `backdrop-filter` のパフォーマンス低下 | 同時に掛けるガラス要素数を**最大 3〜4 個に制限**する |
| 低スペック端末でのフレーム落ち | `prefers-reduced-motion` 相当の media query で blur を無効化するフォールバックを用意 |
| 「トレンド追従で安っぽく見える」逆効果 | 本提案の **「浮いている要素のみ / 全面適用しない」** を厳守 |
| コントラスト不足でアクセシビリティ低下 | すべてのガラス面で WCAG AA (4.5:1) を手動チェック |
| ダーク／ライトテーマ切替時の見た目差 | `--glass-*` トークンを両方で別定義し、両テーマでビジュアルレビュー |

---

## 7. 推奨する Go の出し方

以下 3 パターンからお選びいただく想定です。

**A. 最小版（Phase 1 + 2 + 3 のみ）** — 2 日
 Header / Hero / CTA のみガラス化。低リスクで見た目の印象は大きく変わる。

**B. 推奨版（Phase 1〜4）** — 3 日
 上記に加え EcosystemTabs に適用。AIっぽさを直接破壊する効果あり。

**C. 本格版（Phase 1〜5）** — 5〜6 日
 Liquid Glass + 構成リファクタ + モーション + アイコン差し替え。
 「AIっぽさ」の指摘に対する最も本質的な回答になる。
 ただしコピーや写真素材の追加準備が必要（現状の画像資産だけでは不足）。

---

## 8. 次のアクション（別エージェント作業完了後に確認したいこと）

1. 別エージェントのリニューアル作業後に、**どのセクションが変更されているか** を差分確認
2. 上記 P1〜P7 の中で、すでに別エージェントの作業範囲と被っているものがあれば除外
3. 本提案の A / B / C どのレベルで進めるかの判断
4. C を選ぶ場合は、イラスト / SVG 素材 / 追加写真の準備について別途相談

以上。
