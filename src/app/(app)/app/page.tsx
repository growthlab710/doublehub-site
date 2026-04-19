import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata = {
  title: 'Dashboard',
  robots: { index: false },
};

/**
 * /app/ ダッシュボード（placeholder）
 * Day 4 でウィジェット群（DoubleHub / BookCompass / TrainNote / お知らせ）を実装する。
 */
export default function AppDashboardPlaceholder() {
  return (
    <Section spacing="md">
      <Container width="wide">
        <h1 className="font-display text-3xl font-semibold">ダッシュボード（準備中）</h1>
        <p className="mt-4 text-text-muted">
          Web アプリ版は現在開発中です。Day 4 で、DoubleHub の ToDo / メモ、
          BookCompass の本棚（連携済みの場合）、TrainNote のお知らせを表示予定。
        </p>
        <p className="mt-2 text-sm text-text-faint">
          iOS アプリはすでにご利用いただけます。
        </p>
      </Container>
    </Section>
  );
}
