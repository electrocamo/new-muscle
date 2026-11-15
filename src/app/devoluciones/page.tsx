import { InfoPage } from "@/components/content/info-page";
import { brand, returnsPolicy } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devoluciones",
  description: "Plazo, condiciones y reembolso de una devolución en New Muscle.",
};

export default function ReturnsPage() {
  return (
    <InfoPage
      eyebrow="Ayuda"
      title="Devoluciones"
      lede={`Tienes ${returnsPolicy.windowDays} días desde que recibes el pedido para pedir una devolución.`}
      sections={[
        {
          heading: "Condición del producto",
          paragraphs: [
            returnsPolicy.condition,
            "No aceptamos suplementos abiertos, con el sello roto o sin el empaque original. Es una condición de higiene, también cuando el motivo es un cambio de opinión.",
            "Si el error es nuestro —producto equivocado, empaque dañado o lote ilegible— asumimos el envío de regreso.",
          ],
        },
        {
          heading: "Cómo se devuelve el dinero",
          paragraphs: [
            `Cuando el paquete llega y pasa la revisión, el reembolso se hace por el mismo medio de pago en ${returnsPolicy.refundDays}.`,
            `Escribe a ${brand.email} con el número de pedido y fotos del sello antes de enviar el paquete.`,
          ],
        },
      ]}
    />
  );
}
