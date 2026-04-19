// @ts-check
/**
 * GitHub Pages（static export）向けの 301 代替としての
 * メタリフレッシュ HTML を out/ に配置するスクリプト。
 *
 * 旧 URL:
 *   /bookcompass.html, /trainnote.html,
 *   /about.html, /support.html, /privacy.html,
 *   /blog/<slug>.html
 *
 * 新 URL へ 0 秒でメタリフレッシュ + canonical 指定。
 *
 * `pnpm build:export` 後に自動実行される（package.json 参照）。
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const OUT = 'out';
if (!existsSync(OUT)) {
  console.error(`[postbuild-redirects] "${OUT}" が見つかりません。next build (export) を先に実行してください。`);
  process.exit(1);
}

const blogSlugs = [
  'ai-brain-fry-workload-creep',
  'ai-coding-agent-comparison-2026',
  'ai-cognitive-offloading',
  'ai-critical-thinking',
  'ai-habit-guide',
  'ai-healthy-work-guide',
  'ai-self-understanding-data',
  'ai-trainer-vs-human',
  'ai-workslop-bottleneck',
  'claude-code-auto-mode',
  'fitness-ai-record',
  'gemini-api-spend-cap-april-2026',
  'gemini-chat-import',
  'indie-dev-ai-implementation',
  'lifedata-self-understanding',
  'llm-benchmark-guide-advanced',
  'llm-benchmark-guide-basics',
  'perplexity-computer-guide',
  'reading-ai-habit',
];

const redirects = [
  { from: 'bookcompass.html', to: '/products/bookcompass/' },
  { from: 'trainnote.html', to: '/products/trainnote/' },
  { from: 'about.html', to: '/about/' },
  { from: 'support.html', to: '/support/' },
  { from: 'privacy.html', to: '/privacy/' },
  { from: 'blog/index.html', to: '/blog/' },
  ...blogSlugs.map((s) => ({ from: `blog/${s}.html`, to: `/blog/${s}/` })),
];

function metaRefreshHtml(target) {
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>移動しました</title>
    <link rel="canonical" href="${target}" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <meta name="robots" content="noindex" />
  </head>
  <body>
    <p>ページは <a href="${target}">${target}</a> に移動しました。自動で転送されない場合はリンクをクリックしてください。</p>
    <script>location.replace(${JSON.stringify(target)});</script>
  </body>
</html>`;
}

for (const { from, to } of redirects) {
  const filePath = join(OUT, from);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, metaRefreshHtml(to), 'utf-8');
}

console.log(`[postbuild-redirects] ${redirects.length} 件のメタリフレッシュ HTML を出力しました。`);
