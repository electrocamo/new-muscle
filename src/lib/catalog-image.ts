const catalogImagePath = (process.env.NEXT_PUBLIC_CATALOG_IMAGE_PATH ?? "/products/catalog").replace(/\/+$/, "");

export function catalogImage(file: string) {
  return `${catalogImagePath}/${file.replace(/^\/+/, "")}`;
}
