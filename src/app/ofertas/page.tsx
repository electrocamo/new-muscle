import { CatalogExplorer } from "@/components/catalog/catalog-explorer";
import { products } from "@/data/catalog";
import { discountPercent } from "@/lib/catalog";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Ofertas",
  description: "Ofertas especiales de New Muscle. Descuentos ya aplicados en cada ficha.",
};

export default function OffersPage() {
  const offers = products.filter((product) => discountPercent(product) > 0);

  return (
    <section className="bg-[#f6f6f6]">
      <Suspense fallback={<p className="px-8 py-20 text-sm text-neutral-500">Cargando ofertas…</p>}>
        <CatalogExplorer products={offers} title="Ofertas que valen la pena" viewAllHref="/catalogo" />
      </Suspense>
    </section>
  );
}
