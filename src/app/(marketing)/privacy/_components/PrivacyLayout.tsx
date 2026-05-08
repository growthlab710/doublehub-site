import type { ReactNode } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

/**
 * 各プロダクトの /privacy/<slug>/ ページで使う共通シェル。
 *
 * 構成は元の /privacy/page.tsx に揃えており、
 * <h1> + prose 本文 + 末尾の戻り導線で 1 つのプライバシーポリシーページを描画する。
 */
export function PrivacyLayout({
  title,
  productLabel,
  lastUpdated,
  children,
}: {
  /** ページの大見出し（例: "DoubleHub プライバシーポリシー"）。 */
  title: string;
  /** パンくず代わりの小ラベル（例: "DoubleHub"）。 */
  productLabel: string;
  /** ISO 風の最終更新日表示（例: "2026-04-18"）。 */
  lastUpdated: string;
  /** prose スタイルが適用されるポリシー本文。 */
  children: ReactNode;
}) {
  return (
    <Section spacing="lg">
      <Container width="narrow">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
          <Link href="/privacy/" className="hover:text-primary hover:underline">
            Privacy
          </Link>
          <span className="px-2 text-text-faint">/</span>
          <span className="text-text">{productLabel}</span>
        </p>

        <h1 className="mt-4 font-display text-3xl font-semibold md:text-4xl">{title}</h1>

        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
          {children}

          <p className="text-sm text-text-faint">最終更新日: {lastUpdated}</p>
        </div>

        <p className="mt-10 flex flex-wrap gap-4 text-sm text-text-muted">
          <Link href="/privacy/" className="text-primary hover:underline">
            ← プライバシーポリシー一覧へ戻る
          </Link>
          <Link href="/" className="text-text-muted hover:text-primary hover:underline">
            DoubleHub トップへ戻る
          </Link>
        </p>
      </Container>
    </Section>
  );
}
