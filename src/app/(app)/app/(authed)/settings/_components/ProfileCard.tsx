'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { supabaseConfig } from '@/lib/env';
import { getBrowserDoubleHub } from '@/lib/supabase/client';
import type { DoubleHubProfile } from '@/lib/supabase/types-doublehub';

export function ProfileCard() {
  const [profile, setProfile] = useState<DoubleHubProfile | null>(null);
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
        email: user.email ?? null,
      };
      const { data, error } = await supabase
        .from('profiles')
        // Supabase v2 の型推論の互換性回避（Upsert が never に解決されるため）。
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

  return (
    <section
      aria-labelledby="profile-heading"
      className="rounded-xl border border-border bg-surface p-6"
    >
      <h2
        id="profile-heading"
        className="font-display text-base font-semibold"
      >
        プロフィール
      </h2>
      {loading ? (
        <p className="mt-3 text-sm text-text-muted">読み込み中…</p>
      ) : (
        <form onSubmit={handleSave} className="mt-4 space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="dn">表示名</Label>
            <Input
              id="dn"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={busy}
              placeholder="例: Naoki"
            />
          </div>
          <div className="text-xs text-text-faint">
            メールアドレス: {profile?.email ?? '—'} / プラン:{' '}
            {profile?.subscription_tier ?? 'free'}
          </div>
          <div>
            <Button type="submit" size="sm" disabled={busy}>
              保存
            </Button>
          </div>
        </form>
      )}
      {message && (
        <p className="mt-3 text-xs text-primary">{message}</p>
      )}
      {error && (
        <p className="mt-3 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </section>
  );
}
