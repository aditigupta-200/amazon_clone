//frontend/pages/productsDetailsPage.tsx
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Product } from '../../types/product';
import { getProductById } from '../../utils/api';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
}
const ProductDetailPage = ({ product }: ProductDetailProps) => { 
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Implement cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-[500px] object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <div>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="text-gray-600">(4 customer reviews)</span>
        </div>

        <p className="text-xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>

        <p className="text-gray-600">{product.description}</p>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 px-3 py-1 rounded-l"
            >
              -
            </button>
            <input 
              type="number" 
              value={quantity} 
              readOnly
              className="w-16 text-center border-y border-gray-200 py-1"
            />
            <button 
              onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
              className="bg-gray-200 px-3 py-1 rounded-r"
            >
              +
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="flex items-center bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            <ShoppingCart className="mr-2" /> Add to Cart
          </button>
        </div>

        <div className="text-sm text-gray-600">
          <p>Availability: 
            <span className={product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}>
              {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of Stock'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const productId = params?.id as string;
  const product = await getProductById(productId);
  return { props: { product } };
};

export default ProductDetailPage;