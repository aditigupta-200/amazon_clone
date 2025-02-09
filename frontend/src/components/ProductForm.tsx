// Frontend: ProductForm.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useProducts } from '../context/ProductContext';

const ProductForm = () => {
  const router = useRouter();
  const { addProduct: addProductToContext } = useProducts();
  
 const [formData, setFormData] = useState<{
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  image: File | null;
}>({
  name: '',
  description: '',
  price: 0,
  category: '',
  stockQuantity: 0,
  image: null,
});
console.log("image", formData.image);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("lets check");
    
    const formDataObj = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      console.log("value", value);
      console.log("key", key);
      
      // if (value !== null)
        formDataObj.append(key, value as any);
    });
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'headers':"multipart/form-data"
        },
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      addProductToContext(newProduct);
      router.push('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product, please try again!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <input type="file" onChange={handleImageChange} required />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;