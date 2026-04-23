'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { formatDueDateJST } from '@/lib/format';
import {
  addDaysJST,
  endOfDayJstIso,
  getDueStatus,
  nextSundayJST,
  todayLocalDateJST,
  type DueStatus,
} from '@/lib/dueDate';
import { supabaseConfig } from '@/lib/env';
import type { Todo, TodoCategory } from '@/lib/supabase/types-doublehub';
import {
  DEFAULT_CATEGORY,
  CATEGORY_LABEL,
} from '@/lib/supabase/types-doublehub';
import {
  createTodo,
  toggleTodo,
  softDeleteTodo,
} from '@/lib/repositories/todos';

type Filter = 'active' | 'done' | 'all';

/** 追加フォームの期限クイックチップ。 */
type DuePreset = 'none' | 'today' | 'tomorrow' | 'sunday' | 'custom';

interface TodoSectionProps {
  /** 現在選択中のカテゴリ。 */
  category?: TodoCategory;
  /** 親から払い下げられた「このカテゴリ分の」ToDo 一覧（完了/未完了の両方を含む）。 */
  items: Todo[];
  /** データが変わったときに親へ再取得を依頼するコールバック。 */
  onChanged?: () => void | Promise<void>;
}

export function TodoSection({
  category = DEFAULT_CATEGORY,
  items,
  onChanged,
}: TodoSectionProps) {
  const [filter, setFilter] = useState<Filter>('active');
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 追加フォームの期限選択状態。
  const [duePreset, setDuePreset] = useState<DuePreset>('none');
  const [customDate, setCustomDate] = useState<string>('');

  const envOk = supabaseConfig.doublehub.ok;

  // 表示用に filter を適用。親から降ってくる items は既にカテゴリ絞り込み済み。
  const displayed = useMemo(() => {
    if (filter === 'active') return items.filter((t) => !t.is_completed);
    if (filter === 'done') return items.filter((t) => t.is_completed);
    return items;
  }, [items, filter]);

  // ヘッダーのチップに出す件数（未完了件数）。
  const activeCount = useMemo(
    () => items.filter((t) => !t.is_completed).length,
    [items]
  );

  /** 選択中の preset/custom から `due_date`（ISO）を組み立てる。 */
  const resolveDueIso = (): string | null => {
    switch (duePreset) {
      case 'today':
        return endOfDayJstIso(todayLocalDateJST());
      case 'tomorrow':
        return endOfDayJstIso(addDaysJST(1));
      case 'sunday':
        return endOfDayJstIso(nextSundayJST());
      case 'custom':
        return customDate ? endOfDayJstIso(customDate) : null;
      case 'none':
      default:
        return null;
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (duePreset === 'custom' && !customDate) {
      setError('日付を選択してください');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      // 作成時は現在選択中のカテゴリと期限で保存。iOS と齟齬が出ないようにする。
      await createTodo({
        title: title.trim(),
        category,
        due_date: resolveDueIso(),
      });
      setTitle('');
      setDuePreset('none');
      setCustomDate('');
      await onChanged?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : '追加に失敗しました');
    } finally {
      setBusy(false);
    }
  };

  const handleToggle = async (id: string, done: boolean) => {
    try {
      await toggleTodo(id, done);
      await onChanged?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : '更新に失敗しました');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await softDeleteTodo(id);
      await onChanged?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : '削除に失敗しました');
    }
  };

  return (
    <section
      aria-labelledby="todo-heading"
      className="rounded-xl border border-border bg-surface p-5"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 id="todo-heading" className="font-display text-lg font-semibold">
            ToDo
          </h2>
          <span className="text-xs text-text-faint">{activeCount} 件</span>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border p-1 text-xs">
          {(['active', 'done', 'all'] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-md px-2.5 py-1 font-medium',
                filter === f
                  ? 'bg-surface-2 text-text'
                  : 'text-text-muted hover:text-text'
              )}
            >
              {f === 'active' ? '未完了' : f === 'done' ? '完了' : '全て'}
            </button>
          ))}
        </div>
      </div>

      {envOk ? (
        <form onSubmit={handleAdd} className="mt-4 space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder={`新しい ToDo を追加（${CATEGORY_LABEL[category]}）`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={busy}
            />
            <Button type="submit" size="sm" disabled={busy || !title.trim()}>
              追加
            </Button>
          </div>
          <DuePresetChips
            preset={duePreset}
            customDate={customDate}
            onPresetChange={(p) => {
              setDuePreset(p);
              if (p !== 'custom') setCustomDate('');
            }}
            onCustomDateChange={setCustomDate}
            disabled={busy}
          />
        </form>
      ) : (
        <p className="mt-4 rounded-lg border border-dashed border-border bg-bg/40 p-3 text-xs text-text-faint">
          Supabase 環境変数が未設定のため、書き込みは無効化されています。
        </p>
      )}

      {error && (
        <div
          role="alert"
          className="mt-3 rounded-lg border border-red-400/40 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300"
        >
          {error}
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {displayed.length === 0 ? (
          <li className="rounded-lg border border-dashed border-border bg-bg/40 p-4 text-center text-sm text-text-muted">
            {filter === 'done'
              ? '完了した ToDo はまだありません'
              : `${CATEGORY_LABEL[category]}の ToDo はまだありません`}
          </li>
        ) : (
          displayed.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 期限プリセットチップ
// ---------------------------------------------------------------------------

interface DuePresetChipsProps {
  preset: DuePreset;
  customDate: string;
  onPresetChange: (p: DuePreset) => void;
  onCustomDateChange: (date: string) => void;
  disabled?: boolean;
}

function DuePresetChips({
  preset,
  customDate,
  onPresetChange,
  onCustomDateChange,
  disabled,
}: DuePresetChipsProps) {
  // 最小日付（今日）は JST 基準で固定。past はデフォルトで弾いておく。
  const minDate = todayLocalDateJST();
  const chips: { key: DuePreset; label: string }[] = [
    { key: 'none', label: 'なし' },
    { key: 'today', label: '今日' },
    { key: 'tomorrow', label: '明日' },
    { key: 'sunday', label: '今週末' },
    { key: 'custom', label: '日付指定' },
  ];
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs">
      <span className="text-text-faint">期限:</span>
      {chips.map(({ key, label }) => {
        const active = preset === key;
        return (
          <button
            key={key}
            type="button"
            disabled={disabled}
            onClick={() => onPresetChange(key)}
            className={cn(
              'rounded-md border px-2 py-1 font-medium transition',
              active
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-text-muted hover:border-border-strong hover:text-text',
              disabled && 'cursor-not-allowed opacity-60'
            )}
          >
            {label}
          </button>
        );
      })}
      {preset === 'custom' && (
        <input
          type="date"
          value={customDate}
          min={minDate}
          onChange={(e) => onCustomDateChange(e.target.value)}
          disabled={disabled}
          className="rounded-md border border-border bg-bg px-2 py-1 text-xs"
          aria-label="期限日"
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ToDo 1 件の行。期限状態ごとに背景・テキスト色を変える（iOS 仕様に準拠）。
// ---------------------------------------------------------------------------

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const status: DueStatus = getDueStatus({
    isCompleted: todo.is_completed,
    dueDateIso: todo.due_date,
    isAllDay: todo.is_all_day,
  });

  // 状態ごとのスタイル。いずれも tailwind.config の status tokens を使用する。
  // CSS variable ベースのカラーは Tailwind の opacity modifier が効かないため、
  // 背景は soft トークン（light/dark 両方で調整済み）、ボーダーは DEFAULT で指定する。
  const card = {
    completed: 'border-border bg-success-soft',
    overdue: 'border-overdue bg-overdue-soft',
    urgent: 'border-warning bg-warning-soft',
    normal: 'border-border bg-bg/40',
    none: 'border-border bg-bg/40',
  }[status];

  const titleClass = {
    completed: 'text-text-faint line-through',
    overdue: 'text-text',
    urgent: 'text-text',
    normal: 'text-text',
    none: 'text-text',
  }[status];

  const dueClass = {
    completed: 'text-text-faint',
    overdue: 'text-overdue',
    urgent: 'text-warning',
    normal: 'text-primary',
    none: 'text-text-faint',
  }[status];

  const dueIcon = {
    completed: null,
    overdue: '⚠',
    urgent: '🕐',
    normal: null,
    none: null,
  }[status];

  const dueText = formatDueDateJST(todo.due_date);

  return (
    <li
      className={cn(
        'group flex items-start gap-3 rounded-lg border px-3 py-2.5 transition',
        card
      )}
    >
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 shrink-0 accent-primary"
        checked={todo.is_completed}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
        aria-label={`${todo.title} を${todo.is_completed ? '未完了に' : '完了に'}する`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn('truncate text-sm font-medium', titleClass)}>
            {todo.title}
          </span>
          {dueText && (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-[11px] font-medium',
                dueClass
              )}
            >
              {dueIcon && <span aria-hidden>{dueIcon}</span>}
              期限 {dueText}
            </span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="shrink-0 rounded-md border border-transparent px-2 py-1 text-xs text-text-faint opacity-0 transition hover:border-border hover:bg-surface-2 hover:text-text group-hover:opacity-100"
        aria-label={`${todo.title} を削除`}
      >
        削除
      </button>
    </li>
  );
}
