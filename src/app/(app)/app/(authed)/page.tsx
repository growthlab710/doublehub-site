import Link from 'next/link';
import { appNavItems } from '@/components/app/AppNav';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'ダッシュボード',
  robots: { index: false },
};

/**
 * /app/ ダッシュボード。
 * Day 4 で各ウィジェット（今日の ToDo / 最新メモ / BookCompass 本棚 /
 * TrainNote お知らせ）を差し込む。
 */
export default function AppDashboardPage() {
  const widgets = appNavItems.filter((n) => n.href !== '/app/');

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold md:text-3xl">
          ダッシュボード
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          DoubleHub / BookCompass / TrainNote をまとめて確認する画面です。
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {widgets.map((w) => (
          <Link
            key={w.href}
            href={w.href}
            className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40 hover:bg-surface-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden>
                {w.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate font-display text-base font-semibold">
                    {w.label}
                  </h2>
                  {w.comingSoon && (
                    <Badge variant="outline" className="text-[10px]">
                      準備中
                    </Badge>
                  )}
                </div>
                {w.description && (
                  <p className="truncate text-xs text-text-muted">
                    {w.description}
                  </p>
                )}
              </div>
            </div>
            <div className="rounded-lg border border-dashed border-border bg-bg/40 p-3 text-xs text-text-faint">
              Day 4 で中身を実装します。
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
