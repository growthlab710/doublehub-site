/**
 * DoubleHub 本体 Supabase の手書き型定義（v1 で Web から使う範囲）。
 *
 * 完全生成型は `supabase gen types typescript --project-id <ref> > types-doublehub.generated.ts`
 * を HANDOVER 時のセットアップで実行する想定。v1 ではこのファイルで最低限をカバーする。
 *
 * 参照: docs/web-renewal/04-data-layer.md §4.2
 */

export type SubscriptionTier = 'free' | 'light' | 'standard' | 'premium';

export interface DoubleHubProfile {
  id: string;
  display_name: string | null;
  timezone: string;
  subscription_tier: SubscriptionTier;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  note: string | null;
  due_date: string | null;
  is_done: boolean;
  completed_at: string | null;
  deleted_at: string | null; // 論理削除
  order_index: number | null;
  created_at: string;
  updated_at: string;
}

export interface Memo {
  id: string;
  user_id: string;
  title: string | null;
  body: string;
  tags: string[] | null;
  deleted_at: string | null; // 論理削除
  created_at: string;
  updated_at: string;
}

/** 他プロジェクト連携レコード */
export type ExternalSourceType = 'bookcompass' | 'trainnote';
export type LinkStatus = 'active' | 'revoked' | 'pending';

export interface ExternalSourceAccount {
  id: string;
  user_id: string;
  source_type: ExternalSourceType;
  external_user_key: string;
  link_status: LinkStatus;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

/**
 * Supabase Database 型スタブ。
 * 型生成していない環境でも `SupabaseClient<Database>` の型推論がある程度利く最低限。
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: DoubleHubProfile;
        Insert: Partial<DoubleHubProfile> & { id: string };
        Update: Partial<DoubleHubProfile>;
        Relationships: [];
      };
      todos: {
        Row: Todo;
        Insert: Omit<Todo, 'id' | 'created_at' | 'updated_at'> &
          Partial<Pick<Todo, 'id' | 'created_at' | 'updated_at'>>;
        Update: Partial<Todo>;
        Relationships: [];
      };
      memos: {
        Row: Memo;
        Insert: Omit<Memo, 'id' | 'created_at' | 'updated_at'> &
          Partial<Pick<Memo, 'id' | 'created_at' | 'updated_at'>>;
        Update: Partial<Memo>;
        Relationships: [];
      };
      external_source_accounts: {
        Row: ExternalSourceAccount;
        Insert: Omit<ExternalSourceAccount, 'id' | 'created_at' | 'updated_at'> &
          Partial<Pick<ExternalSourceAccount, 'id' | 'created_at' | 'updated_at'>>;
        Update: Partial<ExternalSourceAccount>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      soft_delete_todo: {
        Args: { todo_id: string };
        Returns: void;
      };
      soft_delete_memo: {
        Args: { memo_id: string };
        Returns: void;
      };
      request_account_deletion: {
        Args: Record<string, never>;
        Returns: void;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
