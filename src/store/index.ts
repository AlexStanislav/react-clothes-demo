import React from "react";
import type { CartItem, Product } from "@/types";

export const ProductsContext = React.createContext({});
export const useProducts = () => React.useContext(ProductsContext);

export const CartInitialState: CartItem[] = [];
export const CartContext = React.createContext(CartInitialState);
export const CartDispatchContext = React.createContext<
  React.Dispatch<{ type: string; payload: CartItem }>
>(() => {});

export const useCart = () => [
  React.useContext(CartContext),
  React.useContext(CartDispatchContext),
];

export const FavoritesInitialState: Product[] = [];
export const FavoriteContext = React.createContext(FavoritesInitialState);
export const FavoriteDispatchContext = React.createContext<
  React.Dispatch<{ type: string; payload: Product }>
>(() => {});

export const useFavorites = () => [
  React.useContext(FavoriteContext),
  React.useContext(FavoriteDispatchContext),
];

export const StoreInitialContext = React.createContext({
  cart: CartInitialState,
  favorites: FavoritesInitialState,
});
export const StoreContext = React.createContext(StoreInitialContext);
export const StoreDispatchContext = React.createContext<
  React.Dispatch<{ type: string; payload: Product }>
>(() => {});

export const useStore = () => [
  React.useContext(StoreContext),
  React.useContext(StoreDispatchContext),
];

export const ModalInitialState = { isOpen: false, children: null };
export const ModalContext = React.createContext(ModalInitialState);
export const ModalDispatchContext = React.createContext<
  React.Dispatch<{ type: string, payload: React.ReactNode }>
>(() => {});

export const useModal = () => [
  React.useContext(ModalContext),
  React.useContext(ModalDispatchContext),
];
