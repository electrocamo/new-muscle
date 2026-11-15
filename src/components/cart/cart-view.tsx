"use client";

import { shippingPolicy } from "@/data/site";
import { useCart } from "@/lib/cart-context";
import { getProduct } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import Image from "next/image";
import Link from "next/link";

export function CartView() {
  const { lines, setQuantity, removeItem, clear } = useCart();
  const detailed = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    return product ? [{ product, quantity: line.quantity }] : [];
  });
  const subtotal = detailed.reduce((total, line) => total + line.product.salePrice * line.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= shippingPolicy.freeFrom ? 0 : shippingPolicy.fee;

  if (detailed.length === 0) {
    return (
      <div className="border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
        <p className="text-lg font-semibold">Tu carrito está vacío.</p>
        <Link href="/catalogo" className="mt-4 inline-flex bg-neutral-950 px-5 py-3 text-xs font-bold tracking-[0.16em] text-white uppercase">
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <ul className="space-y-4">
        {detailed.map(({ product, quantity }) => (
          <li key={product.id} className="flex gap-4 bg-white p-4">
            <div className={`relative h-24 w-24 shrink-0 ${product.surface === "dark" ? "bg-[#111318]" : "bg-[#f0f0f0]"}`}>
              <Image src={product.image} alt="" fill sizes="96px" className="object-contain p-2" />
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/producto/${product.slug}`} className="font-semibold hover:text-[#e10600]">
                {product.name}
              </Link>
              <p className="mt-1 text-sm text-neutral-500">{formatMoney(product.salePrice)}</p>
              <div className="mt-3 flex items-center gap-3">
                <label className="text-sm">
                  Cantidad
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={quantity}
                    onChange={(event) => setQuantity(product.slug, Number(event.target.value) || 1)}
                    className="ml-2 w-16 border border-neutral-300 px-2 py-1"
                  />
                </label>
                <button type="button" onClick={() => removeItem(product.slug)} className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-950">
                  Quitar
                </button>
              </div>
            </div>
            <p className="font-semibold">{formatMoney(product.salePrice * quantity)}</p>
          </li>
        ))}
      </ul>
      <aside className="h-fit bg-[#101114] p-6 text-white">
        <h2 className="text-sm font-bold tracking-[0.16em] uppercase">Resumen</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Productos</dt>
            <dd>{formatMoney(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Envío estimado</dt>
            <dd>{shipping === 0 ? "Gratis" : formatMoney(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-white/15 pt-3 text-base font-semibold">
            <dt>Total</dt>
            <dd>{formatMoney(subtotal + shipping)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs leading-relaxed text-white/60">
          El pago en línea no está activo. Esta tienda no solicita datos de tarjeta. Los precios ya incluyen la oferta de la ficha.
        </p>
        <button type="button" onClick={clear} className="mt-5 cursor-pointer text-xs font-semibold tracking-[0.14em] text-white/70 uppercase hover:text-white">
          Vaciar carrito
        </button>
      </aside>
    </div>
  );
}
