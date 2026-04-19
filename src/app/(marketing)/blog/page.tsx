import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { getAllPosts } from '@/lib/content/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'AI、自己理解、プロダクト開発について、GrowthLab が綴るブログ。',
  alternates: { canonical: '/blog/' },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <Section spacing="lg">
      <Container width="wide">
        <h1 className="font-display text-3xl font-semibold">Blog</h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          AI、自己理解、プロダクト開発について。個人開発者としての等身大の記録。
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex flex-wrap gap-1.5">
                {post.category ? (
                  <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[0.65rem] font-medium text-primary">
                    {post.category}
                  </span>
                ) : (
                  post.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-primary-soft px-2 py-0.5 text-[0.65rem] font-medium text-primary"
                    >
                      {t}
                    </span>
                  ))
                )}
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted line-clamp-3">
                {post.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-6 text-xs text-text-faint">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                {post.readingTime && <span>{post.readingTime} 分</span>}
              </div>
            </Link>
          ))}
        </div>

      </Container>
    </Section>
  );
}
