import { Product } from '@/types/product';
import React from 'react';
import { Button } from '@/components/ui/button';

export interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <img src={product.imageUrl} alt={product.name} className="w-full my-4 rounded" />
        <p className="text-gray-700">{product.description}</p>
        <p className="text-lg font-bold mt-4">${product.price.toFixed(2)}</p>
        <Button onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </div>
    </div>
  );
}
