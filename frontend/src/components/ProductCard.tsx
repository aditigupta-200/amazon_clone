import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group bg-white border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 p-2 bg-white">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-fit border rounded"
        />
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col h-[calc(400px-192px)]">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Product Info */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h2>

        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>

        {/* Bottom Section */}
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
        </div>
      </div>

      {/* Side ribbon for new products or special offers */}
      {product.stockQuantity < 5 && product.stockQuantity > 0 && (
        <div className="absolute -right-8 top-4 bg-red-500 text-white px-8 py-1 rotate-45 transform text-sm font-semibold">
          Low Stock
        </div>
      )}
    </div>
  );
};

export default ProductCard;
