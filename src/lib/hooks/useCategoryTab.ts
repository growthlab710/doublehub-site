'use client';

import { useCallback, useEffect, useState } from 'react';
import type { TodoCategory } from '@/lib/supabase/types-doublehub';
import {
  DEFAULT_CATEGORY,
  TODO_CATEGORIES,
} from '@/lib/supabase/types-doublehub';

/**
 * DoubleHub 内でカテゴリタブ（プライベート / 仕事）の選択状態を
 * localStorage に永続化するフック。
 *
 * - SSR との hydration mismatch を避けるため、サーバー初期値は常に `DEFAULT_CATEGORY`。
 * - マウント後に localStorage から読み出して上書きする。
 * - `key` を変えることで、画面ごとに別の記憶を持たせることも可能（既定は共通キー）。
 */
export function useCategoryTab(
  key: string = 'doublehub:category'
): [TodoCategory, (next: TodoCategory) => void] {
  const [category, setCategory] = useState<TodoCategory>(DEFAULT_CATEGORY);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored && isTodoCategory(stored)) {
        setCategory(stored);
      }
    } catch {
      // localStorage 非許可環境（プライベートブラウズ等）では初期値のまま。
    }
  }, [key]);

  const update = useCallback(
    (next: TodoCategory) => {
      setCategory(next);
      try {
        window.localStorage.setItem(key, next);
      } catch {
        // 書き込み失敗は黙殺（画面上の切替は効く）。
      }
    },
    [key]
  );

  return [category, update];
}

function isTodoCategory(value: string): value is TodoCategory {
  return (TODO_CATEGORIES as string[]).includes(value);
}
