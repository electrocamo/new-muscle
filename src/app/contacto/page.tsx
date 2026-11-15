import { ContactForm } from "@/components/contact/contact-form";
import { brand } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribe a New Muscle sobre un pedido, una fórmula o una devolución.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="text-xs font-bold tracking-[0.22em] text-[#e10600] uppercase">Ayuda</p>
        <h1 className="font-display mt-3 text-5xl font-extrabold uppercase sm:text-6xl">Contacto</h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-600">
          Cuéntanos el producto y, si ya compraste, el número de pedido. Respondemos en horario de atención.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-semibold">Correo</dt>
            <dd>
              <a href={`mailto:${brand.email}`} className="underline decoration-neutral-300 underline-offset-4">
                {brand.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Privacidad</dt>
            <dd>
              <a href={`mailto:${brand.privacyEmail}`} className="underline decoration-neutral-300 underline-offset-4">
                {brand.privacyEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Horario</dt>
            <dd>{brand.hours}</dd>
          </div>
          <div>
            <dt className="font-semibold">Ciudad</dt>
            <dd>{brand.city}</dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </article>
  );
}
