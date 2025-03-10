import { CartItem, Product } from "../types";

export const CartReducer = (
  state: CartItem[],
  action: { payload: CartItem; type: string }
) => {
  if (action.type === "ADD_TO_CART") {
    const existingItem = state.find((item) => item.id === action.payload.id);
    if (existingItem) {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + action.payload.quantity };
        }
        return item;
      });
    } else {
      return [
        ...state,
        { ...action.payload, quantity: action.payload.quantity },
      ];
    }
  }

  if (action.type === "REMOVE_FROM_CART") {
    return state.filter((item) => item.id !== action.payload.id);
  }

  if (action.type === "INCREMENT_QUANTITY") {
    return state.map((item) => {
      if (item.id === action.payload.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
  }

  if (action.type === "DECREMENT_QUANTITY") {
    return state.map((item) => {
      if (item.id === action.payload.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
  }

  return state;
};

export const FavoriteReducer = (
  state: Product[],
  action: { payload: Product; type: string }
) => {
  if (action.type === "ADD_TO_FAVORITES") {
    const existingItem = state.find((item) => item.id === action.payload.id);
    if (!existingItem) {
      return [...state, action.payload];
    }
  }

  if (action.type === "REMOVE_FROM_FAVORITES") {
    return state.filter((item) => item.id !== action.payload.id);
  }

  return state;
};

export const ModalReducer = (
  state: { isOpen: boolean; children: React.ReactNode },
  action: { type: string; payload: React.ReactNode }
) => {
  if (action.type === "OPEN_MODAL") {
    return { isOpen: true, children: action.payload };
  }
  if (action.type === "CLOSE_MODAL") {
    return { isOpen: false, children: null };
  }
  return state;
};
