'use client';

import { Moon, Sun, Monitor, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { cn } from '@/lib/utils';

/**
 * ライト / ダーク / システムの 3 状態切替トグル。
 *
 * - Desktop（md 以上）: 3 状態のセグメンテッドコントロールをそのまま並べる。
 * - Mobile（md 未満）: 現在のモードのアイコンだけを丸ボタンで表示し、
 *   タップで Light / Dark / System のドロップダウンを開く。
 *   ヘッダー右肩のスペースを大幅に節約し、Blog ボタン等を共置できるようにするため。
 */
const options = [
  { value: 'light', icon: Sun, label: 'ライト' },
  { value: 'dark', icon: Moon, label: 'ダーク' },
  { value: 'system', icon: Monitor, label: 'システム' },
] as const;

type ThemeValue = (typeof options)[number]['value'];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // SSR/初期描画時、デスクトップとモバイルで違う形状になるためスケルトンも分ける。
    return (
      <>
        <div className="hidden h-9 w-28 rounded-full bg-surface-2 md:block" aria-hidden />
        <div className="block h-9 w-9 rounded-full bg-surface-2 md:hidden" aria-hidden />
      </>
    );
  }

  const current: ThemeValue = (
    options.find((o) => o.value === theme)?.value ?? 'system'
  ) as ThemeValue;
  const CurrentIcon = options.find((o) => o.value === current)?.icon ?? Monitor;
  const currentLabel = options.find((o) => o.value === current)?.label ?? 'システム';

  return (
    <>
      {/* Desktop: 既存のセグメンテッドコントロール（変更なし） */}
      <div
        role="radiogroup"
        aria-label="テーマ切替"
        className="hidden items-center gap-0.5 rounded-full border border-border bg-surface p-0.5 shadow-sm md:inline-flex"
      >
        {options.map((opt) => {
          const Icon = opt.icon;
          const active = current === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
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

      {/* Mobile: 現在のモードのアイコンだけを表示。タップで 3 つの選択肢を開く。 */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:bg-surface-2',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            )}
            aria-label={`テーマ切替（現在: ${currentLabel}）`}
          >
            <CurrentIcon className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={6} className="min-w-[10rem]">
            {options.map((opt) => {
              const Icon = opt.icon;
              const active = current === opt.value;
              return (
                <DropdownMenuItem
                  key={opt.value}
                  onSelect={() => setTheme(opt.value)}
                  className="gap-2"
                  aria-checked={active}
                >
                  <Icon className="h-4 w-4 text-text-muted" />
                  <span className="flex-1">{opt.label}</span>
                  {active ? <Check className="h-3.5 w-3.5 text-primary" /> : null}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
