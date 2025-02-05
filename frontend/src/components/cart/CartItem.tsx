import React from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/product';
import { useCart } from '../../hooks/useCart';  // Correct import

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const setStock = useCart((state) => state.setStock);

  const handleUpdateQuantity = (quantity: number) => {
    if (item._id) {
      const quantityChange = quantity - (item.quantity || 1);
      setStock(item._id, item.stockQuantity - quantityChange);
      updateQuantity(item._id, Math.max(1, quantity));
    }
  };

  const handleRemoveItem = () => {
    if (item._id) {
      setStock(item._id, item.stockQuantity + (item.quantity || 1));
      removeItem(item._id);
    }
  };

  const itemTotal = item.price * (item.quantity || 1);

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <div className="relative w-24 h-24">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground">
          ${itemTotal.toFixed(2)} (${item.price} each)
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdateQuantity((item.quantity || 1) - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity || 1}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdateQuantity((item.quantity || 1) + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={handleRemoveItem}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
