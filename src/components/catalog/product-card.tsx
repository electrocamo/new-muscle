import { discountPercent, getCategory } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import type { Product } from "@/types/catalog";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product);
  const category = getCategory(product.category);

  return (
    <article className="group h-full overflow-hidden rounded-[18px] bg-[#f0f0f0] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(16,17,20,0.12)]">
      <Link href={`/producto/${product.slug}`} className="flex h-full flex-col">
        <div className={`relative aspect-square ${product.surface === "dark" ? "bg-[#111318]" : "bg-[#f0f0f0]"}`}>
          {discount > 0 ? (
            <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-neutral-950/90 px-2.5 py-1 text-[11px] font-semibold text-white">
              <TagIcon />
              <span className="sr-only">Descuento del </span>
              {discount}%
            </span>
          ) : null}
          {!product.inStock ? (
            <span className="absolute top-3 left-3 z-10 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold tracking-wide text-neutral-800 uppercase">
              Agotado
            </span>
          ) : null}
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col px-4 pt-3 pb-5">
          <p className="text-[11px] font-medium tracking-[0.14em] text-neutral-500 uppercase">{category?.label}</p>
          <h3 className="mt-1 text-[15px] font-semibold tracking-wide text-neutral-950 uppercase">{product.name}</h3>
          <p className="mt-1 text-xs text-neutral-500">{product.servings}</p>
          <p className="mt-auto flex items-baseline gap-2 pt-3">
            {discount > 0 ? (
              <>
                <span className="sr-only">Precio anterior</span>
                <s className="text-sm text-neutral-400">{formatMoney(product.price)}</s>
              </>
            ) : null}
            <span className="sr-only">Precio actual</span>
            <span className="text-lg font-bold text-neutral-950">{formatMoney(product.salePrice)}</span>
          </p>
        </div>
      </Link>
    </article>
  );
}

function TagIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 13.5 12.5 21a2 2 0 0 1-2.8 0L3 14.3V4h10.3L20 10.7a2 2 0 0 1 0 2.8Z" />
      <path d="M7.5 7.5h.01" />
    </svg>
  );
}
