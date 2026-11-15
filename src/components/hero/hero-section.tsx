"use client";

import { CopyCode } from "@/components/ui/copy-code";
import { products } from "@/data/catalog";
import { promoCodes } from "@/data/site";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const slide = {
  enter: (direction: number) => ({ y: direction > 0 ? "-100%" : "100%", opacity: 1 }),
  center: { y: "0%", opacity: 1 },
  exit: (direction: number) => ({ y: direction > 0 ? "100%" : "-100%", opacity: 0 }),
};

const openGlow = "inset(-40% -45% -40% -45%)";

const shadowSlide = {
  enter: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    clipPath: openGlow,
  }),
  center: { y: "0%", clipPath: openGlow },
  exit: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    clipPath: direction > 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
  }),
};

const tilt =
  "relative h-full rotate-[10deg] transition-transform duration-500 group-hover:rotate-[7deg] group-hover:scale-[1.03]";

const reelSlugs = ["ar-creatine","creatina-monohidrato", "supreme-gomas-multivitaminico","bcaa-2-1-1", "magnesio-bisglicinato"] as const;

const heroSlides = [
  {
    id: "gold-standard",
    src: "/hero/gold-standard.png",
    alt: "Tarro de Optimum Nutrition Gold Standard 100% Whey Protein, sabor vainilla",
    href: "/producto/whey-isolate",
    name: "Gold Standard",
  },
  ...reelSlugs.flatMap((slug) => {
    const product = products.find((item) => item.slug === slug);
    if (!product) return [];
    return [
      {
        id: product.id,
        src: product.image,
        alt: product.imageAlt,
        href: `/producto/${product.slug}`,
        name: product.name,
      },
    ];
  }),
];

export function HeroSection() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const product = heroSlides[index];
  const upcoming = heroSlides[(index + 1) % heroSlides.length];
  const previous = heroSlides[(index - 1 + heroSlides.length) % heroSlides.length];

  function showProduct(nextDirection: 1 | -1) {
    if (spinning) return;
    setDirection(nextDirection);
    if (!reduce) setSpinning(true);
    setIndex((current) => (current + nextDirection + heroSlides.length) % heroSlides.length);
  }

  return (
    <section className="hero-surface relative isolate w-full overflow-hidden text-white lg:h-[750px]" aria-labelledby="hero-title">
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id="hero-shadows" x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="22" result="blurOrange" />
          <feOffset in="blurOrange" dx="-20" dy="6" result="offOrange" />
          <feFlood floodColor="rgb(255, 132, 24)" floodOpacity="0.3" result="floodOrange" />
          <feComposite in="floodOrange" in2="offOrange" operator="in" result="orange" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="24" result="blurBlue" />
          <feOffset in="blurBlue" dx="30" dy="8" result="offBlue" />
          <feFlood floodColor="rgb(46, 128, 255)" floodOpacity="0.3" result="floodBlue" />
          <feComposite in="floodBlue" in2="offBlue" operator="in" result="blue" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="16" result="blurDark" />
          <feOffset in="blurDark" dx="0" dy="26" result="offDark" />
          <feFlood floodColor="rgb(0, 0, 0)" floodOpacity="0.55" result="floodDark" />
          <feComposite in="floodDark" in2="offDark" operator="in" result="dark" />
          <feMerge>
            <feMergeNode in="orange" />
            <feMergeNode in="blue" />
            <feMergeNode in="dark" />
          </feMerge>
        </filter>
      </svg>
      <div className="hero-glow hero-glow-red" aria-hidden="true" />
      <div className="hero-glow hero-glow-blue" aria-hidden="true" />
      <div className="relative mx-auto grid h-full w-full max-w-[1440px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr_0.9fr] lg:px-12 lg:py-0">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease }}
          className="relative z-10 max-w-[16ch]"
        >
          {/* <p className="mb-5 text-[11px] font-semibold tracking-[0.42em] text-white/70 uppercase">Campaña 01</p> */}
          <h1 id="hero-title" className="font-display text-[clamp(4.4rem,8.4vw,7.6rem)] leading-[0.8] font-extrabold tracking-[-0.045em] uppercase">
            <span className="block">Supera tus</span>
            <span className="hero-word relative block text-[#ff2a1f]">Limites</span>
            <span className="block"></span>
          </h1>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: reduce ? 0 : 0.12, ease }}
          className="hero-product relative z-10 mx-auto flex w-full max-w-[460px] flex-col items-center"
        >
          <div className="group relative w-full py-16">
            <div className="relative aspect-[3/4] w-full">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={`${product.id}-shadow`}
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                  custom={direction}
                  variants={shadowSlide}
                  initial={reduce ? false : "enter"}
                  animate="center"
                  exit={reduce ? "center" : "exit"}
                  transition={{ duration: reduce ? 0 : 0.7, ease, clipPath: { duration: 0 } }}
                >
                  <div className={tilt}>
                    <Image
                      src={product.src}
                      alt=""
                      width={600}
                      height={800}
                      unoptimized
                      className="h-full w-full object-contain"
                      style={{ filter: "url(#hero-shadows)" }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute -inset-x-[16%] -inset-y-[10%] overflow-clip">
                <div id="hero-reel" className="absolute inset-x-[12.121%] inset-y-[8.333%]">
                  <AnimatePresence initial={false} custom={direction} onExitComplete={() => setSpinning(false)}>
                    <motion.div
                      key={product.id}
                      className="absolute inset-0"
                      custom={direction}
                      variants={slide}
                      initial={reduce ? false : "enter"}
                      animate="center"
                      exit={reduce ? "center" : "exit"}
                      transition={{ duration: reduce ? 0 : 0.7, ease, opacity: { duration: 0 } }}
                    >
                      <Link href={product.href} className="relative block h-full w-full focus-visible:outline-white">
                        <div className={tilt}>
                          <Image
                            src={product.src}
                            alt={product.alt}
                            width={600}
                            height={800}
                            unoptimized
                            priority={product.id === heroSlides[0].id}
                            className="h-full w-full object-contain"
                          />
                          <span
                            className="hero-protein-edge"
                            style={{ maskImage: `url("${product.src}")`, WebkitMaskImage: `url("${product.src}")` }}
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-white/70 uppercase" aria-live="polite">
            {product.name}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => showProduct(-1)}
              disabled={spinning}
              aria-controls="hero-reel"
              aria-label={`Producto anterior, ${previous.name}`}
              className="inline-flex cursor-pointer items-center gap-2 border border-white/20 bg-black/40 px-4 py-2.5 text-[11px] font-bold tracking-[0.18em] text-white uppercase transition-colors duration-200 hover:bg-white hover:text-neutral-950 disabled:cursor-default disabled:opacity-50"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12.5 10 7.5 15 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              Anterior
            </button>
            <button
              type="button"
              onClick={() => showProduct(1)}
              disabled={spinning}
              aria-controls="hero-reel"
              aria-label={`Siguiente producto, ${upcoming.name}`}
              className="inline-flex cursor-pointer items-center gap-2 border border-white/20 bg-black/40 px-4 py-2.5 text-[11px] font-bold tracking-[0.18em] text-white uppercase transition-colors duration-200 hover:bg-white hover:text-neutral-950 disabled:cursor-default disabled:opacity-50"
            >
              Siguiente
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: reduce ? 0 : 0.22, ease }}
          className="relative z-10 lg:justify-self-end"
        >
          <p className="text-[12px] font-semibold tracking-[0.38em] text-white/75 uppercase">Hasta</p>
          <p className="font-display mt-1 text-[clamp(6.5rem,9vw,8.5rem)] leading-[0.78] font-extrabold tracking-[-0.06em]">
            1 5<span className="text-[#ff2a1f]">%</span>
          </p>
          <p className="mt-3 max-w-[14ch] font-display text-2xl leading-none font-bold tracking-[0.08em] uppercase">
            en productos de promoción
          </p>
          <p className="mt-6 text-[11px] tracking-[0.28em] text-white/60 uppercase">Usa el código</p>
          <CopyCode code={promoCodes.peakForce.code} className="mt-2 max-w-[280px]" />
          <Link
            href="/#promociones"
            className="mt-5 inline-flex cursor-pointer items-center justify-center bg-white px-6 py-3 text-xs font-bold tracking-[0.18em] text-neutral-950 uppercase transition-colors duration-200 hover:bg-[#ff2a1f] hover:text-white"
          >
            Descubrir promociones
          </Link>
          <p className="mt-4 max-w-[28ch] text-[11px] leading-relaxed text-white/55">
            Oferta aplicada en las fichas de la campaña. No acumulable. Consulta condiciones en promociones.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
