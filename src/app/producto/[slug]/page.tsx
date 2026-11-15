import { ProductCard } from "@/components/catalog/product-card";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { products } from "@/data/catalog";
import { legalNotes } from "@/data/site";
import { discountPercent, getCategory, getProduct, relatedProducts } from "@/lib/catalog";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

type ProductRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Producto" };
  return {
    title: product.name,
    description: product.summary,
  };
}

export default function ProductPage({ params }: ProductRouteProps) {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-sm text-neutral-500">Cargando el producto…</p>}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: ProductRouteProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = relatedProducts(product);
  const discount = discountPercent(product);

  return (
    <article className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div className={`relative aspect-square overflow-hidden rounded-[18px] ${product.surface === "dark" ? "bg-[#111318]" : "bg-[#f0f0f0]"}`}>
          {discount > 0 ? (
            <span className="absolute top-4 right-4 z-10 rounded-full bg-neutral-950 px-3 py-1 text-sm font-semibold text-white">-{discount}%</span>
          ) : null}
          <Image src={product.image} alt={product.imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-8" />
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-neutral-500 uppercase">{category?.label}</p>
          <h1 className="font-display mt-2 text-5xl leading-[0.9] font-extrabold tracking-[-0.04em] uppercase sm:text-6xl">{product.name}</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-600">{product.summary}</p>
          <p className="mt-2 text-sm text-neutral-500">{product.servings}</p>
          <PurchasePanel product={product} />
          <ul className="mt-8 space-y-3">
            {product.details.map((detail) => (
              <li key={detail} className="border-l-2 border-[#ff2a1f] pl-4 text-sm leading-relaxed text-neutral-700">
                {detail}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs leading-relaxed text-neutral-500">{legalNotes.health}</p>
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-4xl font-extrabold uppercase">También te puede servir</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
