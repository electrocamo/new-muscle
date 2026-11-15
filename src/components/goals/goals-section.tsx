import { goals } from "@/data/catalog";
import Image from "next/image";
import Link from "next/link";

export function GoalsSection() {
  return (
    <section id="metas" className="scroll-mt-24 bg-white py-16 sm:py-20" aria-labelledby="goals-title">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8">
        <h2 id="goals-title" className="font-display text-4xl leading-none font-extrabold tracking-[-0.04em] uppercase sm:text-5xl">
          Compra según tus metas
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {goals.map((goal) => (
            <article key={goal.id} className="group relative min-h-[460px] overflow-hidden bg-neutral-950">
              <Image
                src={goal.image}
                alt={goal.imageAlt}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-4xl leading-[0.85] font-extrabold tracking-[-0.04em] text-white uppercase">
                  {goal.title}
                </h3>
                <p className="mt-3 max-w-[28ch] text-sm text-white/80">{goal.description}</p>
                <Link
                  href={`/metas/${goal.id}`}
                  className="mt-5 inline-flex cursor-pointer bg-white px-4 py-2 text-[11px] font-bold tracking-[0.16em] text-neutral-950 uppercase transition-colors duration-200 hover:bg-[#ff2a1f] hover:text-white"
                >
                  Comprar
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
