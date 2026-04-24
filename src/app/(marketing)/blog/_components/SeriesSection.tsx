import Link from 'next/link';
import type { SeriesGroup } from '@/lib/content/blog';

interface SeriesSectionProps {
  groups: SeriesGroup[];
}

/**
 * 連載シリーズ集約ビュー。
 * - シリーズ名をタイトル、記事を一覧として並べる
 * - 公開日昇順で表示し、各記事にリンク
 * - シリーズが 2 本以上ある場合のみ表示（page 側で既にフィルタ済み）
 */
export function SeriesSection({ groups }: SeriesSectionProps) {
  if (groups.length === 0) return null;

  return (
    <section aria-labelledby="series-heading" className="mt-12">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="series-heading" className="font-display text-xl font-semibold">
          連載シリーズ
        </h2>
        <p className="text-xs text-text-faint">
          テーマを深掘りする連続記事。順番に読むのがおすすめです。
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {groups.map((g) => (
          <article
            key={g.name}
            className="rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:border-primary/40 hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-base font-semibold leading-snug">
                {g.name}
              </h3>
              <span className="shrink-0 rounded-full bg-primary-soft px-2 py-0.5 text-[0.65rem] font-medium text-primary">
                全{g.posts.length}回
              </span>
            </div>

            <ol className="mt-4 space-y-2">
              {g.posts.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}/`}
                    className="group flex items-start gap-3 rounded-lg p-2 -mx-2 transition hover:bg-primary-soft/40"
                  >
                    <span className="mt-0.5 shrink-0 rounded-md bg-primary-soft px-1.5 py-0.5 text-[0.65rem] font-semibold text-primary">
                      第{i + 1}回
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium leading-snug text-text group-hover:text-primary">
                        {p.title}
                      </span>
                      <time
                        dateTime={p.publishedAt}
                        className="mt-0.5 block text-[0.7rem] text-text-faint"
                      >
                        {new Date(p.publishedAt).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
