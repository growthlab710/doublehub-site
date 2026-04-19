/**
 * 環境変数アクセサ。
 *
 * NEXT_PUBLIC_HOSTING_MODE:
 *   - 'static'  : GitHub Pages / 静的エクスポート（認証 UI は無効化表示）
 *   - 'dynamic' : Cloudflare Pages 等（認証 UI は有効）
 *
 * 認証が必要な機能は `isDynamicHosting` で切替する。
 */
export const hostingMode =
  (process.env.NEXT_PUBLIC_HOSTING_MODE === 'dynamic' ? 'dynamic' : 'static') as
    | 'static'
    | 'dynamic';

export const isDynamicHosting = hostingMode === 'dynamic';
export const isStaticHosting = hostingMode === 'static';

/** Supabase URL / Anon Key が揃っているかを安全に確認する */
function readPair(urlKey: string, keyKey: string) {
  const url = process.env[urlKey];
  const anon = process.env[keyKey];
  const ok = Boolean(url && anon);
  return { url: url || '', anon: anon || '', ok };
}

export const supabaseConfig = {
  doublehub: readPair(
    'NEXT_PUBLIC_SUPABASE_DOUBLEHUB_URL',
    'NEXT_PUBLIC_SUPABASE_DOUBLEHUB_ANON_KEY'
  ),
  bookcompass: readPair(
    'NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_URL',
    'NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_ANON_KEY'
  ),
  trainnote: readPair(
    'NEXT_PUBLIC_SUPABASE_TRAINNOTE_URL',
    'NEXT_PUBLIC_SUPABASE_TRAINNOTE_ANON_KEY'
  ),
} as const;
