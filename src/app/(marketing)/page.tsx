import { Hero } from '@/components/marketing/Hero';
import { EcosystemSection } from '@/components/marketing/EcosystemSection';
import { ProductCards } from '@/components/marketing/ProductCards';
import { BlogTeaser } from '@/components/marketing/BlogTeaser';
import { CtaSection } from '@/components/marketing/CtaSection';

/**
 * トップページ（ハブエントリー）
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <EcosystemSection />
      <ProductCards />
      <BlogTeaser />
      <CtaSection />
    </>
  );
}
