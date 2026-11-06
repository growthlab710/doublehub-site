import Link from 'next/link';
import s from '@/components/marketing/editorial/editorial.module.css';

/**
 * 製品ページのいちばん下に置く帯: 「このアプリで貯まる、幸せのコンテキスト」。
 * 見出し（入口の痛み）は製品ページごとのまま変えず、最後にトップの軸（奥の価値）へつなぐ。
 */
const bands = {
  doublehub: { word: '日々', line: '何で笑ったか。誰といた日が、よかったか。' },
  hubwallet: { word: 'お金', line: '何にお金を使って、満たされたか。' },
  bookcompass: { word: 'ことば', line: 'どの一行が、心に残ったか。' },
  trainnote: { word: 'からだ', line: '続けた日々と、体の変わり方。' },
} as const;

export function ContextBand({ app }: { app: keyof typeof bands }) {
  const b = bands[app];
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <aside className={s.band} aria-label="このアプリで貯まる、幸せのコンテキスト">
          <div>
            <p className={s.bandLabel}>このアプリで貯まる、幸せのコンテキスト</p>
            <p className={`${s.bandLine} ${s.jp}`}>
              <span className={s.bandWord}>{b.word}</span>
              {b.line}
            </p>
            <p className={s.bandNote}>
              いつもの記録が、あなたが何で幸せだったかを知るための材料になります。4 つのアプリは、どれも広告なし。ひとつからでも使えます。
            </p>
          </div>
          <Link className={s.link} href="/">
            DoubleHub の 4 つのアプリについて →
          </Link>
        </aside>
      </div>
    </div>
  );
}
