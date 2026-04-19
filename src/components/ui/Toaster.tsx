'use client';

import { Toaster as SonnerToaster } from 'sonner';
import { useTheme } from 'next-themes';

/**
 * sonner ベースのトースト通知。
 * アプリ全体で 1 回だけ <Toaster /> をマウントする。
 */
export function Toaster() {
  const { theme } = useTheme();
  return (
    <SonnerToaster
      position="top-right"
      theme={(theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : 'system') as 'light' | 'dark' | 'system'}
      toastOptions={{
        classNames: {
          toast:
            'bg-surface border border-border text-text shadow-md rounded-lg',
          title: 'text-text font-medium',
          description: 'text-text-muted text-sm',
          actionButton: 'bg-primary text-text-inverse',
          cancelButton: 'bg-surface-2 text-text-muted',
        },
      }}
    />
  );
}

export { toast } from 'sonner';
