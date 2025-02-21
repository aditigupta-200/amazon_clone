import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import ProductModal from '@/components/ProductModal';
import { useAuth } from '../context/AuthContext';
import { useRouter } from "next/router";
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  const imageUrls = Array.isArray(product.imageUrl) ? product.imageUrl : [product.imageUrl];
  const [selectedImage, setSelectedImage] = useState(imageUrls[0] || '/fallback-image.jpg');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = async() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (!product._id) {
      console.error("Product ID is missing:", product);
      return;
    }
    addItem(product);


     try {
    const response = await fetch(`/api/products/${product._id}`, { method: 'GET' });
    const updatedProduct = await response.json();
    
    if (updatedProduct.stockQuantity > 0) {
      addItem(updatedProduct);
      setStock(updatedProduct._id, updatedProduct.stockQuantity - 1);
      toast.success(`${updatedProduct.name} added to cart!`);
    } else {
      toast.error("This product is out of stock.");
    }
  } catch (error) {
    console.error("Error fetching updated product stock:", error);
    toast.error("Could not add to cart.");
    }
    
    toast.success(`${product.name} added to cart!`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
    setSelectedImage(imageUrls[currentImageIndex === imageUrls.length - 1 ? 0 : currentImageIndex + 1]);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
    setSelectedImage(imageUrls[currentImageIndex === 0 ? imageUrls.length - 1 : currentImageIndex - 1]);
  };

  return (
    <div
      className="relative group bg-white border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Display */}
      <div className="relative h-48 p-2 bg-white flex justify-center items-center">
        <img
          src={selectedImage}
          alt={product.name ?? 'Product Image'}
          className="w-full h-full object-cover border rounded"
        />
      </div>

      {imageUrls.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {imageUrls.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {imageUrls.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Image Thumbnails */}
      {imageUrls.length > 1 && (
        <div className="flex mt-2 space-x-2 overflow-x-auto px-2">
          {imageUrls.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              className={`w-12 h-12 object-cover border rounded cursor-pointer ${
                selectedImage === image ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      )}

      <div className="p-4 flex flex-col h-[calc(500px-300px)]">
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
              ₹{product.price.toFixed(2)}
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

