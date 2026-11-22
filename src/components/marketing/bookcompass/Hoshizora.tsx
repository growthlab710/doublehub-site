import Image from 'next/image';
import Link from 'next/link';
import { APP_STORE_PROVIDER_TOKEN } from '@/lib/site/appStoreLink';
import s from './hoshizora.module.css';

/**
 * BookCompass「読書の星空」（2.14.0〜・2026-11-20 公開）のファーストビューと、実画面 2 枚の段。
 * 製品ページ（/products/bookcompass/）と Meta 広告の着地（/products/bookcompass/hoshizora/）で使い回す。
 *
 * 言い方の線（正本: マーケティング/00.戦略/BC_PMF検証計画_2026-11.md §2-6・
 * 10.情報/20261120_BC_読書の星空の広告/01_広告計画.md 3 節）:
 *  - 約束するのは最初の日に届くこと（一言を書くと星が灯る・同じテーマの前の言葉に戻れる）まで。
 *    「すぐ星座ができる」とは言わない。星座には「2冊以上に書いて線をつなぐとできます」を添える。
 *  - 「孤独」を使わない。AI を主語にしない。効果を言い切らない。
 *  - 深掘りを「何冊でも」と読める言い方をしない（AI が読むのは無料で 10 冊まで）。
 * 画面はすべて 2.14.0 の実画面（見本データ）。生成画像は使わない。作り方は
 * 10.情報/20261120_BC_読書の星空の広告/build_site_images.py。
 */

const BC_APP_ID = '6760604663';

/** 日本のストアの BookCompass のページ。ct（来た道の印）は置き場所ごとに渡す */
export function bookCompassStoreUrl(ct: string): string {
  return `https://apps.apple.com/jp/app/id${BC_APP_ID}?pt=${APP_STORE_PROVIDER_TOKEN}&ct=${ct}&mt=8`;
}

// 夜空の帯の上なので白いバッジ（Apple の配布物・日本語）
const appStoreBadgeWhite =
  'https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/ja-jp?releaseDate=1774224000';

function StoreBadge({ ct }: { ct: string }) {
  return (
    <a
      className={s.badge}
      href={bookCompassStoreUrl(ct)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="App Store で BookCompass をダウンロード"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={appStoreBadgeWhite} alt="App Storeからダウンロード" width={131} height={48} />
    </a>
  );
}

export function HoshizoraHero({
  ct,
  secondaryLink,
}: {
  ct: string;
  secondaryLink?: { href: string; label: string };
}) {
  return (
    <div className={s.root}>
      <section className={s.hero} aria-label="読書の星空">
        <div className={s.wrap}>
          <div className={s.heroGrid}>
            <div className={s.heroHead}>
              <p className={s.masthead}>
                <span className={s.brand}>
                  <Image
                    src="/images/bookcompass-app-icon.jpg"
                    alt=""
                    width={24}
                    height={24}
                    priority
                  />
                  <span className={s.brandName}>BookCompass</span>
                  <span className={s.brandSub}>読みながら一言の読書メモ</span>
                </span>
                <span className={s.mastheadRight}>読書の星空</span>
              </p>
              <h1 className={`${s.title} ${s.jp}`}>
                読んだ本の
                <wbr />
                一言が、
                <br />
                <span className={s.gold}>星になる。</span>
              </h1>
            </div>

            <figure className={s.heroFig}>
              <div className={s.sky}>
                <Image
                  src="/images/bookcompass-hoshizora-sky-202611.jpg"
                  alt="読書の星空の「ぜんぶ」の空。14 の分野に灯った星と、線でつないだ 2 つの星座（見本）"
                  fill
                  priority
                  sizes="(max-width: 860px) 100vw, 580px"
                />
              </div>
              <figcaption className={s.figNote}>※画面は見本です</figcaption>
            </figure>

            <div className={s.heroBody}>
              <p className={`${s.lead} ${s.jp}`}>
                本を読みながら、
                <wbr />
                一言だけ。
                <wbr />
                その言葉の
                <wbr />
                テーマに
                <wbr />
                星が灯り、
                <wbr />
                前に別の本で
                <wbr />
                書いた言葉にも
                <wbr />
                戻れます。
              </p>
              <div className={s.actions}>
                <StoreBadge ct={ct} />
                {secondaryLink ? (
                  <a className={s.link} href={secondaryLink.href}>
                    {secondaryLink.label}
                  </a>
                ) : null}
              </div>
              <p className={s.free}>本の登録と一言は無料。読書メモとしては、無料でずっと使えます。</p>
            </div>

            <div className={s.heroRest}>
              <p className={s.sub}>
                きれいな感想文は要りません。呟きは他のユーザーに公開されず、広告も表示しません。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const plates = [
  {
    src: '/images/bookcompass-hoshizora-overview-202611.jpg',
    width: 1080,
    height: 1677,
    alt: '読書の星空の全体。円い窓に「48 の星」、自分の読書に聞く、本をまたぐつながり、星座の札（見本）',
    title: '書いた一言から、星が灯る。',
    body: '本に一言を書くと、その言葉のテーマに星が灯ります。同じテーマを前に別の本でも書いていたら、そのときの言葉に戻れます。',
    note: null,
  },
  {
    src: '/images/bookcompass-hoshizora-constellation-202611.jpg',
    width: 1080,
    height: 2144,
    alt: '星座の画面。「習慣と決断の星座」の形と、育ちの記録、別々の本に書いた言葉の道すじ（見本）',
    title: '別々の本の言葉が、星座になる。',
    body: '本をまたいだ言葉のつながりの候補が届き、自分で「つなぐ」と線が残ります。つないだ星は星座になり、育った日ごとの姿を見返せます。',
    note: '※星座は、2冊以上に書いて線をつなぐとできます',
  },
] as const;

export function HoshizoraPlates({ id }: { id?: string }) {
  return (
    <div className={s.root} id={id}>
      <section className={s.plates} aria-label="読書の星空の画面">
        <div className={s.wrap}>
          <div className={s.platesGrid}>
            {plates.map((p) => (
              <article key={p.src} className={s.plate}>
                <div className={s.plateImg}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(max-width: 860px) 42vw, 260px"
                  />
                </div>
                <div>
                  <h2 className={`${s.plateH} ${s.jp}`}>{p.title}</h2>
                  <p className={s.plateBody}>{p.body}</p>
                  {p.note ? <p className={s.plateNote}>{p.note}</p> : null}
                </div>
              </article>
            ))}
          </div>
          <p className={s.platesFoot}>
            ※画面は見本です（バージョン 2.14.0）。表示している本や一言は、架空のものです。
          </p>
        </div>
      </section>
    </div>
  );
}

/** 着地ページの締め（最後のボタンと注記）。製品ページでは使わない */
export function HoshizoraClosing({ ct }: { ct: string }) {
  return (
    <div className={s.root}>
      <section className={s.closing} aria-label="はじめる">
        <div className={s.wrap}>
          <div className={s.closingInner}>
            <h2 className={`${s.closingH} ${s.jp}`}>最近、なに読んでる？</h2>
            <p className={s.closingBody}>
              いま読んでいる本を一冊登録して、読みながら一言書くところから。本の登録と一言は無料です。
            </p>
            <div className={s.actions}>
              <StoreBadge ct={ct} />
            </div>
            <ul className={s.notes}>
              <li>※画面は見本です。</li>
              <li>※星座は、2冊以上に書いて線をつなぐとできます。</li>
              <li>読書メモとしては、無料でずっと使えます。</li>
            </ul>
            <div className={s.closingLinks}>
              <Link className={s.link} href="/products/bookcompass/">
                BookCompass の紹介
              </Link>
              <Link className={s.link} href="/privacy/bookcompass/">
                プライバシーポリシー
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
