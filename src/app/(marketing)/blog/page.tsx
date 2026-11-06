import type { Metadata } from 'next';
import {
  getAllPosts,
  getArchiveBuckets,
  getCategoryCounts,
  getSeriesGroups,
  getTagCounts,
} from '@/lib/content/blog';
import s from '@/components/marketing/editorial/editorial.module.css';
import { BlogExplorer } from './_components/BlogExplorer';
import { SeriesSection } from './_components/SeriesSection';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    '幸せと記録についての考え、AI の動き、個人開発の実践知。DoubleHub の開発者 Naoki が綴るブログ。',
  alternates: { canonical: '/blog/' },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const categories = getCategoryCounts();
  const tags = getTagCounts(12);
  const archives = getArchiveBuckets();
  const seriesGroups = getSeriesGroups();

  return (
    <div className={`${s.root} ${s.page}`}>
      <div className={s.wrap}>
        <p className={s.masthead}>
          <span>幸せのコンテキストを、あなたの側に</span>
          <span className={s.mastheadLatin}>Blog</span>
        </p>
        <h1 className={s.title}>記事</h1>
        <p className={s.lead}>
          幸せと記録についての考え、AI の動き、個人開発の実践知。個人開発者としての等身大の記録です。
        </p>

        <SeriesSection groups={seriesGroups} />

        <BlogExplorer posts={posts} categories={categories} tags={tags} archives={archives} />
      </div>
    </div>
  );
}
