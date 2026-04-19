import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

/**
 * /privacy/
 * App Store Connect にプライバシー URL として登録済み。
 * Day 2 で legacy/privacy.html から本文を完全移植する。
 */
export const metadata: Metadata = {
  title: 'Privacy Policy — プライバシーポリシー',
  description: 'DoubleHub / BookCompass / TrainNote のプライバシーポリシー。',
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPage() {
  return (
    <Section spacing="lg">
      <Container width="narrow">
        <h1 className="font-display text-3xl font-semibold">プライバシーポリシー</h1>
        <p className="mt-4 text-sm text-text-faint">最終更新: 2026-04-18</p>

        <h2 className="mt-10 font-display text-xl font-semibold">取得する情報</h2>
        <p className="mt-4 text-text-muted">
          DoubleHub / BookCompass / TrainNote（以下「本サービス」）では、以下の情報を取得します。
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-text-muted">
          <li>認証情報（Apple ID / Google / メールアドレス / 匿名 ID）</li>
          <li>ユーザーが自発的に入力したコンテンツ（ToDo、メモ、書籍、トレーニング記録）</li>
          <li>端末情報（iCloud 同期のため必要な範囲）</li>
          <li>サイト利用解析情報（Google Analytics 4、IP 匿名化）</li>
        </ul>

        <h2 className="mt-10 font-display text-xl font-semibold">利用目的</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-text-muted">
          <li>本サービスの提供・維持・改善</li>
          <li>お問い合わせ対応</li>
          <li>障害検知・セキュリティ維持</li>
        </ul>

        <h2 className="mt-10 font-display text-xl font-semibold">第三者提供</h2>
        <p className="mt-4 text-text-muted">
          法令に基づく場合を除き、取得した情報を第三者に提供することはありません。
          AI 機能の提供のため、必要最小限の情報を OpenAI、Anthropic、Google 等の AI プロバイダに送信する場合があります（
          本文テキストを除き、個人を特定する情報は送信しません）。
        </p>

        <h2 className="mt-10 font-display text-xl font-semibold">データ削除</h2>
        <p className="mt-4 text-text-muted">
          アプリ内の設定からアカウント削除をリクエストできます。
          削除は数日以内に処理され、関連データは全て削除されます。
        </p>

        <h2 className="mt-10 font-display text-xl font-semibold">お問い合わせ</h2>
        <p className="mt-4 text-text-muted">
          プライバシーに関するお問い合わせは{' '}
          <a href="mailto:support@doublehub.jp" className="text-primary underline-offset-4 hover:underline">
            support@doublehub.jp
          </a>{' '}
          までご連絡ください。
        </p>

        <p className="mt-10 text-sm text-text-faint">
          ※ 本ページは App Store Connect プライバシー URL として登録済み。Day 2 で旧 privacy.html から完全移植予定。
        </p>
      </Container>
    </Section>
  );
}
