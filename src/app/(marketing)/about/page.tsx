import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import s from '@/components/marketing/editorial/editorial.module.css';

export const metadata: Metadata = {
  title: 'About — Naoki / GrowthLab について',
  description:
    'DoubleHub を開発している個人開発者 Naoki と、「幸せのコンテキストを、あなたの側に」をテーマにした 4 つのアプリについて。',
  alternates: { canonical: '/about/' },
};

const apps = [
  {
    word: '日々',
    name: 'DoubleHub',
    icon: '/images/doublehub-icon.jpg',
    href: '/products/doublehub/',
    text: '写真1枚と気分スタンプの、広告なしの日記アプリ。書いた日はダブル（もう一人の自分）がひと言返し、ToDo・メモ・予定は道具箱に。BookCompass の読書記録ともつながる、シリーズの中核です。',
  },
  {
    word: 'お金',
    name: 'HubWallet',
    icon: '/images/hubwallet-app-icon.jpg',
    href: '/products/hubwallet/',
    text: '節約疲れしない、広告なしの家計簿。レシートは撮るだけ、仕分けは隙間時間に。お金の使い方から「自分が何に充電されるか」を理解するための家計簿アプリです。',
  },
  {
    word: 'ことば',
    name: 'BookCompass',
    icon: '/images/bookcompass-app-icon.jpg',
    href: '/products/bookcompass/',
    text: '読みながら一言呟く読書メモ。呟きは本ごとの「読みの現在地」や読書特集号として、あとから読み返せる形で返ってきます。「もう一人の自分が、自分の読書を理解してくれる」体験を目指しています。',
  },
  {
    word: 'からだ',
    name: 'TrainNote',
    icon: '/images/trainnote-app-icon.jpg',
    href: '/products/trainnote/',
    text: '広告を表示しない筋トレ記録。前回の重量と伸び、部位ごとの回復がひと目でわかり、食事の記録やボディフォト、トレーニング日誌も残せます。AI コーチ（Plus）は、目標から逆算したロードマップと毎日のメッセージで伴走します。',
  },
];

export default function AboutPage() {
  return (
    <div className={`${s.root} ${s.page}`}>
      <div className={s.wrap}>
        <p className={s.masthead}>
          <span>開発者について</span>
          <span className={s.mastheadLatin}>Author / Developer</span>
        </p>
        <h1 className={s.title}>Naoki</h1>
        <p className={s.lead}>
          iOS アプリ個人開発者。西日本在住。Swift を中心に、写真1枚の日記 DoubleHub
          をはじめ、家計・読書・筋トレの 4 つのアプリを作っています。テーマは「幸せのコンテキストを、あなたの側に」です。
        </p>

        <div className={s.secHead}>
          <span className={s.secNo}>01</span>
          <span>はじまり</span>
        </div>
        <div className={`${s.body} ${s.narrow}`}>
          <p>
            「テクノロジーで人間の可能性をバージョンアップさせたい」——その思いから DoubleHub
            プロジェクトは始まりました。いまは、その可能性を「幸せ」の側から考えています。
          </p>
          <p>
            日記、家計、読書、筋トレ。いつもの記録を、その人が何で幸せだったかを知るための材料として、本人の側に貯めていく。それが
            4 つのアプリに共通する目的です。
          </p>
        </div>

        <div className={s.secHead}>
          <span className={s.secNo}>02</span>
          <span>開発しているアプリ</span>
        </div>
        <div className={s.cols}>
          {apps.map((a) => (
            <Link key={a.name} href={a.href} className={s.col}>
              <div className={s.word}>{a.word}</div>
              <div className={s.app}>
                <Image src={a.icon} alt="" width={24} height={24} />
                {a.name}
              </div>
              <p className={s.colText}>{a.text}</p>
              <span className={s.more}>{a.name} を見る</span>
            </Link>
          ))}
        </div>

        <div className={s.secHead}>
          <span className={s.secNo}>03</span>
          <span>大事にしていること</span>
        </div>
        <div className={`${s.body} ${s.narrow}`}>
          <p>
            AI
            に仕事を任せるために、仕事のコンテキストを貯める流れは、これから大きくなっていきます。私が作りたいのは、もう一方の記録です。あなたが何で笑い、誰といた日がよかったか——AI
            がどれだけ賢くなっても、それを知る材料は、あなたが残した記録にしかありません。
          </p>
          <p>
            Book Compass で読書メモを AI が整理して返した時、「もう一人の自分みたいだ」と感じた体験が、DoubleHub
            プロジェクト全体の原点になっています。
          </p>
          <p>
            個人開発だからこそ、自分自身が最初のユーザーです。実際に使って感じた課題や発見をそのままプロダクトに反映し、一次情報として記事にも残しています。Build
            in Public のスタイルで、開発の裏側も共有していきます。
          </p>
        </div>

        <div className={s.secHead}>
          <span className={s.secNo}>04</span>
          <span>このブログについて</span>
        </div>
        <div className={`${s.body} ${s.narrow}`}>
          <p>
            幸せと記録についての考え、AI
            の動き、個人開発の実践知を中心に記事を書いています。開発者としての一次情報や、実際にプロダクトを作りながら気づいたことを、できるだけ具体的に共有することを心がけています。
          </p>
        </div>
        <div style={{ marginTop: 28 }}>
          <Link className={s.btn} href="/blog/">
            記事を読む <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
