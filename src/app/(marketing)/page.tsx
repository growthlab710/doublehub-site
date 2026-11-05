import type { Metadata } from 'next';
import { HomeContent } from '@/components/marketing/home/HomeContent';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * トップページ（2026-11「幸せのコンテキスト」版・誌面のデザイン）
 *
 * 中身と並びは `HomeContent` にまとめている。
 * 2026-11 までのトップの部品（Hero・IdealSection・DailyChoices・RoadmapSection など）は、
 * このページからは使っていない（片付けは別の作業で）。
 */
export default function HomePage() {
  return <HomeContent />;
}
