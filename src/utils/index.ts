import type { ProductToParse } from "@/types";
import type { OrderToParse } from "@/types";

export function parseProducts(products: ProductToParse[]) {
  return products.map((product) => ({
    ...product,
    colors: JSON.parse(product.colors),
    sizes: product.sizes.split(",").map((size) => size.trim()),
  }));
}

export function parseOrders(orders: OrderToParse[]) {
  return orders.map((order) => ({
    ...order,
    shipping_address: JSON.parse(order.shipping_address),
    billing_address: JSON.parse(order.billing_address),
    created_at: new Date(order.created_at),
    cart: JSON.parse(order.cart),
  }));
}
