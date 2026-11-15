"use client";

import { submitContact } from "@/lib/contact";
import { initialContactState } from "@/lib/contact-state";
import { useActionState } from "react";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialContactState);

  return (
    <form action={action} className="mt-8 space-y-4" noValidate>
      <div className="sr-only" aria-hidden="true">
        <label>
          Empresa
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="block text-sm font-semibold">
        Nombre
        <input name="name" required maxLength={80} autoComplete="name" className="mt-1 w-full border border-neutral-300 bg-white px-3 py-3" />
        {state.fieldErrors.name ? <span className="mt-1 block text-sm font-normal text-[#e10600]">{state.fieldErrors.name}</span> : null}
      </label>
      <label className="block text-sm font-semibold">
        Correo
        <input name="email" type="email" required maxLength={120} autoComplete="email" className="mt-1 w-full border border-neutral-300 bg-white px-3 py-3" />
        {state.fieldErrors.email ? <span className="mt-1 block text-sm font-normal text-[#e10600]">{state.fieldErrors.email}</span> : null}
      </label>
      <label className="block text-sm font-semibold">
        Mensaje
        <textarea name="message" required minLength={10} maxLength={1000} rows={6} className="mt-1 w-full border border-neutral-300 bg-white px-3 py-3" />
        {state.fieldErrors.message ? <span className="mt-1 block text-sm font-normal text-[#e10600]">{state.fieldErrors.message}</span> : null}
      </label>
      <button type="submit" disabled={pending} className="cursor-pointer bg-neutral-950 px-6 py-3 text-xs font-bold tracking-[0.16em] text-white uppercase disabled:opacity-60">
        {pending ? "Enviando" : "Enviar mensaje"}
      </button>
      <p aria-live="polite" className="text-sm text-neutral-700">
        {state.message}
      </p>
    </form>
  );
}
