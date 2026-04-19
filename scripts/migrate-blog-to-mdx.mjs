// @ts-check
/**
 * legacy/blog/*.html の 20 記事を content/blog/*.mdx に変換するスクリプト。
 *
 * 方針:
 *   - frontmatter: title, description, publishedAt, updatedAt, tags, category, series, readingTime
 *   - 本文:    <div class="article__content"> の innerHTML を Markdown に変換
 *   - 出典:    <section class="article-sources"> の <li> を Markdown リストで追加
 *   - FAQ:    <div class="article__faq"> の <details> を ## よくある質問 + 箇条書きで追加
 *   - 内部リンク: ./foo.html と ./foo.html#anchor を /blog/foo/ に書き換え
 *   - 画像パス: ../images/foo.jpg を /images/foo.jpg に書き換え
 *   - <strong> タグ内の日本語を太字 Markdown に
 *
 * 実行: node scripts/migrate-blog-to-mdx.mjs
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { parse } from 'node-html-parser';
import TurndownService from 'turndown';
import readingTime from 'reading-time';

const LEGACY_DIR = 'legacy/blog';
const OUT_DIR = 'content/blog';
mkdirSync(OUT_DIR, { recursive: true });

// ---------- Turndown 設定 ----------
const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
  bulletListMarker: '-',
});

// <details><summary> を QA Markdown に
td.addRule('details', {
  filter: 'details',
  replacement(_content, node) {
    const summary = node.querySelector('summary');
    const q = summary ? summary.textContent.trim() : '';
    const bodyEl = node.cloneNode(true);
    // summary を除去した上で本文を抽出
    const sBody = bodyEl.querySelector('summary');
    if (sBody) sBody.remove();
    const aText = td.turndown(bodyEl.innerHTML).trim();
    return `\n\n**Q. ${q}**\n\n${aText}\n`;
  },
});

// article-cta をスキップ
td.addRule('skipCta', {
  filter: (node) => {
    if (!node || node.nodeType !== 1) return false;
    const cls = node.getAttribute?.('class') || '';
    return cls.includes('article-cta') || cls.includes('article__faq') || cls.includes('related-articles') || cls.includes('author-box');
  },
  replacement: () => '',
});

// ---------- 1 記事を処理 ----------
function convertOne(filename) {
  const slug = basename(filename, '.html');
  const html = readFileSync(join(LEGACY_DIR, filename), 'utf-8');
  const root = parse(html);

  // Frontmatter 抽出
  const title = (root.querySelector('title')?.textContent ?? '')
    .replace(/\s*\|\s*DoubleHub\s*$/, '')
    .trim();
  const description = root.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';

  // JSON-LD から publishedAt / updatedAt / tags
  const jsonLdText = root.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}';
  let publishedAt = '';
  let updatedAt = '';
  let tags = [];
  try {
    const jd = JSON.parse(jsonLdText);
    const article = jd['@graph']?.find((n) => n['@type'] === 'Article') ?? jd;
    publishedAt = article.datePublished ?? '';
    updatedAt = article.dateModified ?? publishedAt;
    if (Array.isArray(article.keywords)) {
      tags = article.keywords;
    } else if (typeof article.keywords === 'string') {
      tags = article.keywords.split(',').map((s) => s.trim()).filter(Boolean);
    }
  } catch {}

  // カテゴリ（クラスターラベル）
  const cluster = root.querySelector('.article__cluster');
  const category = cluster ? cluster.textContent.trim() : '';

  // シリーズ情報（任意）
  const seriesEl = root.querySelector('.article__series');
  const series = seriesEl ? seriesEl.textContent.trim().replace(/\s+/g, ' ') : '';

  // 本文
  const contentEl = root.querySelector('.article__content');
  if (!contentEl) {
    console.warn(`[skip] ${filename}: .article__content が見つからない`);
    return null;
  }
  // CTA などは除去
  contentEl.querySelectorAll('.article-cta').forEach((n) => n.remove());

  // 画像パス / 内部リンクを書き換え
  contentEl.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src') ?? '';
    if (src.startsWith('../images/')) img.setAttribute('src', src.replace('../images/', '/images/'));
  });
  contentEl.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href') ?? '';
    if (href.startsWith('./') && href.endsWith('.html')) {
      a.setAttribute('href', `/blog/${href.slice(2).replace(/\.html$/, '/')}`);
    } else if (href.startsWith('./') && href.includes('.html#')) {
      const [path, anchor] = href.slice(2).split('#');
      a.setAttribute('href', `/blog/${path.replace(/\.html$/, '/')}#${anchor}`);
    } else if (href === '../index.html' || href === '../') {
      a.setAttribute('href', '/');
    } else if (href === '../about.html') {
      a.setAttribute('href', '/about/');
    } else if (href === '../blog/' || href === './index.html') {
      a.setAttribute('href', '/blog/');
    } else if (href.startsWith('../')) {
      a.setAttribute('href', '/' + href.replace(/^\.\.\//, '').replace(/\.html$/, '/'));
    }
  });

  let bodyMd = td.turndown(contentEl.innerHTML).trim();

  // Sources
  const sourcesEl = root.querySelector('.article-sources');
  let sourcesMd = '';
  if (sourcesEl) {
    const items = sourcesEl.querySelectorAll('li').map((li) => {
      const a = li.querySelector('a');
      if (!a) return null;
      const href = a.getAttribute('href') ?? '';
      const text = a.textContent.trim();
      return `- [${text}](${href})`;
    }).filter(Boolean);
    if (items.length) {
      sourcesMd = `\n\n## 出典・参考\n\n${items.join('\n')}\n`;
    }
  }

  // FAQ
  const faqEl = root.querySelector('.article__faq');
  let faqMd = '';
  if (faqEl) {
    const pairs = faqEl.querySelectorAll('details').map((d) => {
      const summary = d.querySelector('summary')?.textContent.trim() ?? '';
      const p = d.querySelector('p')?.textContent.trim() ?? '';
      return summary && p ? `**Q. ${summary}**\n\n${p}` : null;
    }).filter(Boolean);
    if (pairs.length) {
      faqMd = `\n\n## よくある質問\n\n${pairs.join('\n\n')}\n`;
    }
  }

  const finalMd = bodyMd + sourcesMd + faqMd;

  // 読了時間
  const rt = readingTime(finalMd.replace(/<[^>]+>/g, ''));
  const readingMinutes = Math.max(1, Math.round(rt.minutes));

  // Frontmatter
  const escape = (s) => (s ?? '').replace(/"/g, '\\"');
  const fm = [
    '---',
    `title: "${escape(title)}"`,
    `description: "${escape(description)}"`,
    `publishedAt: "${publishedAt}"`,
    `updatedAt: "${updatedAt}"`,
    category ? `category: "${escape(category)}"` : null,
    tags.length ? `tags:\n${tags.map((t) => `  - "${escape(t)}"`).join('\n')}` : null,
    series ? `series: "${escape(series)}"` : null,
    `slug: "${slug}"`,
    `readingTime: ${readingMinutes}`,
    '---',
    '',
  ]
    .filter((l) => l !== null)
    .join('\n');

  const outPath = join(OUT_DIR, `${slug}.mdx`);
  writeFileSync(outPath, `${fm}\n${finalMd}\n`, 'utf-8');

  return { slug, title, publishedAt, readingMinutes, tags };
}

// ---------- 実行 ----------
const files = readdirSync(LEGACY_DIR).filter((f) => f.endsWith('.html') && f !== 'index.html');
const results = [];
for (const f of files) {
  try {
    const r = convertOne(f);
    if (r) {
      results.push(r);
      console.log(`✓ ${r.slug}  (${r.readingMinutes}min, ${r.tags.length} tags)`);
    }
  } catch (err) {
    console.error(`✗ ${f}: ${err.message}`);
  }
}
console.log(`\n${results.length}/${files.length} 件を変換しました → ${OUT_DIR}/`);
