import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

/** <img> に loading="lazy"/decoding="async" を付与する簡易プラグイン */
function rehypeLazyImages() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return;
      node.properties = node.properties || {};
      if (!('loading' in node.properties)) node.properties.loading = 'lazy';
      if (!('decoding' in node.properties)) node.properties.decoding = 'async';
    });
  };
}

/**
 * Markdown/MDX 本文を HTML 文字列に変換する（サーバ側のみで実行）。
 * MDX の JSX コンポーネントは利用しない前提（content/blog/*.mdx は純 Markdown）。
 */
export async function renderMarkdownToHtml(source: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['heading-anchor'] },
    })
    .use(rehypeLazyImages)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(source);
  return String(file);
}
