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
