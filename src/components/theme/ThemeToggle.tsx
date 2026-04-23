'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * ライト / ダーク / システムの 3 状態切替トグル。
 * 既存 LP と同じ挙動（matchMedia 追従 = system）を維持。
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-28 rounded-full bg-surface-2" aria-hidden />;
  }

  const options = [
    { value: 'light', icon: Sun, label: 'ライト' },
    { value: 'dark', icon: Moon, label: 'ダーク' },
    { value: 'system', icon: Monitor, label: 'システム' },
  ] as const;

  return (
    <div
      role="radiogroup"
      aria-label="テーマ切替"
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5 shadow-sm"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = theme === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            onClick={() => setTheme(opt.value)}
            className={cn(
              'flex h-7 w-8 items-center justify-center rounded-full transition',
              'hover:text-text',
              active
                ? 'bg-primary text-text-inverse shadow-sm'
                : 'text-text-muted hover:bg-surface-2'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
