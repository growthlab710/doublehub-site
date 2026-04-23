'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { CategoryBadge, getCategoryDotClass } from '@/components/app/CategoryBadge';
import { supabaseConfig } from '@/lib/env';
import { formatDueDateJST } from '@/lib/format';
import type {
  Todo,
  Memo,
  ExternalSourceAccount,
} from '@/lib/supabase/types-doublehub';
import type { Book } from '@/lib/supabase/types-bookcompass';
import { listTodos } from '@/lib/repositories/todos';
import { listMemos } from '@/lib/repositories/memos';
import { findExternalSource } from '@/lib/repositories/external-sources';
import { listBooks } from '@/lib/repositories/books';
import { cn } from '@/lib/utils';

/**
 * ダッシュボードのサマリグリッド。
 *
 * 3 カラム構成（モバイル 1 / タブレット 2 / デスクトップ 3）:
 *   1. 今日の ToDo（未完了・全カテゴリ混在、カテゴリバッジ付き）
 *   2. 最新のメモ（全カテゴリ混在、カテゴリバッジ付き）
 *   3. BookCompass ミニ本棚（連携済みなら直近の書籍、未連携なら CTA）
 *
 * iOS 側のタブ分離（プライベート / 仕事）はあえてここでは混ぜる。
 * 「ハブ画面」として全体感を掴むための場所、という位置付け。
 */
export function DashboardWidgets() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [totalTodos, setTotalTodos] = useState(0);
  const [totalMemos, setTotalMemos] = useState(0);
  const [bcLink, setBcLink] = useState<ExternalSourceAccount | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const envOk = supabaseConfig.doublehub.ok;
  const bookCompassEnvOk = supabaseConfig.bookcompass.ok;

  useEffect(() => {
    if (!envOk) {
      setLoading(false);
      return;
    }
    let mounted = true;
    void (async () => {
      try {
        const [t, m] = await Promise.all([
          listTodos({ filter: 'active', category: 'all', limit: 5 }),
          listMemos({ category: 'all', limit: 3 }),
        ]);
        if (!mounted) return;
        setTodos(t);
        setMemos(m);

        // 件数表示用のカウントは軽めの 2 回目の呼び出しで取得（高速化のため limit 100）。
        try {
          const [tAll, mAll] = await Promise.all([
            listTodos({ filter: 'active', category: 'all', limit: 100 }),
            listMemos({ category: 'all', limit: 100 }),
          ]);
          if (!mounted) return;
          setTotalTodos(tAll.length);
          setTotalMemos(mAll.length);
        } catch {
          // 件数は主要情報ではないので無視。
        }
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : '読込に失敗しました');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [envOk]);

  // BookCompass 連携の確認と、連携済みなら本棚プレビュー。
  useEffect(() => {
    if (!envOk || !bookCompassEnvOk) return;
    let mounted = true;
    void (async () => {
      try {
        const link = await findExternalSource('bookcompass');
        if (!mounted) return;
        setBcLink(link);
        if (link && link.link_status === 'active') {
          try {
            const bs = await listBooks({ status: 'reading', limit: 4 });
            if (!mounted) return;
            setBooks(bs);
          } catch {
            // 取得失敗は空配列で空状態を出す。
          }
        }
      } catch {
        // 未連携は空のまま。
      }
    })();
    return () => {
      mounted = false;
    };
  }, [envOk, bookCompassEnvOk]);

  return (
    <section
      aria-label="ダッシュボードサマリ"
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
    >
      {/* --- 今日の ToDo --- */}
      <SummaryCard
        heading="未完了の ToDo"
        href="/app/doublehub/"
        hrefLabel="一覧へ"
        count={totalTodos}
        countLabel="件"
        iconEmoji="✅"
      >
        {!envOk ? (
          <EmptyState text="Supabase 環境変数が未設定です。" />
        ) : loading ? (
          <ul className="space-y-2">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </ul>
        ) : todos.length === 0 ? (
          <EmptyState text="未完了の ToDo はありません 🎉" />
        ) : (
          <ul className="space-y-1.5">
            {todos.map((t) => (
              <li
                key={t.id}
                className="flex items-start gap-2 rounded-lg border border-border bg-bg/40 px-3 py-2 text-sm"
              >
                <span
                  className={cn(
                    'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                    getCategoryDotClass(t.category)
                  )}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{t.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <CategoryBadge category={t.category} size="xs" />
                    {formatDueDateJST(t.due_date) && (
                      <Badge variant="outline" className="text-[9px]">
                        期限 {formatDueDateJST(t.due_date)}
                      </Badge>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SummaryCard>

      {/* --- 最新のメモ --- */}
      <SummaryCard
        heading="最新のメモ"
        href="/app/doublehub/"
        hrefLabel="メモへ"
        count={totalMemos}
        countLabel="件"
        iconEmoji="📝"
      >
        {!envOk ? (
          <EmptyState text="Supabase 環境変数が未設定です。" />
        ) : loading ? (
          <ul className="space-y-2">
            {[0, 1].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </ul>
        ) : memos.length === 0 ? (
          <EmptyState text="メモはまだありません" />
        ) : (
          <ul className="space-y-1.5">
            {memos.map((m) => (
              <li
                key={m.id}
                className="rounded-lg border border-border bg-bg/40 px-3 py-2"
              >
                <p className="line-clamp-2 whitespace-pre-wrap break-words text-xs text-text">
                  {m.content}
                </p>
                <div className="mt-2">
                  <CategoryBadge category={m.category} size="xs" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </SummaryCard>

      {/* --- BookCompass 本棚プレビュー --- */}
      <SummaryCard
        heading="BookCompass"
        href={
          bcLink && bcLink.link_status === 'active'
            ? '/app/bookcompass/'
            : '/app/settings/'
        }
        hrefLabel={
          bcLink && bcLink.link_status === 'active' ? '本棚へ' : '連携する'
        }
        iconEmoji="📚"
        accent="bookcompass"
      >
        {!envOk ? (
          <EmptyState text="Supabase 環境変数が未設定です。" />
        ) : !bookCompassEnvOk ? (
          <EmptyState text="BookCompass の環境変数が未設定です。" />
        ) : !bcLink || bcLink.link_status !== 'active' ? (
          <div className="rounded-lg border border-dashed border-border bg-bg/40 p-4 text-xs text-text-muted">
            <p>
              BookCompass と連携すると、ここに「いま読んでいる本」がプレビュー表示されます。
            </p>
            <Link
              href="/app/settings/"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              設定から連携する →
            </Link>
          </div>
        ) : books.length === 0 ? (
          <EmptyState text="いま読んでいる本はまだありません" />
        ) : (
          <ul className="grid grid-cols-2 gap-2">
            {books.slice(0, 4).map((b) => (
              <li
                key={b.id}
                className="flex gap-2 rounded-lg border border-border bg-bg/40 p-2"
              >
                {b.cover_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={b.cover_url}
                    alt=""
                    className="h-12 w-8 shrink-0 rounded border border-border object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-12 w-8 shrink-0 items-center justify-center rounded border border-border bg-surface-2 text-[10px] text-text-faint">
                    📖
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold leading-tight">
                    {b.title}
                  </p>
                  {b.author && (
                    <p className="mt-0.5 truncate text-[10px] text-text-faint">
                      {b.author}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </SummaryCard>

      {error && (
        <p
          role="alert"
          className="col-span-full text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 内部コンポーネント                                                          */
/* -------------------------------------------------------------------------- */

function SummaryCard({
  heading,
  href,
  hrefLabel,
  children,
  count,
  countLabel,
  iconEmoji,
  accent,
}: {
  heading: string;
  href: string;
  hrefLabel: string;
  children: React.ReactNode;
  count?: number;
  countLabel?: string;
  iconEmoji?: string;
  /** 上部アクセントバーの配色。省略時は primary。 */
  accent?: 'primary' | 'bookcompass' | 'trainnote';
}) {
  const accentClass =
    accent === 'bookcompass'
      ? 'from-[var(--bc-accent)]/60 via-[var(--bc-accent)]/20'
      : accent === 'trainnote'
        ? 'from-[var(--tn-cyan)]/50 via-[var(--tn-cyan)]/10'
        : 'from-primary/50 via-primary/10';

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      {/* カード上端のほのかなアクセントライン */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent',
          accentClass
        )}
        aria-hidden
      />
      <div className="p-5">
        <div className="flex items-center gap-2">
          {iconEmoji && (
            <span className="text-base" aria-hidden>
              {iconEmoji}
            </span>
          )}
          <h2 className="font-display text-base font-semibold">{heading}</h2>
          {typeof count === 'number' && count > 0 && (
            <span className="rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold text-text-muted">
              {count}
              {countLabel ?? ''}
            </span>
          )}
          <Link
            href={href}
            className="ml-auto text-xs text-text-muted transition-colors hover:text-primary"
          >
            {hrefLabel} →
          </Link>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-bg/40 p-4 text-center text-xs text-text-muted">
      {text}
    </div>
  );
}
