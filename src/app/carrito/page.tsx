import { CartView } from "@/components/cart/cart-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisa cantidades y el envío estimado antes de confirmar.",
};

export default function CartPage() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-8">
      <h1 className="font-display text-5xl font-extrabold uppercase">Carrito</h1>
      <div className="mt-8">
        <CartView />
      </div>
    </section>
  );
}
