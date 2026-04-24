/**
 * ブログ記事メタデータ + MDX 本文ローダー。
 * content/blog/*.mdx を読み込み、frontmatter と本文を提供する。
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO 8601
  updatedAt?: string;
  category?: string;
  tags: string[];
  series?: string;
  readingTime?: number; // 分
}

export interface BlogPost extends BlogPostMeta {
  /** MDX ソース（frontmatter 除く本文） */
  content: string;
}

const CONTENT_DIR = join(process.cwd(), 'content', 'blog');

function readAllMdxFiles(): BlogPost[] {
  let files: string[] = [];
  try {
    files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  } catch {
    return [];
  }

  return files.map((file) => {
    const raw = readFileSync(join(CONTENT_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    const slug = (data.slug as string) || file.replace(/\.mdx$/, '');
    return {
      slug,
      title: data.title ?? '',
      description: data.description ?? '',
      publishedAt: data.publishedAt ?? '',
      updatedAt: data.updatedAt,
      category: data.category,
      tags: Array.isArray(data.tags) ? data.tags : [],
      series: data.series,
      readingTime: data.readingTime,
      content,
    };
  });
}

/** 日付降順で並べ替え */
export function getAllPosts(): BlogPostMeta[] {
  return readAllMdxFiles()
    .map(({ content: _c, ...meta }) => meta)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getLatestPosts(limit = 3): BlogPostMeta[] {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const all = readAllMdxFiles();
  return all.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return readAllMdxFiles().map((p) => p.slug);
}

// ----------------------------------------------------------------------------
// Discoverability helpers — カテゴリ / シリーズ / アーカイブ集計
// ----------------------------------------------------------------------------

export interface CategoryCount {
  name: string;
  count: number;
}

export interface TagCount {
  name: string;
  count: number;
}

export interface SeriesGroup {
  /** シリーズ表示名（例: 「AIオフロード時代の人間の脳」） */
  name: string;
  /** frontmatter series の生文字列（先頭記事のもの） */
  rawLabel: string;
  /** 公開日昇順で並んだ記事群 */
  posts: BlogPostMeta[];
}

export interface ArchiveBucket {
  /** YYYY-MM 形式 */
  ym: string;
  /** 2026年4月 のような表示名 */
  label: string;
  count: number;
}

/**
 * frontmatter の `series` 文字列からシリーズ表示名（「 」内）を抽出する。
 * 例: 'シリーズ「AIオフロード時代の人間の脳」: 第1回 / 第2回' → 'AIオフロード時代の人間の脳'
 * マッチしない場合は元の文字列をそのまま返す。
 */
export function extractSeriesName(raw: string | undefined): string | null {
  if (!raw) return null;
  const m = raw.match(/[「『]([^」』]+)[」』]/);
  return m ? m[1] : raw;
}

/** カテゴリごとの記事数（公開日降順の先頭記事のカテゴリ順で並ぶ） */
export function getCategoryCounts(): CategoryCount[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  for (const p of posts) {
    if (!p.category) continue;
    map.set(p.category, (map.get(p.category) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ja'));
}

/** タグごとの記事数（件数降順） */
export function getTagCounts(limit?: number): TagCount[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  const all = Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ja'));
  return typeof limit === 'number' ? all.slice(0, limit) : all;
}

/**
 * シリーズ別にグループ化する。
 * 2本以上ある series のみを返し、各グループ内は公開日昇順。
 * 返り値自体は「シリーズ内最新記事の公開日」降順で並ぶ。
 */
export function getSeriesGroups(): SeriesGroup[] {
  const posts = getAllPosts();
  const groups = new Map<string, SeriesGroup>();
  for (const p of posts) {
    const name = extractSeriesName(p.series);
    if (!name) continue;
    const existing = groups.get(name);
    if (existing) {
      existing.posts.push(p);
    } else {
      groups.set(name, { name, rawLabel: p.series ?? name, posts: [p] });
    }
  }
  return Array.from(groups.values())
    .filter((g) => g.posts.length >= 2)
    .map((g) => ({
      ...g,
      posts: [...g.posts].sort(
        (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
      ),
    }))
    .sort((a, b) => {
      const latestA = Math.max(...a.posts.map((p) => new Date(p.publishedAt).getTime()));
      const latestB = Math.max(...b.posts.map((p) => new Date(p.publishedAt).getTime()));
      return latestB - latestA;
    });
}

/** 年月アーカイブ（新しい順） */
export function getArchiveBuckets(): ArchiveBucket[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  for (const p of posts) {
    if (!p.publishedAt) continue;
    const ym = p.publishedAt.slice(0, 7); // YYYY-MM
    map.set(ym, (map.get(ym) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0))
    .map(([ym, count]) => {
      const [y, m] = ym.split('-');
      return { ym, label: `${y}年${Number(m)}月`, count };
    });
}
