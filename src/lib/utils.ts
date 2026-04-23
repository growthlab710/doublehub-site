import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind クラス結合ヘルパ。
 * 競合するクラスは後勝ちでマージされる。
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * 現在の Hosting Mode を取得。
 * ビルド時に NEXT_PUBLIC_HOSTING_MODE から決まる。
 */
export function getHostingMode(): 'static' | 'dynamic' {
  const mode = process.env.NEXT_PUBLIC_HOSTING_MODE;
  return mode === 'dynamic' ? 'dynamic' : 'static';
}

/**
 * Dynamic モードかどうかを boolean で返すユーティリティ。
 * 認証 UI の有効/無効切替に使う。
 */
export function isDynamicMode(): boolean {
  return getHostingMode() === 'dynamic';
}
