'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, LogIn, BookOpen, ChevronRight, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { marketingNav, products, siteConfig } from '@/lib/site/config';
import { cn, isDynamicMode } from '@/lib/utils';

/**
 * LP 用ヘッダー。
 * - Desktop: 横並び + Products ドロップダウン
 * - Mobile: ハンバーガーメニュー
 * - ログインボタンは dynamic モードのみ有効
 * - Liquid Glass: スクロール位置に応じて "浮き上がり" + ガラスマテリアルに変化
 */
export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  // モバイル用: Product ショートカット押下で「プロダクト一覧だけ」を
  // トップページ上にせり出させる軽量パネル。商品リストページは存在しないため
  // ここで上層オーバーレイとして見せ、ホーム文脈から離脱させない。
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loginEnabled = isDynamicMode();

  // スクロール 24px 以上で "浮き上がる" モードに切り替える。
  // ヘッダーはスクロールで頻繁に再レンダリングされやすいため、
  // passive listener と state の変化時のみ setState する方式でカクツくのを避ける。
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 24;
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Products ドロップダウンの開閉を少し遅延して、ボタン→メニュー間を
  // マウスが細かく出入りしたときに繰り返し閉じないようにする。
  // 120ms ほどの grace period が一般的に快適。
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openProducts = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setProductsOpen(true);
  };
  const scheduleCloseProducts = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setProductsOpen(false), 150);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        // トップ方向: 通常はごくわずかな余白。スクロール後はもう少し下に浮かせる。
        scrolled ? 'pt-3' : 'pt-0'
      )}
    >
      <div
        className={cn(
          'flex h-16 items-center justify-between gap-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          scrolled
            ? // 浮くモード: ピル形 + liquid-glass + max-width 折りたたみ
              'container-wide max-w-[min(1200px,calc(100%-2rem))] mx-auto rounded-full liquid-glass px-5'
            : // 通常モード: 今までと同じ幅一杯 + 下罫線
              'container-wide border-b border-border/60 bg-bg/80 backdrop-blur-md'
        )}
      >
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
            onMouseEnter={openProducts}
            onMouseLeave={scheduleCloseProducts}
            onFocus={openProducts}
            onBlur={scheduleCloseProducts}
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
              // top-full + pt-2 で 「ボタン ↔ メニュー間」をホバー可能な領域にし、
              // マウスがそこを通っても閉じないようにする。
              <div
                role="menu"
                className="absolute left-0 top-full w-72 pt-2"
                onMouseEnter={openProducts}
                onMouseLeave={scheduleCloseProducts}
              >
                <div className="liquid-glass-heavy overflow-hidden rounded-2xl">
                  {products.map((p) => (
                    <Link
                      key={p.slug}
                      href={p.href}
                      role="menuitem"
                      className="flex items-start gap-3 px-4 py-3 transition hover:bg-white/30 dark:hover:bg-white/5"
                    >
                      <ProductMenuIcon product={p} size={32} />
                      <div>
                        <div className="text-sm font-medium text-text">{p.name}</div>
                        <div className="text-xs text-text-muted">{p.tagline}</div>
                      </div>
                    </Link>
                  ))}
                </div>
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

          {/* Mobile: Product ショートカット。
              プロダクト一覧ページは存在しないため、押下するとトップページ上に
              プロダクト一覧パネルがせり出す形で表示される（ナビゲーションせず、
              ホーム文脈のままサービスへの入口を選べる）。
              375px の狭いビューでは「Blog ボタン + ハンバーガー + テーマトグル」と
              横並びになるためアイコンのみ。sm 以上ではテキストも表示。 */}
          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 text-xs font-semibold text-text transition hover:bg-surface-2 md:hidden"
            aria-label="プロダクト一覧を開く"
            aria-expanded={mobileProductsOpen}
            aria-haspopup="menu"
            onClick={() => {
              setOpen(false);
              setMobileProductsOpen((v) => !v);
            }}
          >
            <LayoutGrid className="h-3.5 w-3.5 text-primary" />
            <span className="hidden sm:inline">Product</span>
          </button>

          {/* Mobile: Blog ショートカットはそのまま直接遷移リンクとして残す。 */}
          <Link
            href="/blog/"
            className="flex h-9 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 text-xs font-semibold text-primary transition hover:bg-primary/15 md:hidden"
            aria-label="ブログを開く"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Blog</span>
          </Link>

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
              title="ブラウザからログインして使える Web アプリは近日公開予定"
            >
              ログインページ準備中
            </span>
          )}

          {/* Mobile toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:bg-surface-2 md:hidden"
            aria-label="メニューを開く"
            aria-expanded={open}
            onClick={() => {
              setMobileProductsOpen(false);
              setOpen((v) => !v);
            }}
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
          open ? 'max-h-[640px]' : 'max-h-0'
        )}
      >
        <nav className="container-wide flex flex-col gap-1 py-4" aria-label="モバイルナビ">
          {/* セクションラベル: プロダクト */}
          <p className="px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-wider text-text-faint">
            Products
          </p>
          {products.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text transition hover:bg-surface-2"
              onClick={() => setOpen(false)}
            >
              <ProductMenuIcon product={p} size={24} />
              <span>{p.name}</span>
            </Link>
          ))}

          {/* プロダクト一覧（ホームの #products へ直接ジャンプする CTA）
              モバイルからプロダクト一覧の俯瞰へすぐ降りられるようにする。 */}
          <Link
            href="/#products"
            className="mt-1 flex items-center justify-between rounded-lg border border-border bg-surface-2/60 px-3 py-2.5 text-sm font-medium text-text transition hover:bg-surface-2"
            onClick={() => setOpen(false)}
          >
            <span>プロダクト一覧を開く</span>
            <ChevronRight className="h-4 w-4 text-text-muted" />
          </Link>

          {/* プロダクトと Blog を視覚的に明確に分離する。 */}
          <div className="my-3 h-px bg-border" />

          {/* Blog を About/Support と区別して目立たせる。
              プライマリカラーの枠と背景で「読み物カテゴリ」であることを明示。 */}
          <Link
            href="/blog/"
            className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/10 px-3 py-3 text-sm font-semibold text-primary transition hover:bg-primary/15"
            onClick={() => setOpen(false)}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Blog — 開発ログ・思考の整理
            </span>
            <ChevronRight className="h-4 w-4" />
          </Link>

          {/* About / Support は従来通り控えめなテキストリンクで残す。 */}
          <div className="mt-1">
            {marketingNav
              .filter((n) => n.label !== 'Products' && n.label !== 'Blog')
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm text-text-muted transition hover:bg-surface-2 hover:text-text"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
          </div>

          {loginEnabled && (
            <Button asChild size="sm" className="mt-2 w-full">
              <Link href="/app/login/" onClick={() => setOpen(false)}>
                ログイン
              </Link>
            </Button>
          )}
        </nav>
      </div>

      {/* Mobile Product パネル: ヘッダー直下にプロダクト一覧だけをせり出させる。
          プロダクト一覧ページは存在しないため、ホーム文脈を保ったまま
          各プロダクトへの導線を素早く開く軽量メニューとして機能する。 */}
      <div
        className={cn(
          'overflow-hidden border-t border-border/60 bg-bg md:hidden',
          'transition-[max-height] duration-300 ease-out',
          mobileProductsOpen ? 'max-h-[520px]' : 'max-h-0'
        )}
        role="menu"
        aria-label="プロダクト一覧"
      >
        <div className="container-wide flex flex-col gap-1 py-4">
          <div className="flex items-center justify-between px-3 pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-text-faint">
              Products
            </p>
            <button
              type="button"
              onClick={() => setMobileProductsOpen(false)}
              className="text-[11px] text-text-muted hover:text-text"
              aria-label="プロダクト一覧を閉じる"
            >
              閉じる
            </button>
          </div>
          {products.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text transition hover:bg-surface-2"
              onClick={() => setMobileProductsOpen(false)}
              role="menuitem"
            >
              <ProductMenuIcon product={p} size={28} />
              <span className="flex-1">
                <span className="block font-medium">{p.name}</span>
                <span className="block text-[11px] text-text-muted">{p.tagline}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-text-faint" />
            </Link>
          ))}
          {/* ホームの #products アンカーへも降りられる導線を残す。 */}
          <Link
            href="/#products"
            className="mt-1 flex items-center justify-between rounded-lg border border-border bg-surface-2/60 px-3 py-2.5 text-sm font-medium text-text transition hover:bg-surface-2"
            onClick={() => setMobileProductsOpen(false)}
          >
            <span>トップのプロダクト一覧へ</span>
            <ChevronRight className="h-4 w-4 text-text-muted" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/**
 * Products ドロップダウン / モバイルメニュー共通のアイコン描画。
 * - `appIcon`（画像パス）があれば squircle 風のアプリアイコン
 * - 無ければ従来の絵文字を表示
 */
function ProductMenuIcon({
  product,
  size,
}: {
  product: (typeof products)[number];
  size: number;
}) {
  const appIcon = 'appIcon' in product ? product.appIcon : undefined;

  if (appIcon) {
    return (
      <span
        className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-2"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <Image
          src={appIcon}
          alt=""
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span className="text-xl" aria-hidden>
      {product.icon}
    </span>
  );
}
