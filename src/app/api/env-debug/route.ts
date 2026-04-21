export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    nodeEnv: process.env.NODE_ENV,
    hostingMode: process.env.NEXT_PUBLIC_HOSTING_MODE ?? null,
    doublehubUrl: process.env.NEXT_PUBLIC_SUPABASE_DOUBLEHUB_URL ?? null,
    doublehubKeyHead:
      (process.env.NEXT_PUBLIC_SUPABASE_DOUBLEHUB_ANON_KEY ?? '').slice(0, 30),
    doublehubKeyLength:
      (process.env.NEXT_PUBLIC_SUPABASE_DOUBLEHUB_ANON_KEY ?? '').length,
    cwd: process.cwd(),
  });
}
