'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryTabs } from '@/components/app/CategoryTabs';
import { useCategoryTab } from '@/lib/hooks/useCategoryTab';
import type {
  TodoCategory,
  Todo,
  Memo,
} from '@/lib/supabase/types-doublehub';
import {
  CATEGORY_LABEL,
  DEFAULT_CATEGORY,
  TODO_CATEGORIES,
} from '@/lib/supabase/types-doublehub';
import { supabaseConfig } from '@/lib/env';
import { listTodos } from '@/lib/repositories/todos';
import { listMemos } from '@/lib/repositories/memos';
import { TodoSection } from './TodoSection';
import { MemoSection } from './MemoSection';

/**
 * /app/doublehub/ の本体。
 *
 * iOS 側と同じ「プライベート / 仕事」タブで ToDo とメモを切り替える。
 * 選択状態は localStorage に永続化される（`useCategoryTab`）。
 *
 * データは親でまとめて取得し、子セクションには絞り込み済み items を props で払い下げる。
 * これによりタブチップの件数は常に両カテゴリ分を正しく表示できる。
 */
export function DoubleHubClient() {
  const [category, setCategory] = useCategoryTab();

  // 全件を親で保持し、タブごとの件数集計はここで行う。
  const [todos, setTodos] = useState<Todo[]>([]);
  const [memos, setMemos] = useState<Memo[]>([]);

  const envOk = supabaseConfig.doublehub.ok;

  const refresh = useCallback(async () => {
    if (!envOk) return;
    try {
      const [t, m] = await Promise.all([
        // ToDo は完了も含め全件取得（セクション側のフィルタ UI のため）。
        // メモは既定の 50 件に抑制（既存動作と揃える）。
        listTodos({ filter: 'all', category: 'all', limit: 500 }),
        listMemos({ category: 'all', limit: 100 }),
      ]);
      setTodos(t);
      setMemos(m);
    } catch {
      // 子セクション側でのエラーハンドリングと重複しないよう、親側では黙殺。
    }
  }, [envOk]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // カテゴリ別に ToDo（未完了のみ）/ メモの件数を計算。
  const countsByCategory = useMemo(() => {
    const base: Record<TodoCategory, { todo: number; memo: number }> = {
      private: { todo: 0, memo: 0 },
      work: { todo: 0, memo: 0 },
    };
    for (const t of todos) {
      if (t.is_completed) continue; // タブチップは未完了数のみ
      const cat = normalizeCategory(t.category);
      base[cat].todo += 1;
    }
    for (const m of memos) {
      const cat = normalizeCategory(m.category);
      base[cat].memo += 1;
    }
    return base;
  }, [todos, memos]);

  // 現在タブに属する items を子セクションに払い下げる。
  const currentTodos = useMemo(
    () => todos.filter((t) => normalizeCategory(t.category) === category),
    [todos, category]
  );
  const currentMemos = useMemo(
    () => memos.filter((m) => normalizeCategory(m.category) === category),
    [memos, category]
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">DoubleHub</h1>
          <p className="mt-2 text-sm text-text-muted">
            タスクとメモを一体化して管理します。完了した ToDo も行動ログとして残ります。
          </p>
        </div>
        <CategoryTabs
          value={category}
          onChange={setCategory}
          counts={countsByCategory}
        />
      </header>

      <div
        id={`panel-${category}`}
        role="tabpanel"
        aria-label={`${CATEGORY_LABEL[category]} のタスクとメモ`}
        className="grid gap-6 lg:grid-cols-2"
      >
        <TodoSection
          category={category}
          items={currentTodos}
          onChanged={refresh}
        />
        <MemoSection
          category={category}
          items={currentMemos}
          onChanged={refresh}
        />
      </div>
    </div>
  );
}

/**
 * DB に紛れている表記揺れ（大文字小文字・旧日本語ラベル・NULL）を
 * 現行キー（'private' / 'work'）に正規化する。未分類はデフォルトタブへ寄せる。
 */
function normalizeCategory(raw: string | null | undefined): TodoCategory {
  const v = (raw ?? '').trim().toLowerCase();
  if (v === 'private' || v === 'プライベート') return 'private';
  if (v === 'work' || v === '仕事') return 'work';
  // 想定外値はデフォルト（プライベート）タブに寄せる。
  if (!(TODO_CATEGORIES as string[]).includes(v)) return DEFAULT_CATEGORY;
  return DEFAULT_CATEGORY;
}
