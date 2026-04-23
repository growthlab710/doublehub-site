import Link from 'next/link';
import Image from 'next/image';
import { footerNav, siteConfig } from '@/lib/site/config';

/**
 * LP 用フッター。GrowthLab 表記 + 3 プロダクト + 会社情報。
 */
export function MarketingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-surface-2/40 py-14">
      <div className="container-wide grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
            <Image
              src="/images/doublehub-icon.jpg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span>{siteConfig.name}</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-text-muted">
            {siteConfig.description}
          </p>
          <p className="mt-4 text-xs text-text-faint">by GrowthLab</p>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-faint">
            Products
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerNav.products.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-text-muted transition hover:text-primary"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-faint">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerNav.company.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-text-muted transition hover:text-primary"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-wide mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-text-faint md:flex-row md:items-center">
        <p>© {year} GrowthLab. All rights reserved.</p>
        <p>
          <a
            href="https://doublehub.jp/llms.txt"
            className="transition hover:text-primary"
          >
            llms.txt
          </a>
        </p>
      </div>
    </footer>
  );
}
