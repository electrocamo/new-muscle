import { categories, goals, products } from "@/data/catalog";
import type { CategoryId, GoalId, Product } from "@/types/catalog";
import { categoryIds, goalIds } from "@/types/catalog";

export function discountPercent(product: Pick<Product, "price" | "salePrice">) {
  if (product.price <= 0) return 0;
  return Math.round((1 - product.salePrice / product.price) * 100);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((category) => category.id === id);
}

export function getGoal(id: GoalId) {
  return goals.find((goal) => goal.id === id);
}

export function isCategoryId(value: string | null): value is CategoryId {
  return categoryIds.some((id) => id === value);
}

export function isGoalId(value: string | null): value is GoalId {
  return goalIds.some((id) => id === value);
}

export function productsForGoal(goal: GoalId) {
  return products.filter((product) => product.goals.includes(goal));
}

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter((item) => item.slug !== product.slug && (item.category === product.category || item.goals.some((goal) => product.goals.includes(goal))))
    .slice(0, limit);
}
