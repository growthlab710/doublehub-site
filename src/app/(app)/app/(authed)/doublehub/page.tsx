import { DoubleHubClient } from './_components/DoubleHubClient';

export const metadata = {
  title: 'DoubleHub',
  robots: { index: false },
};

/**
 * /app/doublehub/
 * ToDo とメモを「プライベート / 仕事」タブで切り替えて表示（iOS と同じ構造）。
 * 実装はすべて client コンポーネントに委譲。
 */
export default function AppDoubleHubPage() {
  return <DoubleHubClient />;
}
