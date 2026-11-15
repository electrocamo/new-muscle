import { CopyCode } from "@/components/ui/copy-code";
import { legalNotes, promoCodes, shippingPolicy } from "@/data/site";
import { formatMoney } from "@/lib/money";
import Link from "next/link";

const offers = [
  {
    eyebrow: "Selección",
    title: "Noviembre Negro",
    figure: "10%",
    text: promoCodes.blackNovember.detail,
    code: promoCodes.blackNovember.code,
    href: "/ofertas",
    cta: "Ver la selección",
  },
  {
    eyebrow: "Campaña",
    title: "Semana de nuestro lanzamiento",
    figure: "15%",
    text: promoCodes.peakForce.detail,
    code: promoCodes.peakForce.code,
    href: "/metas/recuperacion",
    cta: "Ver recuperación",
  },
];

export function PromotionsSection() {
  return (
    <section id="promociones" className="scroll-mt-24 bg-[#0e0f12] py-16 text-white sm:py-20" aria-labelledby="promos-title">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="promos-title" className="font-display text-4xl leading-none font-extrabold tracking-[-0.04em] uppercase sm:text-5xl">
            Promociones y descuentos
          </h2>
          <Link href="/ofertas" className="text-sm font-semibold text-white/80 hover:text-white">
            Ver todos
          </Link>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {offers.map((offer) => (
            <article key={offer.code} className="flex min-h-[320px] flex-col justify-between border border-white/10 bg-white/5 p-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.28em] text-white/50 uppercase">{offer.eyebrow}</p>
                <h3 className="font-display mt-3 text-4xl leading-none font-extrabold uppercase">{offer.title}</h3>
                <p className="font-display mt-4 text-7xl leading-none font-extrabold">
                  {offer.figure.replace("%", "")}
                  <span className="text-[#ff2a1f]">%</span>
                </p>
                <p className="mt-3 max-w-[32ch] text-sm text-white/70">{offer.text}</p>
              </div>
              <div className="mt-6">
                <CopyCode code={offer.code} />
                <Link href={offer.href} className="mt-4 inline-flex text-xs font-bold tracking-[0.16em] uppercase hover:text-[#ff2a1f]">
                  {offer.cta}
                </Link>
              </div>
            </article>
          ))}
          <article className="flex min-h-[320px] flex-col justify-between bg-[#ff2a1f] p-6 text-white">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase">Envío</p>
              <h3 className="font-display mt-3 text-4xl leading-none font-extrabold uppercase">Sin costo desde {formatMoney(shippingPolicy.freeFrom)}</h3>
              <p className="mt-4 text-sm text-white/90">
                Por debajo de ese monto el envío en Medellin es de {formatMoney(shippingPolicy.fee)}. {shippingPolicy.metro}
              </p>
            </div>
            <Link href="/envios" className="inline-flex bg-white px-4 py-3 text-xs font-bold tracking-[0.16em] text-neutral-950 uppercase hover:bg-neutral-950 hover:text-white">
              Ver condiciones de envío
            </Link>
          </article>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/50">{legalNotes.codes}</p>
      </div>
    </section>
  );
}
