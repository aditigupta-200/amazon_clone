// pages/products/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/utils/api';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '../../context/AuthContext'; 

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { items, addItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    if (!product._id) return;
    addItem({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category || 'uncategorized',
      quantity: product.quantity,
      stockQuantity: product.stockQuantity,
    });
  };

  const handleAddProduct = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    router.push('/products/add');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6">
      <div className="flex justify-between items-center mb-8 py-2">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <div className="flex space-x-4 items-center">
          <button 
            onClick={handleAddProduct} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add New Product
          </button>
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center rounded-md text-sm font-medium"
          >
            <div className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              View Cart
              {cartItemCount > 0 && (
                <Badge variant="secondary" className="ml-1 bg-white text-green-600">
                  {cartItemCount}
                </Badge>
              )}
            </div>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(products) &&
          products.map((product) =>
            product._id ? (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ) : null
          )}
      </div>
    </div>
  );
};

export default ProductsPage;
