/**
 * 連載シリーズの表示メタデータ。
 * キーは extractSeriesName() で抽出した正規化済みシリーズ名。
 * 未定義のシリーズは第1回記事の description にフォールバックする（SeriesSection 側）。
 */
export interface SeriesMeta {
  /** ひと目で内容が伝わる1行キャッチ */
  tagline: string;
  /** 補足説明（1〜2文） */
  description: string;
}

export const SERIES_META: Record<string, SeriesMeta> = {
  AI時代の分かれ道: {
    tagline: 'AIに「使われる側」か、自分のAIを「育てる側」か',
    description: '情報過多の時代に自分を守り、自分を理解するAIを育てる側へ回るための思想シリーズ。',
  },
  '責めない・観察するテクノロジー': {
    tagline: 'あなたを変えようとする技術と、理解しようとする技術',
    description: '責めずに観察するプロダクト設計の思想を、お金や記録との付き合い方から書く続編。',
  },
  AIと健やかに働くための実践ガイド: {
    tagline: 'AI疲れから、自分の脳を守る',
    description: 'AIと働く時代の新しい疲労の正体と、脳を守るセルフマネジメントの実践ガイド。',
  },
  AIオフロード時代の人間の脳: {
    tagline: '考える仕事をAIに渡したあと、人間には何が残るか',
    description: 'AIに仕事を任せると脳の使い方はどう変わるか。認知科学の研究から考察するシリーズ。',
  },
};
