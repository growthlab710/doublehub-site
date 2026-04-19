/**
 * Web アプリ版ナビゲーション定義。
 *
 * サイドバー / モバイルメニューから共通で参照する。
 */
export interface AppNavItem {
  href: string;
  label: string;
  icon: string; // emoji / 将来的に lucide などへ
  description?: string;
  /** Coming Soon 表示（TrainNote など） */
  comingSoon?: boolean;
}

export const appNavItems: AppNavItem[] = [
  {
    href: '/app/',
    label: 'ダッシュボード',
    icon: '🏠',
    description: '今日のタスク・メモ・本棚を一覧',
  },
  {
    href: '/app/doublehub/',
    label: 'DoubleHub',
    icon: '🧠',
    description: 'ToDo とメモ',
  },
  {
    href: '/app/bookcompass/',
    label: 'BookCompass',
    icon: '📚',
    description: '読書記録（連携済み）',
  },
  {
    href: '/app/trainnote/',
    label: 'TrainNote',
    icon: '🏋️',
    description: '準備中',
    comingSoon: true,
  },
  {
    href: '/app/settings/',
    label: '設定',
    icon: '⚙️',
  },
];
