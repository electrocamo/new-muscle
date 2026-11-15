"use client";

import { getProduct } from "@/lib/catalog";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "new-muscle-cart-v1";
const MAX_QUANTITY = 8;

export type CartLine = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  ready: boolean;
  addItem: (slug: string, quantity?: number) => boolean;
  setQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function sanitize(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const slug = "slug" in item && typeof item.slug === "string" ? item.slug : "";
    const quantity = "quantity" in item && typeof item.quantity === "number" ? item.quantity : 0;
    const product = getProduct(slug);
    if (!product || !product.inStock || !Number.isFinite(quantity)) return [];
    const safeQuantity = Math.min(MAX_QUANTITY, Math.floor(quantity));
    if (safeQuantity < 1) return [];
    return [{ slug, quantity: safeQuantity }];
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(sanitize(JSON.parse(raw) as unknown));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartContextValue>(() => {
    return {
      lines,
      count: lines.reduce((total, line) => total + line.quantity, 0),
      ready,
      addItem: (slug, quantity = 1) => {
        const product = getProduct(slug);
        const nextQuantity = Math.floor(quantity);
        if (!product || !product.inStock || nextQuantity < 1) return false;
        setLines((current) => {
          const existing = current.find((line) => line.slug === slug);
          if (!existing) {
            return [...current, { slug, quantity: Math.min(MAX_QUANTITY, nextQuantity) }];
          }
          return current.map((line) =>
            line.slug === slug
              ? { slug, quantity: Math.min(MAX_QUANTITY, line.quantity + nextQuantity) }
              : line,
          );
        });
        return true;
      },
      setQuantity: (slug, quantity) => {
        const nextQuantity = Math.floor(quantity);
        if (nextQuantity < 1) {
          setLines((current) => current.filter((line) => line.slug !== slug));
          return;
        }
        setLines((current) =>
          current.map((line) =>
            line.slug === slug ? { slug, quantity: Math.min(MAX_QUANTITY, nextQuantity) } : line,
          ),
        );
      },
      removeItem: (slug) => {
        setLines((current) => current.filter((line) => line.slug !== slug));
      },
      clear: () => setLines([]),
    };
  }, [lines, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}
