export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  collection: string;
  image: string;
  old_price: number;
  brand: string;
  rating: number;
  sizes: string[];
  colors: { label: string; value: string }[];
}
export interface ProductToParse {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  collection: string;
  image: string;
  old_price: number;
  brand: string;
  rating: number;
  sizes: string;
  colors: string;
}

export interface Order {
  id: number;
  email: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  billing_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  payment_method: string;
  total: number;
  cart: object[];
  created_at: Date;
}

export interface OrderToParse {
  id: number;
  email: string;
  shipping_address: string;
  billing_address: string;
  payment_method: string;
  total: number;
  cart: string;
  created_at: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price_per_unit: number;
  total_price: number;
  quantity: number;
  image: string;
}
