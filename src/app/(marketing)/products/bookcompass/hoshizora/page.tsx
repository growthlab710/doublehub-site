import type { Metadata } from 'next';
import {
  HoshizoraClosing,
  HoshizoraHero,
  HoshizoraPlates,
} from '@/components/marketing/bookcompass/Hoshizora';
import { smartAppBannerContent } from '@/lib/site/appStoreLink';

/**
 * BookCompass「読書の星空」の広告の着地ページ（2026-11-22〜）。
 *
 * Meta（Instagram のフィード・Threads）は、SDK を入れていないアプリの広告に App Store の URL を
 * 直接入れられない（トラフィック目的のエラー #1487810）ので、このページを 1 枚挟んでストアへ送る。
 * 見る人のほとんどは Instagram・Threads のアプリの中のブラウザで見る iPhone の人なので、スマホを先に作り、
 * 画像は実画面 3 枚だけにして軽くしている。言っていることは広告の静止画とそろえる
 * （正本: マーケティング/10.情報/20261120_BC_読書の星空の広告/01_広告計画.md 3 節）。
 *
 * - ストアのボタンの ct は Meta の下書きの広告と同じ `bc_meta_hoshi_img_1122`。
 *   Meta で別の広告（動画など）を足して ct を分けたいときは、このページを分けるか、ct を替える。
 * - 計測のタグやピクセルは足さない（サイト共通の GA4・Vercel Analytics だけ）。
 * - 製品ページと中身が重なるので、検索には出さない（noindex・サイトマップにも入れない）。
 */

const adCampaignToken = 'bc_meta_hoshi_img_1122';

const pageTitle = '読んだ本の一言が、星になる。BookCompass の読書の星空';
const pageDescription =
  '本を読みながら、一言だけ。その言葉のテーマに星が灯り、前に別の本で書いた言葉にも戻れます。本の登録と一言は無料。iPhone の読書メモアプリ BookCompass（ブックコンパス）。';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/products/bookcompass/hoshizora/' },
  robots: { index: false, follow: true },
  // Safari で開いたときの App Store の帯も、広告と同じ ct にする
  other: { 'apple-itunes-app': smartAppBannerContent('6760604663', adCampaignToken) },
  openGraph: {
    title: '読んだ本の一言が、星になる。',
    description: pageDescription,
    url: 'https://www.doublehub.jp/products/bookcompass/hoshizora/',
    type: 'website',
    siteName: 'DoubleHub',
    locale: 'ja_JP',
    images: [{ url: '/images/og-bookcompass-hoshizora.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '読んだ本の一言が、星になる。',
    description: pageDescription,
    images: ['/images/og-bookcompass-hoshizora.jpg'],
  },
};

export default function BookCompassHoshizoraPage() {
  return (
    <>
      <HoshizoraHero ct={adCampaignToken} />
      <HoshizoraPlates />
      <HoshizoraClosing ct={adCampaignToken} />
    </>
  );
}
