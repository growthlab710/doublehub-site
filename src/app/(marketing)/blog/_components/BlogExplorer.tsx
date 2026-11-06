'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { BlogPostMeta } from '@/lib/content/blog';
import s from '@/components/marketing/editorial/editorial.module.css';

/** 公開からこの日数以内は NEW バッジ＋相対日付で表示 */
const NEW_WINDOW_DAYS = 14;

function daysSince(iso: string, now: number): number {
  return Math.floor((now - new Date(iso).getTime()) / 86_400_000);
}

/** マウント後（now あり）は直近を相対表記、それ以外は絶対日付 */
function formatPublished(iso: string, now: number | null): string {
  if (now !== null) {
    const d = daysSince(iso, now);
    if (d === 0) return '今日';
    if (d === 1) return '昨日';
    if (d >= 2 && d < NEW_WINDOW_DAYS) return `${d}日前`;
  }
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

interface CategoryCount {
  name: string;
  count: number;
}

interface TagCount {
  name: string;
  count: number;
}

interface ArchiveBucket {
  ym: string;
  label: string;
  count: number;
}

interface BlogExplorerProps {
  posts: BlogPostMeta[];
  categories: CategoryCount[];
  tags: TagCount[];
  archives: ArchiveBucket[];
}

const ALL = '__all__';

/**
 * ブログ一覧の参照性強化コンポーネント。
 * - カテゴリタブ（件数バッジ付き）
 * - タグチップ（上位のみ）
 * - 年月アーカイブ（折りたたみ）
 * - クライアントサイド絞り込み（URL hash と同期はせず、軽量に React state のみ）
 */
export function BlogExplorer({ posts, categories, tags, archives }: BlogExplorerProps) {
  const [category, setCategory] = useState<string>(ALL);
  const [tag, setTag] = useState<string | null>(null);
  const [archive, setArchive] = useState<string | null>(null);
  // NEW バッジ・相対日付は静的ビルド時刻でなく閲覧時刻で判定する（SSR とのミスマッチ回避のためマウント後に有効化）
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (category !== ALL && p.category !== category) return false;
      if (tag && !p.tags.includes(tag)) return false;
      if (archive && !p.publishedAt.startsWith(archive)) return false;
      return true;
    });
  }, [posts, category, tag, archive]);

  const resetAll = () => {
    setCategory(ALL);
    setTag(null);
    setArchive(null);
  };

  const hasActiveFilter = category !== ALL || tag !== null || archive !== null;

  return (
    <section aria-labelledby="posts-heading">
      <div className={s.secHead}>
        <span className={s.secNo}>02</span>
        <span id="posts-heading">記事の一覧</span>
        <span className={s.secHeadAside}>
          {filtered.length} / {posts.length} 件
        </span>
      </div>

      {/* カテゴリ */}
      <div className={s.filters} role="tablist" aria-label="カテゴリで絞り込み">
        <span className={s.filterLabel}>カテゴリ</span>
        <CategoryChip
          label="すべて"
          count={posts.length}
          active={category === ALL}
          onClick={() => setCategory(ALL)}
        />
        {categories.map((c) => (
          <CategoryChip
            key={c.name}
            label={c.name}
            count={c.count}
            active={category === c.name}
            onClick={() => setCategory(c.name)}
          />
        ))}
      </div>

      {/* タグ */}
      {tags.length > 0 && (
        <div className={s.filters}>
          <span className={s.filterLabel}>タグ</span>
          {tags.map((t) => {
            const active = tag === t.name;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => setTag(active ? null : t.name)}
                className={cn(s.filter, active && s.filterActive)}
                aria-pressed={active}
              >
                #{t.name}
                <span className={s.filterCount}>{t.count}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 公開月 */}
      <div className={s.filters}>
        <span className={s.filterLabel}>公開月</span>
        {archives.map((a) => {
          const active = archive === a.ym;
          return (
            <button
              key={a.ym}
              type="button"
              onClick={() => setArchive(active ? null : a.ym)}
              className={cn(s.filter, active && s.filterActive)}
              aria-pressed={active}
            >
              {a.label}
              <span className={s.filterCount}>{a.count}</span>
            </button>
          );
        })}
        {hasActiveFilter && (
          <button type="button" onClick={resetAll} className={cn(s.filter, s.link)}>
            絞り込みをリセット
          </button>
        )}
      </div>

      {/* 一覧（目次の形） */}
      {filtered.length === 0 ? (
        <p className={s.small} style={{ marginTop: 32 }}>
          条件に合う記事が見つかりませんでした。
        </p>
      ) : (
        <div className={s.toc} style={{ marginTop: 28 }}>
          {filtered.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} className={s.tocRow}>
              <span className={s.tocDate}>
                <time dateTime={post.publishedAt}>{formatPublished(post.publishedAt, now)}</time>
                {now !== null && daysSince(post.publishedAt, now) < NEW_WINDOW_DAYS && (
                  <span className={s.tocNew}>NEW</span>
                )}
              </span>
              <span className={s.tocCat}>{post.category ?? post.tags[0] ?? ''}</span>
              <span className={s.tocMain}>
                <span className={s.tocTitle}>{post.title}</span>
                {post.description && <span className={s.tocDesc}>{post.description}</span>}
              </span>
              <span className={s.tocMin}>{post.readingTime ? `${post.readingTime} 分` : ''}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

interface CategoryChipProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

function CategoryChip({ label, count, active, onClick }: CategoryChipProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(s.filter, active && s.filterActive)}
    >
      {label}
      <span className={s.filterCount}>{count}</span>
    </button>
  );
}
