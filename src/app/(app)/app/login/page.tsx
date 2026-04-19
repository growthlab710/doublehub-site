import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { isDynamicHosting, supabaseConfig } from '@/lib/env';
import { LoginForm } from './_components/LoginForm';

export const metadata = {
  title: 'ログイン',
  description: 'DoubleHub Web 版にログインします。',
  robots: { index: false },
};

/**
 * /app/login/
 * - dynamic モード + Supabase env あり : Apple / Google / Email の本ログイン
 * - そうでないとき                      : Coming Soon 表示
 */
export default function LoginPage() {
  const canSignIn = isDynamicHosting && supabaseConfig.doublehub.ok;

  return (
    <Section spacing="md">
      <Container width="narrow">
        <div className="mx-auto max-w-md">
          <header className="text-center">
            <Link
              href="/"
              className="inline-block font-display text-2xl font-bold tracking-tight"
            >
              DoubleHub
            </Link>
            <h1 className="mt-6 font-display text-2xl font-semibold">
              Web アプリ版にログイン
            </h1>
            <p className="mt-2 text-sm text-text-muted">
              iOS アプリと同じアカウントでログインできます。
            </p>
          </header>

          <div className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-sm">
            {canSignIn ? (
              <LoginForm />
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
                    本番環境が整い次第、Apple / Google / Email のいずれかでログイン
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
