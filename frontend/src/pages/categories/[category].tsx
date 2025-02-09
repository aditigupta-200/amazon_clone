import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "../../types/product";
import { getProductsByCategory } from "../../utils/api";
import ProductCard from "../../components/ProductCard"; // Create a reusable ProductCard component for displaying individual products

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { category } = router.query; // Get the category from the URL
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      setLoading(true);
      getProductsByCategory(category as string) // Fetch products by category
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch products:", error);
          setLoading(false);
        });
    }
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{category} Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
