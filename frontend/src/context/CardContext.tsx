// import { createContext, useContext, useState, ReactNode } from "react";

// interface Product {
//   _id?: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   category: string;
//   stockQuantity: number;
//   createdAt?: Date;
//   updatedAt?: Date;

// }

// interface CartItem {
//   _id: string;
//   productId: Product;
//   quantity: number;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const addToCart = (item: CartItem) => {
//     setCart([...cart, item]);
//   };

//   const removeFromCart = (id: string) => {
//     setCart(cart.filter((item) => item._id !== id));
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };


'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}