'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { supabaseConfig } from '@/lib/env';
import {
  getBrowserBookCompass,
  getBrowserDoubleHub,
} from '@/lib/supabase/client';
import {
  findExternalSource,
  upsertExternalSource,
  revokeExternalSource,
} from '@/lib/repositories/external-sources';
import type { ExternalSourceAccount } from '@/lib/supabase/types-doublehub';

/**
 * BookCompass 連携カード。
 *
 * DoubleHub とは別の BookCompass アカウントにログインしてもらい、
 * 取得した BookCompass user.id を `external_source_accounts` に
 * `source_type = 'bookcompass'` で保存する。以降は DoubleHub からこの
 * キーを見ながら BookCompass 側のデータを読みに行く。
 *
 * プロバイダ非依存: Apple sub / Email での自動マッピングはしない。
 * あくまでユーザーが明示的に BookCompass にログインする。
 */
export function BookCompassLinkCard({
  onLinked,
}: {
  onLinked: (link: ExternalSourceAccount | null) => void;
}) {
  const [link, setLink] = useState<ExternalSourceAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const doubleHubOk = supabaseConfig.doublehub.ok;
  const bookCompassOk = supabaseConfig.bookcompass.ok;

  // 既存連携を取得
  useEffect(() => {
    if (!doubleHubOk) {
      setLoading(false);
      return;
    }
    void (async () => {
      try {
        const existing = await findExternalSource('bookcompass');
        setLink(existing);
        onLinked(existing);
      } catch (e) {
        setError(e instanceof Error ? e.message : '読込に失敗しました');
      } finally {
        setLoading(false);
      }
    })();
  }, [doubleHubOk, onLinked]);

  // BookCompass のセッションが更新されたら external_source_accounts を同期
  useEffect(() => {
    if (!bookCompassOk || !doubleHubOk) return;
    const supabase = getBrowserBookCompass();

    const sync = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          const record = await upsertExternalSource({
            source_type: 'bookcompass',
            external_user_key: data.user.id,
            link_status: 'active',
            metadata: {
              email: data.user.email,
              linked_at: new Date().toISOString(),
            },
          });
          setLink(record);
          onLinked(record);
        }
      } catch {
        // 無視: 連携が無いだけ
      }
    };
    void sync();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        void sync();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [bookCompassOk, doubleHubOk, onLinked]);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookCompassOk) {
      setError('BookCompass の環境変数が未設定です');
      return;
    }
    if (!email.trim()) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const supabase = getBrowserBookCompass();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo:
            typeof window !== 'undefined'
              ? `${window.location.origin}/app/bookcompass/`
              : undefined,
        },
      });
      if (error) throw error;
      setMessage(
        'BookCompass にログインするためのリンクをメールで送信しました。メールをご確認ください。'
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : '送信に失敗しました');
    } finally {
      setBusy(false);
    }
  };

  const handleUnlink = async () => {
    if (!link) return;
    if (!window.confirm('BookCompass 連携を解除しますか?')) return;
    setBusy(true);
    setError(null);
    try {
      // DoubleHub 側の連携レコードを revoked に
      await revokeExternalSource(link.id);
      // BookCompass からもログアウト
      const supabase = getBrowserBookCompass();
      await supabase.auth.signOut();
      setLink(null);
      onLinked(null);
      setMessage('BookCompass 連携を解除しました。');
    } catch (e) {
      setError(e instanceof Error ? e.message : '解除に失敗しました');
    } finally {
      setBusy(false);
    }
  };

  if (!doubleHubOk || !bookCompassOk) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface p-6 text-sm text-text-muted">
        <h2 className="font-display text-base font-semibold text-text">
          BookCompass 連携
        </h2>
        <p className="mt-2">
          BookCompass の Supabase 環境変数が未設定のため、連携は現在無効化
          されています。本番環境が整い次第、こちらから BookCompass に
          ログインして連携できるようになります。
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6 text-sm text-text-muted">
        読み込み中…
      </div>
    );
  }

  if (link && link.link_status === 'active') {
    return (
      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center gap-2">
          <Badge variant="success">連携済み</Badge>
          <h2 className="font-display text-base font-semibold">
            BookCompass
          </h2>
        </div>
        <p className="mt-2 text-sm text-text-muted">
          BookCompass アカウントが DoubleHub にひも付いています。本棚と
          つぶやきが下に表示されます。
        </p>
        <div className="mt-4">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleUnlink}
            disabled={busy}
          >
            連携を解除
          </Button>
        </div>
        {message && (
          <p className="mt-3 text-xs text-primary">{message}</p>
        )}
        {error && (
          <p className="mt-3 text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h2 className="font-display text-base font-semibold">
        BookCompass と連携する
      </h2>
      <p className="mt-2 text-sm text-text-muted">
        BookCompass は DoubleHub とは別のアカウントです。連携するには、
        BookCompass で使っているメールアドレスにログインリンクを送ります。
      </p>
      <form onSubmit={handleSendMagicLink} className="mt-4 space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="bc-email">メールアドレス（BookCompass 用）</Label>
          <Input
            id="bc-email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy}
            required
          />
        </div>
        <Button type="submit" size="sm" disabled={busy || !email.trim()}>
          ログインリンクを送信
        </Button>
      </form>
      {message && (
        <div
          role="status"
          className="mt-3 rounded-lg border border-primary/30 bg-primary-soft px-3 py-2 text-xs text-primary"
        >
          {message}
        </div>
      )}
      {error && (
        <div
          role="alert"
          className="mt-3 rounded-lg border border-red-400/40 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300"
        >
          {error}
        </div>
      )}
    </div>
  );
}

// ESLint の "no-unused-vars" を黙らせる用（sub client 利用側の型補助）
void getBrowserDoubleHub;
