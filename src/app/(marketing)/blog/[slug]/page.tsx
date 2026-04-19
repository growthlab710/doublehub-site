import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { getAllSlugs, getPostBySlug } from '@/lib/content/blog';

/**
 * 個別ブログ記事ページ。
 * Day 1: メタ情報のみ + 「記事本文は移行作業中」プレースホルダ
 * Day 2: MDX 本文を差し込み
 */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: [...post.tags],
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section spacing="lg">
      <Container width="narrow">
        <Link
          href="/blog/"
          className="text-xs text-text-muted transition hover:text-primary"
        >
          ← Blog 一覧に戻る
        </Link>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-primary-soft px-2 py-0.5 text-[0.65rem] font-medium text-primary"
            >
              {t}
            </span>
          ))}
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-xs text-text-faint">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.readingTime && <span>{post.readingTime} 分</span>}
        </div>

        <div className="mt-10 rounded-xl border border-dashed border-border bg-surface-2/40 p-6 text-sm text-text-muted">
          <p>
            ⚠️ 本記事の本文は MDX 移行作業中です（Day 2 で完了予定）。
            それまでの間は、旧サイトの記事をご覧ください：
          </p>
          <p className="mt-4">
            <a
              href={`/blog/${slug}.html`}
              className="text-primary underline-offset-4 hover:underline"
            >
              旧版ページ（HTML）で記事を読む →
            </a>
          </p>
          <p className="mt-6 text-text-muted">
            <strong className="text-text">サマリー:</strong> {post.description}
          </p>
        </div>
      </Container>
    </Section>
  );
}
