// @ts-check
/**
 * public/images/*.{png,jpg,jpeg} を最適化。
 *
 * 方針:
 *   - 元ファイルは残した上で、同名の .webp を横に生成する。
 *   - 巨大ファイル（>1MB）は元ファイルも sharp で画質を落として上書きする。
 *   - 以降、コンポーネント側で <picture> や next/image を通じて配信する前提。
 *
 * 実行: node scripts/optimize-images.mjs
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const IMG_DIR = 'public/images';
const LARGE_THRESHOLD = 900 * 1024; // 900KB を超えるファイルは再圧縮
const MAX_WIDTH = 1600; // 横幅上限（retina 相当）

const files = readdirSync(IMG_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));

let totalBefore = 0;
let totalAfter = 0;
const report = [];

for (const file of files) {
  const inPath = join(IMG_DIR, file);
  const ext = extname(file).toLowerCase();
  const base = basename(file, ext);
  const webpOut = join(IMG_DIR, `${base}.webp`);

  const beforeSize = statSync(inPath).size;
  totalBefore += beforeSize;

  try {
    const image = sharp(inPath);
    const meta = await image.metadata();
    const resize =
      (meta.width ?? 0) > MAX_WIDTH
        ? image.clone().resize({ width: MAX_WIDTH, withoutEnlargement: true })
        : image.clone();

    // WebP 出力
    const webpBuffer = await resize.webp({ quality: 80, effort: 5 }).toBuffer();
    writeFileSync(webpOut, webpBuffer);

    // 大きい元ファイルは同フォーマットで再圧縮して上書き
    let newOriginalSize = beforeSize;
    if (beforeSize > LARGE_THRESHOLD) {
      let optimized;
      if (ext === '.png') {
        optimized = await resize
          .clone()
          .png({ quality: 85, compressionLevel: 9, palette: true })
          .toBuffer();
      } else {
        optimized = await resize.clone().jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      }
      if (optimized.length < beforeSize) {
        writeFileSync(inPath, optimized);
        newOriginalSize = optimized.length;
      }
    }
    totalAfter += newOriginalSize + webpBuffer.length;
    report.push({
      file,
      before: beforeSize,
      origAfter: newOriginalSize,
      webp: webpBuffer.length,
    });
    console.log(
      `✓ ${file}  ${(beforeSize / 1024).toFixed(0)}KB → orig ${(newOriginalSize / 1024).toFixed(0)}KB / webp ${(webpBuffer.length / 1024).toFixed(0)}KB`
    );
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

console.log(
  `\n合計: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB (orig + webp)`
);
