import { goals } from "@/data/catalog";
import { brand, legalNotes, promoCodes, returnsPolicy, shippingPolicy } from "@/data/site";
import { formatMoney } from "@/lib/money";
import Link from "next/link";

const columns = [
  {
    title: "Tienda",
    links: [
      { href: "/", label: "Inicio" },
      { href: "/catalogo", label: "Catálogo" },
      { href: "/ofertas", label: "Ofertas" },
      { href: "/carrito", label: "Carrito" },
    ],
  },
  {
    title: "Metas",
    links: goals.map((goal) => ({ href: `/metas/${goal.id}`, label: goal.title })),
  },
  {
    title: "Ayuda",
    links: [
      { href: "/envios", label: "Envíos" },
      { href: "/devoluciones", label: "Devoluciones" },
      { href: "/preguntas", label: "Preguntas" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/nosotros", label: "Nosotros" },
      { href: "/privacidad", label: "Privacidad" },
      { href: "/terminos", label: "Términos" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#101114] text-white">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 py-14 sm:px-8 md:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <p className="font-display text-3xl font-extrabold tracking-[-0.04em] uppercase">
            New <span className="text-[#ff2a1f]">Muscle</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{brand.tagline}</p>
          <ul className="mt-6 space-y-2 text-sm text-white/75">
            <li>Envío gratis desde {formatMoney(shippingPolicy.freeFrom)}. {shippingPolicy.metro}</li>
            <li>Devolución de {returnsPolicy.windowDays} días si el sello sigue intacto.</li>
            <li>
              Códigos {promoCodes.blackNovember.code} y {promoCodes.peakForce.code}. No se acumulan.
            </li>
            <li>
              {brand.email} · {brand.hours}
            </li>
          </ul>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-xs font-bold tracking-[0.18em] text-white/50 uppercase">{column.title}</h2>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-5 text-xs leading-relaxed text-white/45 sm:px-8">
          <p>{legalNotes.health}</p>
          <p>
            {legalNotes.age} {legalNotes.prices} {brand.city}.
          </p>
        </div>
      </div>
    </footer>
  );
}
