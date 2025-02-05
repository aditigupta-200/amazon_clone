import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types/product';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setStock: (productId: string, stockQuantity: number) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item._id === product._id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),

      // This function is used to update stock when quantity is changed in cart or added to cart.
      setStock: (productId: string, stockQuantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id === productId ? { ...item, stockQuantity } : item
          ),
        })),
    }),
    {
      name: 'cart-storage', // persisting the cart state
    }
  )
);
