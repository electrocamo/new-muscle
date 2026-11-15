import { InfoPage } from "@/components/content/info-page";
import { shippingPolicy } from "@/data/site";
import { formatMoney } from "@/lib/money";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Envíos",
  description: "Tiempos, costos y cobertura de envío de New Muscle.",
};

export default function ShippingPage() {
  return (
    <InfoPage
      eyebrow="Ayuda"
      title="Envíos"
      lede={`${shippingPolicy.preparation} El costo es ${formatMoney(shippingPolicy.fee)} y queda en cero desde ${formatMoney(shippingPolicy.freeFrom)}.`}
      sections={[
        {
          heading: "Tiempos",
          paragraphs: [
            shippingPolicy.metro,
            shippingPolicy.national,
            "El conteo empieza cuando el pedido sale del almacén, no cuando lo agregas al carrito. Te enviamos la guía al correo de la compra.",
          ],
        },
        {
          heading: "Cobertura y empaque",
          paragraphs: [
            "Despachamos a el valle de aburra y alrededores. No hacemos envíos nacionales aún, pero esperamos que sea pronto.",
            shippingPolicy.packaging,
          ],
        },
        {
          heading: "Qué no incluye el estimado",
          paragraphs: [
            "El total del carrito muestra un envío estimado. La dirección final puede cambiar la transportadora, no el umbral de envío gratis.",
          ],
        },
      ]}
    />
  );
}
