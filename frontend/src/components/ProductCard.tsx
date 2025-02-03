// //frontend/components/ProductCard.tsx
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Product } from '../types/product';
// import { ShoppingCart, Eye } from 'lucide-react';
// import { useCart } from '@/hooks/useCart';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';

// interface ProductCardProps {
//   product: Product;
//   // onAddToCart: (product: Product) => void;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const addItem = useCart((state) => state.addItem);
//   return (
//     <div
//       className="relative group bg-white border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-[500px] flex flex-col"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image Container */}
//       <div className="relative h-64 p-2 bg-white">
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="w-full h-full object-cover border rounded"
//         />
//       </div>

//       {/* Content Container */}
//       <div className="p-4 flex-grow flex flex-col">
//         {/* Category Badge */}
//         <div className="mb-2">
//           <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//             {product.category}
//           </span>
//         </div>

//         {/* Product Info */}
//         <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
//           {product.name}
//         </h2>

//         <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
//           {product.description}
//         </p>

//         {/* Bottom Section */}
//         <div className="mt-auto">
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-xl font-bold text-gray-900">
//               ${product.price.toFixed(2)}
//             </span>
//             <span
//               className={`text-sm px-2 py-1 rounded-full ${
//                 product.stockQuantity > 0
//                   ? 'bg-green-100 text-green-800'
//                   : 'bg-red-100 text-red-800'
//               }`}
//             >
//               {product.stockQuantity > 0
//                 ? `In Stock: ${product.stockQuantity}`
//                 : 'Out of Stock'}
//             </span>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-2">
//             <Link
//               href={`/products/${product._id}`}
//               className="flex-1 flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//             >
//               <Eye className="mr-2 w-5 h-5" /> View Details
//             </Link>
//             <button
//                onClick={() => addItem(product)}
//               disabled={product.stockQuantity === 0}
//               className="flex-1 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <ShoppingCart className="mr-2 w-5 h-5" /> Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Side ribbon for new products or special offers */}
//       {product.stockQuantity < 5 && product.stockQuantity > 0 && (
//         <div className="absolute -right-8 top-4 bg-red-500 text-white px-8 py-1 rotate-45 transform text-sm font-semibold">
//           Low Stock
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCard;

 // components/ProductCard.tsx
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="aspect-square relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-lg font-bold mt-2">${product.price}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        {onAddToCart && (
          <Button 
            onClick={() => onAddToCart(product)} 
            className="w-full"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}