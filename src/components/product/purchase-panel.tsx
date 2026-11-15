"use client";

import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/money";
import type { Product } from "@/types/catalog";
import { useState } from "react";

export function PurchasePanel({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  function add() {
    const added = addItem(product.slug, quantity);
    setMessage(added ? `${product.name} se agregó al carrito.` : "Este producto no está disponible.");
  }

  return (
    <div className="mt-6">
      <p className="flex items-baseline gap-3">
        {product.price > product.salePrice ? (
          <>
            <span className="sr-only">Precio anterior</span>
            <s className="text-lg text-neutral-400">{formatMoney(product.price)}</s>
          </>
        ) : null}
        <span className="sr-only">Precio actual</span>
        <span className="font-display text-5xl font-extrabold tracking-[-0.04em]">{formatMoney(product.salePrice)}</span>
      </p>
      <p className="mt-2 text-sm text-neutral-500">{product.inStock ? "En stock. Sale en 1 día hábil." : "Agotado por ahora."}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold">
          Cantidad
          <input
            type="number"
            min={1}
            max={8}
            value={quantity}
            disabled={!product.inStock}
            onChange={(event) => setQuantity(Math.min(8, Math.max(1, Number(event.target.value) || 1)))}
            className="ml-2 w-16 border border-neutral-300 px-2 py-2"
          />
        </label>
        <button
          type="button"
          onClick={add}
          disabled={!product.inStock}
          className="cursor-pointer bg-neutral-950 px-6 py-3 text-xs font-bold tracking-[0.16em] text-white uppercase enabled:hover:bg-[#ff2a1f] disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          Agregar al carrito
        </button>
      </div>
      <p className="mt-3 text-sm text-neutral-700" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
