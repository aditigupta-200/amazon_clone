// frontend/types/product.ts
export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string[];
  category?: string;
  stockQuantity: number;
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface CartItem extends Product {
  quantity: number;
}