import Link from 'next/link';
import type { SeriesGroup } from '@/lib/content/blog';
import { SERIES_META } from '@/lib/content/series-meta';

interface SeriesSectionProps {
  groups: SeriesGroup[];
}

const dateFmt = (iso: string) =>
  new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' });

/**
 * 連載シリーズ集約ビュー（コンパクト版）。
 * - 全話リストは出さず、シリーズ名＋1行キャッチ＋説明で「何の連載か」を即伝える
 * - カード全体のリンクは第1回へ（順番に読ませる導線）。最新回の日付をメタ行に表示
 * - モバイルは横スクロール（snap）、md 以上は 3 カラム 1 段に収める
 */
export function SeriesSection({ groups }: SeriesSectionProps) {
  if (groups.length === 0) return null;

  return (
    <section aria-labelledby="series-heading" className="mt-10">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="series-heading" className="font-display text-xl font-semibold">
          連載シリーズ
        </h2>
        <p className="text-xs text-text-faint">第1回から順番に読むのがおすすめです</p>
      </div>

      <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {groups.map((g) => {
          const meta = SERIES_META[g.name];
          const first = g.posts[0];
          const latest = g.posts[g.posts.length - 1];
          return (
            <Link
              key={g.name}
              href={`/blog/${first.slug}/`}
              className="group flex min-w-[16rem] snap-start flex-col rounded-xl border border-border bg-surface p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg md:min-w-0"
            >
              <p className="text-[0.7rem] font-medium text-primary">
                {meta?.tagline ?? '連載シリーズ'}
              </p>
              <h3 className="mt-1 font-display text-sm font-semibold leading-snug group-hover:text-primary">
                {g.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-text-muted line-clamp-2">
                {meta?.description ?? first.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-3 text-[0.7rem] text-text-faint">
                <span className="rounded-full bg-primary-soft px-2 py-0.5 font-medium text-primary">
                  全{g.posts.length}回
                </span>
                <span>
                  最新 <time dateTime={latest.publishedAt}>{dateFmt(latest.publishedAt)}</time>
                </span>
                <span className="font-medium text-primary">第1回から読む →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
