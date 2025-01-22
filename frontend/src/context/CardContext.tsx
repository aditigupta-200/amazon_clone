// import React, { createContext, useContext, useReducer } from 'react';
// import { CartState, CartAction, CartItem } from '../types/cart';

// const initialState: CartState = {
//   items: [],
//   total: 0,
//   isOpen: false
// };

// function calculateTotal(items: CartItem[]): number {
//   return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
// }

// function cartReducer(state: CartState, action: CartAction): CartState {
//   switch (action.type) {
//     case 'ADD_ITEM':
//       const existingItem = state.items.find(item => item.id === action.payload.id);
      
//       if (existingItem) {
//         const updatedItems = state.items.map(item =>
//           item.id === action.payload.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//         return {
//           ...state,
//           items: updatedItems,
//           total: calculateTotal(updatedItems)
//         };
//       }
      
//       const newItems = [...state.items, action.payload];
//       return {
//         ...state,
//         items: newItems,
//         total: calculateTotal(newItems)
//       };

//     case 'REMOVE_ITEM':
//       const filteredItems = state.items.filter(item => item.id !== action.payload);
//       return {
//         ...state,
//         items: filteredItems,
//         total: calculateTotal(filteredItems)
//       };

//     case 'CLEAR_CART':
//       return {
//         ...state,
//         items: [],
//         total: 0
//       };

//     case 'TOGGLE_DRAWER':
//       return {
//         ...state,
//         isOpen: !state.isOpen
//       };

//     default:
//       return state;
//   }
// }

// const CartContext = createContext<{
//   state: CartState;
//   dispatch: React.Dispatch<CartAction>;
// } | undefined>(undefined);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// }