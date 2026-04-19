'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { marketingNav, products, siteConfig } from '@/lib/site/config';
import { cn, isDynamicMode } from '@/lib/utils';

/**
 * LP 用ヘッダー。
 * - Desktop: 横並び + Products ドロップダウン
 * - Mobile: ハンバーガーメニュー
 * - ログインボタンは dynamic モードのみ有効
 */
export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const loginEnabled = isDynamicMode();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-bg/80 backdrop-blur-md">
      <div className="container-wide flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-semibold text-text transition hover:opacity-80"
          aria-label={`${siteConfig.name} ホーム`}
        >
          <Image
            src="/images/doublehub-icon.jpg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-cover"
            priority
          />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="グローバルナビ"
        >
          {/* Products dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-text-muted transition hover:bg-surface-2 hover:text-text"
              aria-haspopup="menu"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((v) => !v)}
            >
              Products <span className="text-[0.625rem]">▾</span>
            </button>
            {productsOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-1 w-64 overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
              >
                {products.map((p) => (
                  <Link
                    key={p.slug}
                    href={p.href}
                    role="menuitem"
                    className="flex items-start gap-3 px-4 py-3 transition hover:bg-surface-2"
                  >
                    <span className="text-xl" aria-hidden>
                      {p.icon}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-text">{p.name}</div>
                      <div className="text-xs text-text-muted">{p.tagline}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {marketingNav
            .filter((n) => n.label !== 'Products')
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-text-muted transition hover:bg-surface-2 hover:text-text"
              >
                {item.label}
              </Link>
            ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loginEnabled ? (
            <Button asChild size="sm" variant="secondary" className="hidden md:inline-flex">
              <Link href="/app/login/">
                <LogIn className="h-3.5 w-3.5" />
                <span>ログイン</span>
              </Link>
            </Button>
          ) : (
            <span
              className="hidden md:inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-muted"
              title="Web アプリは近日公開予定"
            >
              Web版 準備中
            </span>
          )}

          {/* Mobile toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:bg-surface-2 md:hidden"
            aria-label="メニューを開く"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-border/60 bg-bg md:hidden',
          'transition-[max-height] duration-300 ease-out',
          open ? 'max-h-[500px]' : 'max-h-0'
        )}
      >
        <nav className="container-wide flex flex-col gap-1 py-4" aria-label="モバイルナビ">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text transition hover:bg-surface-2"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden>{p.icon}</span>
              <span>{p.name}</span>
            </Link>
          ))}
          <div className="my-1 h-px bg-border" />
          {marketingNav
            .filter((n) => n.label !== 'Products')
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm text-text-muted transition hover:bg-surface-2 hover:text-text"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          {loginEnabled && (
            <Button asChild size="sm" className="mt-2 w-full">
              <Link href="/app/login/" onClick={() => setOpen(false)}>
                ログイン
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
