# Marketing Video Assets

このディレクトリは、ホーム / DoubleHub プロダクトページの「スマホ画面が動いているように見える」キャプチャ動画を置くスロットです。

`src/components/marketing/VideoSlot.tsx` が以下のパスを参照しています。配置すれば自動的に動画再生に切り替わり、未配置の間は既存スクリーンショット（poster）にフォールバックします。

## 期待されるファイル

| パス | 使われる場所 | poster フォールバック |
| --- | --- | --- |
| `public/videos/doublehub-home-solution.mp4` | トップページ Solution セクション右側 | `/images/doublehub-memory.webp` |
| `public/videos/doublehub-product-hero.mp4` | DoubleHub プロダクトページ Hero 右側 | `/images/DoubleHub-Concept.png` |

## 推奨スペック（iMovie 書き出し想定）

- **コーデック**: H.264 / MP4（`.mp4`）
- **音声**: 無音 / mute（`<video muted>` で自動再生するため）
- **長さ**: 5〜12 秒（ループ前提：尾と頭が自然につながる構成にする）
- **アスペクト比**: 9:16（iPhone の縦型スクリーン）
- **解像度**: 短辺 720〜1080px 程度（過剰に大きくしない）
- **ファイルサイズ**: 1〜3 MB を目安に圧縮
- **フレームレート**: 30 fps で十分

## 推奨される iMovie 書き出し設定

1. プロジェクトをカスタム解像度（例: 1080×1920）で作成
2. ファイル → 共有 → ファイル
3. 解像度 1080p、品質「高」、圧縮「ファイルサイズを小さく」
4. 必要に応じて `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -an output.mp4` でさらに圧縮（音声無し）

## アクセシビリティ / パフォーマンス

- `prefers-reduced-motion: reduce` のユーザーには自動再生されません（`VideoSlot` 内で対応済み）
- `preload="metadata"` を既定にし、動画本体は再生開始時にロード
- 動画ファイルが見つからない・読めない場合は自動的に poster 画像にフォールバック

差し替え時は単にこのフォルダにファイルを置くだけで OK です。コードの変更は不要です。
