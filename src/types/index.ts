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
  colors: object[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  collection: string;
  image: string;
  old_price: number;
  brand: string;
  rating: number;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface CarouselItem {
  title: string;
  description: string;
  image: string;
  textPosition: { top: string; left: string; right: string; bottom: string };
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

export interface OrderItem extends Product {
  quantity: number;
  price_per_unit: number;
  total_price: number;
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
  cart: OrderItem[];
  created_at: Date;
  payment_method: string;
}
