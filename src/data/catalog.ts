import { catalogOctoberProducts } from "@/data/catalog-octubre";
import type { Category, Goal, Product } from "@/types/catalog";

export const categories: Category[] = [
  { id: "proteinas", label: "Proteínas" },
  { id: "creatina", label: "Creatina" },
  { id: "aminoacidos", label: "Aminoácidos" },
  { id: "preentreno", label: "Pre-entreno" },
  { id: "energia", label: "Energía y enfoque" },
  { id: "salud", label: "Salud y peso" },
  { id: "recuperacion", label: "Recuperación" },
  { id: "vitaminas", label: "Vitaminas" },
  { id: "otros", label: "Otros" },
];

export const goals: Goal[] = [
  {
    id: "fuerza",
    title: "Fuerza y músculo",
    description: "Proteína, creatina y aminoácidos para sesiones de carga.",
    image: "/goals/strength.jpg",
    imageAlt: "Atleta realizando una zancada con kettlebell en un gimnasio oscuro",
  },
  {
    id: "rendimiento",
    title: "Rendimiento deportivo",
    description: "Pre-entrenos y enfoque para entrenar con intensidad.",
    image: "/goals/performance.jpg",
    imageAlt: "Atleta entrenando con cuerdas de batalla en un estudio oscuro",
  },
  {
    id: "peso",
    title: "Peso saludable",
    description: "Fórmulas de apoyo para composición corporal y hábitos.",
    image: "/goals/weight.jpg",
    imageAlt: "Atleta sosteniendo mancuernas a la altura de los hombros",
  },
  {
    id: "recuperacion",
    title: "Recuperación",
    description: "Magnesio, omega-3 y aminoácidos para el día después.",
    image: "/goals/recovery.jpg",
    imageAlt: "Atleta estirando con una banda elástica en un gimnasio en penumbra",
  },
];

export const products: Product[] = [
  {
    id: "ar-creatine",
    slug: "ar-creatine",
    name: "AR creatina",
    image: "/products/arcreatine.png",
    imageAlt: "Bote blanco de creatina",
    price: 36,
    salePrice: 120000,
    category: "vitaminas",
    goals: ["peso", "recuperacion"],
    campaigns: ["black-november"],
    inStock: true,
    servings: "30 servicios",
    surface: "dark",
    summary: "La creatina (y en particular la combinación creatina con L-arginina o suplementos etiquetados como Creatina AR) sirve principalmente para aumentar la energía rápida, la fuerza, el flujo sanguíneo y el rendimiento en ejercicios de alta intensidad, además de favorecer el crecimiento muscular y la recuperación.",
    details: [ ],
  },
  ...catalogOctoberProducts,
];
