/**
 * Supabase PKCE コールバックハンドラ。
 *
 * Magic Link / OAuth の認可コード（?code=）を受け取り、
 * `exchangeCodeForSession` でセッションを確立して cookie に書き込む。
 * 成功時は `/app/` (または `?next=/app/...`) に、失敗時はエラー付きで
 * `/app/login/` にリダイレクトする。
 */
import { NextResponse } from 'next/server';
import { getServerDoubleHub } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const nextRaw = url.searchParams.get('next') ?? '/app/';
  // オープンリダイレクト防止: 同一オリジンの `/app/` 配下のみ許可
  const next = nextRaw.startsWith('/app/') ? nextRaw : '/app/';

  if (!code) {
    return NextResponse.redirect(
      new URL('/app/login/?error=missing_code', url.origin)
    );
  }

  try {
    const supabase = await getServerDoubleHub();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        new URL('/app/login/?error=auth_callback_failed', url.origin)
      );
    }
    return NextResponse.redirect(new URL(next, url.origin));
  } catch {
    return NextResponse.redirect(
      new URL('/app/login/?error=auth_callback_exception', url.origin)
    );
  }
}
