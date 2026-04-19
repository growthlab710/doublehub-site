import { renderMarkdownToHtml } from '@/lib/content/markdown';

/**
 * MDX/Markdown 本文レンダラー。サーバ側で HTML 文字列に変換してから prose で描画する。
 *
 * - GFM（テーブル、打消し線、タスクリスト等）対応
 * - 見出しに自動で slug と anchor 付与
 * - サイトのデザイントークンに紐付いた .prose スタイルを適用
 */
export async function MDXRenderer({ source }: { source: string }) {
  const html = await renderMarkdownToHtml(source);
  return (
    <div
      className="prose prose-neutral max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
