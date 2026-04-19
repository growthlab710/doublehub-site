import { TodoSection } from './_components/TodoSection';
import { MemoSection } from './_components/MemoSection';

export const metadata = {
  title: 'DoubleHub',
  robots: { index: false },
};

/**
 * /app/doublehub/
 * ToDo とメモを横並びに表示（モバイルは縦）。
 */
export default function AppDoubleHubPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">DoubleHub</h1>
        <p className="mt-2 text-sm text-text-muted">
          タスクとメモを一体化して管理します。完了した ToDo も行動ログとして残ります。
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <TodoSection />
        <MemoSection />
      </div>
    </div>
  );
}
