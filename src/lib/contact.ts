"use server";

import type { ContactState } from "@/lib/contact-state";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const honeypot = String(formData.get("company") ?? "");
  if (honeypot.trim().length > 0) {
    return { status: "success", message: "Recibimos tu mensaje.", fieldErrors: {} };
  }

  const name = String(formData.get("name") ?? "").trim().replace(/\s+/g, " ");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const message = String(formData.get("message") ?? "").trim();
  const fieldErrors: ContactState["fieldErrors"] = {};

  if (name.length < 2 || name.length > 80) fieldErrors.name = "Escribe tu nombre, entre 2 y 80 caracteres.";
  if (!EMAIL.test(email) || email.length > 120) fieldErrors.email = "Escribe un correo válido.";
  if (message.length < 10 || message.length > 1000) fieldErrors.message = "El mensaje debe tener entre 10 y 1000 caracteres.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Revisa los campos marcados.", fieldErrors };
  }

  return {
    status: "success",
    message: "Mensaje validado. En esta versión no hay buzón conectado: escríbenos directo a hola@newmuscle.com si necesitas respuesta.",
    fieldErrors: {},
  };
}
