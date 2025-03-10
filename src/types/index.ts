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
  colors: string[];
}

export interface CartItem extends Product {
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
