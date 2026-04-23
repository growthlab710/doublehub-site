'use client';

import { cn } from '@/lib/utils';
import type { TodoCategory } from '@/lib/supabase/types-doublehub';
import {
  TODO_CATEGORIES,
  CATEGORY_LABEL,
} from '@/lib/supabase/types-doublehub';

/** タブ右肩に表示する内訳。ToDo（未完了件数）/ メモ件数。 */
export interface CategoryCount {
  todo: number;
  memo: number;
}

interface CategoryTabsProps {
  value: TodoCategory;
  onChange: (next: TodoCategory) => void;
  /**
   * タブ末尾に表示する件数チップの元データ。
   * - オブジェクトを渡すと `ToDo/メモ` を 2 段で表示
   * - 数値を渡すと従来通り合計のみを 1 段で表示
   */
  counts?: Partial<Record<TodoCategory, CategoryCount | number>>;
  className?: string;
}

/**
 * DoubleHub ページ上部に置く「プライベート / 仕事」切替タブ。
 *
 * iOS 側のセグメントコントロールに合わせ、アクティブタブはカテゴリ色で強調する。
 * - プライベート: primary (teal)
 * - 仕事:     accent-warm (orange)
 */
export function CategoryTabs({
  value,
  onChange,
  counts,
  className,
}: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="カテゴリ"
      className={cn(
        'inline-flex items-center gap-1 rounded-xl border border-border bg-surface p-1 shadow-sm',
        className
      )}
    >
      {TODO_CATEGORIES.map((category) => {
        const active = value === category;
        const tone = getToneClasses(category, active);
        const count = counts?.[category];
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={`panel-${category}`}
            onClick={() => onChange(category)}
            className={cn(
              'flex items-center gap-2.5 rounded-lg px-3.5 py-2 text-sm font-medium transition',
              tone
            )}
          >
            <span>{CATEGORY_LABEL[category]}</span>
            <CountChip count={count} active={active} />
          </button>
        );
      })}
    </div>
  );
}

/**
 * タブ右肩のカウントチップ。
 * - `{todo, memo}` → `7 / 3` の斜線区切り + 下段に `ToDo / メモ` の極小ラベル
 * - 数値 → 合計のみ
 */
function CountChip({
  count,
  active,
}: {
  count: CategoryCount | number | undefined;
  active: boolean;
}) {
  if (count === undefined) return null;
  const chipBase = active
    ? 'bg-white/20 text-white'
    : 'bg-surface-2 text-text-muted';

  if (typeof count === 'number') {
    return (
      <span
        className={cn(
          'rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums',
          chipBase
        )}
        aria-label={`${count} 件`}
      >
        {count}
      </span>
    );
  }

  // 2 段表示：上段に数値ペア、下段に種別ラベル。
  const subLabel = active ? 'text-white/70' : 'text-text-faint';
  return (
    <span
      className={cn(
        'flex flex-col items-center leading-none rounded-md px-2 py-1',
        chipBase
      )}
      aria-label={`ToDo ${count.todo} 件、メモ ${count.memo} 件`}
    >
      <span className="text-[11px] font-semibold tabular-nums">
        {count.todo}
        <span className={cn('mx-0.5 font-normal', subLabel)}>/</span>
        {count.memo}
      </span>
      <span className={cn('mt-0.5 text-[8px] tracking-wide', subLabel)}>
        ToDo / メモ
      </span>
    </span>
  );
}

function getToneClasses(category: TodoCategory, active: boolean): string {
  if (!active) {
    return 'text-text-muted hover:bg-surface-2 hover:text-text';
  }
  // アクティブ時だけカテゴリ色で塗る。非アクティブは中立トーンに統一。
  switch (category) {
    case 'private':
      return 'bg-primary text-white shadow-sm';
    case 'work':
      return 'bg-accent-warm text-white shadow-sm';
    default:
      return 'bg-surface-2 text-text';
  }
}
