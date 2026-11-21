import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

/**
 * /tokushoho/
 *
 * 特定商取引法に基づく表記（GrowthLab の 4 アプリ共通の表＋アプリごとの表）。
 * アプリの購入画面・設定から `/tokushoho/#<slug>` でリンクされる。
 *
 * 注:
 * - 氏名・住所・電話番号は「請求があれば遅滞なく開示」の形（消費者庁「通信販売広告 Q&A」Q15・Q17）。
 *   屋号だけを事業者名として表示する形は不可（Q16）なので、氏名も請求で開示する。
 * - 回数の上限は、サーバーとアプリの上限の設定と同じ数を書く。上限を変えるときは、
 *   ここと各アプリの購入画面を同じ変更でそろえる（下げるときは、払っている方の期間が終わるまで下げない）。
 * - 価格は税込。実際の価格は App Store の表示に従う。
 */

const LAST_UPDATED = '2026-11-21';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  description:
    'GrowthLab が提供する DoubleHub・HubWallet・BookCompass・TrainNote の、特定商取引法に基づく表記です。価格・支払い・提供の時期・回数の上限・解約と返金について。',
  alternates: { canonical: '/tokushoho/' },
};

type Row = { label: string; value: ReactNode };

function Rows({ rows }: { rows: Row[] }) {
  return (
    <dl className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-1 px-5 py-4 md:grid-cols-[13rem_1fr] md:gap-6">
          <dt className="text-sm font-semibold text-text">{r.label}</dt>
          <dd className="text-sm leading-relaxed text-text-muted">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Lines({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const commonRows: Row[] = [
  {
    label: '販売事業者',
    value: 'GrowthLab（個人事業）',
  },
  {
    label: '氏名・住所・電話番号',
    value:
      '請求があれば、これらを記載した電子メールを遅滞なく（通常 2 日以内に）無料でお送りします。下のお問い合わせ先のメールに「特定商取引法の表記の請求」と書いてご連絡ください。',
  },
  {
    label: 'お問い合わせ',
    value: (
      <>
        <a href="mailto:support@doublehub.jp" className="text-primary hover:underline">
          support@doublehub.jp
        </a>
        （
        <Link href="/support/" className="text-primary hover:underline">
          サポートフォーム
        </Link>
        からも受け付けています）
      </>
    ),
  },
  {
    label: '販売価格',
    value: '各アプリの欄をご覧ください（いずれも税込）。実際の価格は、App Store とアプリの購入画面の表示に従います。',
  },
  {
    label: '商品代金のほかに必要な料金',
    value: 'インターネットの通信料（お客さまのご負担です）',
  },
  {
    label: '支払い方法',
    value: 'App Store のお支払い（Apple アカウントへの請求）',
  },
  {
    label: '支払いの時期',
    value: (
      <Lines
        items={[
          '購入を確定したときに請求されます。',
          '無料期間があるプランでは、無料期間が終わったときに最初の料金が請求されます（無料期間の終わりの日は、購入画面に表示されます）。',
          '自動更新のプランは、そのあと、次の期間が始まる前の 24 時間以内に、期間ごとに請求されます。',
        ]}
      />
    ),
  },
  {
    label: '提供の時期',
    value: '購入を確定したら、すぐにお使いいただけます。',
  },
  {
    label: '自動更新の条件',
    value:
      '月額プランは 1 か月ごと、年額プランは 1 年ごとに、解約するまで自動で更新されます。次の更新日の 24 時間以上前に解約すると、次の請求はありません。',
  },
  {
    label: '申込みの撤回・解約・返金',
    value: (
      <Lines
        items={[
          'デジタルのサービスのため、購入を確定したあとの申込みの撤回（キャンセル）はできません。',
          '解約は、購入した Apple アカウントで「設定」→ いちばん上のお名前 →「サブスクリプション」から行えます。アプリを削除しても、解約にはなりません。',
          '解約しても、いまの期間（無料期間を含みます）の終わりまでお使いいただけます。',
          '期間の途中で解約したときの日割りの返金はありません。',
          <>
            返金は Apple の決まりによります（
            <a
              href="https://reportaproblem.apple.com/"
              className="text-primary hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              reportaproblem.apple.com
            </a>
            の「返金をリクエストする」から申し込めます）。
          </>,
        ]}
      />
    ),
  },
  {
    label: '動作環境',
    value: '各アプリの欄をご覧ください。最新の対応状況は、App Store の各アプリのページの「互換性」に従います。',
  },
];

type AppSection = {
  slug: 'doublehub' | 'hubwallet' | 'bookcompass' | 'trainnote';
  name: string;
  rows: Row[];
};

const apps: AppSection[] = [
  {
    slug: 'doublehub',
    name: 'DoubleHub',
    rows: [
      {
        label: '販売価格',
        value: (
          <Lines
            items={[
              'Plus 月額プラン　月 480 円（1 か月ごとに自動更新）',
              'Plus 年額プラン　年 4,800 円（1 年ごとに自動更新）',
              'Premium 月額プラン　月 1,280 円（1 か月ごとに自動更新）',
              'Premium 年額プラン　年 12,800 円（1 年ごとに自動更新）',
            ]}
          />
        ),
      },
      {
        label: '無料期間',
        value:
          'はじめてご登録の方に、無料期間がつく場合があります。対象かどうかと期間は、購入画面に表示されます。',
      },
      {
        label: '提供の条件（回数の上限）',
        value: (
          <Lines
            items={[
              '日記の写真: Plus は 1 日 5 枚、Premium は 1 日 10 枚まで（無料プランは 1 日 1 枚）',
              'ダブルとのチャット（Plus・Premium）: 1 日 80 回・1 か月 1,500 回まで',
              '評議会（Premium）: 1 か月 3 回まで（期間限定で 1 か月 10 回にしている間は、アプリの中に表示します）',
              '一冊とショート: 無料プランは合わせて 10 個まで。Plus・Premium には、この 10 個の上限はありません',
            ]}
          />
        ),
      },
      { label: '動作環境', value: 'iOS 17.0 以降の iPhone。インターネットへの接続が必要です。' },
    ],
  },
  {
    slug: 'hubwallet',
    name: 'HubWallet',
    rows: [
      {
        label: '販売価格',
        value: (
          <Lines
            items={[
              'Plus 月額プラン　月 480 円（1 か月ごとに自動更新）',
              'Plus 年額プラン　年 3,800 円（1 年ごとに自動更新）',
            ]}
          />
        ),
      },
      {
        label: '無料期間',
        value:
          'はじめてご登録の方は、月額プランの最初の 1 か月が無料です（対象かどうかは、購入画面に表示されます）。',
      },
      {
        label: '提供の条件（回数の上限）',
        value: (
          <Lines
            items={[
              'AI の利用（レシートの読み取り・音声入力・AI サマリー）: Plus は 1 か月 500 回まで。どのプランも 1 日 150 回まで',
              '無料プランの AI の利用回数は、アプリの購入画面に表示します',
            ]}
          />
        ),
      },
      { label: '動作環境', value: 'iOS 17.0 以降の iPhone。インターネットへの接続が必要です。' },
    ],
  },
  {
    slug: 'bookcompass',
    name: 'BookCompass',
    rows: [
      {
        label: '販売価格',
        value: (
          <Lines
            items={[
              'Compass Pro 月額プラン　月 880 円（1 か月ごとに自動更新）。はじめてご登録の方は、最初の 3 か月が月 480 円です（対象かどうかは、購入画面に表示されます）',
              'Compass Pro 年額プラン　年 5,800 円（1 年ごとに自動更新）',
            ]}
          />
        ),
      },
      { label: '無料期間', value: 'ありません。' },
      {
        label: '提供の条件（回数の上限）',
        value: (
          <Lines
            items={[
              '思考コーチ: Compass Pro は 1 か月の上限なし（どのプランも 1 日 30 回まで。無料プランは 1 か月 10 回まで）',
              '呟いたときのじっくりした返事: Compass Pro は 1 か月の上限なし（短い相槌も含めて、返事はどのプランも 1 日 35 回まで。無料プランのじっくりした返事は 1 か月 20 回まで）',
              '本の深掘りチャット（Compass Pro）: 1 日 30 件まで',
              '読書ドキュメンタリー（Compass Pro）: 1 か月 15 回まで',
              '呟き: Compass Pro は 1 日 100 件まで（無料プランは 1 日 10 件）',
            ]}
          />
        ),
      },
      { label: '動作環境', value: 'iOS 17.0 以降の iPhone。インターネットへの接続が必要です。' },
    ],
  },
  {
    slug: 'trainnote',
    name: 'TrainNote',
    rows: [
      {
        label: '販売価格',
        value: (
          <Lines
            items={[
              'TrainNote Pro（買い切り）　800 円。1 回だけのお支払いで、追加の請求はありません',
              'Plus 月額プラン　月 480 円（1 か月ごとに自動更新）',
              '栄養 月額プラン　月 480 円（1 か月ごとに自動更新）',
              'Plus＋栄養 セット 月額プラン　月 680 円（1 か月ごとに自動更新）',
            ]}
          />
        ),
      },
      {
        label: '無料期間',
        value:
          'はじめの 30 日は、購入の前に記録をお試しいただけます（自動で有料にはなりません）。月額プランに無料期間はありません。',
      },
      {
        label: '提供の条件（回数の上限）',
        value: (
          <Lines
            items={[
              'ビジュアルスコア（Plus・セット）: 1 日 9 枚・1 か月 30 枚まで。基準の写真の設定は、1 回で 3 枚と数えます',
              '食事の写真からの AI 推定（栄養・セット）: 1 日 15 回まで',
              'TrainNote Pro の特典: 受付の期間内に購入すると、購入日から 2 か月、Plus の機能をお使いいただけます（栄養は含みません。期間が終わっても自動で課金されることはありません。受付の期間は、購入画面に表示します）',
            ]}
          />
        ),
      },
      {
        label: 'プランの変更',
        value:
          'セットへの変更と、Plus と栄養の入れ替えは、すぐに反映されます（差額は日割り）。セットから単品への変更は、次の更新日から適用されます。',
      },
      { label: '動作環境', value: 'iOS 18.0 以降の iPhone。インターネットへの接続が必要です。' },
    ],
  },
];

export default function TokushohoPage() {
  return (
    <Section spacing="lg">
      <Container width="narrow">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Legal</p>
        <h1 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          特定商取引法に基づく表記
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          GrowthLab が App Store で提供する有料プランについての表記です。はじめに 4 つのアプリに共通の事項を、そのあとにアプリごとの価格と回数の上限を載せています。
        </p>

        <nav aria-label="アプリごとの表記" className="mt-6 flex flex-wrap gap-2 text-sm">
          {apps.map((a) => (
            <a
              key={a.slug}
              href={`#${a.slug}`}
              className="rounded-full border border-border bg-surface px-3 py-1 text-text-muted hover:border-primary/40 hover:text-primary"
            >
              {a.name}
            </a>
          ))}
        </nav>

        <h2 className="mt-12 font-display text-xl font-semibold">4 つのアプリに共通の事項</h2>
        <Rows rows={commonRows} />

        {apps.map((a) => (
          <section key={a.slug} id={a.slug} className="scroll-mt-24">
            <h2 className="mt-14 font-display text-xl font-semibold">{a.name}</h2>
            <Rows rows={a.rows} />
          </section>
        ))}

        <p className="mt-10 text-sm text-text-faint">最終更新日: {LAST_UPDATED}</p>

        <p className="mt-6 flex flex-wrap gap-4 text-sm text-text-muted">
          <Link href="/privacy/" className="text-primary hover:underline">
            プライバシーポリシー
          </Link>
          <Link href="/support/" className="text-primary hover:underline">
            サポート
          </Link>
          <Link href="/" className="text-text-muted hover:text-primary hover:underline">
            DoubleHub トップへ戻る
          </Link>
        </p>
      </Container>
    </Section>
  );
}
