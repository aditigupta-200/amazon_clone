const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

import { Product } from '../types/product';

const API_PRODUCT_URL = '/api/products';

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_PRODUCT_URL}/${id}`);
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: Partial<Product>, images?: File[]): Promise<Product> => {
  try {
    const formData = new FormData();

    // Append product data
    Object.entries(productData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as any);
      }
    });

    // Handle image uploads
    if (images && images.length > 0) {
      images.forEach((image) => formData.append("images", image));
    }

    const response = await fetch(`${API_PRODUCT_URL}/${id}`, {
      method: 'PUT',
      body: formData,
    });

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await fetch(`${API_PRODUCT_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

export const addProduct = async (productData: Omit<Product, '_id' | 'imageUrl'>, images: File[]): Promise<Product> => {
  try {
    const formData = new FormData();

    // Append product data
    Object.entries(productData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as any);
      }
    });

    // Handle image uploads
    images.forEach((image) => formData.append("images", image));

    const response = await fetch(API_PRODUCT_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getProducts = async (q = '', category = '') => {
  try {
    const query = `q=${q}&category=${category}`;
    const response = await fetch(`${API_PRODUCT_URL}?${query}`);
    return response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await fetch(`${API_PRODUCT_URL}?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch products for category ${category}:`, error);
    throw error;
  }
};
