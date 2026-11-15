import { InfoPage } from "@/components/content/info-page";
import { brand } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Qué datos usa New Muscle y cuáles se quedan en tu navegador.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacidad"
      lede="Pedimos solo lo necesario para responderte y, cuando el pago esté activo, para entregar un pedido."
      sections={[
        {
          heading: "Datos que puedes dejar",
          paragraphs: [
            "En el formulario de contacto: nombre, correo y el mensaje. En esta versión el servidor valida el formato y no guarda el mensaje en una base de datos.",
            "El carrito se guarda en el almacenamiento local de este navegador, con el identificador del producto y la cantidad. No incluye tu nombre ni tu dirección.",
          ],
        },
        {
          heading: "Qué no hacemos",
          paragraphs: [
            "No vendemos datos. No pedimos número de tarjeta en esta tienda. No usamos el correo para una lista de promociones si no lo pides.",
          ],
        },
        {
          heading: "Tus solicitudes",
          paragraphs: [
            `Para acceso, corrección o eliminación, escribe a ${brand.privacyEmail}. Incluye el correo con el que nos contactaste.`,
          ],
        },
      ]}
    />
  );
}
