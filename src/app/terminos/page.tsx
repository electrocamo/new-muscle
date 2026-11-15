import { InfoPage } from "@/components/content/info-page";
import { legalNotes } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos",
  description: "Condiciones de uso, precios y campañas de New Muscle.",
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Términos"
      lede="Al usar la tienda aceptas estas condiciones. La compra se confirma solo cuando el pago en línea esté disponible y el pedido quede aceptado."
      sections={[
        {
          heading: "Precios y campañas",
          paragraphs: [legalNotes.prices, legalNotes.codes, "Podemos corregir un error evidente de precio antes de aceptar el pedido y te avisamos para que decidas si sigues."],
        },
        {
          heading: "Uso del sitio",
          paragraphs: [
            legalNotes.age,
            legalNotes.health,
            "No uses el sitio para extraer el catálogo de forma masiva ni para intentar acceder a cuentas o sistemas que no son tuyos.",
          ],
        },
        {
          heading: "Disponibilidad",
          paragraphs: [
            "El stock de la ficha es el que vale al agregar al carrito. Si un producto se agota antes del pago, te lo diremos y no se cobra.",
          ],
        },
      ]}
    />
  );
}
