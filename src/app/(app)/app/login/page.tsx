import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { isDynamicHosting, supabaseConfig } from '@/lib/env';
import { LoginForm } from './_components/LoginForm';

function LoginFormFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="space-y-3"
    >
      <div className="h-10 w-full animate-pulse rounded-lg bg-surface-2" />
      <div className="h-px w-full bg-border" />
      <div className="h-4 w-24 animate-pulse rounded bg-surface-2" />
      <div className="h-10 w-full animate-pulse rounded-lg bg-surface-2" />
      <div className="h-10 w-full animate-pulse rounded-lg bg-surface-2" />
      <span className="sr-only">読み込み中…</span>
    </div>
  );
}

export const metadata = {
  title: 'ログイン',
  description: 'DoubleHub Web 版にログインします。',
  robots: { index: false },
};

/**
 * /app/login/
 * - dynamic モード + Supabase env あり : Apple / Email の本ログイン
 * - そうでないとき                      : Coming Soon 表示
 *
 * 新規アカウント登録は iOS 側で完結する前提。Google ログインは iOS で
 * 採用していないため Web でも提供しない。
 *
 * ブランド強化ポイント:
 * - DoubleHub アプリアイコンをヒーローに配置
 * - ブランド色のソフトな放射グラデーションで背景を演出
 * - 下部に BookCompass / TrainNote のアイコンを小さく並べ、
 *   「iOS アプリファミリー」であることを示唆
 */
export default function LoginPage() {
  const canSignIn = isDynamicHosting && supabaseConfig.doublehub.ok;

  return (
    <Section spacing="md" className="relative overflow-hidden">
      {/* 背景の装飾グラデーション */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, var(--color-primary-soft), transparent)',
            opacity: 0.8,
          }}
        />
      </div>

      <Container width="narrow">
        <div className="mx-auto max-w-md">
          <header className="text-center">
            <Link
              href="/"
              className="inline-block"
              aria-label="DoubleHub トップへ"
            >
              <Image
                src="/images/doublehub-icon.jpg"
                alt="DoubleHub アプリアイコン"
                width={72}
                height={72}
                className="mx-auto h-16 w-16 rounded-2xl border border-border object-cover shadow-md"
                priority
              />
            </Link>
            <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">
              DoubleHub にログイン
            </h1>
            <p className="mt-2 text-sm text-text-muted">
              iOS アプリと同じアカウントで、Web からも ToDo とメモを管理できます。
            </p>
          </header>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
            {canSignIn ? (
              <Suspense fallback={<LoginFormFallback />}>
                <LoginForm />
              </Suspense>
            ) : (
              <div className="space-y-4 text-center">
                <div className="text-3xl" aria-hidden>
                  🚧
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    Web 版ログインは準備中です
                  </h2>
                  <p className="mt-2 text-sm text-text-muted">
                    現在のホスティング環境では Web 版ログインが無効化されています。
                    本番環境が整い次第、Apple / Email のいずれかでログイン
                    できるようになります。
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-block rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface-2 hover:text-text"
                >
                  サイトに戻る
                </Link>
              </div>
            )}
          </div>

          {/* プロダクトファミリー紹介 */}
          <div className="mt-8 rounded-xl border border-dashed border-border bg-surface/40 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-faint">
              Apps Family
            </p>
            <ul className="mt-3 flex items-center justify-center gap-5">
              {[
                {
                  href: '/products/bookcompass/',
                  src: '/images/bookcompass-app-icon.jpg',
                  label: 'BookCompass',
                },
                {
                  href: '/products/doublehub/',
                  src: '/images/doublehub-icon.jpg',
                  label: 'DoubleHub',
                },
                {
                  href: '/products/trainnote/',
                  src: '/images/trainnote-app-icon.jpg',
                  label: 'TrainNote',
                },
              ].map((app) => (
                <li key={app.label}>
                  <Link
                    href={app.href}
                    className="group flex flex-col items-center gap-1.5 text-text-muted transition-colors hover:text-text"
                    aria-label={`${app.label} の詳細`}
                  >
                    <span className="relative block h-10 w-10 overflow-hidden rounded-lg border border-border shadow-sm transition-transform group-hover:-translate-y-0.5">
                      <Image
                        src={app.src}
                        alt=""
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="text-[10px]">{app.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-center text-xs text-text-faint">
            ログインすると{' '}
            <Link href="/privacy/" className="underline hover:text-text">
              プライバシーポリシー
            </Link>{' '}
            に同意したものとみなされます。
          </p>
        </div>
      </Container>
    </Section>
  );
}
