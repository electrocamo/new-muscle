import { InfoPage } from "@/components/content/info-page";
import { brand } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Qué es New Muscle y cómo elegimos las fórmulas de la tienda.",
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="La marca"
      title="Nosotros"
      lede="New Muscle es una tienda de suplementación deportiva. Vendemos fórmulas concretas, con el precio de oferta visible y sin promesas de atajo."
      sections={[
        {
          heading: "Qué vendemos",
          paragraphs: [
            "Proteína, creatina, aminoácidos, pre-entrenos, omega-3, magnesio y un multivitamínico para quien entrena. Cada ficha dice para qué sirve y para qué no.",
            "No publicamos certificaciones que no tengamos. El lote va en la etiqueta del empaque y el pedido sale con el producto cerrado.",
          ],
        },
        {
          heading: "Cómo comprar",
          paragraphs: [
            "Elige por meta, filtra el catálogo o entra directo a una oferta. El carrito guarda la selección en este navegador.",
            `Si necesitas hablar con una persona, escribe a ${brand.email}. ${brand.hours}.`,
          ],
        },
      ]}
    />
  );
}
