import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProducts } from '../utils/api';
import { Product } from '../types/product';
import ProductCard from '../components/ProductCard';

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { q, category } = router.query;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(q as string, category as string);
        setProducts(response);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    if (q || category) fetchProducts();
  }, [q, category]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found for your search.</p>
      )}
    </div>
  );
};

export default SearchPage;
