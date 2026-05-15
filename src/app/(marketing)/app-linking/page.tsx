import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site/config';

/**
 * /app-linking/
 *
 * iOS 各アプリの「設定」画面からリンクされる、アプリ間連携の説明ページ。
 * 現状は BookCompass <-> DoubleHub の双方向連携のみ対応。今後 TrainNote / HubWallet など
 * 他アプリも順次追加される想定で、メリット説明と手順を一箇所にまとめる。
 *
 * 各アプリの連携設定画面に貼るリンク先として安定運用する必要があるため、
 * URL は `/app-linking/` で固定（trailingSlash: true 環境）。
 */
export const metadata: Metadata = {
  title: 'アプリ連携ガイド — DoubleHub と対応アプリをつなぐ',
  description:
    'DoubleHub と BookCompass などの対応アプリを連携することで、複数のサービスにまたがるあなたの行動を一つの「ダブル」が理解できるようになります。連携のメリットと、設定画面からの具体的な手順を画面付きで解説。',
  keywords: [
    'DoubleHub 連携',
    'BookCompass 連携',
    'アプリ連携',
    '連携コード',
    'DoubleHub 設定',
    'BookCompass 設定',
    'iOS アプリ連携',
  ],
  alternates: { canonical: '/app-linking/' },
  openGraph: {
    title: 'アプリ連携ガイド — DoubleHub と対応アプリをつなぐ',
    description:
      'DoubleHub と BookCompass を連携して、読書の文脈もダブルに渡そう。設定画面からの手順を 3 ステップで解説。',
    url: 'https://www.doublehub.jp/app-linking/',
    type: 'website',
    siteName: 'DoubleHub',
    locale: 'ja_JP',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'アプリ連携ガイド — DoubleHub と対応アプリをつなぐ',
    description:
      'DoubleHub と BookCompass を連携して、読書の文脈もダブルに渡そう。設定画面からの手順を 3 ステップで解説。',
    images: ['/images/og-default.jpg'],
  },
};

// アプリ内（特に BookCompass / DoubleHub の設定画面）から流入するユーザー向け。
// 「連携してから何が起きるか」を、現状実装ベースで具体的に示す。
// 横断的なワンタップ遷移など、未実装の体験は書かない。
const benefits = [
  {
    title: '読書の記録が、ダブルの判断材料になる',
    body:
      'BookCompass に貯めてきた本・Mutter（短文感想）・読書履歴が、DoubleHub の「ダブル」から参照できる材料に加わります。タスクやメモだけでは見えなかった、あなたの興味・関心や思考の傾向まで含めて、ダブルが日々の整理や対話に活かせるようになります。',
  },
  {
    title: '初期設定をやり直さず、興味の軸を引き継げる',
    body:
      'すでに BookCompass で残してきた読書ジャンルやテーマ性は、DoubleHub 側で再入力する必要がありません。アプリ単独で使うときよりも、最初から「あなたが何に時間を使ってきた人なのか」を踏まえた応答に近づきます。',
  },
  {
    title: '渡す範囲は、あなたが決めて、あとから外せる',
    body:
      '連携は端末ごとの手動操作で完結し、勝手にアカウントを横断同期することはありません。不要になれば各アプリの設定からいつでも解除でき、解除後はそれぞれのアプリ単体の状態に戻ります。',
  },
  {
    title: 'TrainNote・HubWallet など、今後の対応に備える',
    body:
      '現在は BookCompass × DoubleHub のみの対応ですが、今後 TrainNote（身体）や HubWallet（家計）など、エコシステム内の他アプリも順次連携対象に加える予定です。今の段階で BookCompass と DoubleHub をつないでおくと、対応が増えたタイミングでそのまま輪を広げられます。',
  },
];

// モバイルからの閲覧が中心のため、各ステップは 1〜2 行で読み切れる短い文に。
// 1 ステップ＝「どのアプリで／何をタップするか／何が起きるか」だけに絞る。
const steps = [
  {
    number: '01',
    eyebrow: 'BookCompass',
    title: '設定で「DoubleHub と連携」をタップ',
    body: (
      <>
        BookCompass の<strong className="text-text">「設定」</strong>を開き、
        <strong className="text-text">「DoubleHub と連携」</strong>をタップ。
        連携コードが表示されます。
      </>
    ),
    image: '/images/app-linking-step-01-bookcompass-settings.jpg',
    imageAlt:
      'BookCompass iOS アプリの設定画面。下部に「DoubleHub と連携」の項目が表示されている。',
  },
  {
    number: '02',
    eyebrow: 'DoubleHub',
    title: '設定で「BookCompass と連携」をタップ',
    body: (
      <>
        DoubleHub の<strong className="text-text">「設定」</strong>を開き、
        <strong className="text-text">「BookCompass と連携」</strong>をタップ。
      </>
    ),
    image: '/images/app-linking-step-02-doublehub-settings.jpg',
    imageAlt:
      'DoubleHub iOS アプリの設定画面。下部のカードに「BookCompass と連携」が表示されている。',
  },
  {
    number: '03',
    eyebrow: 'DoubleHub',
    title: 'コードを入力して「連携する」',
    body: (
      <>
        BookCompass で表示されたコードを入力し、
        <strong className="text-text">「連携する」</strong>をタップ。
        両アプリの表示が「連携済み」になれば完了です。
      </>
    ),
    image: '/images/app-linking-step-03-doublehub-code-input.jpg',
    imageAlt:
      'DoubleHub のコード入力画面。BookCompass で発行された連携コードを入力するフォームが表示されている。',
  },
];

const faqs = [
  {
    q: '連携にあたって、追加の費用はかかりますか？',
    a: 'いいえ。両アプリのインストールと App Store 経由のサインインが完了していれば、連携自体に費用はかかりません。',
  },
  {
    q: '連携を解除したくなったらどうすればよいですか？',
    a: 'DoubleHub または BookCompass の設定画面から、いつでも連携を解除できます。解除後はそれぞれのアプリ単体での利用に戻ります。',
  },
  {
    q: 'コードが期限切れになったり、入力に失敗したりしたら？',
    a: '連携コードは一定時間で失効します。失敗した場合は再度 BookCompass 側でコードを発行し直し、最新のコードを入力してください。',
  },
  {
    q: '今後どのアプリが連携対応する予定ですか？',
    a: 'TrainNote（鍛える）、HubWallet（家計簿）など、DoubleHub エコシステム内のアプリを順次追加する予定です。対応時期は本ページと公式ブログでご案内します。',
  },
];

export default function AppLinkingPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg">
        <Container width="narrow">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              App Linking
            </span>
            <h1 className="mt-3 font-display text-[clamp(1.75rem,1rem+2vw,2.75rem)] font-semibold leading-snug">
              アプリ同士をつないで、
              <br className="hidden sm:inline" />
              あなたのダブルをもっと賢く。
            </h1>
            <p className="mt-5 text-text-muted leading-relaxed">
              DoubleHub は、{siteConfig.name} エコシステム内の対応アプリと連携できます。
              現在は <strong className="text-text">BookCompass</strong>{' '}
              との双方向連携に対応しており、今後 TrainNote や HubWallet などの対応アプリも順次追加していく予定です。
              連携すると、それぞれのアプリで残してきた記録が一つの「ダブル」に集まり、生活全体を俯瞰した気づきが返ってくるようになります。
            </p>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section spacing="md" surface="alt">
        <Container width="default">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Benefits
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,1rem+1.5vw,2rem)] font-semibold leading-snug">
              連携で何が変わるのか
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <h3 className="font-display text-base font-semibold text-text">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Steps */}
      <Section spacing="lg">
        <Container width="default">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              How to Link
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,1rem+1.5vw,2rem)] font-semibold leading-snug">
              連携の手順（BookCompass × DoubleHub）
            </h2>
            <p className="mt-4 text-sm text-text-muted leading-relaxed">
              BookCompass 側でコードを発行し、DoubleHub 側でそのコードを入力する 3 ステップで完了します。
              所要時間は 1 分ほどです。
            </p>
          </div>

          <ol className="mt-10 space-y-12 md:space-y-24">
            {steps.map((step, i) => (
              <li
                key={step.number}
                className="grid items-center gap-6 md:grid-cols-2 md:gap-12"
              >
                <div
                  className={
                    'flex justify-center md:order-1 ' +
                    (i % 2 === 1 ? 'md:order-2' : '')
                  }
                >
                  <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px]">
                    {/* iPhone screenshots: 1080x2348 ≈ 9:19.56. Use intrinsic ratio. */}
                    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-2 shadow-xl">
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        width={1080}
                        height={2348}
                        sizes="(min-width: 768px) 300px, (min-width: 640px) 260px, 220px"
                        className="h-auto w-full"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                </div>

                <div className={i % 2 === 1 ? 'md:order-1' : 'md:order-2'}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl font-semibold text-primary/80">
                      {step.number}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {step.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-text sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Supported apps */}
      <Section spacing="md" surface="alt">
        <Container width="narrow">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Supported Apps
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,1rem+1.5vw,2rem)] font-semibold leading-snug">
              対応アプリ
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
              <Image
                src="/images/doublehub-icon.jpg"
                alt="DoubleHub アプリアイコン"
                width={56}
                height={56}
                className="h-14 w-14 rounded-2xl"
              />
              <div className="flex-1">
                <div className="font-display text-base font-semibold text-text">
                  DoubleHub
                </div>
                <div className="text-xs text-text-muted">対応済み（基点アプリ）</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
              <Image
                src="/images/bookcompass-app-icon.jpg"
                alt="BookCompass アプリアイコン"
                width={56}
                height={56}
                className="h-14 w-14 rounded-2xl"
              />
              <div className="flex-1">
                <div className="font-display text-base font-semibold text-text">
                  BookCompass
                </div>
                <div className="text-xs text-text-muted">対応済み</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border bg-surface/60 p-4 opacity-80">
              <Image
                src="/images/trainnote-app-icon.jpg"
                alt="TrainNote アプリアイコン"
                width={56}
                height={56}
                className="h-14 w-14 rounded-2xl grayscale"
              />
              <div className="flex-1">
                <div className="font-display text-base font-semibold text-text">
                  TrainNote
                </div>
                <div className="text-xs text-text-muted">今後対応予定</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border bg-surface/60 p-4 opacity-80">
              <Image
                src="/images/hubwallet-app-icon.jpg"
                alt="HubWallet アプリアイコン"
                width={56}
                height={56}
                className="h-14 w-14 rounded-2xl grayscale"
              />
              <div className="flex-1">
                <div className="font-display text-base font-semibold text-text">
                  HubWallet
                </div>
                <div className="text-xs text-text-muted">今後対応予定</div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-text-faint">
            ※ 対応アプリは順次追加予定です。最新の対応状況は本ページに反映されます。
          </p>
        </Container>
      </Section>

      {/* FAQ */}
      <Section spacing="lg">
        <Container width="narrow">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              FAQ
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,1rem+1.5vw,2rem)] font-semibold leading-snug">
              よくあるご質問
            </h2>
          </div>
          <dl className="mt-10 space-y-6">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <dt className="font-display text-base font-semibold text-text">
                  {f.q}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-text-muted">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="md" surface="alt">
        <Container width="narrow">
          <div className="rounded-3xl border border-border bg-surface p-8 text-center shadow-sm sm:p-12">
            <h2 className="font-display text-xl font-semibold leading-snug text-text sm:text-2xl">
              まだアプリをお持ちでない方は、こちらから。
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              DoubleHub と BookCompass、それぞれを App Store からインストールしてから連携してください。
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="primary" size="md">
                <a
                  href={siteConfig.social.appStoreDoubleHub}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DoubleHub を入手
                </a>
              </Button>
              <Button asChild variant="secondary" size="md">
                <a
                  href={siteConfig.social.appStoreBookCompass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BookCompass を入手
                </a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
              <Link
                href="/products/doublehub/"
                className="text-primary underline-offset-4 hover:underline"
              >
                DoubleHub の詳細
              </Link>
              <Link
                href="/products/bookcompass/"
                className="text-primary underline-offset-4 hover:underline"
              >
                BookCompass の詳細
              </Link>
              <Link
                href="/support/"
                className="text-primary underline-offset-4 hover:underline"
              >
                うまくいかない時は
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
