// types/index.ts
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  bestSeller: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}