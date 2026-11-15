import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-24">
      <p className="text-xs font-bold tracking-[0.22em] text-[#e10600] uppercase">404</p>
      <h1 className="font-display mt-3 text-5xl font-extrabold uppercase">Esta página no está</h1>
      <p className="mt-4 text-neutral-600">El enlace no coincide con una sección de la tienda.</p>
      <Link href="/catalogo" className="mt-8 inline-flex bg-neutral-950 px-5 py-3 text-xs font-bold tracking-[0.16em] text-white uppercase">
        Ir al catálogo
      </Link>
    </section>
  );
}
