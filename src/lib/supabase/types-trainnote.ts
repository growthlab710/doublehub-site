/**
 * TrainNote Supabase の手書き型定義（v1 最小限）。
 *
 * v1 では Web から TrainNote を直接操作することは無く、
 * LP / 「Coming Soon」表示にとどめる。AI Coach ログ (ai_coach_request_logs,
 * ai_coach_knowledge_*) は iOS 側でのみ書き込む。
 *
 * 参照: docs/web-renewal/04-data-layer.md §4.4
 *
 * 注意:
 *  - TrainNote プロジェクトは auth を導入していないため、Web からのセッションは不要。
 *  - クライアントは `persistSession: false` を必須とする。
 */

export interface AiCoachRequestLog {
  id: string;
  user_key: string | null;
  request_type: string;
  prompt_tokens: number | null;
  completion_tokens: number | null;
  latency_ms: number | null;
  created_at: string;
}

/**
 * Supabase Database 型スタブ（最小）。
 * 将来 Web 側から読み取りが必要になった段階で拡張する。
 */
export interface Database {
  public: {
    Tables: {
      ai_coach_request_logs: {
        Row: AiCoachRequestLog;
        Insert: Omit<AiCoachRequestLog, 'id' | 'created_at'> &
          Partial<Pick<AiCoachRequestLog, 'id' | 'created_at'>>;
        Update: Partial<AiCoachRequestLog>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
