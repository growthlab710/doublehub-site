'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

/**
 * サポートフォーム（クライアント側）
 *
 * - 選択肢と本文をまとめて整形し `mailto:` を組み立てて送信
 * - 本番運用ではユーザーのメールクライアントが立ち上がり、本文が自動入力される
 * - ハニーポットによるボット対策あり
 * - メールアドレスは JS 組立て（収集対策の踏襲）
 */
const SERVICES = ['DoubleHub', 'TrainNote', 'Book Compass', 'HubWallet', 'その他 / 全般'];
const CATEGORIES = [
  '不具合の報告',
  '機能のご要望',
  '使い方のご質問',
  'サブスクリプション・お支払い',
  'アカウント・データについて',
  'その他',
];

export function SupportForm() {
  // デフォルトで「DoubleHub」が選ばれていると、TrainNote / BookCompass /
  // HubWallet のユーザーがアプリからこのページに遷移したときに
  // そのまま送信してしまう誤送信ケースが起きるため、
  // 未選択 (=空文字列) を初期値にして送信時に必須チェックする。
  const [service, setService] = useState('');
  const [serviceError, setServiceError] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [device, setDevice] = useState('');
  const [osVersion, setOsVersion] = useState('');
  const [appVersion, setAppVersion] = useState('');
  const [detail, setDetail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ハニーポット: 人間には見えない欄に値が入っていれば bot と判断して中断
    if (website.trim() !== '') return;

    // 対象サービス未選択をブロックし、赤枚エラーを出してフォーカスさせる。
    if (service === '') {
      setServiceError(true);
      const el = document.getElementById('support-service');
      el?.focus();
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    if (detail.trim() === '') {
      alert('お問い合わせ内容をご入力ください。');
      return;
    }

    // ボットによる収集を避けるためメールアドレスを実行時に組み立てる
    const mailAddress = 'growthlab116710' + '@' + 'gmail.com';

    const subject = `[${service}] ${category}`;
    const body = [
      '※ この行より下にお問い合わせ内容をご記入ください。',
      '',
      '【お問い合わせ内容】',
      detail,
      '',
      '--- ご利用環境 ---',
      `対象サービス: ${service}`,
      `お問い合わせ種別: ${category}`,
      `ご利用端末: ${device || '（未記入）'}`,
      `iOS バージョン: ${osVersion || '（未記入）'}`,
      `アプリのバージョン: ${appVersion || '（未記入）'}`,
      '',
    ].join('\n');

    const mailto =
      'mailto:' +
      mailAddress +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body);

    window.location.href = mailto;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-surface p-6 sm:p-8"
      noValidate
    >
      {/* 対象サービス */}
      <div className="mb-6">
        <Label htmlFor="support-service">
          お問い合わせ対象{' '}
          <span className="font-semibold text-accent-warm">*</span>
        </Label>
        <p className="mt-1 text-xs text-text-muted">
          ご利用中のアプリを必ず選択してください。
        </p>
        <select
          id="support-service"
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            if (e.target.value !== '') setServiceError(false);
          }}
          required
          aria-invalid={serviceError || undefined}
          aria-describedby={serviceError ? 'support-service-error' : undefined}
          className={
            'mt-2 flex h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 ' +
            (serviceError
              ? 'border-accent-warm text-text focus:border-accent-warm focus:ring-accent-warm/40'
              : 'border-border text-text focus:border-primary focus:ring-primary/40') +
            (service === '' ? ' text-text-muted' : '')
          }
        >
          <option value="" disabled>
            -- 選択してください --
          </option>
          {SERVICES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        {serviceError ? (
          <p
            id="support-service-error"
            role="alert"
            className="mt-2 text-sm font-medium text-accent-warm"
          >
            お問い合わせ対象を選択してください。
          </p>
        ) : null}
      </div>

      {/* 種別 */}
      <div className="mb-6">
        <Label htmlFor="support-category">お問い合わせ種別</Label>
        <select
          id="support-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-2 flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {CATEGORIES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {/* 端末 */}
      <div className="mb-6">
        <Label htmlFor="support-device">ご利用の端末（任意）</Label>
        <p className="mt-1 text-xs text-text-muted">例: iPhone 16, iPad Air</p>
        <Input
          id="support-device"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          placeholder="（例）iPhone 16"
          className="mt-2"
        />
      </div>

      {/* iOS バージョン */}
      <div className="mb-6">
        <Label htmlFor="support-os">iOS バージョン（任意）</Label>
        <p className="mt-1 text-xs text-text-muted">
          「設定 › 一般 › 情報」で確認できます
        </p>
        <Input
          id="support-os"
          value={osVersion}
          onChange={(e) => setOsVersion(e.target.value)}
          placeholder="（例）iOS 19.2"
          className="mt-2"
        />
      </div>

      {/* アプリバージョン */}
      <div className="mb-6">
        <Label htmlFor="support-app-version">アプリのバージョン（任意）</Label>
        <p className="mt-1 text-xs text-text-muted">
          アプリの設定画面で確認できます
        </p>
        <Input
          id="support-app-version"
          value={appVersion}
          onChange={(e) => setAppVersion(e.target.value)}
          placeholder="（例）1.0.0"
          className="mt-2"
        />
      </div>

      {/* 内容 */}
      <div className="mb-6">
        <Label htmlFor="support-detail">お問い合わせ内容</Label>
        <Textarea
          id="support-detail"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="発生した状況や、ご質問の内容をできるだけ具体的にお書きください。"
          required
          className="mt-2 min-h-[160px]"
        />
      </div>

      {/* ハニーポット（人間には非表示） */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: -9999, top: -9999 }}
      >
        <label htmlFor="support-website">Website</label>
        <input
          id="support-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <Button type="submit" size="lg" className="w-full">
          メールアプリで送信する
        </Button>
        <p className="text-center text-xs text-text-muted">
          送信ボタンを押すと、ご利用のメールアプリが起動し、入力内容が本文に自動で反映されます。
          通常、2 営業日以内にご返信いたします。
        </p>
      </div>
    </form>
  );
}
