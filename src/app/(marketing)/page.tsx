import type { Metadata } from 'next';
import { HomeContent } from '@/components/marketing/home/HomeContent';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * トップページ（2026-11「幸せのコンテキスト」版・誌面のデザイン）
 *
 * 中身と並びは `HomeContent` にまとめている。
 * 2026-11 までのトップの部品（Hero・IdealSection・DailyChoices・RoadmapSection など 15 個）は 2026-11-06 に片付けた。
 */
export default function HomePage() {
  return <HomeContent />;
}
