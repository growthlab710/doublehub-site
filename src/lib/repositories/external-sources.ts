/**
 * プロバイダ非依存の連携アカウントリポジトリ（DoubleHub 本体）。
 *
 * 要件（04-data-layer.md §4.5）:
 *  - Apple sub / Email での自動マッピングは不可とする
 *  - ユーザーが明示的に連携アクションを行って `external_source_accounts` に
 *    行を追加する
 *  - `source_type` で 'bookcompass' / 'trainnote' を区別
 *  - `link_status`: 'active' / 'revoked' / 'pending'
 */
'use client';

import { getBrowserDoubleHub } from '@/lib/supabase/client';
import type {
  ExternalSourceAccount,
  ExternalSourceType,
  LinkStatus,
} from '@/lib/supabase/types-doublehub';

export async function listExternalSources(): Promise<ExternalSourceAccount[]> {
  const supabase = getBrowserDoubleHub();
  const { data, error } = await supabase
    .from('external_source_accounts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as ExternalSourceAccount[];
}

export async function findExternalSource(
  source_type: ExternalSourceType
): Promise<ExternalSourceAccount | null> {
  const supabase = getBrowserDoubleHub();
  const { data, error } = await supabase
    .from('external_source_accounts')
    .select('*')
    .eq('source_type', source_type)
    .eq('link_status', 'active')
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data as ExternalSourceAccount | null) ?? null;
}

export async function upsertExternalSource(input: {
  source_type: ExternalSourceType;
  external_user_key: string;
  link_status: LinkStatus;
  metadata?: Record<string, unknown> | null;
}): Promise<ExternalSourceAccount> {
  const supabase = getBrowserDoubleHub();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('ログインが必要です');

  const payload = {
    user_id: user.user.id,
    source_type: input.source_type,
    external_user_key: input.external_user_key,
    link_status: input.link_status,
    metadata: input.metadata ?? null,
  };

  const { data, error } = await supabase
    .from('external_source_accounts')
    // Supabase v2 の型推論の互換性回避（Upsert が never に解決されるため）。
    .upsert(payload as never, { onConflict: 'user_id,source_type' })
    .select('*')
    .single();
  if (error) throw error;
  return data as ExternalSourceAccount;
}

export async function revokeExternalSource(id: string): Promise<void> {
  const supabase = getBrowserDoubleHub();
  const { error } = await supabase
    .from('external_source_accounts')
    .update({ link_status: 'revoked' as LinkStatus } as never)
    .eq('id', id);
  if (error) throw error;
}
