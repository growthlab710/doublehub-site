'use client';

import { useState } from 'react';
import { CategoryTabs } from '@/components/app/CategoryTabs';
import { useCategoryTab } from '@/lib/hooks/useCategoryTab';
import type { TodoCategory } from '@/lib/supabase/types-doublehub';
import { TodoSection } from './TodoSection';
import { MemoSection } from './MemoSection';

/**
 * /app/doublehub/ の本体。
 *
 * iOS 側と同じ「プライベート / 仕事」タブで ToDo とメモを切り替える。
 * 選択状態は localStorage に永続化される（`useCategoryTab`）。
 */
export function DoubleHubClient() {
  const [category, setCategory] = useCategoryTab();

  // 各セクションから受け取った「このカテゴリの件数」をタブのチップに反映する。
  const [todoCounts, setTodoCounts] = useState<Partial<Record<TodoCategory, number>>>({});
  const [memoCounts, setMemoCounts] = useState<Partial<Record<TodoCategory, number>>>({});

  // タブ側に出す合計件数（未完了 ToDo + メモ）。
  const counts: Partial<Record<TodoCategory, number>> = {
    プライベート:
      (todoCounts['プライベート'] ?? 0) + (memoCounts['プライベート'] ?? 0),
    仕事: (todoCounts['仕事'] ?? 0) + (memoCounts['仕事'] ?? 0),
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">DoubleHub</h1>
          <p className="mt-2 text-sm text-text-muted">
            タスクとメモを一体化して管理します。完了した ToDo も行動ログとして残ります。
          </p>
        </div>
        <CategoryTabs value={category} onChange={setCategory} counts={counts} />
      </header>

      <div
        id={`panel-${category}`}
        role="tabpanel"
        aria-label={`${category} のタスクとメモ`}
        className="grid gap-6 lg:grid-cols-2"
      >
        <TodoSection category={category} onCountChange={setTodoCounts} />
        <MemoSection category={category} onCountChange={setMemoCounts} />
      </div>
    </div>
  );
}
