import { CatalogExplorer } from "@/components/catalog/catalog-explorer";
import { GoalsSection } from "@/components/goals/goals-section";
import { HeroSection } from "@/components/hero/hero-section";
import { PromotionsSection } from "@/components/promos/promotions-section";
import { products } from "@/data/catalog";
import { Suspense } from "react";

const homeProducts = [
  ...products.filter((product) => product.campaigns.length > 0),
  ...products.filter((product) => product.campaigns.length === 0),
].slice(0, 14);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section id="catalogo" className="scroll-mt-24 bg-[#f6f6f6]">
        <Suspense fallback={<p className="px-8 py-20 text-sm text-neutral-500">Cargando el catálogo…</p>}>
          <CatalogExplorer products={homeProducts} viewAllHref="/catalogo" />
        </Suspense>
      </section>
      <GoalsSection />
      <PromotionsSection />
    </>
  );
}
