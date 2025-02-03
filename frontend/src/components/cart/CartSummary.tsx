// src/components/cart/CartSummary.tsx
'use client';

import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

export function CartSummary() {
  const items = useCart((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) return null;

  return (
    <div className="mt-8 rounded-lg border p-6">
      <h2 className="text-lg font-medium">Order Summary</h2>
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span className="font-medium">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full">Proceed to Checkout</Button>
      </div>
    </div>
  );
}
