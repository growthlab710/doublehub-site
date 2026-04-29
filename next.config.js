/**
 * DoubleHub Next.js 設定
 *
 * 2 つのホスティングモードに対応:
 * - static: GitHub Pages 向け (`NEXT_PUBLIC_HOSTING_MODE=static`, `NEXT_OUTPUT_MODE=export`)
 * - dynamic: Vercel / Cloudflare Pages 向け（標準の Node ランタイム動作）
 *
 * 環境変数:
 *   NEXT_OUTPUT_MODE=export ... next build を静的エクスポートとして動作させる
 *   NEXT_PUBLIC_HOSTING_MODE=static|dynamic ... フロント側のガード分岐に利用
 */

const isExport = process.env.NEXT_OUTPUT_MODE === 'export';

// 旧 HTML URL（GSC に過去登録されている可能性あり）→ 新 URL の 301 リダイレクト一覧
// `_redirects`（Cloudflare Pages 用）と `scripts/postbuild-redirects.mjs`（GitHub Pages 用）と
// 並列で、Vercel 等の dynamic ホストでも同じ転送が効くよう Next.js の redirects() で定義する。
const legacyBlogSlugs = [
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

const legacyRedirects = [
  { source: '/bookcompass.html', destination: '/products/bookcompass/' },
  { source: '/trainnote.html', destination: '/products/trainnote/' },
  { source: '/about.html', destination: '/about/' },
  { source: '/support.html', destination: '/support/' },
  { source: '/privacy.html', destination: '/privacy/' },
  { source: '/blog/index.html', destination: '/blog/' },
  ...legacyBlogSlugs.map((s) => ({
    source: `/blog/${s}.html`,
    destination: `/blog/${s}/`,
  })),
].map((r) => ({ ...r, permanent: true }));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // static export は画像最適化 API が使えないため全面 unoptimized 扱い
  images: isExport
    ? { unoptimized: true }
    : {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
          // Supabase Storage などから画像を読む将来を想定
          { protocol: 'https', hostname: '**.supabase.co' },
        ],
      },
  // 末尾スラッシュで統一（/products/bookcompass/ 等）
  trailingSlash: true,
  ...(isExport ? { output: 'export' } : {}),
  // 型エラーはビルドを通しつつローカルで拾う
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    // Framer Motion 等のバンドル最適化
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // dynamic ホスト（Vercel / Cloudflare Pages の Node モード）でのみ redirects() が機能する。
  // 静的エクスポート時はビルド警告を避けるため省略。
  ...(isExport
    ? {}
    : {
        async redirects() {
          return legacyRedirects;
        },
      }),
};

module.exports = nextConfig;
