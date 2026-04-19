'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { getBrowserDoubleHub } from '@/lib/supabase/client';

/**
 * Apple / Google OAuth + Email マジックリンクのログインフォーム。
 *
 * - OAuth は `signInWithOAuth` で Supabase が提供するコールバックに飛ばす。
 *   redirectTo には `${origin}/app/` を指定。
 * - Email はマジックリンク（パスワード不要）。OTP 機能は Day 4 以降で追加検討。
 *
 * エラーメッセージは日本語。サービスキーは一切扱わない。
 */
export function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<null | 'apple' | 'google' | 'email'>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const redirectTo =
    typeof window !== 'undefined'
      ? `${window.location.origin}/app/`
      : '/app/';

  async function handleOAuth(provider: 'apple' | 'google') {
    setError(null);
    setMessage(null);
    setLoading(provider);
    try {
      const supabase = getBrowserDoubleHub();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      });
      if (error) throw error;
      // 成功時はプロバイダの画面にリダイレクトされる
    } catch (e) {
      const err = e instanceof Error ? e.message : 'ログインに失敗しました';
      setError(err);
      setLoading(null);
    }
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!email.trim()) {
      setError('メールアドレスを入力してください。');
      return;
    }
    setLoading('email');
    try {
      const supabase = getBrowserDoubleHub();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      setMessage(
        'メールアドレスにログイン用リンクを送信しました。メールをご確認ください。'
      );
    } catch (e) {
      const err = e instanceof Error ? e.message : '送信に失敗しました';
      setError(err);
    } finally {
      setLoading(null);
    }
  }

  // 既ログインなら /app/ へ
  // （Supabase の onAuthStateChange は親 RequireAuth / dynamic ガードが担当するため
  //  ここでは副作用的な redirect はしない。Supabase がコールバックで戻ってきた場合の
  //  UX を整えるには `?next=` 等で誘導する。）
  const nextParam = sp?.get('next');
  void nextParam;
  void router;

  return (
    <div className="space-y-5">
      {/* OAuth */}
      <div className="space-y-2">
        <Button
          type="button"
          variant="secondary"
          className="w-full justify-center"
          onClick={() => handleOAuth('apple')}
          disabled={loading !== null}
        >
          {loading === 'apple' ? 'Apple で続行中…' : ' Apple で続行'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full justify-center"
          onClick={() => handleOAuth('google')}
          disabled={loading !== null}
        >
          {loading === 'google' ? 'Google で続行中…' : 'Google で続行'}
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-surface px-3 text-xs text-text-faint">または</span>
        </div>
      </div>

      {/* Email マジックリンク */}
      <form onSubmit={handleEmail} className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="login-email">メールアドレス</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading !== null}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full justify-center"
          disabled={loading !== null}
        >
          {loading === 'email' ? '送信中…' : 'メールでログインリンクを受け取る'}
        </Button>
      </form>

      {/* 通知 */}
      {message && (
        <div
          role="status"
          className="rounded-lg border border-primary/30 bg-primary-soft px-4 py-3 text-sm text-primary"
        >
          {message}
        </div>
      )}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-400/40 bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300"
        >
          {error}
        </div>
      )}
    </div>
  );
}
