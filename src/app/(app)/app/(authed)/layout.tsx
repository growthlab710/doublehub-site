/**
 * 認証必須エリア用レイアウト。
 *
 * - dynamic モード: サーバ側で `getServerUser` を呼び未認証なら `/app/login/` へ redirect。
 * - static モード : クライアント側 `StaticAuthGate` でガード。
 *
 * どちらも `AppShell`（サイドバー + ヘッダー）を被せる。
 */

import type { ReactNode } from 'react';
import { isDynamicHosting } from '@/lib/env';
import { StaticAuthGate } from '@/components/app/StaticAuthGate';
import { DynamicAuthGate } from '../_components/DynamicAuthGate';

// dynamic モード時は `cookies()` を呼ぶことで自動的に動的化されるため、
// ここで `export const dynamic` は指定しない（static export との両立のため）。

export default function AuthedLayout({ children }: { children: ReactNode }) {
  if (isDynamicHosting) {
    return <DynamicAuthGate>{children}</DynamicAuthGate>;
  }
  return <StaticAuthGate>{children}</StaticAuthGate>;
}
