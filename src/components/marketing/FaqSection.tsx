'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';

/**
 * FAQ セクション
 * アコーディオン形式で 4 問。
 */

const faqs = [
  {
    q: 'DoubleHub はいつ使えるようになりますか？',
    a: '現在は構想公開と基盤づくりの段階です。テスト版の提供時期が見えてきたら、このサイトと更新案内でお知らせします。',
  },
  {
    q: 'TrainNote や Book Compass は単体でも使えますか？',
    a: 'はい。各サービスは単体でも価値を持つ設計です。DoubleHub に接続するとさらに深い洞察が得られますが、必須ではありません。',
  },
  {
    q: '家計や健康のサービスも必要になりますか？',
    a: 'いいえ。つながる入口が増えるほどダブルの理解は深くなりますが、すべてを使う必要はありません。',
  },
  {
    q: 'データのプライバシーはどうなりますか？',
    a: 'データの取り扱いには細心の注意を払います。DoubleHub では以下の原則を設計の基盤としています。',
    list: [
      'データ連携は必ずユーザーの明示的な同意を前提とします',
      '各サービスの生データをそのまま外部へ送ることはせず、構造化・匿名化された情報のみを連携します',
      'どのデータを共有し、どのデータを非公開にするかはユーザー自身が選択できます',
      'サービスの利用をやめた場合、データの削除をリクエストできる仕組みを整備します',
    ],
    footer: (
      <>
        詳細は{' '}
        <Link href="/privacy/" className="text-primary underline hover:text-primary-hover">
          プライバシーポリシー
        </Link>{' '}
        をご確認ください。
      </>
    ),
  },
];

export function FaqSection() {
  return (
    <section className="border-t border-divider py-20 md:py-24" id="faq">
      <Container width="default">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >

          <h2 className="mt-3 font-display text-[clamp(1.75rem,1.1rem+2.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
            よくあるご質問
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 max-w-2xl space-y-3">
          {faqs.map((f, idx) => (
            <motion.details
              key={f.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.05,
              }}
              className="group rounded-xl border border-border bg-surface transition-all duration-200 open:shadow-sm"
              open={idx === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-base font-semibold tracking-[-0.01em] text-text md:text-lg">
                <span>{f.q}</span>
                <ChevronDown
                  className="h-5 w-5 flex-shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
                  strokeWidth={2}
                />
              </summary>
              <div className="space-y-3 border-t border-divider px-5 pb-5 pt-4 text-sm leading-relaxed text-text-muted">
                <p>{f.a}</p>
                {f.list && (
                  <ul className="list-inside list-disc space-y-1.5 pl-1">
                    {f.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {f.footer && <p>{f.footer}</p>}
              </div>
            </motion.details>
          ))}
        </div>
      </Container>
    </section>
  );
}
