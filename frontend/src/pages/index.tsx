// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ChevronRight, ChevronLeft } from 'lucide-react';
// import { GetServerSideProps } from 'next';
// import { getProducts } from '../utils/api';
// import { Product } from '../types/product';
// import { useAuth } from '../context/AuthContext';
// import { useProducts } from '../context/ProductContext';

// interface HomePageProps {
//   featuredProducts: Product[];
// }

// const HomePage = ({ featuredProducts }: HomePageProps) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const { user } = useAuth();

//   const carouselImages = [
//     '/images/c1.jpg',
//     '/images/c2.jpg',
//     '/images/c3.jpg',
//     '/images/c4.jpg',
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [carouselImages.length]);

//   const featuredProducts = [
//     ...initialFeaturedProducts,
//     ...products
//   ].slice(0, 6);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [carouselImages.length]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Hero Carousel */}
//       <div className="relative w-full pt-6">
//         <div className="relative w-full h-[50vh] md:h-[70vh]">
//           {carouselImages.map((image, index) => (
//             <div
//               key={index}
//               className={`absolute w-full h-full transition-opacity duration-500 ${
//                 currentImageIndex === index ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               <Image
//                 src={image}
//                 alt={`Carousel image ${index + 1}`}
//                 fill
//                 className="object-cover"
//                 priority={index === 0}
//               />
//             </div>
//           ))}

//           {/* Carousel Navigation */}
//           <button
//             onClick={() =>
//               setCurrentImageIndex((prev) =>
//                 prev === 0 ? carouselImages.length - 1 : prev - 1
//               )
//             }
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//           <button
//             onClick={() =>
//               setCurrentImageIndex((prev) =>
//                 prev === carouselImages.length - 1 ? 0 : prev + 1
//               )
//             }
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         </div>
//       </div>

//          <div className="max-w-7xl mx-auto px-4 py-8">
//         <section>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Featured Products</h2>
//             <Link href="/products" className="text-blue-600 hover:text-blue-700">
//               See More <ChevronRight className="w-4 h-4 inline" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {featuredProducts.map((product, index) => (
//               <div key={product._id || index} className="border rounded-lg p-4">
//                 <Image
//                   src={product.imageUrl || '/placeholder-image.jpg'}
//                   alt={product.name}
//                   width={300}
//                   height={300}
//                   className="w-full h-auto object-cover rounded-lg"
//                 />
//                 <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
//                 <p className="text-gray-600">${product.price.toFixed(2)}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const products = await getProducts();
//     const featuredProducts = products.slice(0, 6);
//     return {
//       props: {
//         initialFeaturedProducts: featuredProducts
//       }
//     };
//   } catch (error) {
//     console.error('Failed to fetch products:', error);
//     return {
//       props: {
//         initialFeaturedProducts: []
//       }
//     };
//   }
// };

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../utils/api";

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const carouselImages = [
    "/images/c1.jpg",
    "/images/c2.jpg",
    "/images/c3.jpg",
    "/images/c4.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      // Ensure product._id exists and convert to string
      const productId = product._id ? product._id.toString() : "unknown";
      return {
        ...prevCart,
        [productId]: (prevCart[productId] || 0) + 1,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Carousel */}
      <div className="relative w-full pt-6">
        <div className="relative w-full h-[50vh] md:h-[70vh]">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                currentImageIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Carousel image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Carousel Navigation */}
          <button
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? carouselImages.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === carouselImages.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default HomePage;
