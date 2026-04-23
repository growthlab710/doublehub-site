/**
 * DoubleHub Next.js 設定
 *
 * 2 つのホスティングモードに対応:
 * - static: GitHub Pages 向け (`NEXT_PUBLIC_HOSTING_MODE=static`, `NEXT_OUTPUT_MODE=export`)
 * - dynamic: Cloudflare Pages 向け（標準の Node ランタイム動作）
 *
 * 環境変数:
 *   NEXT_OUTPUT_MODE=export ... next build を静的エクスポートとして動作させる
 *   NEXT_PUBLIC_HOSTING_MODE=static|dynamic ... フロント側のガード分岐に利用
 */

const isExport = process.env.NEXT_OUTPUT_MODE === 'export';

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
};

module.exports = nextConfig;
