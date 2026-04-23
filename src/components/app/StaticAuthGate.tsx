'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { getBrowserDoubleHub } from '@/lib/supabase/client';
import { supabaseConfig } from '@/lib/env';
import { AppShell } from './AppShell';

interface StaticAuthGateProps {
  children: React.ReactNode;
}

/**
 * static ホスティング（NEXT_PUBLIC_HOSTING_MODE=static）用の認証ガード。
 *
 * Server Component → Client Component に関数 children を渡すことができないため、
 * `children` を素の ReactNode として受け取り、このコンポーネントの内部で
 * `AppShell` を被せる。user は React state として持ち、AppShell に渡す。
 *
 * Supabase env 未設定の場合は `/app/login/` にリダイレクトする。
 */
export function StaticAuthGate({ children }: StaticAuthGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!supabaseConfig.doublehub.ok) {
      if (!pathname?.startsWith('/app/login')) {
        router.replace('/app/login/');
      }
      setReady(true);
      return;
    }

    const supabase = getBrowserDoubleHub();

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      if (data.user) {
        setUser(data.user);
      } else if (!pathname?.startsWith('/app/login')) {
        router.replace('/app/login/');
      }
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router, pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg text-text">
        <div className="text-sm text-text-faint">読み込み中…</div>
      </div>
    );
  }

  if (!user) {
    return null; // redirect 中
  }

  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;

  return (
    <AppShell
      user={{
        email: user.email ?? null,
        displayName:
          (metadata.display_name as string | undefined) ??
          (metadata.full_name as string | undefined) ??
          (metadata.name as string | undefined) ??
          null,
        avatarUrl: (metadata.avatar_url as string | undefined) ?? null,
      }}
    >
      {children}
    </AppShell>
  );
}
