import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import ProductModal from '@/components/ProductModal';
import { useAuth } from '../context/AuthContext';
import { useRouter } from "next/router";


export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);
  const setStock = useCart((state) => state.setStock);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const handleAddToCart = () => {
     if (!user) {
    router.push('/auth/login');
    return;
  }
    if (!product._id) {
      console.error("Product ID is missing:", product);
      return;
    }
    addItem(product);
    if (product.stockQuantity > 0) {
      setStock(product._id, product.stockQuantity - 1);
    }
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      className="relative group bg-white border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 p-2 bg-white">
        <img
          src={product.imageUrl ?? '/fallback-image.jpg'}
          alt={product.name ?? 'Product Image'}
          className="w-full h-full object-cover border rounded"
        />
      </div>

      <div className="p-4 flex flex-col h-[calc(400px-192px)]">
        <div className="mb-2">
          <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h2>

        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                product.stockQuantity > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {product.stockQuantity > 0
                ? `In Stock: ${product.stockQuantity}`
                : 'Out of Stock'}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleAddToCart}
              className="flex-1"
              disabled={product.stockQuantity === 0}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="flex-1"
            >
              View
            </Button>
          </div>
        </div>
      </div>

      {product.stockQuantity < 5 && product.stockQuantity > 0 && (
        <div className="absolute -right-8 top-4 bg-red-500 text-white px-8 py-1 rotate-45 transform text-sm font-semibold">
          Low Stock
        </div>
      )}

      {isModalOpen && <ProductModal product={product} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
