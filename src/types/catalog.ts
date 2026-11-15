export const categoryIds = [
  "proteinas",
  "aminoacidos",
  "preentreno",
  "energia",
  "salud",
  "recuperacion",
  "vitaminas",
  "creatina",
  "otros",
] as const;

export const goalIds = ["fuerza", "rendimiento", "peso", "recuperacion"] as const;

export const campaignIds = ["black-november", "peak-force"] as const;

export type CategoryId = (typeof categoryIds)[number];
export type GoalId = (typeof goalIds)[number];
export type CampaignId = (typeof campaignIds)[number];
export type Surface = "light" | "dark";

export type Product = {
  id: string;
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  price: number;
  salePrice: number;
  category: CategoryId;
  goals: GoalId[];
  campaigns: CampaignId[];
  inStock: boolean;
  servings: string;
  surface: Surface;
  summary: string;
  details: string[];
};

export type Category = {
  id: CategoryId;
  label: string;
};

export type Goal = {
  id: GoalId;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};
