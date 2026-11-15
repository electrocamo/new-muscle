import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "New Muscle",
    template: "%s · New Muscle",
  },
  description: "Tienda de suplementación deportiva. Proteína, creatina, aminoácidos y recuperación con campañas claras y precios visibles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#f6f6f6] text-[#101114]">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <CartProvider>
          <Header />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
