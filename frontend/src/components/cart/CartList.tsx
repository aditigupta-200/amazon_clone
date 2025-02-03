// src/components/cart/CartList.tsx
'use client';

import { useCart } from '@/hooks/useCart';
import { CartItem } from './CartItem';

export function CartList() {
  const items = useCart((state) => state.items);

  if (items.length === 0) {
    return <p className="text-center text-muted-foreground">Your cart is empty</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}