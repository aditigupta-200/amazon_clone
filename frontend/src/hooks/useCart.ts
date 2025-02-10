import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';
import { CartItem, Product } from '../types/product';
import { updateProduct } from '../utils/api'; // Import update API function

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setStock: (productId: string, stockQuantity: number) => Promise<void>;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      // ✅ Updated `addItem` to handle stock updates
      addItem: async (product) => {
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
        });

        // ✅ Call `setStock` immediately when adding to cart
        await useCart.getState().setStock(product._id as string, product.stockQuantity - 1);


        // ✅ Show confirmation toast
        toast.success(`${product.name} added to cart!`);
      },

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

      // ✅ Updated `setStock` to update the backend
      setStock: async (productId: string, stockQuantity: number) => {
        try {
          await updateProduct(productId, { stockQuantity });

          // ✅ Optimistically update local state
          set((state) => ({
            items: state.items.map((item) =>
              item._id === productId ? { ...item, stockQuantity } : item
            ),
          }));
        } catch (error) {
          console.error("Failed to update stock:", error);
          toast.error("Failed to update stock.");
        }
      },
    }),
    {
      name: 'cart-storage', // persisting the cart state
    }
  )
);
