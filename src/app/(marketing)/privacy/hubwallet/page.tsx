import type { Metadata } from 'next';
import { PrivacyLayout } from '../_components/PrivacyLayout';

/**
 * /privacy/hubwallet/
 *
 * HubWallet v0.1.0 リリースに合わせて公開する初版 (2026-05-08)。
 * 本文は PRIVACY_POLICY.md を一次ソースとして反映している。
 */
export const metadata: Metadata = {
  title: 'HubWallet プライバシーポリシー',
  description:
    'iOS 家計簿アプリ HubWallet のプライバシーポリシー。レシート OCR・カテゴリ推定時の AI 送信、ローカル保存、銀行連携を行わない方針について。',
  alternates: { canonical: '/privacy/hubwallet/' },
};

export default function HubWalletPrivacyPage() {
  return (
    <PrivacyLayout
      title="HubWallet プライバシーポリシー"
      productLabel="HubWallet"
      lastUpdated="2026-05-08"
    >
      <p>
        本ポリシーは、iOS アプリ「HubWallet」（以下「本アプリ」）における個人情報および利用者データの取扱いについて定めるものです。本アプリの利用にあたっては本ポリシーをご確認のうえ、内容に同意されるものとします。
      </p>

      <h2>1. 適用範囲</h2>
      <p>
        本ポリシーは、本アプリおよび本アプリに関連するサポート窓口に対して適用されます。本アプリは、エコシステムアプリ「DoubleHub」と連携する機能を提供しますが、DoubleHub
        本体や他社サービスのプライバシー取扱いは各サービスのポリシーに従います。
      </p>

      <h2>2. 取得する情報</h2>

      <h3>2.1 アカウント情報</h3>
      <p>
        本アプリは Sign in with Apple を必須としています。サインイン時に Apple
        から提供される以下の情報を取得します。
      </p>
      <ul>
        <li>ユーザー識別子（Apple <code>sub</code>、当社管理の内部ユーザー ID にひも付け）</li>
        <li>ID Token（短期 JWT、API 認証用）</li>
        <li>
          氏名・メールアドレス（利用者が「メールを共有」を選択した場合のみ。「メールを非公開」を選択した場合は
          Apple のリレーアドレスのみ取得）
        </li>
      </ul>

      <h3>2.2 利用者が入力するデータ</h3>
      <ul>
        <li>取引記録（金額、日付、カテゴリ、店舗名、メモ、収支区分など）</li>
        <li>レシート画像、領収書 PDF（撮影・共有シート・ファイル選択により取り込んだもの）</li>
        <li>音声メモ（OS の音声認識で文字起こしされたテキスト）</li>
        <li>予算設定、定期支出設定、カテゴリ管理情報</li>
      </ul>

      <h3>2.3 自動的に記録される情報</h3>
      <ul>
        <li>AI 機能の利用回数（月次・日次）</li>
        <li>整理継続日数などのアプリ内統計</li>
        <li>アプリ内で発生したエラーログ（端末ローカルのみ）</li>
      </ul>

      <h3>2.4 取得しない情報</h3>
      <ul>
        <li>広告識別子（IDFA）</li>
        <li>位置情報</li>
        <li>連絡先・カレンダー</li>
        <li>
          銀行口座、クレジットカード等の金融機関認証情報（本アプリは金融機関連携を一切行いません）
        </li>
        <li>端末を特定するハードウェア識別子</li>
      </ul>

      <h2>3. 利用目的</h2>
      <p>取得した情報は以下の目的に限り利用します。</p>
      <ul>
        <li>家計簿機能（記録・閲覧・分析・予算管理）の提供</li>
        <li>レシート画像からのテキスト抽出（OCR）および支出カテゴリの自動推定</li>
        <li>アプリの安定運用、エラー検知、品質改善</li>
        <li>認証およびアカウント管理</li>
        <li>利用者からのお問い合わせへの対応</li>
        <li>不正利用の防止</li>
      </ul>

      <h2>4. データの保存場所</h2>
      <ul>
        <li>
          取引記録、レシート画像、入力データその他の家計データは、すべて利用者の端末内（SwiftData）に保存されます
        </li>
        <li>
          認証情報（Apple ユーザー識別子、内部ユーザー ID、ID Token）は端末の Keychain
          に保存されます
        </li>
        <li>本アプリは、家計データを当社サーバーや第三者クラウドに同期しません</li>
        <li>
          将来のバージョンで、利用者の明示的な同意のもとクラウド同期機能（Supabase）を実装する可能性があります。実装時には本ポリシーを改定し、改めてご案内します
        </li>
      </ul>

      <h2>5. 第三者提供および外部送信</h2>
      <p>
        本アプリの一部機能（OCR、カテゴリ推定、音声からの取引情報抽出）は、AI
        サービスへのデータ送信を伴います。送信経路は次のとおりです。
      </p>

      <pre className="overflow-x-auto whitespace-pre rounded-lg bg-surface-2 p-4 text-xs leading-relaxed">
        {`[本アプリ] ──HTTPS──▶ [Cloudflare Workers] ──HTTPS──▶ [Google Gemini API]`}
      </pre>

      {/* 表は prose の table スタイルで描画されるが、横スクロール余地を確保しておく。 */}
      <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-divider bg-surface-2 text-left">
              <th className="px-4 py-3 font-semibold text-text">送信先</th>
              <th className="px-4 py-3 font-semibold text-text">提供事業者</th>
              <th className="px-4 py-3 font-semibold text-text">送信内容</th>
              <th className="px-4 py-3 font-semibold text-text">目的</th>
              <th className="px-4 py-3 font-semibold text-text">保存方針</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-b [&>tr]:border-divider [&>tr:last-child]:border-0 [&>tr>td]:align-top">
            <tr>
              <td className="whitespace-nowrap px-4 py-4 font-medium text-text">
                Cloudflare Workers
              </td>
              <td className="px-4 py-4 text-text-muted">Cloudflare, Inc.</td>
              <td className="px-4 py-4 text-text-muted">
                レシート画像、抽出対象テキスト、認証ヘッダー
              </td>
              <td className="px-4 py-4 text-text-muted">
                API キーの秘匿、リクエスト中継、レート制限
              </td>
              <td className="px-4 py-4 text-text-muted">中継のみ。永続保存しない</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap px-4 py-4 font-medium text-text">
                Google Gemini API
              </td>
              <td className="px-4 py-4 text-text-muted">Google LLC</td>
              <td className="px-4 py-4 text-text-muted">レシート画像、抽出対象テキスト</td>
              <td className="px-4 py-4 text-text-muted">OCR、テキスト分類、カテゴリ推定</td>
              <td className="px-4 py-4 text-text-muted">
                各社のポリシーに準拠。利用者を識別できる形での長期保存は行わない
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul>
        <li>送信時は HTTPS による暗号化通信を行います</li>
        <li>
          送信先各社のプライバシー方針は次の通りです
          <ul>
            <li>
              Cloudflare:{' '}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.cloudflare.com/privacypolicy/
              </a>
            </li>
            <li>
              Google:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
            </li>
            <li>
              Google AI / Gemini API のデータ利用:{' '}
              <a
                href="https://ai.google.dev/gemini-api/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ai.google.dev/gemini-api/terms
              </a>
            </li>
          </ul>
        </li>
        <li>
          将来、他の AI 事業者へ変更・追加する可能性があります。その際は本ポリシーを改定したうえで反映します
        </li>
        <li>上記以外の第三者へ、利用者の同意なく個人データを提供することはありません</li>
      </ul>

      <h2>6. レシート画像および収入書類の取扱い</h2>

      <h3>6.1 レシート画像</h3>
      <ul>
        <li>撮影・取り込まれたレシート画像は端末ローカルにのみ保存されます</li>
        <li>OCR 処理時に限り、第 5 項に記載の経路で Google Gemini API へ送信されます</li>
        <li>確定後のレシート画像保持・削除は、設定画面でいつでも切り替え可能です</li>
        <li>
          設定で「確定後にレシート画像を保持しない」を選択した場合、確定後に画像データのみ削除されます（取引記録は残ります）
        </li>
      </ul>

      <h3>6.2 収入書類（給与明細、賞与明細、公的年金通知書、配当金計算書など）</h3>
      <p>プライバシー配慮のため、本アプリは収入書類から以下の項目を抽出しません。</p>
      <ul>
        <li>
          総支給額の内訳および各種控除明細（健康保険、厚生年金、所得税、住民税など）
        </li>
        <li>基礎年金番号</li>
        <li>マイナンバー</li>
        <li>住所</li>
        <li>上記以外の、収入記録に必要のない個人特定情報</li>
      </ul>
      <p>抽出する情報は、差引支給額（または支給金額）、支給日、支払元名のみです。</p>

      <h2>7. 広告およびトラッキングについて</h2>
      <ul>
        <li>本アプリはすべてのプランにおいて広告を表示しません</li>
        <li>広告 SDK や解析 SDK は一切組み込まれていません</li>
        <li>iOS の App Tracking Transparency（ATT）対象となるトラッキングは行いません</li>
        <li>IDFA、その他のクロスサイト識別子は取得しません</li>
      </ul>

      <h2>8. 利用者の権利</h2>
      <p>利用者は次の権利を行使できます。</p>
      <ul>
        <li>
          <strong>アクセス</strong>:
          端末内に保存されたすべての家計データは、本アプリ内でいつでも閲覧できます
        </li>
        <li>
          <strong>訂正・削除</strong>:
          個別の取引記録、カテゴリ、予算等は本アプリ内で編集・削除できます
        </li>
        <li>
          <strong>アカウント削除</strong>: 「設定 &gt;
          アカウントを削除」から、端末内の家計データと認証情報をすべて完全に削除できます
        </li>
        <li>
          <strong>Apple ID 連携の解除</strong>: iOS の「設定 &gt; Apple ID &gt;
          サインインとセキュリティ &gt; Apple でサインイン」から、本アプリと Apple ID
          の連携を解除できます
        </li>
      </ul>

      <h2>9. データの保存期間</h2>
      <ul>
        <li>
          端末ローカルに保存されたデータは、利用者がアプリを利用している期間中、または利用者が削除するまで保持されます
        </li>
        <li>
          利用者が「アカウントを削除」を実行した場合、当該端末内のデータはすべて削除されます
        </li>
        <li>アプリのアンインストールにより、端末内のデータも削除されます</li>
      </ul>

      <h2>10. お子様のプライバシー</h2>
      <p>
        本アプリは 13
        歳未満の子どもからの個人情報収集を意図しておりません。13
        歳未満による利用が判明した場合、保護者の方は本アプリの「アカウントを削除」機能を用いて速やかに削除いただくか、第
        12 項のサポート窓口までご連絡ください。
      </p>

      <h2>11. 本ポリシーの変更</h2>
      <ul>
        <li>
          法令の変更、機能追加、外部サービスの変更等により、本ポリシーは予告なく改定されることがあります
        </li>
        <li>重要な変更の場合は、アプリ内通知またはサポートページでお知らせします</li>
        <li>改定後の最新版は本ページに掲載します</li>
      </ul>

      <h2>12. お問い合わせ窓口</h2>
      <p>
        本ポリシーおよび個人情報の取扱いに関するお問い合わせは、以下の窓口までお願いします。
      </p>
      <ul>
        <li>運営者: GrowthLab</li>
        <li>
          お問い合わせ先メール:{' '}
          <a href="mailto:growthlab116710@gmail.com">growthlab116710@gmail.com</a>
        </li>
        <li>
          サポートページ:{' '}
          <a href="https://www.doublehub.jp/support/">https://www.doublehub.jp/support/</a>
        </li>
      </ul>

      <h2>改定履歴</h2>
      <ul>
        <li>2026-05-08 初版作成（HubWallet v0.1.0 リリースに合わせて公開）</li>
      </ul>
    </PrivacyLayout>
  );
}
