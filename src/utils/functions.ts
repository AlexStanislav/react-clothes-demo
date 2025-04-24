import type { OrderToParse, ProductToParse } from "../types";
import { useState, useEffect, useRef } from "react";

export function parseProducts(products: ProductToParse[]) {
  return products.map((product) => {
    return {
      ...product,
      colors: JSON.parse(product.colors).map(
        (color: { label: string; value: string }) => color.value.trim()
      ),
      sizes: product.sizes
        .replace(/[\\\\[\]"]/g, "")
        .split(",")
        .map((size) => size.trim()),
    };
  });
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

export function useComponentVisible(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
