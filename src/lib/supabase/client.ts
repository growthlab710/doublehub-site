/**
 * ブラウザ側 Supabase クライアントファクトリ。
 *
 * DoubleHub / BookCompass / TrainNote の 3 プロジェクトをそれぞれ独立した
 * インスタンスとして生成する。storageKey を必ず分離して、認証セッションの
 * 取り違えが起きないようにする。
 *
 * - DoubleHub   : `sb-doublehub-auth`
 * - BookCompass : `sb-bookcompass-auth`
 * - TrainNote   : 認証を持たないので `persistSession: false`
 *
 * 参照: docs/web-renewal/03-auth.md
 */
'use client';

import { createBrowserClient } from '@supabase/ssr';
import { supabaseConfig } from '@/lib/env';
import type { Database as DoubleHubDatabase } from './types-doublehub';
import type { Database as BookCompassDatabase } from './types-bookcompass';
import type { Database as TrainNoteDatabase } from './types-trainnote';

let _doublehub: ReturnType<typeof createBrowserClient<DoubleHubDatabase>> | null = null;
let _bookcompass: ReturnType<typeof createBrowserClient<BookCompassDatabase>> | null = null;
let _trainnote: ReturnType<typeof createBrowserClient<TrainNoteDatabase>> | null = null;

/** DoubleHub 本体（認証の主体） */
export function getBrowserDoubleHub() {
  if (_doublehub) return _doublehub;
  const { url, anon, ok } = supabaseConfig.doublehub;
  if (!ok) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_DOUBLEHUB_URL / NEXT_PUBLIC_SUPABASE_DOUBLEHUB_ANON_KEY が設定されていません。'
    );
  }
  _doublehub = createBrowserClient<DoubleHubDatabase>(url, anon, {
    cookieOptions: {
      name: 'sb-doublehub-auth',
      sameSite: 'lax',
      secure: true,
    },
    auth: {
      storageKey: 'sb-doublehub-auth',
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return _doublehub;
}

/** BookCompass（独自 auth） */
export function getBrowserBookCompass() {
  if (_bookcompass) return _bookcompass;
  const { url, anon, ok } = supabaseConfig.bookcompass;
  if (!ok) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_URL / NEXT_PUBLIC_SUPABASE_BOOKCOMPASS_ANON_KEY が設定されていません。'
    );
  }
  _bookcompass = createBrowserClient<BookCompassDatabase>(url, anon, {
    cookieOptions: {
      name: 'sb-bookcompass-auth',
      sameSite: 'lax',
      secure: true,
    },
    auth: {
      storageKey: 'sb-bookcompass-auth',
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false, // OAuth リダイレクトは DoubleHub 側が受ける
    },
  });
  return _bookcompass;
}

/**
 * TrainNote（auth なし / v1 では Web 表示のみ）
 * - `persistSession: false` を必須とする。
 */
export function getBrowserTrainNote() {
  if (_trainnote) return _trainnote;
  const { url, anon, ok } = supabaseConfig.trainnote;
  if (!ok) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_TRAINNOTE_URL / NEXT_PUBLIC_SUPABASE_TRAINNOTE_ANON_KEY が設定されていません。'
    );
  }
  _trainnote = createBrowserClient<TrainNoteDatabase>(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return _trainnote;
}
