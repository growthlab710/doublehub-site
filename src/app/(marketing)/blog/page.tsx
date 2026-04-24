import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import {
  getAllPosts,
  getArchiveBuckets,
  getCategoryCounts,
  getSeriesGroups,
  getTagCounts,
} from '@/lib/content/blog';
import { BlogExplorer } from './_components/BlogExplorer';
import { SeriesSection } from './_components/SeriesSection';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'AI、自己理解、プロダクト開発について、GrowthLab が綴るブログ。',
  alternates: { canonical: '/blog/' },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const categories = getCategoryCounts();
  const tags = getTagCounts(12);
  const archives = getArchiveBuckets();
  const seriesGroups = getSeriesGroups();

  return (
    <Section spacing="lg">
      <Container width="wide">
        <h1 className="font-display text-3xl font-semibold">Blog</h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          AI、自己理解、プロダクト開発について。個人開発者としての等身大の記録。
        </p>

        {/* 連載シリーズ集約 */}
        <SeriesSection groups={seriesGroups} />

        {/* カテゴリ / タグ / アーカイブによる絞り込み + 一覧 */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-xl font-semibold">記事一覧</h2>
            <p className="text-xs text-text-faint">
              カテゴリ・タグ・公開月で絞り込めます
            </p>
          </div>
          <BlogExplorer
            posts={posts}
            categories={categories}
            tags={tags}
            archives={archives}
          />
        </div>
      </Container>
    </Section>
  );
}
