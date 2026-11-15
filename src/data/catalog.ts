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
    imageAlt: "Bote blanco de multivitamínico Multi Atleta New Muscle",
    price: 36,
    salePrice: 31.68,
    category: "vitaminas",
    goals: ["peso", "recuperacion"],
    campaigns: ["black-november"],
    inStock: true,
    servings: "30 servicios",
    surface: "dark",
    summary: "Multivitamínico diario con minerales para cubrir huecos de una dieta de entreno.",
    details: [
      "Una toma con el desayuno.",
      "No reemplaza fruta, verdura ni una analítica.",
      "Revisa el hierro y la vitamina A si ya tomas otro complejo.",
    ],
  },
  ...catalogOctoberProducts,
];
