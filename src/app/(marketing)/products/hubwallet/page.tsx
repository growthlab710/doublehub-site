import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site/config';
import { withAppStoreCampaign } from '@/lib/site/appStoreLink';

const appStoreUrl = siteConfig.social.appStoreHubWallet;
const appStoreBadge =
  'https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/ja-jp?releaseDate=1774224000';

// App Store 導線の設置位置別キャンペーントークン（Apple の `ct`）。
// 広告 → この LP → App Store の流れで、どの位置のバッジから入れたかを
// App Store Connect の App Analytics 側で分けて見るために使う。
// 未指定のバッジを足したときは汎用の `hw_xads_lp` に落ちる。
//
// 計測方針: Apple 側（製品ページ表示・ダウンロード）は `ct`、サイト側（GA4 の流入・回遊）は
// 着地 URL の utm_* で見る。両者は独立しているので、広告の並走テストでは着地 URL に utm を付ける。
// 例: https://www.doublehub.jp/products/hubwallet/?utm_source=x&utm_medium=paid&utm_campaign=hw_search_ab
const campaignTokens = {
  hero: 'hw_xads_lp_hero',
  band: 'hw_xads_lp_band',
  search: 'hw_xads_lp_search',
  footer: 'hw_xads_lp_footer',
  other: 'hw_xads_lp',
} as const;

// 品名検索（アプリ内の名称は「買ったものを探す」）は Plus の機能で、この日いっぱいまで Free にも開放されている。
// 正本はアプリ側の `ItemMemoryAccess.freeAccessEndsAt`（2026-12-01 0:00 JST）。期限を変えるときはアプリと揃える。
// TODO(2026-12-01 以降): オファー帯・探すブロック・料金表・FAQ から無料開放の文言を外す（この定数の参照箇所）
const itemSearchFreeUntil = '2026年11月30日';

// 無料プランの AI 利用は「標準は月 5 回。この日までは特別に月 10 回」（2.6.0 の表示）。
// 正本はアプリ側の `FreeAIQuotaNotice`（2026-12-01 0:00 JST に表示が切り替わる）。
// TODO(2026-12-01 以降): 料金カード・比較表・脚注から「特別に月 10 回」を外し、月 5 回だけにする（この定数の参照箇所）
const aiFreeSpecialUntil = '2026年11月30日';

export const metadata: Metadata = {
  title: 'HubWallet — 広告なしの家計簿。レシートは撮るだけ | DoubleHub',
  description:
    '広告が、ひとつも出ない iPhone の家計簿アプリ HubWallet。レシートは撮るだけで、仕分けは隙間時間にまとめて。サブスク・固定費の管理と、無料お試しの終了前・年額の更新前のお知らせにも対応しています。',
  alternates: { canonical: '/products/hubwallet/' },
  openGraph: {
    title: 'HubWallet — 広告なしの家計簿。レシートは撮るだけ | DoubleHub',
    description:
      'レシートは撮るだけ、仕分けは隙間時間にまとめて。サブスクの終了前もお知らせ。広告が、ひとつも出ない iPhone の家計簿アプリ。',
    url: 'https://www.doublehub.jp/products/hubwallet/',
    type: 'website',
    siteName: 'DoubleHub',
    locale: 'ja_JP',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

// 2.6.0 の画面（2026-10-01 撮影・架空の店名とサンプルの金額）。撮影の記録は
// マーケティング/30.画面素材/HubWallet/2.6.0/manifest.json。Plus の画面はキャプションに「Plus」と書く
const screenshots = [
  {
    src: '/images/hubwallet-recurring-202610.jpg',
    alt: 'ホームの「固定費・サブスク」— 月額換算・年額・月額構成と、30日以内の予定（無料お試しの終了日つき）',
    caption: '固定費・サブスク — 次の予定と、お試しの終了日がひと目で',
  },
  {
    src: '/images/hubwallet-home-202610.jpg',
    alt: 'HubWallet のホーム — 今月の支出・予算の残り・残り日数・1日あたりの目安と、未整理の件数',
    caption: 'ホーム — 今月の予算の残りと、1日あたりの目安',
  },
  {
    src: '/images/hubwallet-unsorted-202610.jpg',
    alt: '未整理の一覧 — 撮ったレシートが、仕分け前のまま並ぶ',
    caption: '未整理 — 撮ったレシートは、ここに溜まる',
  },
  {
    src: '/images/hubwallet-sort-202610.jpg',
    alt: '仕分け — 8%と10%の内訳が印字されたレシートを、食料品と消耗品の2件に分けて記録する提案',
    caption: '仕分け — スワイプで確定。食品と日用品は分けて記録も',
  },
  {
    src: '/images/hubwallet-monthly-202610.jpg',
    alt: '月次レポート — 月間支出・カテゴリ構成・予算の進み・6ヶ月推移',
    caption: '月次レポート — 今月の使いみちが、一枚に',
  },
  {
    src: '/images/hubwallet-outlook-202610.jpg',
    alt: '家計の見通し（Plus）— これから12ヶ月の固定費の予定と、1年間の予定額',
    caption: '家計の見通し（Plus）— これから 12 ヶ月の固定費',
  },
];

const itemSearchPoints = [
  '品名の一部で、撮ったレシートの品目を検索できます。',
  '同じお店の同じ品なら、前回との差額も出ます（別のお店とは比べません）。',
  '探せるのは、自分で撮ったレシートの品目。撮りためるほど、見つかるものが増えます。',
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
    label: 'Ad-Free & Local-First',
    title: '広告は一切なし。記録は手元に。',
    body:
      'Free を含む全プランで広告を表示しないので、家計簿を開くたびに広告に邪魔されることもありません。家計データは端末に保存され、銀行口座やカードの情報を渡す必要もありません。機種変更や複数の端末に備えたいときは、Plus のクラウド同期を選んで使えます（レシート画像は端末だけに保存）。',
  },
  {
    label: 'Standalone',
    title: '家計簿は、これひとつで完結。',
    body:
      '撮影・仕分け・予算・サブスク管理・レポートまで、HubWallet ひとつで使えます。DoubleHub と同じ GrowthLab がつくる、DoubleHub ファミリーのアプリです。',
  },
];

const features = [
  {
    label: 'Input',
    title: 'カメラ、共有シート、音声、手入力。',
    body:
      'カメラは連続撮影でき、撮った瞬間に未整理へ保存。横に構えれば、長いレシートも横向きのまま保存できます。Safari・メール・ファイル・写真からの共有、PDF の取り込み、音声入力、手入力にも対応。コントロールセンターからのワンタップ撮影起動（iOS 18 以上）もでき、「一番ラクな入り口」をその時々で選べます。',
  },
  {
    label: 'AI Recognition',
    title: 'AI が金額・日付・店舗・品目を読む。',
    body:
      'レシート画像から金額・日付・店舗・品目を AI が読み取り、カテゴリ（食費・交通・医療・健康など）も推定します。店舗ごとの記録からも学習していきます。8%／10% の内訳が印字されたレシートでは、食品と日用品を 2 件に分けて記録する提案も出ます。',
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
      '月間支出、6 ヶ月推移、動きの大きいカテゴリ、固定費と変動費、サブスクの棚卸しまで、毎月のレポートに自動でまとめます。レポートの集計は端末の中で行い、数字を眺めるだけで、自分の生活コストの輪郭が見えてきます。',
  },
  {
    label: 'Recurring',
    title: '家賃・光熱費・サブスクは、テンプレ化。',
    body:
      '毎月手動で記録するのが手間な定期支出は、テンプレートとして登録しておけば自動計上。変動する固定費も「前回と同じ」「数ヶ月平均」のワンタップ入力や通知長押しでの同額記録に対応し、実績はグラフで見返せます。',
  },
  {
    label: 'Subscriptions',
    title: 'サブスクの「うっかり」を、通知で防ぐ。',
    body:
      '外部サービスの無料トライアル終了日を登録しておくと、終了が近づいたらホームでお知らせし、「継続する／停止する」を選べます。通知をオンにすれば、終了の 5 日前と前日、年額更新の 1 週間前、解約期限の 5 日前などにリマインドも届きます。少額の月額は通知しない、ノイズを抑えた設計です。',
  },
  {
    label: 'Timeline & Cost View',
    title: '30日以内にいくら出ていくかが、一目で分かる。',
    body:
      '定期支出を「次の予定・30 日以内の合計」として時系列タイムラインで表示。月額換算・年額換算・30 日予定額をリングゲージや構成バーで多面的に確認でき、ホームのミニダッシュボードから追加・編集もすぐにできます。',
  },
  {
    label: 'Insight',
    title: '事実ベースの軽い気づきを、押しつけずに。',
    body:
      'カテゴリの急な増え方や前月比、定期支出の値上がり、来月の支出見込み、サブスクが収入に占める割合など、事実ベースの気づきを軽く表示。「節約しろ」ではなく「こうなっています」を伝えます。',
  },
];

// 競合のアプリ名は書かない（HubWallet 伝達ブリーフ §8「競合名をメタデータ・対外素材に書かない」）
const compare = [
  {
    type: '自動連携型',
    diff:
      '銀行口座やカード情報を渡さなくていい。OCR・手入力・音声のみで、自分の手元だけで家計簿が完結します。',
  },
  {
    type: 'シンプル家計簿',
    diff:
      '入力と仕分けを一緒にやらない、独自のキャプチャ／仕分け分離モデル。続けやすさを設計の中心に置いています。',
  },
  {
    type: 'レシート特化',
    diff:
      'ポイント還元や特売情報ではなく、入力負担の軽減と「自分の使い方の自己理解」に振り切っています。',
  },
  {
    type: 'プライバシー重視',
    diff:
      'ローカルファースト保存に加え、Free を含めた全プランで広告は一切なし。',
  },
];

const faqs = [
  {
    q: '銀行やクレジットカードと連携できますか？',
    a: 'いいえ。銀行口座やカードとは連携せず、レシートの撮影・PDF や写真の取り込み・音声入力・手入力で記録します。金融規制やプライバシーの観点から、当面はこの方針を維持します。',
  },
  {
    q: 'データは外部に送られますか？',
    a: '家計データは端末に保存します。外部に送るのは、AI 機能を使うときの画像やテキスト（音声は文字にしてから送ります）、Plus でクラウド同期を有効にしたときの同期データ、サービス改善のための最小限の利用状況（金額・店名などの家計データは含みません）、アプリ内フィードバックを送ったときのその内容です。詳しくはプライバシーポリシーをご覧ください。',
  },
  {
    q: 'Android 版はありますか？',
    a: 'iPhone（iOS 17.0 以上）向けです。Android 版は現時点で予定していません。',
  },
  {
    q: '広告は表示されますか？',
    a: '全プランで広告は一切表示しません。Free プランも同じ条件です。',
  },
  {
    q: '品名検索（買ったものを探す）は、いつまで無料で使えますか？',
    a: `Plus プランの機能ですが、${itemSearchFreeUntil}までは無料プランでも使えます。それ以降は Plus プランの機能になります。レシートの撮影や仕分けなど、家計簿の基本機能はその後も無料プランのまま使えます。`,
  },
  {
    q: 'サブスクの解約もアプリからできますか？',
    a: 'いいえ。HubWallet が行うのは、無料トライアル終了日や更新日・解約期限が近づいたときのお知らせと、ホームでの「継続する／停止する」の確認までです。外部サービスの解約手続きそのものを代行することはありません。解約は各サービスの手順に沿って行ってください。',
  },
  {
    q: 'いつから使えますか？',
    a: 'App Store で配信中です。iOS 17.0 以上の端末から、上記の App Store ボタンよりダウンロードできます。',
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
              <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
                <Image
                  src="/images/hubwallet-app-icon.jpg"
                  alt="HubWallet アプリアイコン"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <span className="inline-flex items-center rounded-full border border-accent-product/30 bg-accent-product/10 px-3 py-1 text-xs font-semibold text-accent-product">
                HubWallet
              </span>
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                App Store 配信中
              </span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(1.75rem,1rem+2.8vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              節約疲れしない家計簿。
              <br />
              撮って溜める、あとで整理する。
            </h1>
            <p className="mt-5 max-w-lg text-text-muted">
              HubWallet は、節約疲れしない iPhone の家計簿アプリです。無料プランのままでも、記録の途中に広告が割り込むことはありません。レシートは撮った瞬間に「未整理」へ保存され、仕分けは通勤中や寝る前の隙間時間にまとめて。サブスク・固定費の管理と、無料お試しの終了前のお知らせにも対応しています。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AppStoreBadgeLink placement="hero" />
              <Button asChild size="lg" variant="secondary">
                <Link href="#plans">プランを見る</Link>
              </Button>
            </div>
          </div>

          {/* オファー帯。広告からの着地で最初に目に入れたいので、モバイルはコピー直下（スクショより上）に挟み、
              md 以上はヒーロー 2 カラムの直下に全幅で置く。2 つは別のオファーなのでバッジの色を分けている */}
          <aside
            aria-label="いま無料で試せること"
            className="-mt-4 rounded-2xl border-2 border-accent-product bg-surface p-4 shadow-md md:col-span-2 md:row-start-2 md:mt-0 md:p-6"
          >
            <div className="grid gap-4 md:grid-cols-2 md:gap-x-0 md:gap-y-5 lg:grid-cols-[1fr_1fr_auto] lg:items-center">
              <div className="md:pr-6">
                <span className="inline-flex items-center rounded-full bg-accent-product px-3 py-1 text-xs font-bold text-accent-product-fg">
                  品名検索 無料開放中
                </span>
                {/* 日付の途中で折り返さないよう、文節ごとに inline-block で区切る */}
                <p className="mt-2 text-sm font-semibold leading-relaxed text-text md:mt-3 md:text-base">
                  <span className="inline-block">有料の検索機能が、</span>
                  <span className="inline-block">{itemSearchFreeUntil}まで</span>
                  <span className="inline-block">無料プランでも</span>
                  <span className="inline-block">使えます。</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">
                  <span className="inline-block">撮ったレシートの品目を検索。</span>
                  <span className="inline-block">前回いつ・いくらで買ったかが出ます。</span>
                </p>
              </div>
              <div className="border-t border-divider pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <span className="inline-flex items-center rounded-full bg-accent-warm px-3 py-1 text-xs font-bold text-accent-product-fg">
                  Plus 初月無料
                </span>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-text md:mt-3 md:text-base">
                  <span className="inline-block">Plus プランは、</span>
                  <span className="inline-block">はじめて登録する方なら</span>
                  <span className="inline-block">最初の1ヶ月が無料。</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">
                  <span className="inline-block">無料期間のあとは月額 ¥480 で自動更新。</span>
                  <span className="inline-block">いつでも解約できます。</span>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-divider pt-4 md:col-span-2 md:pt-5 lg:col-span-1 lg:flex-col lg:items-start lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <AppStoreBadgeLink placement="band" />
                <Link
                  href="#item-search"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  品名検索を詳しく見る ↓
                </Link>
              </div>
            </div>
          </aside>

          <div className="relative mx-auto w-full max-w-md md:col-start-2 md:row-start-1">
            <div className="relative aspect-[9/19] overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-xl">
              <Image
                src="/images/hubwallet-home-202610.jpg"
                alt="HubWallet のホーム画面 — 今月の支出・予算の残り・1日あたりの目安と、未整理のレシート"
                fill
                className="object-contain"
                sizes="(min-width: 768px) 360px, 80vw"
                priority
              />
            </div>
            <p className="mt-3 text-center text-xs text-text-faint">
              ※ アプリの画面です。金額・店名はサンプルデータです。
            </p>
          </div>
        </div>
      </Container>

      {/* ========== 2. App Screenshots ========== */}
      {/* Why の長文より前に置く。ヒーロー直後が文章続きだと離脱しやすいので、先に画面（品名検索カード・紹介動画・ギャラリー）を見せる */}
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
              ※ 画面の金額・サービス名はサンプルデータです。
            </p>
          </div>

          {/* 品名検索（買ったものを探す）。「問い → 画面 → 要点」の順に読ませたいので、モバイルは DOM 順のまま縦積み、
              md 以上はスクショを左カラムに 2 行ぶち抜きで置き、右カラムの上下 2 ブロックを行の境目に寄せて一続きに見せる */}
          <article
            id="item-search"
            className="mx-auto mt-12 grid max-w-5xl scroll-mt-28 gap-8 rounded-3xl border border-border bg-surface p-6 shadow-md md:grid-cols-[0.8fr_1.2fr] md:gap-x-12 md:gap-y-6 md:p-10"
          >
            <div className="md:col-start-2 md:row-start-1 md:self-end">
              <span className="inline-flex items-center rounded-full bg-accent-product px-3 py-1 text-xs font-bold text-accent-product-fg">
                品名検索
              </span>
              <h3 className="mt-4 font-display text-[clamp(1.4rem,1rem+1.6vw,2rem)] font-semibold leading-[1.3] tracking-[-0.02em]">
                醤油、前回いくら？
                <br />
                いつ買った？
              </h3>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-text-muted md:text-base">
                レシートを撮ると、品目まで残ります。あとから「買ったものを探す」で品名を検索すれば、前回いつ・どのお店で・いくらで買ったかが出てきます。
              </p>
            </div>

            <figure className="mx-auto w-full max-w-xs md:col-start-1 md:row-span-2 md:row-start-1 md:max-w-none md:self-center">
              <div className="overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-xl">
                <Image
                  src="/images/hubwallet-item-search-202610.jpg"
                  alt="「買ったものを探す」の検索結果 — 「醤油」で検索すると、買った日・お店・金額と、同じお店での前回との差額が並ぶ"
                  width={1080}
                  height={1399}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 38vw, 320px"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs text-text-faint">
                ※ 金額・店舗名はサンプルデータです。
              </figcaption>
            </figure>

            <div className="md:col-start-2 md:row-start-2 md:self-start">
              <ul className="flex flex-col gap-3 text-pretty text-sm text-text-muted">
                {itemSearchPoints.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl border border-border bg-surface-2 px-4 py-3 text-pretty text-sm leading-relaxed text-text">
                <span className="mr-2 inline-flex items-center rounded-full bg-accent-product px-2.5 py-0.5 text-xs font-bold text-accent-product-fg">
                  無料開放中
                </span>
                <span className="inline-block">Plus の機能ですが、</span>
                <strong className="inline-block font-semibold">{itemSearchFreeUntil}まで</strong>
                <span className="inline-block">は無料プランでも</span>
                <span className="inline-block">使えます。</span>
              </p>
              <div className="mt-6">
                <AppStoreBadgeLink placement="search" />
              </div>
            </div>
          </article>

          {/* 約 8.5 秒の紹介動画（2.6.0 の画面・2026-10-01 収録。未整理 → まとめて仕分け → ホーム） */}
          <figure className="mx-auto mt-10 max-w-sm">
            <div className="relative aspect-[9/19] overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-xl">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/videos/hubwallet-product-intro-202610.mp4"
                poster="/images/hubwallet-intro-poster-202610.jpg"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label="HubWallet 紹介動画 — 未整理のレシートを、スワイプでまとめて仕分け"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-text-faint">
              動画で見る HubWallet — 溜めたレシートを、あとでまとめて仕分け。
            </figcaption>
          </figure>

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

      {/* ========== 3. Pain Points ========== */}
      <Section spacing="md">
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

      {/* ========== 4. Core Pillars ========== */}
      <Section spacing="md" surface="alt">
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
                  '銀行口座・カードとは連携しません',
                  '家計データは端末に保存（Plus のクラウド同期は任意）',
                  'AI 機能を使うときだけ、必要な画像・テキストを AI に送信',
                  'サインインは「Apple でサインイン」（メールアドレスの入力は不要）',
                  '全プランで広告は一切なし',
                  'レシート画像は端末だけに保存',
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

      {/* 「Flow Into DoubleHub」節は 2026-10 に外した。2.6.0 では DoubleHub との連携画面も紹介カードも出ない
          （アプリ側 `FeatureFlags.doubleHubLinkUIEnabled` / `crossPromoDoubleHubEnabled` が false）。連携を公開する版で改めて書く */}

      {/* ========== 8. Plans ========== */}
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
              記録と整理、サブスク・固定費の管理は Free プランから使えます。AI をたくさん使いたい方や、家計パートナー（これから 12 ヶ月の見通し・月に一度の面談）を使いたい方は、月額 ¥480 の Plus プランへ。
            </p>
            <p className="mt-3 text-xs text-text-faint">
              ※ 価格は 2026 年 10 月時点のものです。最新の料金は App Store 上の表示をご確認ください。
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
                まずは無料で。AI 機能は月 5 回まで（{aiFreeSpecialUntil}までは特別に月 10 回）お使いいただけます。
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check /> 手入力は無制限
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 月次レポートと、今年度の支出の振り返り
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 固定費・サブスクの管理とお知らせ
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 予算管理は 2 カテゴリまで
                </li>
                <li className="flex items-start gap-2">
                  <Check />
                  <span>
                    AI OCR・音声・カテゴリ推定 月 5 回まで（{aiFreeSpecialUntil}までは月 10 回）
                  </span>
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
                Plus Plan
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">Plus</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-[-0.03em]">
                  ¥480
                </span>
                <span className="text-sm text-text-muted">／ 月</span>
              </div>
              <p className="mt-3">
                <span className="inline-flex items-center rounded-full bg-accent-warm px-3 py-1 text-xs font-bold text-accent-product-fg">
                  はじめて登録する方は初月無料
                </span>
              </p>
              <p className="mt-3 text-xs text-text-muted">
                Plus は AI 機能を月 500 回までご利用いただけます。
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <Check />
                  <span>
                    <strong className="font-semibold text-text">AI OCR・音声・カテゴリ推定 月 500 回まで</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check />
                  <span>
                    <strong className="font-semibold text-text">家計パートナー（12 ヶ月の見通し・月に一度の面談・四半期のふりかえり便）</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check />
                  <span>
                    <strong className="font-semibold text-text">予算管理は無制限カテゴリ</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 品名検索（買ったものを探す）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> サブカテゴリ追加（最大 30 件）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> 親カテゴリ別レポート
                </li>
                <li className="flex items-start gap-2">
                  <Check /> CSV 書き出し
                </li>
                <li className="flex items-start gap-2">
                  <Check /> クラウド同期（任意・機種変更や複数の端末に）
                </li>
                <li className="flex items-start gap-2">
                  <Check /> いつでも解約でき、記録・整理の機能はそのまま使えます
                </li>
                <li className="flex items-start gap-2">
                  <Check /> もちろん広告なし
                </li>
              </ul>
            </div>
          </div>

          {/* Free vs Plus 詳細比較表 */}
          <div className="mx-auto mt-12 max-w-4xl overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
            <table className="w-full text-sm">
              <caption className="sr-only">Free と Plus の機能比較</caption>
              <thead>
                <tr className="border-b border-divider bg-surface-2 text-left">
                  <th className="px-4 py-3 font-semibold text-text">機能</th>
                  <th className="px-4 py-3 text-center font-semibold text-text-muted">Free</th>
                  <th className="px-4 py-3 text-center font-semibold text-accent-product">Plus</th>
                </tr>
              </thead>
              <tbody className="[&>tr]:border-b [&>tr]:border-divider [&>tr:last-child]:border-0">
                <tr>
                  <td className="px-4 py-3 font-medium text-text">AI OCR・音声・カテゴリ推定</td>
                  <td className="px-4 py-3 text-center text-text-muted">
                    月 5 回
                    <span className="block text-xs text-text-faint">{aiFreeSpecialUntil}までは月 10 回</span>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-accent-product">月 500 回</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">手入力</td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} /></td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} accent /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">予算管理</td>
                  <td className="px-4 py-3 text-center text-text-muted">2 カテゴリ</td>
                  <td className="px-4 py-3 text-center font-semibold text-accent-product">無制限</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">サブカテゴリ追加</td>
                  <td className="px-4 py-3 text-center text-text-faint">—</td>
                  <td className="px-4 py-3 text-center font-semibold text-accent-product">30 件</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">定期支出</td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} /></td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} accent /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">レポート機能</td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} /></td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} accent /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">家計パートナーの月次面談</td>
                  <td className="px-4 py-3 text-center text-text-faint">—</td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} accent /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">四半期のふりかえり便</td>
                  <td className="px-4 py-3 text-center text-text-muted">見本を読める</td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} accent /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">家計の見通し</td>
                  <td className="px-4 py-3 text-center text-text-muted">過去の年間実績</td>
                  <td className="px-4 py-3 text-center font-semibold text-accent-product">これから 12 ヶ月まで</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">値上げ履歴（登録した定期支出・サブスク）</td>
                  <td className="px-4 py-3 text-center text-text-faint">—</td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} accent /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">親カテゴリ別レポート</td>
                  <td className="px-4 py-3 text-center text-text-faint">—</td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} accent /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">CSV 書き出し</td>
                  <td className="px-4 py-3 text-center text-text-faint">—</td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} accent /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">クラウド同期</td>
                  <td className="px-4 py-3 text-center text-text-faint">—</td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} accent /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">品名検索（買ったものを探す）</td>
                  <td className="px-4 py-3 text-center text-text-muted">{itemSearchFreeUntil}まで</td>
                  <td className="px-4 py-3 text-center"><PlanCheck on={true} accent /></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* 脚注の文はアプリのプラン画面（2.6.0 の比較表の脚注）にそろえている */}
          <p className="mx-auto mt-4 max-w-4xl text-xs leading-relaxed text-text-faint">
            ※ 無料プランの AI 利用は月 5 回です。{aiFreeSpecialUntil}までは、特別に月 10 回ご利用いただけます。バージョン 2.6.0 より前からお使いの方は、12月以降も月 10 回のままです。AI が作る面談・便りは、家計の整理を助ける一般的な情報です。
          </p>

        </Container>
      </Section>

      {/* ========== 9. FAQ ========== */}
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

      {/* ========== 10. Final CTA ========== */}
      <Section spacing="md">
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              お金の使い方を、自己理解の手がかりに。
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              HubWallet は App Store で配信中です。撮って溜める家計簿を、まずは無料プランから試してみてください。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <AppStoreBadgeLink placement="footer" />
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

function AppStoreBadgeLink({
  placement = 'other',
}: {
  placement?: keyof typeof campaignTokens;
}) {
  return (
    <a
      href={withAppStoreCampaign(appStoreUrl, { ct: campaignTokens[placement] })}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex transition-transform hover:scale-[1.02]"
      aria-label="App Store で HubWallet をダウンロード"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={appStoreBadge}
        alt="App Storeでダウンロード"
        style={{ height: 44, objectFit: 'contain' }}
      />
    </a>
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

function PlanCheck({ on, accent = false }: { on: boolean; accent?: boolean }) {
  if (!on) return <span className="text-text-faint">—</span>;
  return (
    <span
      aria-label="対応"
      className={
        accent
          ? 'inline-grid h-5 w-5 place-items-center rounded-full bg-accent-product/15 text-accent-product'
          : 'inline-grid h-5 w-5 place-items-center rounded-full bg-text-muted/15 text-text-muted'
      }
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2.5 6l2.5 2.5 4.5-5" />
      </svg>
    </span>
  );
}
