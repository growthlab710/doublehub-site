import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SupportForm } from './_components/SupportForm';

/**
 * /support/
 *
 * App Store Connect にサポート URL として登録済み。
 * 必ず到達可能な状態を維持する（旧 /support.html からはリダイレクト済み）。
 *
 * 旧 static HTML 版の「サポートフォーム」を踏襲し、
 * ユーザーが入力した内容を `mailto:` で本文に埋めて送信できる構成にする。
 */
export const metadata: Metadata = {
  title: 'サポート・お問い合わせ',
  description:
    'DoubleHub・TrainNote・Book Compass・HubWallet に関するお問い合わせやサポート情報をご案内します。',
  alternates: { canonical: '/support/' },
};

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg">
        <Container width="narrow">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Support
            </span>
            <h1 className="mt-3 font-display text-[clamp(1.75rem,1rem+2vw,2.5rem)] font-semibold leading-snug">
              サポート・お問い合わせ
            </h1>
            <p className="mt-4 text-text-muted leading-relaxed">
              DoubleHub、TrainNote、Book Compass、HubWallet に関するご質問・不具合の報告・ご要望などを
              受け付けています。下記のフォームから内容を選んで送信してください。
            </p>
          </div>
        </Container>
      </Section>

      {/* フォーム */}
      <Section spacing="md">
        <Container width="narrow">
          <SupportForm />
        </Container>
      </Section>

      {/* 補足情報 */}
      <Section spacing="lg">
        <Container width="narrow">
          <h2 className="font-display text-lg font-semibold text-text">
            よくお寄せいただく確認事項
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-muted">
            <li>
              アプリが起動しない／クラッシュする場合は、一度アプリを終了して再起動をお試しください。
            </li>
            <li>
              サブスクリプションの解約は、iPhone の「設定」→「Apple ID」→「サブスクリプション」から行えます。
            </li>
            <li>
              データの同期に問題がある場合は、ネットワーク接続をご確認ください。
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link
              href="/privacy/"
              className="text-primary underline-offset-4 hover:underline"
            >
              プライバシーポリシー
            </Link>
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              利用規約（Apple 標準 EULA）
            </a>
            <Link
              href="/"
              className="text-primary underline-offset-4 hover:underline"
            >
              トップへ戻る
            </Link>
          </div>

          <p className="mt-12 text-xs text-text-faint">
            このページは App Store Connect のサポート URL として登録されているため、常に到達可能です。
          </p>
        </Container>
      </Section>
    </>
  );
}
