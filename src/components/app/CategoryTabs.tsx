'use client';

import { cn } from '@/lib/utils';
import type { TodoCategory } from '@/lib/supabase/types-doublehub';
import {
  TODO_CATEGORIES,
  CATEGORY_LABEL,
} from '@/lib/supabase/types-doublehub';

interface CategoryTabsProps {
  value: TodoCategory;
  onChange: (next: TodoCategory) => void;
  /** タブ末尾に表示する件数チップ（未指定なら非表示）。 */
  counts?: Partial<Record<TodoCategory, number>>;
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
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition',
              tone
            )}
          >
            <span>{CATEGORY_LABEL[category]}</span>
            {typeof count === 'number' && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums',
                  active
                    ? 'bg-white/20 text-white'
                    : 'bg-surface-2 text-text-muted'
                )}
                aria-label={`${count} 件`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
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
