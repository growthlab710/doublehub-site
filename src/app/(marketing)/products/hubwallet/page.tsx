import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'HubWallet — 節約疲れしない家計簿。 | DoubleHub',
  description:
    'HubWallet は、レシートを「撮るだけ」で溜めて、隙間時間にまとめて仕分けるための iOS 家計簿アプリです。銀行連携不要・全プラン広告ゼロ。お金の使い方を、反省ではなく自己理解の手がかりに変えていきます。',
  alternates: { canonical: '/products/hubwallet/' },
  openGraph: {
    title: 'HubWallet — 節約疲れしない家計簿。 | DoubleHub',
    description:
      'レシートは「撮るだけ」、仕分けは隙間時間にまとめて。銀行連携なし・広告ゼロの iOS 家計簿アプリ。',
    url: 'https://www.doublehub.jp/products/hubwallet/',
    type: 'website',
    siteName: 'DoubleHub',
    locale: 'ja_JP',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

const screenshots = [
  {
    src: '/images/hubwallet-screen-home.jpg',
    alt: 'HubWallet ホーム画面 — 今月の支出と未整理',
    caption: 'ホーム — 今月の支出と未整理がひと目で分かる',
  },
  {
    src: '/images/hubwallet-screen-triage.jpg',
    alt: '仕分け画面 — レシート画像から金額・店舗・カテゴリを推定',
    caption: '仕分け — スワイプで「修正・保留・確定」',
  },
  {
    src: '/images/hubwallet-screen-monthly.jpg',
    alt: '月次レポート — 月間支出と6ヶ月推移、カテゴリ別の進捗',
    caption: '月次レポート — 6ヶ月推移とカテゴリ別の進捗',
  },
  {
    src: '/images/hubwallet-screen-yearly.jpg',
    alt: '年間レポート — 年間支出見込み・予算超過カテゴリ・来月の支出見込み',
    caption: '年間ビュー — 支出見込みと来月予測',
  },
  {
    src: '/images/hubwallet-screen-categories.jpg',
    alt: 'カテゴリ選択 — 食費・住居・交通・娯楽など 15 カテゴリ',
    caption: 'カテゴリ — やわらかい配色の親カテゴリ 15 種',
  },
  {
    src: '/images/hubwallet-screen-voice.jpg',
    alt: '音声で記録 — 話しかけるだけで未整理に保存',
    caption: '音声入力 — 話しかけて未整理に保存',
  },
];

const pillars = [
  {
    label: 'Capture & Triage',
    title: 'キャプチャと仕分けを、分けていい。',
    body:
      'シャッターを押した瞬間に「未整理」へ自動保存。連続撮影で何枚撮っても、保存ボタンを押す必要はありません。仕分けは隙間時間にまとめて、スワイプで一気に終わらせる。「持ったその場で全部入力する」家計簿の辛さから、まず解放します。',
  },
  {
    label: 'Soft & Positive',
    title: '節約を強要しない、やわらかい家計簿。',
    body:
      '数字を見るたびに反省させない。HubWallet が見せたいのは、責められる予算ではなく「自分の使い方の輪郭」です。「即日整理 N 日連続 🎉」のようなポジティブな指標で、続けたくなる家計簿を目指しています。',
  },
  {
    label: 'Local-First & Ad-Free',
    title: 'データは端末ローカル。広告は一切なし。',
    body:
      'まずは端末ローカル（SwiftData）に保存。銀行口座やカード情報を渡す必要はありません。Free を含む全プランで広告は一切表示しないので、家計簿を開くたびに広告に邪魔されることもありません。',
  },
  {
    label: 'DoubleHub Ready',
    title: '単体で完結。つなげればもっと深く。',
    body:
      'HubWallet は単体でも家計簿として完結します。将来 DoubleHub につながると、価値観や他領域の行動データと組み合わさり、「どんなお金の使い方が、自分を充電させているか」までを見渡せるようになります。',
  },
];

const features = [
  {
    label: 'Input',
    title: 'カメラ、共有シート、音声、手入力。',
    body:
      'カメラ撮影は連続可・撮った瞬間に未整理へ保存。Safari・メール・Files・写真からの共有シート、音声入力、手入力にも対応。「一番ラクな入り口」をその時々で選べます。',
  },
  {
    label: 'AI Recognition',
    title: 'AI が金額・日付・店舗・品目を読む。',
    body:
      'レシート画像から金額・日付・店舗・品目を AI が抽出。さらに親カテゴリ（食費・交通・医療・健康など）を AI が推定し、店舗ごとの履歴から学習していきます。',
  },
  {
    label: 'Triage',
    title: '未整理一覧で、スワイプ一括処理。',
    body:
      '未整理の枚数と放置日数が見える化されるので、「あとでまとめて」が習慣になります。スワイプで「修正・保留・確定」、AI 推定がほぼ正しければそのまま流すだけ。',
  },
  {
    label: 'Reports',
    title: '月次・6ヶ月推移・年間見込みを自動集計。',
    body:
      '月間支出、6 ヶ月推移、親カテゴリ別の進捗、年間換算サマリ、年間支出見込みを自動でまとめます。数字を眺めるだけで、自分の生活コストの輪郭が見えてきます。',
  },
  {
    label: 'Recurring',
    title: '家賃・光熱費・サブスクは、テンプレ化。',
    body:
      '毎月手動で記録するのが手間な定期支出は、テンプレートとして登録しておけば自動計上。固定費に加えて、変動額モードにも対応しています。',
  },
  {
    label: 'Insight',
    title: '事実ベースの軽い気づきを、押しつけずに。',
    body:
      'カテゴリのスパイク、前月比、未使用の可能性があるサブスク、来月の支出見込みなど、事実ベースのインサイトを軽く表示。「節約しろ」ではなく「こうなっています」を伝えます。',
  },
];

const compare = [
  {
    type: '自動連携型',
    examples: 'マネーフォワード ME, Zaim',
    diff:
      '銀行口座やカード情報を渡さなくていい。OCR・手入力・音声・CSV のみで、自分の手元だけで家計簿が完結します。',
  },
  {
    type: 'シンプル家計簿',
    examples: 'Dr.Wallet など',
    diff:
      '入力と仕分けを一緒にやらない、独自のキャプチャ／仕分け分離モデル。続けやすさを設計の中心に置いています。',
  },
  {
    type: 'レシート特化',
    examples: 'レシーピ! など',
    diff:
      'ポイント還元や特売情報ではなく、入力負担の軽減と「自分の使い方の自己理解」に振り切っています。',
  },
  {
    type: 'プライバシー重視',
    examples: 'Moneytree など',
    diff:
      'ローカルファースト保存に加え、Free を含めた全プランで広告は一切なし。',
  },
];

const flows = [
  {
    label: 'アプリ単体での価値',
    desc: 'レシート撮影と仕分けの分離、定期支出の自動計上、月次・年間レポート、事実ベースの気づき。',
  },
  {
    label: 'DoubleHub に渡す情報',
    desc: 'カテゴリ別の支出傾向、続いた習慣／頓挫した習慣、自己投資と浪費の境目に関するシグナル。',
  },
  {
    label: '将来返ってくる提案（Phase 2 以降）',
    desc: 'お金・時間・体調の関係を踏まえた、「どんな使い方が自分を充電させるか」の提案。',
  },
];

const faqs = [
  {
    q: '銀行やクレジットカードと連携できますか？',
    a: 'いいえ。連携は行わず、レシート撮影・手入力・音声・CSV インポートのみで記録します。金融規制やプライバシーの観点から、当面はこの方針を維持します。',
  },
  {
    q: 'データは外部に送られますか？',
    a: 'データは端末ローカル（SwiftData）に保存します。AI による OCR・カテゴリ推定や音声認識を行うときのみ、必要な画像やテキスト・音声を AI に送信します。',
  },
  {
    q: 'Android 版はありますか？',
    a: '初回リリースは iOS のみです（iOS 17.0 以上）。Android 版は現時点で予定していません。',
  },
  {
    q: '既存の家計簿アプリから移行できますか？',
    a: 'マネーフォワードや Zaim などからの CSV インポートに対応する予定です。',
  },
  {
    q: '広告は表示されますか？',
    a: '全プランで広告は一切表示しません。Free プランも同じ条件です。',
  },
  {
    q: 'いつから使えますか？',
    a: '現在 MVP リリース直前の段階です。事前登録の受付や公開時期は、DoubleHub のブログ・X でお知らせします。',
  },
];

export default function HubWalletPage() {
  return (
    <div className="theme-hubwallet">
      {/* ========== 1. Hero ========== */}
      <Container width="wide" className="relative pt-16 pb-14 md:pt-24 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-[-5%] top-[-10%] h-[480px] w-[480px] rounded-full bg-accent-product/15 blur-[120px]" />
        </div>
        <div className="mx-auto grid max-w-content-wide items-center gap-12 md:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-xl shadow-sm">
                💰
              </span>
              <span className="inline-flex items-center rounded-full border border-accent-product/30 bg-accent-product/10 px-3 py-1 text-xs font-semibold text-accent-product">
                HubWallet
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-text-muted">
                近日公開予定
              </span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(1.75rem,1rem+2.8vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              節約疲れしない家計簿。
              <br />
              撮って溜める、あとで整理する。
            </h1>
            <p className="mt-5 max-w-lg text-text-muted">
              HubWallet は、レシートを「撮るだけ」で溜めて、隙間時間にまとめて仕分ける iOS の家計簿アプリです。銀行連携なし・全プラン広告ゼロ。お金の使い方を、反省の対象から自己理解の手がかりへと変えていきます。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" variant="product">
                <Link href="#plans">プランを見る</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/#ecosystem">DoubleHub 全体構想を見る</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-text-faint">
              現在は MVP リリース直前です。App Store での公開時期は、DoubleHub のブログ・X でお知らせします。
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[9/19] overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-xl">
              <Image
                src="/images/hubwallet-screen-home.jpg"
                alt="HubWallet ホーム画面"
                fill
                className="object-contain"
                sizes="(min-width: 768px) 360px, 80vw"
                priority
              />
            </div>
            <p className="mt-3 text-center text-xs text-text-faint">
              ※ 画面はモックアップです。表示金額・店舗名はサンプルデータ。
            </p>
          </div>
        </div>
      </Container>

      {/* ========== 2. Pain Points ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Why HubWallet
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              家計簿が続かないのは、入力が辛いから。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              レシートを持ったその瞬間に、金額・店舗・カテゴリ・メモを全部入れ切る。続かないのは怠惰じゃなく、設計のせいだったかもしれません。
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            {[
              {
                title: '入力が、その場ぜんぶ。',
                body:
                  'レシートを持った瞬間に金額・店・カテゴリ・メモ。1 件ずつでも辛いのに、買い物がまとめて続いた日は地獄です。',
              },
              {
                title: '節約疲れと罪悪感。',
                body:
                  '開くたびに「使い過ぎ」「予算オーバー」と責められる。続けたい気持ちより、見たくない気持ちが勝ってしまう。',
              },
              {
                title: '数字を見ても、で、どうすれば？',
                body:
                  '集計はできても、自分にとって何が改善ポイントか分からない。グラフを眺めるだけで終わりがち。',
              },
              {
                title: '定期支出の毎月手入力。',
                body:
                  '家賃・光熱費・サブスクなど、毎月ほぼ同じ金額を手で入れ直すのは、純粋な作業コスト。',
              },
            ].map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <h3 className="font-display text-base font-semibold tracking-[-0.01em] md:text-lg">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 3. Core Pillars ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Core Experience
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              続けるために、設計から見直した家計簿。
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-product/40 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  {p.label}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold leading-[1.3] tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 4. App Screenshots ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              App Screenshots
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              HubWallet の主な画面。
            </h2>
            <p className="mt-4 text-xs text-text-faint">
              ※ 表示中のデータはすべて開発用のモックです。
            </p>
          </div>
          <div
            className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-12 sm:grid sm:snap-none sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
            aria-label="HubWallet の画面ギャラリー"
          >
            {screenshots.map((s) => (
              <figure
                key={s.src}
                className="flex-shrink-0 basis-[78%] snap-center overflow-hidden rounded-2xl border border-border bg-surface shadow-sm sm:flex-shrink sm:basis-auto sm:snap-align-none"
              >
                <div className="relative aspect-[9/19] overflow-hidden bg-surface-2">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 78vw"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs text-text-muted">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div
            className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted sm:hidden"
            aria-hidden="true"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>スワイプして {screenshots.length} 枚の画面を見る</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </Container>
      </Section>

      {/* ========== 5. Features ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Features
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              HubWallet でできること。
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <article
                key={f.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-product/40 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  {f.label}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold leading-[1.3] tracking-[-0.01em]">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {f.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 6. Privacy ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-3xl">
            <article className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                Privacy & Trust
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold leading-[1.3] tracking-[-0.01em] md:text-2xl">
                銀行口座を渡さない、広告で邪魔されない。
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  '銀行・カード連携なし。OCR・手入力・音声・CSV のみ',
                  'データは端末ローカル（SwiftData）に保存',
                  'AI 処理時のみ、必要なデータを AI に送信',
                  'Sign in with Apple に対応',
                  '全プランで広告は一切なし',
                  '将来 Supabase 同期は Phase 2 で予定（任意）',
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <Check /> {t}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </Section>

      {/* ========== 7. Compare ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Compare
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              似たアプリと、何が違うか。
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-5xl overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-divider bg-surface-2 text-left">
                  <th className="px-4 py-3 font-semibold text-text">タイプ</th>
                  <th className="px-4 py-3 font-semibold text-text-muted">代表例</th>
                  <th className="px-4 py-3 font-semibold text-accent-product">
                    HubWallet との違い
                  </th>
                </tr>
              </thead>
              <tbody className="[&>tr]:border-b [&>tr]:border-divider [&>tr:last-child]:border-0">
                {compare.map((c) => (
                  <tr key={c.type}>
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-text">
                      {c.type}
                    </td>
                    <td className="px-4 py-4 text-text-muted">{c.examples}</td>
                    <td className="px-4 py-4 leading-relaxed text-text">
                      {c.diff}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ========== 8. Flow Into DoubleHub ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Flow Into DoubleHub
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              単体で完結。つなぐと、もっと深く。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              HubWallet は単体でも家計簿として使えます。将来 DoubleHub につながると、お金の使い方は他の生活データと一緒に「自分の輪郭」をつくる素材になります。
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {flows.map((f) => (
              <article
                key={f.label}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                  {f.label}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  {f.desc}
                </p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-text-faint">
            ※ DoubleHub との具体的な連携体験は Phase 2 以降で順次拡張予定です。MVP では「ユーザーが書き出せる API」を提供する程度です。
          </p>
        </Container>
      </Section>

      {/* ========== 9. Plans ========== */}
      <Section spacing="md" id="plans">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              Plans
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              まずは無料で、家計簿を始める。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              基本の記録機能は Free プランから制限なく使えます。AI による OCR・カテゴリ推定をたくさん使いたい方は、Plus プランへ。
            </p>
            <p className="mt-3 text-xs text-text-faint">
              ※ 価格・回数はリリース前の仮置きです。リリース時に変更になる可能性があります。
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Free */}
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                Free
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">無料プラン</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-[-0.03em]">
                  ¥0
                </span>
              </div>
              <p className="mt-3 text-xs text-text-muted">
                基本機能を制限なく。AI 関連は月数回まで（仮）。
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> 手入力・CSV インポートは無制限
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 月次・年間レポートは制限なし
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 親カテゴリ別の予算・定期支出
                </li>
                <li className="flex items-start gap-2">
                  <Check /> AI OCR・カテゴリ推定 月数回まで（最終回数は調整中）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 音声入力も 月数回まで（最終回数は調整中）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 広告は一切なし
                </li>
              </ul>
            </div>

            {/* Plus */}
            <div className="relative rounded-2xl border-2 border-accent-product bg-surface p-8 shadow-lg">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-accent-product px-4 py-1 text-xs font-bold text-white">
                おすすめ
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-product">
                Subscription
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">Plus</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-[-0.03em]">
                  ¥480
                </span>
                <span className="text-sm text-text-muted">／ 月（仮）</span>
              </div>
              <div className="mt-2 inline-flex items-center rounded-full bg-accent-product/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent-product">
                年額 ¥3,800（仮）
              </div>
              <p className="mt-3 text-xs text-text-muted">
                AI OCR・カテゴリ推定・音声入力をたくさん使いたい方向け。
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check />
                  <span>
                    <strong className="font-semibold text-text">AI OCR・カテゴリ推定の利用上限を大幅アップ</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check />
                  <span>
                    <strong className="font-semibold text-text">音声入力の利用上限も大幅アップ</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 将来の DoubleHub 連携を優先的に開放
                </li>
                <li className="flex items-start gap-2">
                  <Check /> いつでも解約可能・記録は端末に残る
                </li>
                <li className="flex items-start gap-2">
                  <Check /> もちろん広告なし
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border bg-surface-2 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              Premium プランについて（将来予定）
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Phase 2 以降に Premium プランを予定しています。トレンド予測、固定費シミュレーション、ライフプランなど、より踏み込んだ未来予測系の機能を中心に検討中です。MVP リリース時点では未提供です。
            </p>
          </div>
        </Container>
      </Section>

      {/* ========== 10. FAQ ========== */}
      <Section spacing="md" surface="alt">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-product">
              FAQ
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              よくある質問。
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-divider rounded-2xl border border-border bg-surface shadow-sm">
            {faqs.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-semibold text-text">
                  <span>{f.q}</span>
                  <span
                    aria-hidden
                    className="mt-1 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border border-border text-text-muted transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 11. Final CTA ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              お金の使い方を、自己理解の手がかりに。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              HubWallet は MVP リリース直前です。公開時期や事前登録の案内は、DoubleHub のブログ・X でお知らせします。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="product">
                <Link href="/blog/">最新のお知らせを見る</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/#ecosystem">DoubleHub 全体構想を見る</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function Check() {
  return (
    <span
      aria-hidden
      className="mt-[0.25rem] grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-accent-product/15"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-accent-product"
      >
        <path d="M2.5 6l2.5 2.5 4.5-5" />
      </svg>
    </span>
  );
}
