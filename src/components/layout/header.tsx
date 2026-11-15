"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/ofertas", label: "Ofertas" },
  { href: "/#metas", label: "Metas" },
  { href: "/#promociones", label: "Promociones" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#101114]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" className="font-display text-2xl leading-none font-extrabold tracking-[-0.04em] uppercase">
          New <span className="text-[#ff2a1f]">Muscle</span>
        </Link>
        <button
          type="button"
          className="cursor-pointer text-sm font-semibold md:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
        <nav id="site-nav" className={`${open ? "absolute inset-x-0 top-16 flex" : "hidden"} flex-col gap-1 border-b border-white/10 bg-[#101114] p-4 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-white/80 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/carrito"
          className="text-sm font-semibold tracking-wide"
          aria-label={`Carrito, ${count} ${count === 1 ? "producto" : "productos"}`}
        >
          Carrito
          <span className="ml-2 inline-flex min-w-6 justify-center rounded-full bg-[#ff2a1f] px-1.5 py-0.5 text-xs">{count}</span>
        </Link>
      </div>
    </header>
  );
}
