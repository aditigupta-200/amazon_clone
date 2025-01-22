// frontend/pages/products/index.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '../../types/product';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../utils/api';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/products/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        
            Add New Product
         
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(products) && products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;