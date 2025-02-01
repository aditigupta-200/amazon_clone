//frontend/pages/products/index.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '../../types/product';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../utils/api';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{[key: string]: number}>({});

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

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      // Ensure product._id exists and convert to string
      const productId = product._id ? product._id.toString() : 'unknown';
      return {
        ...prevCart,
        [productId]: (prevCart[productId] || 0) + 1
      };
    });
  };

  return (
    <div className= "min-h-screen bg-gray-100 px-6">
      <div className="flex justify-between items-center mb-8 py-2">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <div className="flex space-x-4">
          <Link href="/products/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add New Product
          </Link>
          <Link href="/cart" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            View Cart ({Object.keys(cart).length})
          </Link>
        </div>
      </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {Array.isArray(products) &&
          products.map(
            (product) =>
              product._id && (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              )
          )}
      </div>
    </div>
  );
};

export default ProductsPage;