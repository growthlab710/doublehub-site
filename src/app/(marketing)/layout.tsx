import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';

/**
 * 公開エリア（LP / Blog / About / Support / Privacy）共通レイアウト。
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-text">
      <MarketingHeader />
      {/* main 自身に overflow-x: clip を二重に効かせる。
          html/body だけでは iOS Safari で稀に横ジッターが残るため、
          ページコンテンツ直近のコンテナで確実にクリッピングする。 */}
      <main className="flex-1 overflow-x-clip">{children}</main>
      <MarketingFooter />
    </div>
  );
}
