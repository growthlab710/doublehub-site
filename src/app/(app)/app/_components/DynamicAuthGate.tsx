import { redirect } from 'next/navigation';
import { getServerUser } from '@/lib/supabase/server';
import { supabaseConfig } from '@/lib/env';
import { AppShell } from '@/components/app/AppShell';

/**
 * Server Component 側の認証ガード（dynamic モード専用）。
 *
 * Supabase env が未設定の場合でも例外で落とさず、ログイン画面へ誘導する。
 */
export async function DynamicAuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!supabaseConfig.doublehub.ok) {
    redirect('/app/login/');
  }

  const user = await getServerUser();
  if (!user) {
    redirect('/app/login/');
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
