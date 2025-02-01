// frontend/types/product.ts
export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stockQuantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

