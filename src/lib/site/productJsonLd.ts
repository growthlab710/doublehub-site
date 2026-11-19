import { products, siteConfig } from '@/lib/site/config';

/**
 * 製品ページの構造化データ（JSON-LD）を作る。
 *
 * 検索エンジンと AI が「何のアプリか・いくらか・どこで入れるか」を読み取るためのもの。
 * 画面に出している事実だけを入れる（評価の星・レビュー数など、ページに無いものは入れない）。
 * 特徴の一覧とアイコンは `config.ts` の `products` から取り、ページごとに書き写さない。
 *
 * DoubleHub の製品ページは、先に作った独自の JSON-LD をページの中に持っている。
 */
type ProductSlug = (typeof products)[number]['slug'];

type Offer = { name: string; price: string };

type Faq = { q: string; a: string };

export function buildProductJsonLd({
  slug,
  applicationCategory,
  operatingSystem,
  description,
  offers,
  downloadUrl,
  faqs,
}: {
  slug: ProductSlug;
  /** schema.org の applicationCategory（例: FinanceApplication） */
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  /** 価格は税込の円。数字だけの文字列（例: '480'） */
  offers: Offer[];
  downloadUrl: string;
  /** ページに「よくある質問」を出しているときだけ渡す */
  faqs?: Faq[];
}) {
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new Error(`unknown product slug: ${slug}`);
  const base = siteConfig.url.replace(/\/$/, '');
  const pageUrl = `${base}${product.href}`;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'SoftwareApplication',
      name: product.name,
      applicationCategory,
      operatingSystem,
      description,
      url: pageUrl,
      image: `${base}${product.appIcon}`,
      author: {
        '@type': 'Organization',
        name: siteConfig.author.name,
        url: siteConfig.author.url,
      },
      offers: offers.map((o) => ({
        '@type': 'Offer',
        name: o.name,
        price: o.price,
        priceCurrency: 'JPY',
      })),
      downloadUrl,
      featureList: [...product.features],
    },
  ];

  if (faqs && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${base}/#products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: pageUrl },
    ],
  });

  return { '@context': 'https://schema.org', '@graph': graph };
}
