import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import s from '@/components/marketing/editorial/editorial.module.css';
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

function fmt(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
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
      <div className={s.root}>
        <Container width="narrow">
          <p className={s.masthead}>
            <Link href="/blog/" className={s.postBack}>
              ← 記事の一覧へ
            </Link>
            {post.category && <span style={{ color: 'var(--warm)' }}>{post.category}</span>}
          </p>

          <h1 className={s.title} style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.5rem)', lineHeight: 1.5 }}>
            {post.title}
          </h1>

          {post.description && <p className={s.lead}>{post.description}</p>}

          <div className={s.postMeta}>
            <time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span>更新 {fmt(post.updatedAt)}</span>
            )}
            {post.readingTime && <span>{post.readingTime} 分で読めます</span>}
          </div>

          <hr style={{ margin: '28px 0 32px', border: 0, borderTop: '1px solid var(--rule)' }} />

          <article className={s.article}>
            <MDXRenderer source={post.content} />
          </article>

          {/* Liquid Glass のフローティング目次
              - 見出し 3 つ以上の記事でのみ表示
              - クライアントコンポーネント（article の後ろに置いても fixed 配置となる） */}
          <FloatingToc />

          {related.length > 0 && (
            <section>
              <div className={s.secHead}>
                <span className={s.secNo}>—</span>
                <span>関連する記事</span>
              </div>
              <div className={s.toc}>
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}/`} className={s.tocRow} style={{ gridTemplateColumns: '84px minmax(0, 1fr)' }}>
                    <span className={s.tocCat}>{p.category || '記事'}</span>
                    <span className={s.tocMain}>
                      <span className={s.tocTitle}>{p.title}</span>
                      {p.description && <span className={s.tocDesc}>{p.description}</span>}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div style={{ marginTop: 48 }}>
            <Link href="/blog/" className={s.link}>
              ← 記事の一覧へ
            </Link>
          </div>
        </Container>
      </div>
    </Section>
  );
}
