import type { ProductToParse } from "@/types";

export function parseProducts(products: ProductToParse[]) {
  return products.map((product) => ({
    ...product,
    colors: product.colors.split(",").map((color) => color.trim()),
    sizes: product.sizes.split(",").map((size) => size.trim()),
  }));
}
