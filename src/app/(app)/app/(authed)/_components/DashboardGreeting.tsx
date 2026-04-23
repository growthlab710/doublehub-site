'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { supabaseConfig } from '@/lib/env';
import { getBrowserDoubleHub } from '@/lib/supabase/client';

/**
 * ダッシュボード最上部に出すパーソナル挨拶ヘッダー。
 *
 * 表示名は
 *   1. `profiles.display_name` があればそれ
 *   2. user_metadata.display_name / full_name / name
 *   3. email のローカル部
 * の優先順で解決する。どれも取れない場合は「こんにちは」だけを出す。
 */
export function DashboardGreeting() {
  const [name, setName] = useState<string | null>(null);
  const [today, setToday] = useState<string>(() => formatTodayJST(new Date()));
  const [greeting, setGreeting] = useState<string>(() => getJapaneseGreeting());
  const [resolvingName, setResolvingName] = useState(true);

  const envOk = supabaseConfig.doublehub.ok;

  useEffect(() => {
    // 端末のタイムゾーンが JST でない場合も考慮し、マウント時点で再計算。
    // また SSR 時はサーバー側 TZ で初期値が計算されてしまうため、ここで上書きする。
    setToday(formatTodayJST(new Date()));
    setGreeting(getJapaneseGreeting());
  }, []);

  useEffect(() => {
    if (!envOk) {
      setResolvingName(false);
      return;
    }
    let mounted = true;
    void (async () => {
      try {
        const supabase = getBrowserDoubleHub();
        const { data } = await supabase.auth.getUser();
        const user = data.user;
        if (!user || !mounted) return;

        // まず profiles.display_name を見に行く。無ければ metadata / email で解決。
        const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
        let resolved: string | null =
          (metadata.display_name as string | undefined) ??
          (metadata.full_name as string | undefined) ??
          (metadata.name as string | undefined) ??
          null;

        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('id', user.id)
            .maybeSingle();
          const displayName =
            (profile as { display_name?: string | null } | null)?.display_name;
          if (displayName) resolved = displayName;
        } catch {
          // profiles が未作成などは黙って metadata フォールバックに任せる。
        }

        if (!resolved && user.email) {
          resolved = user.email.split('@')[0] ?? null;
        }
        if (mounted) setName(resolved);
      } catch {
        // 未ログインなどは親の AuthGate 側で救済されるはずなので無視。
      } finally {
        if (mounted) setResolvingName(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [envOk]);

  return (
    <header className="animate-fade-in">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-faint">
        {today}
      </p>
      <h1 className="mt-2 flex flex-wrap items-center gap-x-1 font-display text-2xl font-semibold md:text-3xl">
        <span>{greeting}</span>
        {name ? (
          <>
            <span>、</span>
            <span className="text-primary">{name}</span>
            <span>さん</span>
          </>
        ) : resolvingName ? (
          <>
            <span>、</span>
            <Skeleton className="inline-block h-6 w-24 align-middle md:h-7" />
            <span>さん</span>
          </>
        ) : null}
      </h1>
      <p className="mt-2 max-w-xl text-sm text-text-muted">
        DoubleHub / BookCompass / TrainNote をまとめて確認する、あなた専用のハブです。
      </p>
    </header>
  );
}

function formatTodayJST(date: Date): string {
  // ユーザーの端末 TZ に依存せず JST 表記で「2026年4月23日（木）」のように整形。
  const fmt = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
  return fmt.format(date);
}

function getJapaneseGreeting(): string {
  // JST の時刻帯で挨拶を切り替える。端末 TZ が違っても日本向け挨拶を維持。
  // Intl.DateTimeFormat の hour12:false は深夜 0 時台を "24" として返す環境があるため、
  // 文字列の数値パースで丸める。
  const hourStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    hour: 'numeric',
    hour12: false,
  }).format(new Date());
  const parsed = Number.parseInt(hourStr, 10);
  const jstHour = Number.isFinite(parsed) ? parsed % 24 : 12;

  if (jstHour >= 5 && jstHour < 11) return 'おはようございます';
  if (jstHour >= 11 && jstHour < 18) return 'こんにちは';
  return 'こんばんは';
}
