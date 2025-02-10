import { Product } from '@/types/product';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const imageUrls = Array.isArray(product.imageUrl) ? product.imageUrl : [product.imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? imageUrls.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        
        {/* Image Container with Navigation */}
        <div className="relative my-4">
          <img
            src={imageUrls[currentImageIndex]}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-64 object-cover rounded"
          />
          
          {/* Navigation Buttons */}
          {imageUrls.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Pagination Dots */}
          {imageUrls.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {imageUrls.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index ? 'bg-black w-4' : 'bg-black/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {imageUrls.length > 1 && (
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {imageUrls.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} - Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded cursor-pointer transition-all ${
                  currentImageIndex === index ? 'border-2 border-blue-500' : 'border border-gray-200'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}

        <p className="text-gray-700">{product.description}</p>
        <p className="text-lg font-bold mt-4">
          ₹{product.price.toFixed(2)}
        </p>
        {product.stockQuantity > 0 ? (
          <p className="text-sm text-green-600 mt-2">In Stock: {product.stockQuantity}</p>
        ) : (
          <p className="text-sm text-red-600 mt-2">Out of Stock</p>
        )}
        <Button onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </div>
    </div>
  );
}