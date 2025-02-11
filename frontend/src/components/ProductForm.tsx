import React, { useState } from "react";
import { useRouter } from "next/router";
import { useProducts } from "../context/ProductContext";

const ProductForm = () => {
  const router = useRouter();
  const { addProduct: addProductToContext } = useProducts();

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: number;
    category: string;
    stockQuantity: number;
    images: File[];
    previewUrls: string[];
  }>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stockQuantity: 0,
    images: [],
    previewUrls: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    if (name === "price" || name === "stockQuantity") {
      value = Math.max(0, Number(value)).toString();
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      // Validate file types and sizes
      const validFiles = files.filter(file => {
        const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
        return isValidType && isValidSize;
      });

      if (validFiles.length !== files.length) {
        alert('Some files were rejected. Please only upload images (JPG, PNG, WebP) under 5MB.');
      }

      const previewUrls = validFiles.map(file => URL.createObjectURL(file));

      setFormData(prev => ({
        ...prev,
        images: validFiles,
        previewUrls: previewUrls,
      }));
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const formDataObj = new FormData();

  // Append all form fields except images
  Object.entries(formData).forEach(([key, value]) => {
    if (key !== 'images' && key !== 'previewUrls' && value !== null) {
      formDataObj.append(key, value as any);
    }
  });

  // Append each image file (Ensure multiple files are sent)
  formData.images.forEach((file) => {
    formDataObj.append('images', file);  // This should match the backend field name
  });

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataObj,
    });

    const responseText = await response.text();
    console.log(responseText);

    if (!response.ok) {
      const errorData = JSON.parse(responseText);
      throw new Error(errorData.message || "Failed to add product");
    }

    const newProduct = JSON.parse(responseText);
    addProductToContext(newProduct);
    
    // Clean up preview URLs
    formData.previewUrls.forEach(url => URL.revokeObjectURL(url));
    
    router.push("/products");
  } catch (error) {
    console.error("Error adding product:", error);
    alert(error instanceof Error ? error.message : "Failed to add product, please try again!");
  }
};



  // Clean up preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      formData.previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      previewUrls: prev.previewUrls.filter((_, i) => i !== index),
    }));
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
        <label className="block mb-2">Price (₹)</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-2 border rounded" required min="0" />
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
        <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleInputChange} className="w-full p-2 border rounded" required min="0" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Product Images</label>
        <input 
          type="file" 
          multiple 
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange} 
          className="w-full p-2 border rounded"
          required={formData.images.length === 0}
        />
        <p className="text-sm text-gray-500 mt-1">
          Upload up to 5 images (JPG, PNG, WebP) - Max 5MB each
        </p>
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
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={formData.images.length === 0}
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;