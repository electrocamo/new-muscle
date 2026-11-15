import { InfoPage } from "@/components/content/info-page";
import { promoCodes, returnsPolicy, shippingPolicy } from "@/data/site";
import { formatMoney } from "@/lib/money";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas",
  description: "Respuestas sobre códigos, envíos, devoluciones y el uso de los suplementos.",
};

export default function FaqPage() {
  return (
    <InfoPage
      eyebrow="Ayuda"
      title="Preguntas"
      lede="Lo que más se consulta antes de armar un pedido."
      sections={[
        {
          heading: `¿Cómo funciona ${promoCodes.blackNovember.code}?`,
          paragraphs: [
            "El porcentaje de la ficha ya está descontado del precio tachado. El código identifica la campaña Noviembre Negro y no se suma otra vez ni se combina con PEAKFORCE.",
          ],
        },
        {
          heading: "¿Cuándo llega el pedido?",
          paragraphs: [`${shippingPolicy.preparation} ${shippingPolicy.metro} ${shippingPolicy.national}`],
        },
        {
          heading: "¿El envío tiene costo?",
          paragraphs: [`Es gratis desde ${formatMoney(shippingPolicy.freeFrom)}. Por debajo de ese monto cuesta ${formatMoney(shippingPolicy.fee)}.`],
        },
        {
          heading: "¿Puedo devolver un tarro abierto?",
          paragraphs: [
            `No. ${returnsPolicy.condition} El plazo es de ${returnsPolicy.windowDays} días. Si el error es de la tienda, el envío de regreso corre por nuestra cuenta.`,
          ],
        },
        {
          heading: "¿Esto reemplaza una consulta médica?",
          paragraphs: [
            "No. Son suplementos. Si estás embarazada, tomas medicación o tienes una condición diagnosticada, consulta antes con un profesional de la salud.",
          ],
        },
      ]}
    />
  );
}
