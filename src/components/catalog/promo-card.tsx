import { CopyCode } from "@/components/ui/copy-code";
import { promoCodes } from "@/data/site";
import Link from "next/link";

export function PromoCard() {
  return (
    <article className="flex h-full min-h-[420px] flex-col justify-between rounded-[18px] bg-[#141518] p-6 text-white">
      <div>
        <p className="font-display text-4xl leading-[0.85] font-extrabold tracking-[-0.04em] uppercase">
          NOVIEMBRE
          <br />
          NEGRO
        </p>
        <p className="font-display mt-6 text-5xl leading-none font-extrabold tracking-[-0.04em] uppercase">
          Hasta <span className="text-[#ff2a1f]">10%</span> off
        </p>
        <p className="mt-3 text-sm text-white/70">En productos seleccionados</p>
      </div>
      <div>
        <CopyCode code={promoCodes.blackNovember.code} />
        <Link
          href="/ofertas"
          className="mt-4 inline-flex cursor-pointer text-xs font-bold tracking-[0.16em] text-white uppercase underline decoration-white/30 underline-offset-4 hover:decoration-white"
        >
          Ver ofertas
        </Link>
      </div>
    </article>
  );
}
