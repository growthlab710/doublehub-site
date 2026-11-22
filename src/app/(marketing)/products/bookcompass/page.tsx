import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ContextBand } from '@/components/marketing/ContextBand';
import {
  HoshizoraHero,
  HoshizoraPlates,
  bookCompassStoreUrl,
} from '@/components/marketing/bookcompass/Hoshizora';
import { smartAppBannerContent } from '@/lib/site/appStoreLink';
import { buildProductJsonLd } from '@/lib/site/productJsonLd';
import e from '@/components/marketing/editorial/editorial.module.css';
import p from './bookcompass.module.css';

// タイトルの末尾「— DoubleHub」はルートの metadata.title.template が付ける
// 題に「読書記録」を入れている（2026-11-19）。Search Console で、探す人の語は「読書メモ」より
// 「読書記録」「読書ノート」のほうが多かったため。
const pageTitle = 'Book Compass — 読みながら一言の読書メモ・読書記録アプリ';
const pageDescription =
  '読んだのに、頭に残らない——その手前で、読みながら一言だけ呟く読書メモアプリ。呟きは本ごとの「読みの現在地」や読書特集号として、あとから読み返せる形で返ってきます。呟きは他のユーザーに公開されず、広告も表示しません。';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/products/bookcompass/' },
  // iPhone・iPad の Safari で、ページの上に App Store への帯を出す
  other: { 'apple-itunes-app': smartAppBannerContent('6760604663', 'bc_site_banner') },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://www.doublehub.jp/products/bookcompass/',
    type: 'website',
    siteName: 'DoubleHub',
    locale: 'ja_JP',
    // 共有したときの画像は、読書の星空の実画面（2026-11-22〜。広告の着地ページと同じ）
    images: [{ url: '/images/og-bookcompass-hoshizora.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/images/og-bookcompass-hoshizora.jpg'],
  },
};

// ストアのボタンは日本のストアへ。ct（来た道の印）は、帯の `bc_site_banner` と分けてこのページのボタンで 1 つ
// （置き場所ごとに分けると件数が少なく、Apple の閾値で行ごと出なくなるため）。2026-11-22 に米国のストアのリンクから替えた
const appStoreCampaignToken = 'bc_site_product';
const appStoreUrl = bookCompassStoreUrl(appStoreCampaignToken);
const appStoreBadge =
  'https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/ja-jp?releaseDate=1774224000';
// 暗い表示のときの白いバッジ
const appStoreBadgeWhite =
  'https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/ja-jp?releaseDate=1774224000';

// 先頭の 3 枚（ホーム・読書の星空・星座）は 2.14.0、ほかは 2.6.0（2026-11-22 にユーザーの依頼で
// 「はじめての一冊」と「本からの問いかけ」を外し、星空の 2 枚に替えた）。
// 先頭の 3 枚は AI が主役でない画面にしている（入口で AI を主語にしない）
const screenshots = [
  {
    src: '/images/bookcompass-home-202611.jpg',
    alt: 'ホーム画面。今月の登録と今週の呟き、灯った星の数が出る読書の星空の窓、最近読んだ本',
    caption: 'ホーム — 読書の星空と、最近読んだ本',
  },
  {
    src: '/images/bookcompass-allsky-202611.jpg',
    alt: '読書の星空の「ぜんぶ」。14 の分野の空に灯った星と、線でつないだ 2 つの星座（見本）',
    caption: '読書の星空 — 一言のテーマに、星が灯る',
  },
  {
    src: '/images/bookcompass-constellation-202611.jpg',
    alt: '星座の画面。「習慣と決断の星座」の形と育ちの記録、別々の本に書いた言葉の道すじ（見本）',
    caption: '星座 — 本をまたいだ言葉が、ひとつに',
  },
  {
    src: '/images/bookcompass-library-202610.jpg',
    alt: 'ライブラリ。本ごとにジャンルと「読みたい」「読書中」などの状態が並ぶ',
    caption: 'ライブラリ — 読みたい・読書中・読了',
  },
  {
    src: '/images/bookcompass-reply-202610.jpg',
    alt: '呟きを送った直後に、ブックバディの返事が入力欄の上に届いた画面',
    caption: '返事 — 呟くと、その場でひと言（AI が生成）',
  },
  {
    src: '/images/bookcompass-trait-202610.jpg',
    alt: '本ごとの知的ポジション。個人努力と環境設計、理論と実践の軸',
    caption: '知的ポジション — この本での読み方の傾き（AI が分析）',
  },
  {
    src: '/images/bookcompass-explore-202610.jpg',
    alt: '探すタブ。あなたの本棚に近い新刊などの棚が並ぶ',
    caption: '探す — あなたの本棚から、毎週の棚',
  },
  {
    src: '/images/bookcompass-shelf-sheet-202610.jpg',
    alt: '棚の本の詳細。この本について、なぜこの棚に、読みたいに追加',
    caption: 'なぜこの棚に — 選ばれた理由が読める',
  },
  {
    src: '/images/bookcompass-coach-202610.jpg',
    alt: '内省ノートで思考コーチから書き出しの問いを受け取った画面',
    caption: '内省ノート — 書けない日は、問いから（AI が生成）',
  },
  {
    src: '/images/bookcompass-widget-202610.jpg',
    alt: 'ホーム画面ウィジェット「いま読んでいる本」の中サイズ',
    caption: 'ウィジェット — いま読んでいる本をホーム画面に',
  },
];

// 2 節より下は 2026-11-22 に「誌面」の作り（角なし・影なし・罫線・明朝の見出し）に替え、事実を 2.14.0 に合わせた。
// 事実の正本は BookCompass/マーケティング/ストアの文_2.14.0/説明文_2.14.0_全文.txt。
// 言い方の線（マーケティング/00.戦略/BC_PMF検証計画_2026-11.md §2-6）:「すぐ星座ができる」と言わない・「孤独」を使わない・
// AI を主語にしない・効果を言い切らない・深掘り（読みの現在地）を「何冊でも」と読める言い方をしない（無料は 10 冊まで）。
// 呟きの字数の上限は 2.14.0 で 1,000 字なので、字数は書かない（前は「280 字まで」）。
// 知的ポジションは 2.14.0 の本のページから外れたので、できること・料金からも外した。

const steps = [
  {
    title: '読みながら、一言だけ。',
    body: '気になった一文、引っかかったこと、ふと浮かんだ問い。感想文は書かなくていい。短い一言を、その場で残せます。声で話しかける音声入力も使えます。',
  },
  {
    title: 'その場で、ひと言返ってくる。',
    body: '呟くと、その内容に触れた返事が届きます。日をあけて再開したときは「おかえり」の一言に。頻度は「オフ／少なめ／ふつう／毎回」から選べます。',
  },
  {
    title: 'あとから、読み返せる形に。',
    body: '書いた一言のテーマに、読書の星空の星が灯ります。呟きが積み重なると、本ごとの「読みの現在地」や本屋の札、読書特集号として読み返せます。',
  },
];

const features: { name: string; body: string; note?: string }[] = [
  {
    name: '読書の星空',
    body: '本に一言を書くと、その言葉のテーマに星が灯ります。同じテーマを前に別の本でも書いていたら、そのときの言葉に戻れます。別々の本の言葉のつながりの候補が届き、自分で「つなぐ」と線が残ります。つないだ星は星座になり、育った日ごとの姿を見返せます。「聞く」で自分の読書に問いかけると、書いてきた一言から手がかりを探します。',
    note: '※星座は、2冊以上に書いて線をつなぐとできます。',
  },
  {
    name: '呟きと返事',
    body: '読んでいる途中でも、読み終えたあとでも、思ったことを一言で。呟くと、読書パートナーのブックバディから内容に触れた返事が届きます。静かに読みたいときは、返事をオフにできます。',
  },
  {
    name: '読みの現在地',
    body: '呟きが積み重なると、その本のページが育ちます。読む前は持っていく問いとここまでの引っかかり、読んでいる最中はその日の読みの動き、読み終えたあとは 30 秒で話せる「語るなら」と、読む前の問いへの答え。',
    note: '無料プランは 10 冊まで。11 冊目からは Compass Pro で使えます。',
  },
  {
    name: '本屋',
    body: '本に残した一言が手書きの札になって、あなただけの本屋に並びます。似た言葉を書いた本が 2 冊以上そろうと棚になり、棚の名前も並ぶ理由も、あなたの言葉からです。前に読んだ本も、一言ずつ残して並べられます。',
    note: '無料プランで店に並ぶのは 10 冊まで（どの本を並べるかは選べます）。',
  },
  {
    name: '読書特集号と読書ドキュメンタリー',
    body: '複数の本の呟きを横断して、ある期間の読書を一冊の雑誌のように編集した「読書特集号」が作れます。1 冊分の呟きを一本の読み物にする「読書ドキュメンタリー」は Compass Pro の機能です。',
    note: '読書特集号は無料プランで半年に 1 号、Compass Pro は 90 日ごと。',
  },
  {
    name: '読む前の問いと、昔の本をめくる',
    body: '「この本で何を考えたいか」を、読む前の問いとして残せます。前に読んだ本は「昔の本をめくる」に日替わりで出てきて、表紙を見て思い出したら、いまの一言を足せます。',
  },
  {
    name: '内省ノートと思考コーチ',
    body: '呟きや読みの現在地を見ながら、腰を据えて考えを書き残せるノートです。書けない日は、思考コーチの問いから書き始められます。',
    note: '思考コーチは、無料プランで月 10 回まで。',
  },
  {
    name: '探す',
    body: 'あなたの本棚をもとにした「今週のおすすめ」が、毎週並びます。表紙をタップすると、本の紹介と選ばれた理由が読めます。ランキングや広告枠ではなく、登録した本のジャンル・著者・タグからの計算です。',
  },
  {
    name: 'ライブラリとウィジェット',
    body: '本はバーコードかタイトル検索で登録でき、見つからない本は手入力でも追加できます。ホーム画面のウィジェット「いま読んでいる本」から、その本の呟き入力へ直行できます。読んでいるジャンルのかたよりは、マイページの「ジャンルのバランス」で見られます。',
  },
  {
    name: '本の深掘りチャット',
    body: '読んだ本や呟きをもとに、読書パートナーとチャットで話せます。Compass Pro の機能です。これまでの会話は、無料プランでもいつでも読み返せます。',
  },
];

// 読みの現在地と読書特集号は 2.14.0（2026-11-22 撮影・公開版のコミットの Debug ビルド・計測から除外している開発用アカウントの
// テスト用の記録）。本屋の棚は 2.12.0 のストア用の撮影（見本データ・Storeスクショ/_claude_trial/work/bc2120/raw/shelf.png）で、
// 棚の画面は 2.12.0 の提出のあと表紙の読み方しか変わっていない（2.14.0 も同じ見た目）。
const plates = [
  {
    src: '/images/bookcompass-reading-compass-202611.jpg',
    width: 1080,
    height: 2337,
    alt: '読みの現在地の画面。持っていく問い、読みの動き、ここまでの引っかかり',
    title: '本ごとの、読みの現在地。',
    body: 'その本をいまどう読んでいるかを、あなたが書いた言葉で。本の中身の解説ではありません。',
    note: '無料プランは 10 冊まで',
  },
  {
    src: '/images/bookcompass-bookstore-202611.jpg',
    width: 1080,
    height: 2348,
    alt: '本屋の棚の画面。「読むと、遠くへ行きたくなる」の棚に、一言の札がついた 3 冊が並ぶ（見本）',
    title: 'あなたの言葉で並ぶ、本屋。',
    body: '似た言葉を書いた本が、棚になります。棚の名前は、いつでも直せます。',
    note: '無料プランで店に並ぶのは 10 冊まで',
  },
  {
    src: '/images/bookcompass-special-issue-202611.jpg',
    width: 1080,
    height: 2337,
    alt: '読書特集号の表紙。期間の読書にタイトルがつき、語った本や残した呟き、記録した日数などの数字が並ぶ',
    title: 'ある期間の読書が、一冊の特集号に。',
    body: '3 冊以上の本に呟きが 10 件たまると、短めの「ライト版」で創刊できます。',
    note: '無料プランは半年に 1 号、Compass Pro は 90 日ごと',
  },
];

const trustPoints = [
  '呟きは他のユーザーに公開されません。フォローも、いいねも、他の人の評価もありません。',
  'AI が本の内容を代わりに読むのではありません。あなたが書いた呟きを材料に、あなたがどう読んだかを編集します。',
  'あなたが書いたものは、あなたのためだけに使います。AI モデルの学習には使いません。',
  'AI を使うかどうかは、最初に呟いたときに選べます。AI なしでも、呟き・ノート・本屋は使えます（マイページでいつでも変えられます）。',
  '読書の星空の星の読み取り・つながりの候補・「聞く」は、AI ありのときに AI を使います。AI なしでも、言葉の照らし合わせで星は灯ります。',
  '本屋の棚の名前の案とフェアの名前は、AI ありのときに AI の案が付きます。名前はいつでも直せます。',
  '「探す」のおすすめは、AI ではなく計算で選んでいます。本の紹介とタグには、AI が生成した内容が含まれます。',
  '呟いたときの返事と、ホームの「ブックバディの一言」は、設定でオフにできます。',
  '広告は表示しません。本屋の中にも、買うためのリンクはありません。',
];

// 料金の 2 段は要点だけ。細かい回数は下の比べる表に書く
const freePlan = [
  '本の登録とライブラリは無制限。呟きは 1 日 10 件まで',
  '読書の星空の星・星座・育ちの記録は見られます。本をまたぐ線は 1 回、「聞く」はおためし 10 回',
  '本屋に並ぶ本と、読みの現在地は 10 冊まで',
  '返事・思考コーチ・読書特集号にも、無料の回数があります',
];

const proPlan = [
  '読書の星空で、本をまたぐ線を何本でもつなげます。「聞く」は 1 日 30 回まで',
  '一言を残した本がすべて本屋に並び、読みの現在地は 11 冊目からも',
  '本の深掘りチャットと読書ドキュメンタリー',
];

const comparisonRows = [
  { feature: '本の登録・ライブラリ', free: '無制限', pro: '無制限' },
  { feature: '呟き（読書メモ）', free: '1 日 10 件', pro: '1 日 100 件' },
  { feature: '読書の星空（星・星座・育ちの記録）', free: '見られる', pro: '見られる' },
  { feature: '本をまたぐ線をつなぐ', free: '1 回', pro: '何本でも' },
  { feature: '「聞く」（自分の読書に問いかける）', free: 'おためし 10 回', pro: '1 日 30 回' },
  { feature: '本屋（店に並ぶ本）', free: '10 冊まで', pro: '一言を残した本すべて' },
  { feature: '読みの現在地', free: '10 冊まで', pro: '11 冊目からも' },
  { feature: '呟いたときの返事', free: 'じっくり月 20 回＋相槌', pro: 'じっくりも月の上限なし（1 日 35 回まで）' },
  { feature: '思考コーチの問い', free: '月 10 回', pro: '1 日 30 回' },
  { feature: '読書特集号', free: '半年に 1 号', pro: '90 日ごと' },
  { feature: '読書ドキュメンタリー', free: '—', pro: '月 15 回' },
  { feature: '本の深掘りチャット', free: '—', pro: '1 日 30 回' },
  { feature: 'ジャンルのバランス・内省ノート・ウィジェット・探す', free: '利用可', pro: '利用可' },
  { feature: 'これまでの会話の閲覧', free: '可', pro: '可' },
];

// 構造化データ（JSON-LD）。価格は料金の節と購入条件の表（Compass Pro 月額 ¥880・年額 ¥5,800）と揃える。
// このページに「よくある質問」の節は無いので、FAQ は入れない
const jsonLd = buildProductJsonLd({
  slug: 'bookcompass',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'iOS',
  description: pageDescription,
  offers: [
    { name: 'Free', price: '0' },
    { name: 'Compass Pro (月額)', price: '880' },
    { name: 'Compass Pro (年額)', price: '5800' },
  ],
  downloadUrl: 'https://apps.apple.com/jp/app/id6760604663',
});

export default function BookCompassPage() {
  return (
    <div className="theme-bookcompass">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ========== 1. ファーストビュー: 読書の星空（2.14.0〜） ========== */}
      {/* 2026-11-22: 主役を「読書の星空」に替えた（ストアの 1〜3 枚目・プレビュー動画・広告とそろえる）。
          部品は Meta 広告の着地（/products/bookcompass/hoshizora/）と共通 */}
      <HoshizoraHero
        ct={appStoreCampaignToken}
        secondaryLink={{ href: '#how-it-works', label: '読書メモとしての使い方 ↓' }}
      />
      <HoshizoraPlates />

      <div className={e.root}>
        <div className={e.wrap}>
          {/* ========== 2. 読書メモとしての使い方 ========== */}
          <section id="how-it-works" className="scroll-mt-20" aria-labelledby="bc-how">
            <div className={e.secHead}>
              <span>読書メモとしての使い方</span>
            </div>
            <h2 id="bc-how" className={`${e.h2} ${e.jp}`}>
              呟く。返ってくる。読み返せる。
            </h2>
            <p className={`${p.lead} ${e.jp}`}>
              長い感想文も、完璧なレビューもいりません。読みながら一言残すだけで、その本のページが少しずつ育っていきます。
            </p>
            <div className={p.cols3} style={{ marginTop: 40 }}>
              {steps.map((c) => (
                <div key={c.title}>
                  <h3 className={`${p.colTitle} ${e.jp}`}>{c.title}</h3>
                  <p className={p.colText}>{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ========== 3. 主な画面 ========== */}
          {/* 画像と説明文は 2026-11-22 の版のまま。枠だけ誌面に合わせた（角なし・影なし・左寄せの見出し） */}
          <section aria-labelledby="bc-screens">
            <div className={e.secHead}>
              <span>主な画面</span>
              <span className={e.secHeadAside}>{screenshots.length} 枚</span>
            </div>
            <h2 id="bc-screens" className={`${e.h2} ${e.jp}`}>
              Book Compass の主な画面。
            </h2>
            <div className={p.gallery} aria-label="Book Compass の画面ギャラリー">
              {screenshots.map((s) => (
                <figure key={s.src} className={p.shot}>
                  <div className={p.shotImg}>
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 1280px) 220px, (min-width: 1024px) 300px, (min-width: 640px) 45vw, 72vw"
                    />
                  </div>
                  <figcaption className={p.shotCap}>{s.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className={p.swipeHint} aria-hidden="true">
              ← 横にスワイプして {screenshots.length} 枚の画面を見る →
            </p>
            <p className={p.foot}>
              ※ ホームと読書の星空・星座の画面はバージョン 2.14.0、ほかは 2.6.0 のものです。表示している本や呟きはテスト用の記録で、星空と星座は見本です。星座は、2冊以上に書いて線をつなぐとできます。
            </p>
          </section>

          {/* ========== 4. できること ========== */}
          <section aria-labelledby="bc-features">
            <div className={e.secHead}>
              <span>できること</span>
            </div>
            <h2 id="bc-features" className={`${e.h2} ${e.jp}`}>
              Book Compass でできること。
            </h2>
            <ul className={p.list}>
              {features.map((f) => (
                <li key={f.name} className={p.row}>
                  <h3 className={`${p.rowName} ${e.jp}`}>{f.name}</h3>
                  <p className={p.rowText}>
                    {f.body}
                    {f.note ? <span className={p.rowNote}>{f.note}</span> : null}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* ========== 5. あとから読み返す（読みの現在地・本屋・読書特集号） ========== */}
          <section aria-labelledby="bc-reread">
            <div className={e.secHead}>
              <span>あとから読み返す</span>
            </div>
            <h2 id="bc-reread" className={`${e.h2} ${e.jp}`}>
              本の解説ではなく、
              <wbr />
              あなたの読みを残す。
            </h2>
            <p className={`${p.lead} ${e.jp}`}>
              使うのは、あなたが書いた言葉そのものです。読みの現在地も本屋の札も特集号も、あなたがどう読んだかを、あなたの言葉で返します。
            </p>
            <div className={p.cols3} style={{ marginTop: 40 }}>
              {plates.map((pl) => (
                <figure key={pl.src} className={p.plate} style={{ margin: 0 }}>
                  <div className={p.plateImg}>
                    <Image
                      src={pl.src}
                      alt={pl.alt}
                      width={pl.width}
                      height={pl.height}
                      sizes="(min-width: 961px) 360px, (min-width: 600px) 36vw, 40vw"
                    />
                  </div>
                  <figcaption>
                    <h3 className={`${p.colTitle} ${e.jp}`}>{pl.title}</h3>
                    <p className={p.colText}>{pl.body}</p>
                    <p className={p.colNote}>{pl.note}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className={p.foot}>
              ※ 読みの現在地と読書特集号はバージョン 2.14.0 の画面で、表示している本や呟きはテスト用の記録です。本屋の棚はバージョン 2.12.0 で撮った見本（いまも同じ画面）で、表紙の絵と一言は見本です。内容には AI が生成したものを含みます。
            </p>
          </section>

          {/* ========== 6. AI の使い方と、見せない記録 ========== */}
          <section aria-labelledby="bc-privacy">
            <div className={e.secHead}>
              <span>AI の使い方</span>
            </div>
            <h2 id="bc-privacy" className={`${e.h2} ${e.jp}`}>
              AI の使い方と、
              <wbr />
              見せない記録。
            </h2>
            <p className={`${p.lead} ${e.jp}`}>
              読書の記録は、誰かに見せるためのものではありません。書きかけでも大丈夫です。
            </p>
            <ul className={p.points} style={{ marginTop: 32 }}>
              {trustPoints.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className={p.foot}>
              詳しくは
              <Link href="/privacy/bookcompass/" className={p.inlineLink}>
                プライバシーポリシー
              </Link>
              をご覧ください。
            </p>
          </section>

          {/* ========== 7. 料金 ========== */}
          <section id="plans" className="scroll-mt-20" aria-labelledby="bc-plans">
            <div className={e.secHead}>
              <span>料金</span>
            </div>
            <h2 id="bc-plans" className={`${e.h2} ${e.jp}`}>
              読書メモとしては、
              <wbr />
              無料でずっと使えます。
            </h2>
            <p className={`${p.lead} ${e.jp}`}>
              本の登録と呟き、ライブラリは無料で使え、読書の星空の星も灯ります。本をまたぐ線を何本もつなぎたいとき、じっくり使いたいときは Compass Pro へ。
            </p>

            <div className={p.plans} style={{ marginTop: 40 }}>
              <div className={p.plan}>
                <h3 className={p.planName}>無料プラン</h3>
                <p className={p.price}>¥0</p>
                <p className={p.priceNote}>読書メモとしての基本を、無料で。</p>
                <ul className={p.planList}>
                  {freePlan.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className={p.plan}>
                <h3 className={p.planName}>Compass Pro</h3>
                <p className={p.price}>
                  ¥880<span className={p.priceUnit}>／月（税込）</span>
                </p>
                <p className={p.priceNote}>
                  初回登録は、最初の 3 ヶ月が ¥480／月。年額 ¥5,800（税込）も選べます。
                </p>
                <ul className={p.planList}>
                  {proPlan.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                  <li>いつでも解約できます。解約したあとも、これまでの記録と会話は読み返せます</li>
                </ul>
              </div>
            </div>
            <p className={p.foot}>
              ※ 前に読んだ本の登録や「昔の本をめくる」で残す一言は、呟きの数に含みません。本の深掘りチャットは Compass Pro の機能で、これまでの会話は無料プランでも読み返せます。
            </p>

            <h3 className={p.tableTitle}>無料と Compass Pro の比べ</h3>
            <div className={p.tableWrap}>
              <table className={p.table}>
                <thead>
                  <tr>
                    <th scope="col">機能</th>
                    <th scope="col">無料</th>
                    <th scope="col">Compass Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((r) => (
                    <tr key={r.feature}>
                      <th scope="row">{r.feature}</th>
                      <td>{r.free}</td>
                      <td>{r.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={p.subs}>
              <p className={p.subsLabel}>サブスクリプションについて</p>
              <dl className={p.subsGrid}>
                <div>
                  <dt>名称</dt>
                  <dd>Compass Pro</dd>
                </div>
                <div>
                  <dt>期間</dt>
                  <dd>月額は 1 ヶ月・年額は 1 年（どちらも自動更新）</dd>
                </div>
                <div>
                  <dt>価格</dt>
                  <dd>月額 ¥880（税込）・初回登録は最初の 3 ヶ月 ¥480 / 月。年額 ¥5,800（税込）</dd>
                </div>
                <div>
                  <dt>自動更新・解約</dt>
                  <dd>
                    期間終了の 24 時間以上前に解約しない限り自動的に更新されます。解約は App Store のサブスクリプション設定から、いつでも行えます。
                  </dd>
                </div>
              </dl>
              <p className={p.foot}>
                無料トライアルはありません。価格は執筆時点のもので、最新の料金は App Store 上の表示をご確認ください。回数の上限・支払いの時期・解約と返金は
                <Link href="/tokushoho/#bookcompass" className={p.inlineLink}>
                  特定商取引法に基づく表記
                </Link>
                をご覧ください。
              </p>
            </div>
          </section>

          {/* ========== 8. 締め ========== */}
          <section className={p.closing} aria-labelledby="bc-closing">
            <h2 id="bc-closing" className={`${p.closingH} ${e.jp}`}>
              最近、なに読んでる？
            </h2>
            <p className={`${p.closingBody} ${e.jp}`}>
              いま読んでいる本を一冊登録して、読みながら一言呟くところから。本の登録と一言は無料です。
            </p>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={p.badge}
              aria-label="App Store で Book Compass をダウンロード"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={p.badgeLight} src={appStoreBadge} alt="App Storeからダウンロード" width={131} height={48} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={p.badgeDark} src={appStoreBadgeWhite} alt="" width={131} height={48} />
            </a>
          </section>
        </div>
      </div>
      <ContextBand app="bookcompass" />
    </div>
  );
}
