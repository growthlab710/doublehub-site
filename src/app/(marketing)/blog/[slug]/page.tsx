import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { MDXRenderer } from '@/components/marketing/MDXRenderer';
import { FloatingToc } from '@/components/marketing/FloatingToc';
import { getAllSlugs, getPostBySlug, getLatestPosts } from '@/lib/content/blog';
import { siteConfig } from '@/lib/site/config';

export const dynamicParams = false;

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
    keywords: post.tags.length ? [...post.tags] : undefined,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `/blog/${slug}/`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: [...post.tags],
      authors: ['Naoki'],
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    other: post.category ? { 'article:section': post.category } : undefined,
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // 関連記事: 同カテゴリ > 公開日近傍 で最大 3 件
  const related = getLatestPosts(20)
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aScore = (a.category === post.category ? 10 : 0);
      const bScore = (b.category === post.category ? 10 : 0);
      return bScore - aScore;
    })
    .slice(0, 3);

  // AIO/SEO 用の構造化データ（Article + BreadcrumbList + FAQPage）
  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        author: {
          '@type': 'Person',
          name: 'Naoki',
          url: `${siteConfig.url}/about/`,
          description: 'iOSアプリ個人開発者・DoubleHub作者',
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
          logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/images/og-default.jpg`,
          },
        },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        inLanguage: 'ja-JP',
        ...(post.category ? { articleSection: post.category } : {}),
        ...(post.tags.length ? { keywords: post.tags.join(', ') } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteConfig.url}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${siteConfig.url}/blog/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: canonicalUrl,
          },
        ],
      },
      ...(post.faq && post.faq.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: post.faq.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <Section spacing="lg">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container width="narrow">
        <Link
          href="/blog/"
          className="text-xs text-text-muted transition hover:text-primary"
        >
          ← Blog 一覧に戻る
        </Link>

        {post.category && (
          <div className="mt-4">
            <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[0.7rem] font-medium text-primary">
              {post.category}
            </span>
          </div>
        )}

        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-4 text-base text-text-muted md:text-lg">
            {post.description}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-text-faint">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <>
              <span aria-hidden>·</span>
              <span>
                更新:{' '}
                {new Date(post.updatedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </>
          )}
          {post.readingTime && (
            <>
              <span aria-hidden>·</span>
              <span>{post.readingTime} 分で読めます</span>
            </>
          )}
        </div>

        <hr className="my-8 border-divider" />

        <article>
          <MDXRenderer source={post.content} />
        </article>

        {/* Liquid Glass のフローティング目次
            - 見出し 3 つ以上の記事でのみ表示
            - クライアントコンポーネント（article の後ろに置いても fixed 配置となる） */}
        <FloatingToc />

        {related.length > 0 && (
          <section className="mt-16 border-t border-divider pt-10">
            <h2 className="font-display text-xl font-semibold">関連記事</h2>
            <ul className="mt-6 space-y-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}/`}
                    className="group block rounded-lg border border-border bg-surface p-4 transition hover:border-primary hover:shadow-sm"
                  >
                    <span className="text-[0.7rem] text-text-faint">
                      {p.category || 'Blog'}
                    </span>
                    <h3 className="mt-1 font-medium text-text group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-text-muted">
                      {p.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12">
          <Link
            href="/blog/"
            className="text-xs text-text-muted transition hover:text-primary"
          >
            ← Blog 一覧に戻る
          </Link>
        </div>
      </Container>
    </Section>
  );
}
