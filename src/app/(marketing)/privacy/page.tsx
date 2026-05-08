import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

/**
 * /privacy/
 *
 * プライバシーポリシーのハブページ。
 * 各プロダクトの詳細ポリシーは /privacy/<slug>/ に分割。
 *
 * 注:
 * - 旧バージョンではこのページに DoubleHub 本体のプライバシーポリシー本文が
 *   直書きされていたが、HubWallet を含む 4 プロダクト体制に合わせてハブ化。
 *   DoubleHub 本体のポリシー本文は /privacy/doublehub/ に移設。
 * - App Store Connect 等に登録済みの旧 URL からは、ハブ → 各プロダクトページ
 *   へ 1 クリックで辿れるようにしてある。
 */
export const metadata: Metadata = {
  title: 'Privacy — プライバシーポリシー',
  description:
    'DoubleHub / TrainNote / BookCompass / HubWallet のプライバシーポリシーをまとめています。各プロダクトのプライバシーポリシーへ進めます。',
  alternates: { canonical: '/privacy/' },
};

type PolicyEntry = {
  /** プロダクト識別子。href にも使う。 */
  slug: 'doublehub' | 'trainnote' | 'bookcompass' | 'hubwallet';
  /** プロダクト表示名。 */
  name: string;
  /** 1 行説明（このプロダクトのプライバシー方針の要約）。 */
  description: string;
  /** ページがある場合は内部リンク、まだ無い場合は null。 */
  href: string | null;
  /** カードに添える状態ラベル（任意）。 */
  badge?: string;
};

const policies: PolicyEntry[] = [
  {
    slug: 'doublehub',
    name: 'DoubleHub',
    description:
      'パーソナル AI アシスタント本体。ToDo・メモ・チャット、ヘルスケア／カレンダー連携の取扱い、外部 AI サービスへの送信について。',
    href: '/privacy/doublehub/',
  },
  {
    slug: 'trainnote',
    name: 'TrainNote',
    description:
      'トレーニング記録アプリ。記録は基本的に端末内に保存。AI コーチ利用時の外部送信の範囲について。',
    href: '/privacy/trainnote/',
  },
  {
    slug: 'bookcompass',
    name: 'BookCompass',
    description:
      '読書アプリ。匿名ユーザー ID と Supabase によるクラウド保存、AI チャット機能と外部送信について。',
    href: '/privacy/bookcompass/',
  },
  {
    slug: 'hubwallet',
    name: 'HubWallet',
    description:
      '家計簿アプリ。レシート OCR・カテゴリ推定時の AI 送信、ローカル保存、銀行連携を行わない方針について。',
    href: '/privacy/hubwallet/',
  },
];

export default function PrivacyHubPage() {
  return (
    <Section spacing="lg">
      <Container width="narrow">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
          Privacy
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          プライバシーポリシー
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          GrowthLab が提供する各プロダクトのプライバシーポリシーをまとめています。アプリごとに保存先や外部送信の構成が異なるため、ご利用のプロダクトのページをご確認ください。
        </p>

        <div className="mt-10 flex flex-col gap-3">
          {policies.map((p) => {
            const isAvailable = p.href !== null;
            const baseClass =
              'group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-6 shadow-sm transition';
            const interactiveClass = isAvailable
              ? 'hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md'
              : 'opacity-70';
            const Wrapper = ({ children }: { children: React.ReactNode }) =>
              isAvailable ? (
                <Link href={p.href!} className={`${baseClass} ${interactiveClass}`}>
                  {children}
                </Link>
              ) : (
                <div className={`${baseClass} ${interactiveClass}`}>{children}</div>
              );
            return (
              <Wrapper key={p.slug}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-lg font-semibold tracking-[-0.01em] md:text-xl">
                    {p.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    {p.badge ? (
                      <span className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                        {p.badge}
                      </span>
                    ) : null}
                    {isAvailable ? (
                      <span
                        aria-hidden
                        className="text-text-faint transition group-hover:translate-x-0.5 group-hover:text-primary"
                      >
                        →
                      </span>
                    ) : null}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-text-muted">{p.description}</p>
              </Wrapper>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface-2 p-6">
          <h2 className="font-display text-base font-semibold">共通の事項</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-text-muted">
            <li>
              事業者名:{' '}
              <span className="text-text">GrowthLab</span>
            </li>
            <li>
              お問い合わせ:{' '}
              <a
                href="mailto:growthlab116710@gmail.com"
                className="text-primary hover:underline"
              >
                growthlab116710@gmail.com
              </a>
              （
              <Link href="/support/" className="text-primary hover:underline">
                サポートフォーム
              </Link>
              からも受け付けています）
            </li>
            <li>
              いずれのプロダクトでも、法令に基づく場合を除きユーザー情報を第三者へ販売することはなく、広告目的で個人情報を提供することもありません。
            </li>
            <li>
              本ポリシーは、法令改正や各アプリの機能変更に応じて改定することがあります。重要な変更がある場合は、アプリ内表示またはこのページでお知らせします。
            </li>
          </ul>
        </div>

        <p className="mt-10 text-sm text-text-muted">
          <Link href="/" className="text-primary hover:underline">
            DoubleHub トップへ戻る
          </Link>
        </p>
      </Container>
    </Section>
  );
}
