'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';
import { supabaseConfig } from '@/lib/env';
import { getBrowserDoubleHub } from '@/lib/supabase/client';
import type {
  DoubleHubProfile,
  SubscriptionTier,
} from '@/lib/supabase/types-doublehub';

/** プラン名とバッジ配色。tier ごとに見た目を変えて視認性を上げる。 */
const TIER_STYLE: Record<
  SubscriptionTier,
  { label: string; className: string }
> = {
  free: {
    label: 'Free',
    className:
      'bg-surface-2 text-text-muted border-border',
  },
  light: {
    label: 'Light',
    className:
      'border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  },
  standard: {
    label: 'Standard',
    className:
      'border-primary/40 bg-primary-soft text-primary',
  },
  premium: {
    label: 'Premium',
    className:
      'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  },
};

export function ProfileCard() {
  const [profile, setProfile] = useState<DoubleHubProfile | null>(null);
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const envOk = supabaseConfig.doublehub.ok;

  const refresh = useCallback(async () => {
    if (!envOk) {
      setLoading(false);
      return;
    }
    setError(null);
    try {
      const supabase = getBrowserDoubleHub();
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) throw new Error('ログインが必要です');
      setAuthEmail(user.email ?? null);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      if (error) throw error;
      const prof = (data as DoubleHubProfile | null) ?? null;
      setProfile(prof);
      setDisplayName(prof?.display_name ?? '');
    } catch (e) {
      setError(e instanceof Error ? e.message : '取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [envOk]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const supabase = getBrowserDoubleHub();
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) throw new Error('ログインが必要です');

      const payload = {
        id: user.id,
        display_name: displayName.trim() || null,
      };
      const { data, error } = await supabase
        .from('profiles')
        .upsert(payload as never, { onConflict: 'id' })
        .select('*')
        .single();
      if (error) throw error;
      setProfile(data as DoubleHubProfile);
      setMessage('プロフィールを更新しました。');
    } catch (e) {
      setError(e instanceof Error ? e.message : '更新に失敗しました');
    } finally {
      setBusy(false);
    }
  };

  if (!envOk) {
    return (
      <section className="rounded-xl border border-dashed border-border bg-surface p-6 text-sm text-text-muted">
        <h2 className="font-display text-base font-semibold text-text">
          プロフィール
        </h2>
        <p className="mt-2">
          Supabase 環境変数が未設定のため、プロフィール編集は無効です。
        </p>
      </section>
    );
  }

  const tier: SubscriptionTier = profile?.subscription_tier ?? 'free';
  const tierStyle = TIER_STYLE[tier];
  const avatarInitial =
    (displayName || authEmail || '?').trim().charAt(0).toUpperCase() || '?';

  return (
    <section
      aria-labelledby="profile-heading"
      className="overflow-hidden rounded-xl border border-border bg-surface"
    >
      {/* ヘッダー領域。ブランド色のソフトグラデーション帯で設定ページの
          トップカードらしいリッチ感を出す。 */}
      <div
        aria-hidden
        className="h-20 w-full"
        style={{
          background:
            'linear-gradient(135deg, var(--color-primary-soft) 0%, transparent 80%)',
        }}
      />
      <div className="-mt-10 flex items-start gap-4 px-6">
        {/* アバター。profile.avatar_url があればそれを、無ければイニシャル。 */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-sm">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-display text-2xl font-semibold text-primary">
              {avatarInitial}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 pt-10">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              id="profile-heading"
              className="font-display text-lg font-semibold"
            >
              {displayName || 'ユーザー'}
            </h2>
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                tierStyle.className
              )}
              aria-label={`現在のプラン: ${tierStyle.label}`}
            >
              {tierStyle.label}
            </span>
          </div>
          {authEmail && (
            <p className="truncate text-xs text-text-faint">{authEmail}</p>
          )}
        </div>
      </div>

      {/* 編集フォーム */}
      <div className="mt-4 border-t border-border px-6 py-5">
        {loading ? (
          <p className="text-sm text-text-muted">読み込み中…</p>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="dn">表示名</Label>
              <Input
                id="dn"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={busy}
                placeholder="例: Naoki"
              />
              <p className="text-xs text-text-faint">
                DoubleHub 内で表示される名前です。変更はいつでもできます。
              </p>
            </div>
            <div>
              <Button type="submit" size="sm" disabled={busy}>
                {busy ? '保存中…' : '保存'}
              </Button>
            </div>
          </form>
        )}
        {message && (
          <p
            role="status"
            className="mt-3 rounded-md border border-primary/30 bg-primary-soft px-3 py-2 text-xs text-primary"
          >
            {message}
          </p>
        )}
        {error && (
          <p
            role="alert"
            className="mt-3 rounded-md border border-red-400/40 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300"
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
