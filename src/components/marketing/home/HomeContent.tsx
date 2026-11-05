import Image from 'next/image';
import Link from 'next/link';
import { getLatestPosts } from '@/lib/content/blog';
import s from './home.module.css';

/**
 * トップページ（2026-11「幸せのコンテキスト」版）
 *
 * 並び（入口の痛み → 橋 → 奥の価値）:
 *  1. ヒーロー        — 幸せのコンテキストは、あとから集められない。
 *  2. こんな日        — 入口の痛み（言い当てず、場面を並べるだけ）
 *  3. なぜ、今から    — AI の時代に貯めておくもの（あおらず、事実で）
 *  4. 4 つの記録      — いつもの記録が、そのまま幸せのコンテキストになる
 *  5. 返ってくるもの  — 貯めるだけでなく、その日に返る（公開中の版の見本の画面）
 *  6. もう一人の自分  — 奥の価値
 *  7. 約束            — 広告・責めない・時間
 *  8. よくある質問・記事・最後の一押し・大きなロゴ
 *
 * 表現の線: 「資本主義」「バグ」の断定は note だけ。効能の断定なし。仕事の AI を下げない。
 * 「残らない」と言ってよいのは DoubleHub のサーバーのことだけ（送り先の AI での保持は否定しない）。
 * 変更案: マーケティング/10.情報/20261105_サイト_幸せのコンテキスト/01_変更案.md
 */

const records = [
  {
    word: '日々',
    name: 'DoubleHub',
    icon: '/images/doublehub-icon.jpg',
    href: '/products/doublehub/',
    act: '写真1枚と気分を残す',
    get: (
      <>
        何で笑ったか。
        <wbr />
        誰といた日が、
        <wbr />
        よかったか。
      </>
    ),
  },
  {
    word: 'お金',
    name: 'HubWallet',
    icon: '/images/hubwallet-app-icon.jpg',
    href: '/products/hubwallet/',
    act: 'レシートを撮るだけ',
    get: (
      <>
        何にお金を使って、
        <wbr />
        満たされたか。
      </>
    ),
  },
  {
    word: 'ことば',
    name: 'BookCompass',
    icon: '/images/bookcompass-app-icon.jpg',
    href: '/products/bookcompass/',
    act: '読みながら一言つぶやく',
    get: (
      <>
        どの一行が、
        <wbr />
        心に残ったか。
      </>
    ),
  },
  {
    word: 'からだ',
    name: 'TrainNote',
    icon: '/images/trainnote-app-icon.jpg',
    href: '/products/trainnote/',
    act: '筋トレを記録する',
    get: (
      <>
        続けた日々と、
        <wbr />
        体の変わり方。
      </>
    ),
  },
];

const plates = [
  {
    app: 'DoubleHub',
    src: '/images/doublehub-diary-detail-202610.jpg',
    alt: 'DoubleHub の日記と、ダブルからのひと言（見本）',
    text: (
      <>
        書いた日は、
        <wbr />
        ダブルが
        <wbr />
        ひと言。
        <wbr />3 日分たまると
        <wbr />
        「はじめての一冊」に。
      </>
    ),
  },
  {
    app: 'HubWallet',
    src: '/images/home/hw-kind-shelf.jpg',
    alt: 'HubWallet の種類の棚（見本）',
    text: (
      <>
        撮ったレシートが、
        <wbr />
        買ったものの
        <wbr />
        図鑑と
        <wbr />
        種類の棚に。
      </>
    ),
  },
  {
    app: 'BookCompass',
    src: '/images/home/bc-reading-compass.jpg',
    alt: 'BookCompass の読みの現在地（見本）',
    text: (
      <>
        読みながらの
        <wbr />
        一言が、
        <wbr />
        本ごとの
        <wbr />
        「読みの現在地」に。
      </>
    ),
  },
  {
    app: 'TrainNote',
    src: '/images/trainnote-record-prev-202610.jpg',
    alt: 'TrainNote の記録の画面（見本）',
    text: (
      <>
        前回の重量と
        <wbr />
        伸びが、
        <wbr />
        記録の画面に
        <wbr />
        そのまま出る。
      </>
    ),
  },
];

const faqs = [
  {
    q: '「幸せのコンテキスト」って、何ですか？',
    a: 'あなたが、いつ・何で・誰と、どのくらい幸せを感じたかを、あとから自分で知るための材料です。写真1枚の日記、レシート、読書の一言、筋トレの記録。いつもの記録が、そのまま材料になります。',
  },
  {
    q: '4 つ全部使わないといけませんか？',
    a: 'いいえ。どのアプリも、ひとつで使えます。はじめるなら、DoubleHub の写真1枚からがおすすめです。',
  },
  {
    q: '記録は AI に送られますか？',
    a: 'アプリごとに、何を・いつ送るかをプライバシーポリシーに書いています。DoubleHub の日記は、「ダブルに読んでもらう」を選んだときだけ外部の AI サービスに送り、学習には使われません。写真と気分は、DoubleHub のサーバーに残りません。',
  },
  {
    q: 'なぜ広告ではなく、直接課金なのですか？',
    a: '広告で成り立つアプリは、あなたの時間と注意を集めるほど得をします。私たちは、あなたが用を済ませて閉じても困らない形にしたいので、直接いただく形にしています。',
  },
];

function SecHead({ no, label }: { no: string; label: string }) {
  return (
    <div className={s.secHead}>
      <span className={s.secNo}>{no}</span>
      <span>{label}</span>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}.${mm}.${dd}`;
}

export function HomeContent() {
  const posts = getLatestPosts(3);

  return (
    <div className={s.root}>
      {/* 1 ヒーロー */}
      <section className={s.hero}>
        <div className={s.heroGrid}>
          <figure className={s.heroFig}>
            <Image
              src="/images/home/hero-drawer.jpg"
              alt="引き出しにしまわれた、日々の写真と紙片"
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 55vw"
            />
          </figure>
          <div className={s.heroText}>
            <p className={s.masthead}>
              <span>幸せのコンテキストを、あなたの側に</span>
              <span className={s.mastheadVol}>DoubleHub — 4 apps</span>
            </p>
            <div>
              <h1 className={`${s.heroTitle} ${s.jp}`}>
                幸せの
                <wbr />
                コンテキストは、
                <br />
                あとから
                <wbr />
                <span className={s.accent}>集められない。</span>
              </h1>
              <div className={s.heroCopy}>
                <p>
                  AI
                  は、これからもっと賢くなります。でも、あなたが何で笑い、誰といた日がよかったかを知る材料は、あなたが残した記録にしかありません。
                </p>
                <p>
                  写真1枚、レシート1枚、読みながらの一言。DoubleHub
                  は、いつもの記録を、あなたのための「幸せのコンテキスト」として、今日から貯めていく
                  4 つのアプリです。
                </p>
              </div>
              <div className={s.actions}>
                <Link className={s.btn} href="/products/doublehub/">
                  今日の1枚から始める <span aria-hidden="true">→</span>
                </Link>
                <a className={s.link} href="#records">
                  4 つのアプリを見る ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={s.wrap}>
        {/* 2 こんな日 */}
        <section className={s.section}>
          <SecHead no="01" label="こんな日" />
          <div className={s.grid12}>
            <div className={s.daysHead}>
              <h2 className={s.jp}>
                毎日は、
                <wbr />
                ちゃんと
                <wbr />
                過ぎている。
                <br />
                なのに、
                <wbr />
                何も
                <wbr />
                残っていない。
              </h2>
            </div>
            <div className={s.daysList}>
              <ol>
                <li className={s.jp}>
                  毎日が、
                  <wbr />
                  なんとなく
                  <wbr />
                  過ぎていく。
                </li>
                <li className={s.jp}>
                  去年の今日、
                  <wbr />
                  何をしていたか
                  <wbr />
                  思い出せない。
                </li>
                <li className={s.jp}>
                  SNS を見たあと、
                  <wbr />
                  なんだか
                  <wbr />
                  疲れている。
                </li>
                <li className={s.jp}>
                  おすすめは、
                  <wbr />
                  あなたの好みを
                  <wbr />
                  知っている。
                  <wbr />
                  でも、
                  <wbr />
                  あなたが
                  <wbr />
                  幸せだった日は
                  <wbr />
                  知らない。
                </li>
              </ol>
              <p className={`${s.closing} ${s.jp}`}>
                幸せが無かったのではなく、
                <wbr />
                気づく前に
                <wbr />
                流れていっただけ
                <wbr />
                かもしれません。
              </p>
            </div>
          </div>
        </section>

        {/* 3 なぜ、今から */}
        <section className={s.section}>
          <SecHead no="02" label="なぜ、今から" />
          <div className={s.grid12}>
            <div className={s.whyHead}>
              <h2 className={s.jp}>
                AI が
                <wbr />
                賢くなるほど、
                <wbr />
                あなたの記録が
                <wbr />
                効いてくる。
              </h2>
            </div>
            <div className={s.whyBody}>
              <p>仕事を AI に任せるために、仕事のコンテキストを貯める人が増えています。</p>
              <p>
                AI
                が仕事を引き受けてくれるほど、残る問いは「じゃあ、何をして幸せに過ごそう」になります。
              </p>
              <p>
                その問いに、AI
                は一般論でしか答えられません。あなたが何で幸せだったかの記録が、どこにも無いからです。
              </p>
              <p className={`${s.pull} ${s.jp}`}>
                そしてその記録は、
                <wbr />
                さかのぼって
                <wbr />
                作れません。
                <wbr />
                写真は
                <wbr />
                カメラロールに
                <wbr />
                残っても、
                <wbr />
                その日
                <wbr />
                なぜうれしかったかは、
                <wbr />
                残しておかないと
                <wbr />
                消えていきます。
              </p>
              <table className={s.cmp}>
                <colgroup>
                  <col className={s.cmpKey} />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <span className="sr-only">項目</span>
                    </th>
                    <th>
                      仕事の
                      <wbr />
                      コンテキスト
                    </th>
                    <th className={s.ours}>
                      幸せの
                      <wbr />
                      コンテキスト
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">中身</th>
                    <td>議事録、資料、手順、好み。</td>
                    <td className={s.ours}>
                      何で笑ったか。誰といた日がよかったか。何に使って、満たされたか。
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">貯まる先</th>
                    <td>会社と、仕事の AI</td>
                    <td className={s.hl}>あなたの側</td>
                  </tr>
                </tbody>
              </table>
              <p className={`${s.whyLast} ${s.jp}`}>
                私たちが貯めるのは、
                <wbr />
                幸せのほうです。
                <wbr />
                今日から、
                <wbr />
                あなたの側に。
              </p>
            </div>
          </div>
        </section>

        {/* 4 4 つの記録 */}
        <section className={s.section} id="records">
          <SecHead no="03" label="4 つの記録" />
          <div className={s.recTop}>
            <h2 className={s.jp}>
              いつもの記録が、
              <wbr />
              そのまま
              <wbr />
              幸せの
              <wbr />
              コンテキストになる。
            </h2>
            <p>特別なことは、書かなくていい。</p>
          </div>
          <div className={s.four}>
            {records.map((r) => (
              <Link key={r.name} className={s.fourItem} href={r.href}>
                <div className={s.word}>{r.word}</div>
                <div className={s.app}>
                  <Image src={r.icon} alt="" width={24} height={24} />
                  {r.name}
                </div>
                <p className={s.do}>{r.act}</p>
                <p className={`${s.get} ${s.jp}`}>{r.get}</p>
                <span className={s.more}>{r.name} を見る</span>
              </Link>
            ))}
          </div>
          <div className={s.recFoot}>どれも広告なし。ひとつからでも使えます。</div>
        </section>

        {/* 5 返ってくるもの */}
        <section className={s.section}>
          <SecHead no="04" label="返ってくるもの" />
          <div className={`${s.grid12} ${s.retTop}`}>
            <div className={s.retHead}>
              <h2 className={s.jp}>
                貯めるだけじゃない。
                <br />
                その日のうちに、
                <wbr />
                返ってくる。
              </h2>
            </div>
            <p className={s.retLead}>
              記録しっぱなしには、しません。残したその日から、あなたの記録が形になって戻ってきます。
            </p>
          </div>
          <div className={s.plates}>
            {plates.map((p, i) => (
              <figure key={p.app} className={s.plate}>
                <div className={s.plateImg}>
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width: 600px) 64vw, (max-width: 960px) 38vw, 270px" />
                </div>
                <figcaption className={s.plateCap}>
                  <div className={s.fig}>
                    fig. {i + 1} — <b>{p.app}</b>
                  </div>
                  <div className={`${s.plateTxt} ${s.jp}`}>{p.text}</div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className={s.smallNote}>画面は見本のデータです。</div>
        </section>
      </div>

      {/* 6 もう一人の自分 */}
      <section className={s.band}>
        <div className={s.wrap}>
          <SecHead no="05" label="もう一人の自分" />
          <div className={s.grid12}>
            <div className={s.bandL}>
              <h2 className={s.jp}>
                あなたを、
                <wbr />
                世界でいちばんわかる、
                <wbr />
                もう一人の自分へ。
              </h2>
              <p className={`${s.strong} ${s.jp}`}>
                貯まった記録から、
                <wbr />
                あなたが何で幸せかが、
                <wbr />
                少しずつ見えてきます。
              </p>
              <p>
                ダブルは、答えを押しつけません。あなたの記録から見つけて、並べて、返すだけ。何が幸せかを決めるのは、あなたです。
              </p>
              <div className={s.verbs}>
                <div>
                  <b>見つける</b>
                  <span>写真と言葉から、うれしかった場面を。</span>
                </div>
                <div>
                  <b>並べる</b>
                  <span>日々を章にして、一冊に。</span>
                </div>
                <div>
                  <b>返す</b>
                  <span>決めつけずに、ひと言で。</span>
                </div>
              </div>
            </div>
            <div className={s.bandR}>
              <div className={s.pair}>
                <div className={s.pairImg}>
                  <Image
                    src="/images/home/dh-month-chapter.jpg"
                    alt="DoubleHub の月の一冊の章（見本）"
                    fill
                    sizes="(max-width: 900px) 50vw, 230px"
                  />
                </div>
                <div className={s.pairImg}>
                  <Image
                    src="/images/home/dh-album-cover.jpg"
                    alt="DoubleHub のアルバム（見本）"
                    fill
                    sizes="(max-width: 900px) 50vw, 230px"
                  />
                </div>
              </div>
              <div className={s.smallNote}>画面は見本のデータです。</div>
            </div>
          </div>
        </div>
      </section>

      <div className={s.wrap}>
        {/* 7 約束 */}
        <section className={s.section}>
          <SecHead no="06" label="約束" />
          <h2 className={s.jp} style={{ marginBottom: 48 }}>
            あなたの記録は、
            <wbr />
            あなたのために。
          </h2>
          <div className={s.prom}>
            <div>
              <span className={s.promNo}>01</span>
              <h3>広告を出さない</h3>
              <p>4 つのアプリは、どれも広告なし。あなたの記録を広告に使ったり、ほかの会社に売ったりしません。</p>
            </div>
            <div>
              <span className={s.promNo}>02</span>
              <h3>責めない、比べない</h3>
              <p>空いた日は、空いた日のまま。比べる相手は、過去のあなただけです。</p>
            </div>
            <div>
              <span className={s.promNo}>03</span>
              <h3>時間を奪わない</h3>
              <p>おすすめが果てしなく流れてくる画面は、ありません。用が済んだら、閉じていい。</p>
            </div>
          </div>
        </section>

        {/* 8 よくある質問 */}
        <section className={s.section}>
          <SecHead no="07" label="よくある質問" />
          <div className={s.grid12}>
            <div className={s.faqHead}>
              <h2>よくある質問</h2>
            </div>
            <div className={s.faqList}>
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 記事 */}
        <section className={s.section} style={{ paddingBottom: 96 }}>
          <SecHead no="08" label="記事" />
          <div className={s.toc}>
            {posts.map((post) => (
              <Link key={post.slug} className={s.tocRow} href={`/blog/${post.slug}/`}>
                <time className={s.tocDate} dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <span className={s.tocCat}>{post.category ?? post.tags[0] ?? ''}</span>
                <span className={s.tocTitle}>{post.title}</span>
                <span className={s.tocMin}>{post.readingTime ? `${post.readingTime} 分` : ''}</span>
              </Link>
            ))}
          </div>
          <Link className={`${s.link} ${s.tocMore}`} href="/blog/">
            記事をすべて見る →
          </Link>
        </section>

        {/* 最後の一押し */}
        <section className={s.cta}>
          <div className={s.grid12} style={{ alignItems: 'end' }}>
            <div className={s.ctaT}>
              <h2 className={s.jp}>
                まずは、
                <wbr />
                今日の1枚から。
              </h2>
            </div>
            <div className={s.ctaA}>
              <p>DoubleHub は、写真1枚でいい日記アプリです。広告なし。書いた日は、ダブルがひと言返します。</p>
              <div className={s.actions} style={{ marginTop: 8 }}>
                <Link className={s.btn} href="/products/doublehub/">
                  DoubleHub を見る <span aria-hidden="true">→</span>
                </Link>
                <Link className={s.link} href="/about/">
                  開発者について
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 大きなロゴ（引き出しの写真を文字の形で切り抜く） */}
        <div className={s.giant} aria-hidden="true">
          DoubleHub
        </div>
      </div>
    </div>
  );
}
