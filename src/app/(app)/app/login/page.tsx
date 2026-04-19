import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata = {
  title: 'Log In',
  robots: { index: false },
};

/**
 * /app/login/ （placeholder）
 * Day 3 で Apple / Google / Email の 3 プロバイダ対応 + Supabase Auth 実装。
 */
export default function LoginPlaceholder() {
  return (
    <Section spacing="md">
      <Container width="narrow">
        <h1 className="font-display text-3xl font-semibold">ログイン（準備中）</h1>
        <p className="mt-4 text-text-muted">
          Web アプリへのサインイン機能は現在実装中です。Day 3 で Apple / Google / Email の
          3 プロバイダに対応予定。
        </p>
      </Container>
    </Section>
  );
}
