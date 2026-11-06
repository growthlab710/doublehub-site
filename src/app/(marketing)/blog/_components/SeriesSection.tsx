import Link from 'next/link';
import type { SeriesGroup } from '@/lib/content/blog';
import { SERIES_META } from '@/lib/content/series-meta';
import s from '@/components/marketing/editorial/editorial.module.css';

interface SeriesSectionProps {
  groups: SeriesGroup[];
}

const dateFmt = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * 連載シリーズ（誌面のデザイン）。
 * - 罫線で区切った段に、シリーズ名・1 行のキャッチ・説明を並べる
 * - 段全体のリンクは第 1 回へ（順番に読ませる導線）。最新回の日付をメタ行に表示
 */
export function SeriesSection({ groups }: SeriesSectionProps) {
  if (groups.length === 0) return null;
  const cols = Math.min(groups.length, 3);

  return (
    <section aria-labelledby="series-heading">
      <div className={s.secHead}>
        <span className={s.secNo}>01</span>
        <span id="series-heading">連載</span>
        <span className={s.secHeadAside}>第1回から順番に読むのがおすすめです</span>
      </div>
      <div className={`${s.cols} ${s.cols3}`} style={{ ['--cols' as string]: cols }}>
        {groups.map((g) => {
          const meta = SERIES_META[g.name];
          const first = g.posts[0];
          const latest = g.posts[g.posts.length - 1];
          return (
            <Link key={g.name} href={`/blog/${first.slug}/`} className={s.col}>
              <div className={s.colKicker}>{meta?.tagline ?? '連載'}</div>
              <h3 className={s.colTitle}>{g.name}</h3>
              <p className={s.colText}>{meta?.description ?? first.description}</p>
              <div className={s.colMeta}>
                <span>
                  全{g.posts.length}回・最新 <time dateTime={latest.publishedAt}>{dateFmt(latest.publishedAt)}</time>
                </span>
                <span className={s.more}>第1回から読む</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
