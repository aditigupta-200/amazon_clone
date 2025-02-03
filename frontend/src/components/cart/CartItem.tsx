// components/cart/CartItem.tsx
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/product';

interface CartItemProps {
  id?: string;
  item: CartItemType;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export function CartItem({ id, item, updateQuantity, removeItem }: CartItemProps) {
  const handleUpdateQuantity = (id: string | undefined, quantity: number) => {
    if (id) updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string | undefined) => {
    if (id) removeItem(id);
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <div className="relative w-24 h-24">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="object-cover rounded w-full h-full"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground">${item.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity || 1}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => handleRemoveItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}