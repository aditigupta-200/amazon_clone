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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataObj = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) formDataObj.append(key, value as any);
    });
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
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
      <div className="mb-4">
        <label className="block mb-2">Product Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Category</label>
        <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border rounded" required>
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
        <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleInputChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Product Image</label>
        <input type="file" onChange={handleImageChange} required />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;