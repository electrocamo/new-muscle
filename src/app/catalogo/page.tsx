import { CatalogExplorer } from "@/components/catalog/catalog-explorer";
import { products } from "@/data/catalog";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Filtra proteínas, aminoácidos, pre-entrenos y recuperación de New Muscle.",
};

export default function CatalogPage() {
  return (
    <section className="bg-[#f6f6f6]">
      <Suspense fallback={<p className="px-8 py-20 text-sm text-neutral-500">Cargando el catálogo…</p>}>
        <CatalogExplorer products={products} title="Catálogo" viewAllHref="/ofertas" />
      </Suspense>
    </section>
  );
}
