'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { BlogPostMeta } from '@/lib/content/blog';

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
    <div className="mt-10">
      {/* カテゴリタブ */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="カテゴリで絞り込み">
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

      {/* タグ行 */}
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-faint">タグ:</span>
          {tags.map((t) => {
            const active = tag === t.name;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => setTag(active ? null : t.name)}
                className={cn(
                  'rounded-full border px-2.5 py-0.5 text-xs transition',
                  active
                    ? 'border-primary/60 bg-primary-soft text-primary'
                    : 'border-border bg-surface text-text-muted hover:border-primary/40 hover:text-primary',
                )}
                aria-pressed={active}
              >
                #{t.name}
                <span className="ml-1 text-[0.65rem] text-text-faint">{t.count}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* アーカイブ + リセット行 */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-text-faint">公開月:</span>
        {archives.map((a) => {
          const active = archive === a.ym;
          return (
            <button
              key={a.ym}
              type="button"
              onClick={() => setArchive(active ? null : a.ym)}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs transition',
                active
                  ? 'border-primary/60 bg-primary-soft text-primary'
                  : 'border-border bg-surface text-text-muted hover:border-primary/40 hover:text-primary',
              )}
              aria-pressed={active}
            >
              {a.label}
              <span className="ml-1 text-[0.65rem] text-text-faint">{a.count}</span>
            </button>
          );
        })}
        {hasActiveFilter && (
          <button
            type="button"
            onClick={resetAll}
            className="ml-auto rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-text-muted transition hover:border-primary/40 hover:text-primary"
          >
            絞り込みをリセット
          </button>
        )}
      </div>

      {/* 結果サマリ */}
      <p className="mt-6 text-xs text-text-faint">
        {filtered.length} / {posts.length} 件
      </p>

      {/* 記事グリッド */}
      {filtered.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-text-muted">
          条件に合う記事が見つかりませんでした。
        </div>
      ) : (
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
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
      )}
    </div>
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
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition',
        active
          ? 'border-primary bg-primary text-white shadow-sm'
          : 'border-border bg-surface text-text-muted hover:border-primary/40 hover:text-primary',
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          'rounded-full px-1.5 text-[0.65rem] font-medium',
          active ? 'bg-white/20 text-white' : 'bg-primary-soft text-primary',
        )}
      >
        {count}
      </span>
    </button>
  );
}
