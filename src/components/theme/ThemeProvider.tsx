'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ReactNode } from 'react';

/**
 * next-themes のラッパー。
 * data-theme 属性で切り替わるよう設定（Tailwind も同属性で dark variant を検出）。
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="doublehub-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
