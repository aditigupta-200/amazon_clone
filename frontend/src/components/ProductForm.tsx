import { useState } from "react";
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
      const previewUrls = files.map(file => URL.createObjectURL(file));

      setFormData(prev => ({
        ...prev,
        images: files,
        previewUrls: previewUrls,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataObj = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        (value as File[]).forEach(file => formDataObj.append("images", file));
      } else if (value !== null) {
        formDataObj.append(key, value as any);
      }
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

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const newProduct = await response.json();
      addProductToContext(newProduct);
      router.push("/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product, please try again!");
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
        <input type="file" multiple onChange={handleImageChange} required />
        <div className="flex gap-2 mt-2">
          {formData.previewUrls.map((url, index) => (
            <img key={index} src={url} alt="Preview" className="w-20 h-20 object-cover rounded border" />
          ))}
        </div>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
