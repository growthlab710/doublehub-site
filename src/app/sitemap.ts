import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site/config';
import { getAllPosts } from '@/lib/content/blog';

// static export でも sitemap.xml を出力できるように
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const staticPaths = [
    '',
    '/products/doublehub/',
    '/products/bookcompass/',
    '/products/trainnote/',
    '/blog/',
    '/about/',
    '/support/',
    '/privacy/',
  ];
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));
  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}/`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));
  return [...staticEntries, ...postEntries];
}
