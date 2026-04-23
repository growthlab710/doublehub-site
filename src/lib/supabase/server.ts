/**
 * サーバ側 Supabase クライアントファクトリ（App Router / Route Handler / Server Component 用）。
 *
 * v1 では主に DoubleHub のセッション取得（`layout.tsx` の認証ガード）で使用する。
 * BookCompass の Web 側読み書きはブラウザクライアントから行うため、v1 ではサーバ側は
 * 原則不要。必要になった段階で追加する。
 *
 * 参照: docs/web-renewal/03-auth.md
 */
import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { supabaseConfig } from '@/lib/env';
import type { Database as DoubleHubDatabase } from './types-doublehub';

/** サーバ側 DoubleHub クライアント（Cookie 連携） */
export async function getServerDoubleHub() {
  const cookieStore = await cookies();
  const { url, anon, ok } = supabaseConfig.doublehub;
  if (!ok) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_DOUBLEHUB_URL / NEXT_PUBLIC_SUPABASE_DOUBLEHUB_ANON_KEY が設定されていません。'
    );
  }
  return createServerClient<DoubleHubDatabase>(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Route Handler / Server Component 以外からは無視
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          // 同上
        }
      },
    },
    cookieOptions: {
      name: 'sb-doublehub-auth',
      sameSite: 'lax',
      secure: true,
    },
  });
}

/**
 * 現在のユーザーをサーバ側から取得（認証ガード用）。
 * 静的エクスポート時は呼ばれない（ビルド時にサーバコンポーネントが評価されない）。
 */
export async function getServerUser() {
  const supabase = await getServerDoubleHub();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return null;
  return user;
}
