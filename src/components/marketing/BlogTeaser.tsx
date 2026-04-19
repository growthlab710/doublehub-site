import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { getLatestPosts } from '@/lib/content/blog';

export function BlogTeaser() {
  const posts = getLatestPosts(3);
  return (
    <Section spacing="lg">
      <Container width="wide">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Blog
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,1rem+2.5vw,2.75rem)] font-semibold">
              最新の記事
            </h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog/">
              すべて見る <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-primary-soft px-2 py-0.5 text-[0.65rem] font-medium text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted line-clamp-3">
                {post.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-6 text-xs text-text-faint">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
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
