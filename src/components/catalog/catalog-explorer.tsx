"use client";

import { ProductCard } from "@/components/catalog/product-card";
import { PromoCard } from "@/components/catalog/promo-card";
import { categories } from "@/data/catalog";
import { getGoal, isCategoryId, isGoalId } from "@/lib/catalog";
import type { CategoryId, Product } from "@/types/catalog";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type Availability = "in" | "out";

type CatalogExplorerProps = {
  products: Product[];
  title?: string;
  showPromo?: boolean;
  viewAllHref?: string;
};

export function CatalogExplorer({
  products,
  title = "Ofertas especiales",
  showPromo = true,
  viewAllHref = "/catalogo",
}: CatalogExplorerProps) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const goalParam = params.get("meta");
  const goal = isGoalId(goalParam) ? getGoal(goalParam) : undefined;
  const categoryParam = params.get("categoria");

  const [selected, setSelected] = useState<CategoryId[]>(() =>
    isCategoryId(categoryParam) ? [categoryParam] : [],
  );
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);
    const low = min !== null && max !== null && min > max ? max : min;
    const high = min !== null && max !== null && min > max ? min : max;

    return products.filter((product) => {
      if (goal && !product.goals.includes(goal.id)) return false;
      if (selected.length > 0 && !selected.includes(product.category)) return false;
      if (availability.length === 1) {
        const wantsStock = availability[0] === "in";
        if (product.inStock !== wantsStock) return false;
      }
      if (low !== null && Number.isFinite(low) && product.salePrice < low) return false;
      if (high !== null && Number.isFinite(high) && product.salePrice > high) return false;
      return true;
    });
  }, [availability, goal, maxPrice, minPrice, products, selected]);

  function toggleCategory(id: CategoryId) {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function toggleAvailability(value: Availability) {
    setAvailability((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
  }

  function clearFilters() {
    setSelected([]);
    setAvailability([]);
    setMinPrice("");
    setMaxPrice("");
    if (goalParam || categoryParam) router.replace(pathname, { scroll: false });
  }

  const hasFilters = selected.length > 0 || availability.length > 0 || minPrice !== "" || maxPrice !== "" || Boolean(goal);

  return (
    <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-4 py-14 sm:px-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:py-20">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <button
            type="button"
            className="cursor-pointer border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((open) => !open)}
          >
            {filtersOpen ? "Ocultar filtros" : "Filtros"}
          </button>
          <button type="button" onClick={clearFilters} className="cursor-pointer text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
            Limpiar
          </button>
        </div>
        <aside className={`${filtersOpen ? "block" : "hidden"} border border-neutral-200 bg-white p-5 lg:block`}>
          <div className="mb-5 hidden items-center justify-between lg:flex">
            <h2 className="text-sm font-bold tracking-[0.16em] uppercase">Filtros</h2>
            <button type="button" onClick={clearFilters} className="cursor-pointer text-xs font-semibold text-neutral-500 hover:text-neutral-950">
              Limpiar
            </button>
          </div>

          {goal ? (
            <p className="mb-5 border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm">
              Meta: <span className="font-semibold">{goal.title}</span>
            </p>
          ) : null}

          <fieldset>
            <legend className="text-xs font-bold tracking-[0.14em] text-neutral-500 uppercase">Tipo de producto</legend>
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex cursor-pointer items-center gap-2 text-sm text-neutral-800">
                  <input
                    type="checkbox"
                    checked={selected.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="size-4 accent-[#e10600]"
                  />
                  {category.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-xs font-bold tracking-[0.14em] text-neutral-500 uppercase">Disponibilidad</legend>
            <div className="mt-3 space-y-2">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={availability.includes("in")} onChange={() => toggleAvailability("in")} className="size-4 accent-[#e10600]" />
                En stock
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={availability.includes("out")} onChange={() => toggleAvailability("out")} className="size-4 accent-[#e10600]" />
                Agotado
              </label>
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-xs font-bold tracking-[0.14em] text-neutral-500 uppercase">Precio</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <label className="text-xs text-neutral-500">
                Mín.
                <input
                  inputMode="decimal"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value.replace(/[^0-9.]/g, "").slice(0, 6))}
                  className="mt-1 w-full border border-neutral-300 bg-white px-2 py-2 text-sm text-neutral-950"
                />
              </label>
              <label className="text-xs text-neutral-500">
                Máx.
                <input
                  inputMode="decimal"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value.replace(/[^0-9.]/g, "").slice(0, 6))}
                  className="mt-1 w-full border border-neutral-300 bg-white px-2 py-2 text-sm text-neutral-950"
                />
              </label>
            </div>
          </fieldset>
        </aside>
      </div>

      <div className="min-w-0">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl leading-none font-extrabold tracking-[-0.04em] uppercase sm:text-5xl">{title}</h2>
            <p className="mt-2 text-sm text-neutral-500">
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
              {hasFilters ? " con los filtros actuales" : ""}
            </p>
          </div>
          <Link href={viewAllHref} className="shrink-0 text-sm font-semibold text-neutral-950 hover:text-[#e10600]">
            Ver todos
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold">Ningún producto coincide con estos filtros.</p>
            <button type="button" onClick={clearFilters} className="mt-4 cursor-pointer bg-neutral-950 px-5 py-3 text-xs font-bold tracking-[0.16em] text-white uppercase">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {showPromo ? <PromoCard /> : null}
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
