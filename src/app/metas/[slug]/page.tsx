import { ProductCard } from "@/components/catalog/product-card";
import { goals } from "@/data/catalog";
import { getGoal, isGoalId, productsForGoal } from "@/lib/catalog";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export function generateStaticParams() {
  return goals.map((goal) => ({ slug: goal.id }));
}

type GoalRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: GoalRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const goal = isGoalId(slug) ? getGoal(slug) : undefined;
  return { title: goal?.title ?? "Meta", description: goal?.description };
}

export default function GoalPage({ params }: GoalRouteProps) {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-sm text-neutral-500">Cargando la meta…</p>}>
      <GoalDetails params={params} />
    </Suspense>
  );
}

async function GoalDetails({ params }: GoalRouteProps) {
  const { slug } = await params;
  if (!isGoalId(slug)) notFound();
  const goal = getGoal(slug);
  if (!goal) notFound();
  const list = productsForGoal(slug);

  return (
    <article>
      <header className="relative min-h-[360px] overflow-hidden bg-neutral-950">
        <Image src={goal.image} alt={goal.imageAlt} fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20" />
        <div className="relative mx-auto flex min-h-[360px] w-full max-w-[1440px] items-end px-4 py-12 sm:px-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">Compra según tus metas</p>
            <h1 className="font-display mt-2 text-5xl font-extrabold text-white uppercase sm:text-7xl">{goal.title}</h1>
            <p className="mt-3 max-w-xl text-white/80">{goal.description}</p>
            <Link href={`/catalogo?meta=${goal.id}`} className="mt-6 inline-flex bg-white px-4 py-2 text-[11px] font-bold tracking-[0.16em] text-neutral-950 uppercase">
              Filtrar en el catálogo
            </Link>
          </div>
        </div>
      </header>
      <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </article>
  );
}
