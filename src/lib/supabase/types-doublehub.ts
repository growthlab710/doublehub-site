/**
 * DoubleHub 本体 Supabase の手書き型定義（v1 で Web から使う範囲）。
 *
 * 完全生成型は `supabase gen types typescript --project-id <ref> > types-doublehub.generated.ts`
 * を HANDOVER 時のセットアップで実行する想定。v1 ではこのファイルで最低限をカバーする。
 *
 * 参照: docs/web-renewal/04-data-layer.md §4.2
 */

export type SubscriptionTier = 'free' | 'light' | 'standard' | 'premium';

/**
 * DoubleHub 内で ToDo / メモを分類する「タブ」。
 *
 * DB (`category` カラム) には iOS 側と同じ 英語小文字のキー `'private'` / `'work'` を
 * 保存する。UI に表示する場合は `CATEGORY_LABEL` で日本語ラベルに変換する。
 */
export type TodoCategory = 'private' | 'work';
export type MemoCategory = 'private' | 'work';

export const TODO_CATEGORIES: TodoCategory[] = ['private', 'work'];
export const MEMO_CATEGORIES: MemoCategory[] = ['private', 'work'];

/** デフォルトで開くタブ（iOS のデフォルトに合わせる）。 */
export const DEFAULT_CATEGORY: TodoCategory = 'private';

/** UI に出す日本語ラベル。 */
export const CATEGORY_LABEL: Record<TodoCategory, string> = {
  private: 'プライベート',
  work: '仕事',
};

export interface DoubleHubProfile {
  id: string;
  display_name: string | null;
  timezone: string;
  subscription_tier: SubscriptionTier;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  is_completed: boolean;
  completed_at: string | null;
  due_date: string | null;
  due_local_date: string | null;
  is_all_day: boolean;
  category: TodoCategory | string;
  source: string;
  eventkit_identifier: string | null;
  position: number | null;
  parent_id: string | null;
  deleted_at: string | null; // 論理削除
  created_at: string;
  updated_at: string;
  reflect_to_calendar: boolean;
  calendar_event_id: string | null;
}

export interface Memo {
  id: string;
  user_id: string;
  content: string;
  category: MemoCategory | string;
  position: number | null;
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
  external_project_key: string | null;
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
      soft_delete_own_todo: {
        Args: { target_todo_id: string };
        Returns: void;
      };
      soft_delete_own_memo: {
        Args: { target_memo_id: string };
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
