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

/**
 * Supabase URL / Anon Key が揃っているかを安全に確認する。
 *
 * 注意: Next.js のクライアントバンドルへの env 置換は
 * `process.env.<識別子>` という**静的プロパティアクセス**のみが対象となり、
 * `process.env[variable]` のような動的ブラケット記法は置換されない。
 * そのため各キーを直接参照してから pair を組み立てる。
 */
function toPair(url: string | undefined, anon: string | undefined) {
  const ok = Boolean(url && anon);
  return { url: url || '', anon: anon || '', ok };
}

export const supabaseConfig = {
  doublehub: toPair(
    process.env.NEXT_PUBLIC_SUPABASE_DOUBLEHUB_URL,
    process.env.NEXT_PUBLIC_SUPABASE_DOUBLEHUB_ANON_KEY
  ),
  bookcompass: toPair(
    process.env.NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_URL,
    process.env.NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_ANON_KEY
  ),
  trainnote: toPair(
    process.env.NEXT_PUBLIC_SUPABASE_TRAINNOTE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_TRAINNOTE_ANON_KEY
  ),
} as const;
