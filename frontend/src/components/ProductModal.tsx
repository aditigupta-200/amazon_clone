// import { Product } from '@/types/product';
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useAuth } from '@/context/AuthContext';
// import { toast } from 'react-hot-toast';

// export interface ProductModalProps {
//   product: Product;
//   onClose: () => void;
//   onUpdate?: (updatedProduct: Product) => void;
//   onDelete?: (productId: string) => void;
// }

// export default function ProductModal({ product, onClose, onUpdate, onDelete }: ProductModalProps) {
//   const imageUrls = Array.isArray(product.imageUrl) ? product.imageUrl : [product.imageUrl];
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const { user } = useAuth();

//   // For edit mode
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState<{
//     name: string;
//     category: string;
//     price: string;
//     description: string;
//     stockQuantity: string;
//     images: File[];
//     previewUrls: string[];
//   }>({
//     name: product.name,
//     category: product.category,
//     price: product.price.toString(),
//     description: product.description,
//     stockQuantity: product.stockQuantity.toString(),
//     images: [],
//     previewUrls: [],
//   });

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     let { name, value } = e.target;
//     if (name === 'price' || name === 'stockQuantity') {
//       value = Math.max(0, Number(value)).toString();
//     }
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);

//       // Validate file types and sizes (5MB limit)
//       const validFiles = files.filter((file) => {
//         const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
//         const isValidSize = file.size <= 5 * 1024 * 1024;
//         return isValidType && isValidSize;
//       });

//       if (validFiles.length !== files.length) {
//         alert('Some files were rejected. Please only upload images (JPG, PNG, WebP) under 5MB.');
//       }

//       const previewUrls = validFiles.map((file) => URL.createObjectURL(file));

//       setFormData((prev) => ({
//         ...prev,
//         images: validFiles,
//         previewUrls: previewUrls,
//       }));
//     }
//   };

//   const removeImage = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//       previewUrls: prev.previewUrls.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('stockQuantity', formData.stockQuantity);
//       formData.images.forEach((file) => formDataToSend.append('images', file));

//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/products/${product._id}`, {
//         method: 'PATCH',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update product');
//       }

//       const updatedProduct = await response.json();
//       toast.success('Product updated successfully!');
//       onUpdate?.(updatedProduct);
//       setIsEditing(false);
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to update product.');
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm('Are you sure you want to delete this product?')) return;
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/products/${product._id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete product');
//       }
//       toast.success('Product deleted successfully!');
//       onDelete?.(product._id);
//       onClose();
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to delete product.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
//         {isEditing ? (
//           <>
//             <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Product Name"
//               />
//               <input
//                 type="text"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleInputChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Category"
//               />
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Price"
//               />
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Description"
//               />
//               <input
//                 type="number"
//                 name="stockQuantity"
//                 value={formData.stockQuantity}
//                 onChange={handleInputChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Stock Quantity"
//               />
//               <input
//                 type="file"
//                 multiple
//                 accept="image/jpeg,image/png,image/webp"
//                 onChange={handleImageChange}
//                 className="w-full"
//               />
//               {formData.previewUrls.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.previewUrls.map((url, index) => (
//                     <div key={index} className="relative">
//                       <img src={url} alt={`Preview ${index + 1}`} className="w-20 h-20 object-cover rounded border" />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <div className="flex justify-end gap-2">
//                 <Button onClick={() => setIsEditing(false)} variant="outline">
//                   Cancel
//                 </Button>
//                 <Button onClick={handleSubmit}>Save Changes</Button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             <h2 className="text-2xl font-semibold">{product.name}</h2>

//             {/* Image Container with Navigation */}
//             <div className="relative my-4">
//               <img
//                 src={imageUrls[currentImageIndex]}
//                 alt={`${product.name} - Image ${currentImageIndex + 1}`}
//                 className="w-full h-64 object-cover rounded"
//               />
//               {imageUrls.length > 1 && (
//                 <>
//                   <button
//                     onClick={prevImage}
//                     className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
//                   >
//                     <ChevronLeft className="w-6 h-6" />
//                   </button>
//                   <button
//                     onClick={nextImage}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
//                   >
//                     <ChevronRight className="w-6 h-6" />
//                   </button>
//                 </>
//               )}
//               {imageUrls.length > 1 && (
//                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
//                   {imageUrls.map((_, index) => (
//                     <div
//                       key={index}
//                       className={`w-2 h-2 rounded-full transition-all ${
//                         currentImageIndex === index ? 'bg-black w-4' : 'bg-black/50'
//                       }`}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Thumbnail Gallery */}
//             {imageUrls.length > 1 && (
//               <div className="flex gap-2 mb-4 overflow-x-auto">
//                 {imageUrls.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`${product.name} - Thumbnail ${index + 1}`}
//                     className={`w-16 h-16 object-cover rounded cursor-pointer transition-all ${
//                       currentImageIndex === index ? 'border-2 border-blue-500' : 'border border-gray-200'
//                     }`}
//                     onClick={() => setCurrentImageIndex(index)}
//                   />
//                 ))}
//               </div>
//             )}

//             <p className="text-gray-700">{product.description}</p>
//             <p className="text-lg font-bold mt-4">₹{product.price.toFixed(2)}</p>
//             {product.stockQuantity > 0 ? (
//               <p className="text-sm text-green-600 mt-2">In Stock: {product.stockQuantity}</p>
//             ) : (
//               <p className="text-sm text-red-600 mt-2">Out of Stock</p>
//             )}
//             <div className="flex gap-2 mt-4">
//               <Button onClick={onClose} variant="outline" className="flex-1">
//                 Close
//               </Button>
//               {user?.id === product.uploadedBy && (
//                 <>
//                   <Button onClick={() => setIsEditing(true)} className="flex-1">
//                     Edit
//                   </Button>
//                   <Button onClick={handleDelete} variant="destructive" className="flex-1">
//                     Delete
//                   </Button>
//                 </>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { Product } from '@/types/product';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onUpdate?: (updatedProduct: Product) => void;
  onDelete?: (productId: string) => void;
}

export default function ProductModal({ product, onClose, onUpdate, onDelete }: ProductModalProps) {
  const imageUrls = Array.isArray(product.imageUrl) ? product.imageUrl : [product.imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Always allow editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    price: string;
    description: string;
    stockQuantity: string;
    images: File[];
    previewUrls: string[];
  }>({
    name: product.name,
    category: product.category || '',
    price: product.price.toString(),
    description: product.description,
    stockQuantity: product.stockQuantity.toString(),
    images: [],
    previewUrls: [],
  });

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;
    if (name === 'price' || name === 'stockQuantity') {
      // Ensure non-negative values
      value = Math.max(0, Number(value)).toString();
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter((file) => {
        const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
        return isValidType && isValidSize;
      });
      if (validFiles.length !== files.length) {
        alert('Some files were rejected. Please only upload images (JPG, PNG, WebP) under 5MB.');
      }
      const previewUrls = validFiles.map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        images: validFiles,
        previewUrls: previewUrls,
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      previewUrls: prev.previewUrls.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      // Create a FormData instance to send the fields and images
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('stockQuantity', formData.stockQuantity);
      formData.images.forEach((file) => formDataToSend.append('images', file));

      const token = localStorage.getItem('token');
      const response = await fetch(`/api/products?productId=${product._id}`, {
        method: 'PATCH',
        headers: {
          // The backend expects an Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const updatedProduct = await response.json();
      toast.success('Product updated successfully!');
      onUpdate?.(updatedProduct);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update product.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/products?productId=${product._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      toast.success('Product deleted successfully!');
      const productId = product._id || '';
      onDelete?.(productId);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete product.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        {isEditing ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Category"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Price"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Description"
              />
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Stock Quantity"
              />
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="w-full"
              />
              {formData.previewUrls.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Save Changes</Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            {/* Image Container with Navigation */}
            <div className="relative my-4">
              <img
                src={imageUrls[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-64 object-cover rounded"
              />
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
            <p className="text-lg font-bold mt-4">₹{product.price.toFixed(2)}</p>
            {product.stockQuantity > 0 ? (
              <p className="text-sm text-green-600 mt-2">In Stock: {product.stockQuantity}</p>
            ) : (
              <p className="text-sm text-red-600 mt-2">Out of Stock</p>
            )}
            <div className="flex gap-2 mt-4">
              <Button onClick={onClose} variant="outline" className="flex-1">
                Close
              </Button>
              <Button onClick={() => setIsEditing(true)} className="flex-1">
                Edit
              </Button>
              <Button onClick={handleDelete} variant="destructive" className="flex-1">
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
