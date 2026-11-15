"use client";

import { useState } from "react";

type CopyCodeProps = {
  code: string;
  className?: string;
};

export function CopyCode({ code, className = "" }: CopyCodeProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  const message =
    status === "copied" ? "Código copiado" : status === "failed" ? "Selecciona el código y cópialo manualmente" : "";

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3 border border-white/15 bg-black/40 px-4 py-3">
        <p className="font-display text-lg font-bold tracking-[0.18em] text-white">{code}</p>
        <button
          type="button"
          onClick={copy}
          className="cursor-pointer text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:text-red-400"
        >
          Copiar
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {message}
      </p>
      {message ? <p className="mt-2 text-xs text-white/70">{message}</p> : null}
    </div>
  );
}
