import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site/config';
import { getAllPosts } from '@/lib/content/blog';

// static export でも sitemap.xml を出力できるように
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');

  // 静的ページの lastModified はビルド時刻を使うと毎デプロイで全URLが変動してしまい、
  // GSC の「インデックス未登録」シグナルを悪化させ得る。代わりに blog 記事の最新 updatedAt を
  // サイト全体の代表更新日として使い、揺れを抑える。
  const posts = getAllPosts();
  const latestPostDate = posts.reduce<Date>((acc, post) => {
    const d = new Date(post.updatedAt || post.publishedAt);
    return d > acc ? d : acc;
  }, new Date(0));
  const staticLastModified = latestPostDate.getTime() === 0 ? new Date() : latestPostDate;

  const staticPaths = [
    '/',
    '/products/doublehub/',
    '/products/bookcompass/',
    '/products/trainnote/',
    '/products/hubwallet/',
    '/blog/',
    '/about/',
    '/support/',
    '/app-linking/',
    '/privacy/',
    '/privacy/doublehub/',
    '/privacy/trainnote/',
    '/privacy/bookcompass/',
    '/privacy/hubwallet/',
  ];
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    // trailingSlash: true と揃えるため、ホームも `/` 末尾を維持。
    url: p === '/' ? `${base}/` : `${base}${p}`,
    lastModified: staticLastModified,
    changeFrequency: p === '/' ? 'weekly' : 'monthly',
    priority: p === '/' ? 1 : 0.7,
  }));
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}/`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));
  return [...staticEntries, ...postEntries];
}
