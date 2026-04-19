import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

/**
 * /support/
 *
 * App Store Connect にサポート URL として登録済み。
 * 必ず到達可能な状態を維持する（旧 /support.html からはリダイレクト済み）。
 */
export const metadata: Metadata = {
  title: 'Support — お問い合わせとヘルプ',
  description: 'DoubleHub / BookCompass / TrainNote に関するお問い合わせと、よくある質問。',
  alternates: { canonical: '/support/' },
};

export default function SupportPage() {
  return (
    <Section spacing="lg">
      <Container width="narrow">
        <h1 className="font-display text-3xl font-semibold">Support</h1>
        <p className="mt-6 text-text-muted">
          DoubleHub / BookCompass / TrainNote をご利用いただきありがとうございます。
          お問い合わせは下記よりご連絡ください。
        </p>

        <h2 className="mt-10 font-display text-xl font-semibold">お問い合わせ</h2>
        <p className="mt-4 text-text-muted">
          <a
            href="mailto:support@doublehub.jp"
            className="text-primary underline-offset-4 hover:underline"
          >
            support@doublehub.jp
          </a>
          {' '}までメールにてご連絡ください。数営業日以内にお返事いたします。
        </p>

        <h2 className="mt-10 font-display text-xl font-semibold">よくある質問（FAQ）</h2>
        <dl className="mt-4 space-y-6">
          <div>
            <dt className="font-medium">iOS アプリと Web アプリでアカウントは共通ですか？</dt>
            <dd className="mt-2 text-text-muted text-sm leading-relaxed">
              Apple / Google / Email のいずれかの認証方式で iOS と Web の両方にサインインすれば、
              同一アカウントとして扱われます（匿名ログインは Web では利用不可）。
            </dd>
          </div>
          <div>
            <dt className="font-medium">BookCompass と DoubleHub は連携できますか？</dt>
            <dd className="mt-2 text-text-muted text-sm leading-relaxed">
              はい。DoubleHub 側の設定から「BookCompass と連携」を実行することで、
              BookCompass の本棚や Mutter をダッシュボードに表示できます。
            </dd>
          </div>
          <div>
            <dt className="font-medium">データを削除するには？</dt>
            <dd className="mt-2 text-text-muted text-sm leading-relaxed">
              設定画面の「アカウント削除」からリクエストできます。
              削除リクエスト後、関連データはすべて削除されます（取消不可）。
            </dd>
          </div>
        </dl>

        <p className="mt-12 text-sm text-text-faint">
          このページは App Store Connect のサポート URL として登録されているため、常に到達可能です。
        </p>
      </Container>
    </Section>
  );
}
