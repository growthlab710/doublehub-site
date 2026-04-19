import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About — Naoki / GrowthLab について',
  description:
    'DoubleHub を開発している個人開発者 Naoki と、AI × 習慣化 × 自己理解をテーマにした DoubleHub プロジェクトについて。',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <Section spacing="lg">
      <Container width="narrow">
        {/* Hero */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Author / Developer
          </span>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
            Naoki
          </h1>
        </div>

        <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
          <p>
            iOS アプリ個人開発者。西日本在住。Swift を中心にアプリ開発を行い、AI ×
            習慣化 × 自己理解をテーマとした DoubleHub シリーズを制作しています。
          </p>

          <p>
            「テクノロジーで人間の可能性をバージョンアップさせたい」——その思いから
            DoubleHub
            プロジェクトは始まりました。読書、筋トレ、タスク管理。一見バラバラに見える記録や情報をつなぎ合わせて、一人ひとりに合った次の一歩を提案できるエコシステムを目指しています。
          </p>

          <h2>開発しているプロダクト</h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            href="/products/trainnote/"
            className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
          >
            <div className="font-display text-lg font-semibold group-hover:text-primary">
              TrainNote
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              筋トレ記録 × AI コーチ。トレーニング記録を超えて、あなたの「続け方」の特徴を残すサービス。AI
              Coach V2 では、記録と会話をもとに育っていくパーソナルトレーナーを目指しています。
            </p>
          </Link>
          <Link
            href="/products/bookcompass/"
            className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
          >
            <div className="font-display text-lg font-semibold group-hover:text-primary">
              Book Compass
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              読書記録 × AI
              整理。読んだ本とメモを AI が整理し、思考や価値観の変化を可視化。「もう一人の自分が、自分の読書を理解してくれる」体験を目指しています。
            </p>
          </Link>
          <Link
            href="/products/doublehub/"
            className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg md:col-span-2"
          >
            <div className="flex items-center gap-2 font-display text-lg font-semibold group-hover:text-primary">
              DoubleHub
              <span className="rounded-full bg-accent-warm-soft px-2 py-0.5 text-[0.65rem] font-medium text-accent-warm">
                開発中
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              上記サービスのデータを横断する AI
              秘書アプリ。ToDo、予定、対話をまとめて扱い、散らばった生活データから「もう一人の自分」を育てる中核サービスです。
            </p>
          </Link>
        </div>

        <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert">
          <h2>大事にしていること</h2>
          <p>
            AI
            を「速く作るための道具」としてだけでなく、「ユーザー体験そのものを深くする存在」として組み込むことを大切にしています。Book
            Compass で読書メモを AI が整理して返した時、「もう一人の自分みたいだ」と感じた体験が、DoubleHub
            プロジェクト全体の原点になっています。
          </p>
          <p>
            個人開発だからこそ、自分自身が最初のユーザーです。実際に使って感じた課題や発見をそのままプロダクトに反映し、一次情報として記事にも残しています。Build
            in Public のスタイルで、開発の裏側も共有していきます。
          </p>

          <h2>このブログについて</h2>
          <p>
            AI ×
            習慣化、ライフデータ管理、個人開発の実践知を中心に記事を書いています。開発者としての一次情報や、実際にプロダクトを作りながら気づいたことを、できるだけ具体的に共有することを心がけています。
          </p>
        </div>

        <div className="mt-10">
          <Button asChild>
            <Link href="/blog/">ブログ記事を読む</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
