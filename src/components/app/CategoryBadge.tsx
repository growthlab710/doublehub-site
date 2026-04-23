import type { TodoCategory, MemoCategory } from '@/lib/supabase/types-doublehub';
import { cn } from '@/lib/utils';

type CategoryLike = TodoCategory | MemoCategory | string;

/**
 * DoubleHub のタブ（プライベート / 仕事）を視覚的に区別する統一バッジ。
 *
 * ダッシュボードのサマリ / ToDo・メモ本体の両方で使い回す。
 * 未知のカテゴリ文字列（iOS 側で将来追加された場合など）は muted 表示でフォールバック。
 */
export function CategoryBadge({
  category,
  className,
  size = 'sm',
}: {
  category: CategoryLike | null | undefined;
  className?: string;
  size?: 'xs' | 'sm';
}) {
  const style = getCategoryStyle(category);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-semibold leading-tight',
        size === 'xs'
          ? 'px-1.5 py-0.5 text-[9px]'
          : 'px-2 py-0.5 text-[10px]',
        style.chip,
        className
      )}
    >
      <span
        className={cn('h-1.5 w-1.5 shrink-0 rounded-full', style.dot)}
        aria-hidden
      />
      {style.label}
    </span>
  );
}

/**
 * カテゴリに対応するドット色クラスのみが必要な場面（リスト行左端のインジケータなど）向け。
 */
export function getCategoryDotClass(category: CategoryLike | null | undefined) {
  return getCategoryStyle(category).dot;
}

interface CategoryStyle {
  label: string;
  chip: string;
  dot: string;
}

function getCategoryStyle(category: CategoryLike | null | undefined): CategoryStyle {
  // DB には英語キーで保存されるが、将来的に日本語文字列が混ざる可能性も想定して両方マッチ。
  const key = typeof category === 'string' ? category.toLowerCase() : category;
  switch (key) {
    case 'private':
    case 'プライベート':
      return {
        label: 'プライベート',
        // primary（teal）ベース。DoubleHub ブランド色そのもの。
        chip: 'border-primary/20 bg-primary-soft text-primary',
        dot: 'bg-primary',
      };
    case 'work':
    case '仕事':
      return {
        label: '仕事',
        // accent-warm（オレンジ）ベース。プライベートと明確に色相を分ける。
        chip: 'border-accent-warm/20 bg-accent-warm-soft text-accent-warm',
        dot: 'bg-accent-warm',
      };
    default:
      return {
        label: (typeof category === 'string' && category) || '未分類',
        chip: 'border-border bg-surface-2 text-text-muted',
        dot: 'bg-text-faint',
      };
  }
}
