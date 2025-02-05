// frontend/components/ProductForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '../types/product';
import { addProduct } from '../utils/api';
import { useProducts } from '../context/ProductContext';

const ProductForm = () => {
  const router = useRouter();
  const { addProduct: addProductToContext } = useProducts();
  const [formData, setFormData] = useState<Omit<Product, '_id'>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    stockQuantity: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log("token is",token);
      // Retrieve the token from local storage or wherever you store it
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      addProductToContext(newProduct);
      router.push('/products');
 // Navigate to the category page
 if (formData.category) {
      router.push(`/categories/${formData.category.toLowerCase()}`);
    }    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product, please try again!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2">Product Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Price</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Image URL</label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Books">Books</option>
          <option value="Toys & Games">Toys & Games</option>
          <option value="Beauty">Beauty</option>
          <option value="Sports">Sports</option>
          <option value="Automotive">Automotive</option>
          <option value="Health">Health</option>
          <option value="Pet Supplies">Pet Supplies</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Stock Quantity</label>
        <input
          type="number"
          value={formData.stockQuantity}
          onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;