/**
 * BookCompass Supabase の手書き型定義（v1 で Web から使う範囲）。
 *
 * 参照: docs/web-renewal/04-data-layer.md §4.3
 *
 * 重要:
 *  - 楽天 API は使用禁止。書誌検索は Edge Function `search-books` (NDL/openBD) 経由。
 *  - BookCompass は独自 auth を持つ（DoubleHub とは別 supabase プロジェクト）。
 *  - storageKey は `sb-bookcompass-auth` を必ず分離して使用する。
 */

export type BookStatus = 'want' | 'reading' | 'done' | 'dropped';

export interface BookCompassProfile {
  id: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  timezone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string | null;
  isbn: string | null;
  cover_url: string | null;
  status: BookStatus;
  rating: number | null;
  note: string | null;
  started_at: string | null;
  finished_at: string | null;
  metadata: Record<string, unknown> | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

/** 読書中のつぶやき（章感想・メモ） */
export interface Mutter {
  id: string;
  user_id: string;
  book_id: string;
  body: string;
  page: number | null;
  chapter: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  title: string | null;
  last_message_at: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export type ChatMessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  session_id: string;
  user_id: string;
  role: ChatMessageRole;
  content: string;
  tokens: number | null;
  created_at: string;
}

export interface ChatInsight {
  id: string;
  user_id: string;
  session_id: string | null;
  book_id: string | null;
  summary: string;
  created_at: string;
}

export interface ChatSearchIntent {
  id: string;
  session_id: string;
  user_id: string;
  query: string;
  parsed: Record<string, unknown> | null;
  created_at: string;
}

export interface ChatDailyUsage {
  user_id: string;
  usage_date: string; // YYYY-MM-DD
  request_count: number;
  token_total: number;
  updated_at: string;
}

export interface BookMetadataCache {
  isbn: string;
  payload: Record<string, unknown>;
  source: 'ndl' | 'openbd' | 'manual' | string;
  fetched_at: string;
}

/**
 * Supabase Database 型スタブ。
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: BookCompassProfile;
        Insert: Partial<BookCompassProfile> & { id: string };
        Update: Partial<BookCompassProfile>;
      };
      books: {
        Row: Book;
        Insert: Omit<Book, 'id' | 'created_at' | 'updated_at'> &
          Partial<Pick<Book, 'id' | 'created_at' | 'updated_at'>>;
        Update: Partial<Book>;
      };
      mutters: {
        Row: Mutter;
        Insert: Omit<Mutter, 'id' | 'created_at' | 'updated_at'> &
          Partial<Pick<Mutter, 'id' | 'created_at' | 'updated_at'>>;
        Update: Partial<Mutter>;
      };
      chat_sessions: {
        Row: ChatSession;
        Insert: Omit<ChatSession, 'id' | 'created_at' | 'updated_at'> &
          Partial<Pick<ChatSession, 'id' | 'created_at' | 'updated_at'>>;
        Update: Partial<ChatSession>;
      };
      chat_messages: {
        Row: ChatMessage;
        Insert: Omit<ChatMessage, 'id' | 'created_at'> &
          Partial<Pick<ChatMessage, 'id' | 'created_at'>>;
        Update: Partial<ChatMessage>;
      };
      chat_insights: {
        Row: ChatInsight;
        Insert: Omit<ChatInsight, 'id' | 'created_at'> &
          Partial<Pick<ChatInsight, 'id' | 'created_at'>>;
        Update: Partial<ChatInsight>;
      };
      chat_search_intents: {
        Row: ChatSearchIntent;
        Insert: Omit<ChatSearchIntent, 'id' | 'created_at'> &
          Partial<Pick<ChatSearchIntent, 'id' | 'created_at'>>;
        Update: Partial<ChatSearchIntent>;
      };
      chat_daily_usage: {
        Row: ChatDailyUsage;
        Insert: Partial<ChatDailyUsage> &
          Pick<ChatDailyUsage, 'user_id' | 'usage_date'>;
        Update: Partial<ChatDailyUsage>;
      };
      book_metadata_cache: {
        Row: BookMetadataCache;
        Insert: BookMetadataCache;
        Update: Partial<BookMetadataCache>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
