/**
 * Web アプリ版ナビゲーション定義。
 *
 * サイドバー / モバイルメニューから共通で参照する。
 */
export interface AppNavItem {
  href: string;
  label: string;
  /**
   * 絵文字もしくは `/images/...` で始まるアプリアイコン画像のパス。
   * サイドバー側で `/` 始まりかどうかで描画を分ける。
   */
  icon: string;
  /** 絵文字フォールバック（icon が画像パスのときに利用）。 */
  iconFallback?: string;
  description?: string;
  /** Coming Soon 表示（TrainNote など） */
  comingSoon?: boolean;
  /**
   * アクティブ時のアクセントカラー（Tailwind クラス名）。
   * プロダクト別テーマに合わせてサイドバーのアクセントバーを出し分ける。
   */
  accent?: 'primary' | 'bookcompass' | 'trainnote' | 'neutral';
}

export const appNavItems: AppNavItem[] = [
  {
    href: '/app/',
    label: 'ダッシュボード',
    icon: '🏠',
    description: '今日のタスク・メモ・本棚を一覧',
    accent: 'neutral',
  },
  {
    href: '/app/doublehub/',
    label: 'DoubleHub',
    // マーケティングと揃えてアプリアイコンを使用。
    icon: '/images/doublehub-icon.jpg',
    iconFallback: '🧠',
    description: 'ToDo とメモ',
    accent: 'primary',
  },
  {
    href: '/app/bookcompass/',
    label: 'BookCompass',
    icon: '/images/bookcompass-app-icon.jpg',
    iconFallback: '📚',
    description: '準備中',
    comingSoon: true,
    accent: 'bookcompass',
  },
  {
    href: '/app/trainnote/',
    label: 'TrainNote',
    icon: '/images/trainnote-app-icon.jpg',
    iconFallback: '🏋️',
    description: '準備中',
    comingSoon: true,
    accent: 'trainnote',
  },
  {
    href: '/app/settings/',
    label: '設定',
    icon: '⚙️',
    accent: 'neutral',
  },
];

/**
 * パスから現在のナビ項目を返す。サイドバーのアクティブ判定と
 * ヘッダーのパンくず表示で共通利用する。
 */
export function matchAppNav(pathname: string | null | undefined): AppNavItem | null {
  if (!pathname) return null;
  // 完全一致ルートが複数あるため、長いパスを優先してマッチさせる。
  const sorted = [...appNavItems].sort(
    (a, b) => b.href.length - a.href.length
  );
  const normalized = pathname.replace(/\/$/, '');
  for (const item of sorted) {
    const base = item.href.replace(/\/$/, '');
    if (base === '' || base === '/app') {
      if (normalized === '/app') return item;
      continue;
    }
    if (normalized === base || normalized.startsWith(base + '/')) {
      return item;
    }
  }
  return null;
}
