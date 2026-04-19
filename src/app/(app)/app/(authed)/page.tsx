import Link from 'next/link';
import { appNavItems } from '@/components/app/AppNav';
import { Badge } from '@/components/ui/Badge';
import { DashboardWidgets } from './_components/DashboardWidgets';

export const metadata = {
  title: 'ダッシュボード',
  robots: { index: false },
};

/**
 * /app/ ダッシュボード。
 * - 「未完了の ToDo」「最新のメモ」のクイック表示
 * - 各プロダクトへのハブカード
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

      <DashboardWidgets />

      <section>
        <h2 className="font-display text-lg font-semibold">プロダクト</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                    <h3 className="truncate font-display text-base font-semibold">
                      {w.label}
                    </h3>
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
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
