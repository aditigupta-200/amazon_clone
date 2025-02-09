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

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  try {
    const response = await fetch(`${API_PRODUCT_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product)
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
      method: 'DELETE'
    });
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

export const addProduct = async (productData: Omit<Product, '_id'>): Promise<Product> => {
  try {
    const response = await fetch(API_PRODUCT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    const data: Product = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to add product');
  }
};

export const getProducts = async (q = '', category = '') => {
  try {
    const query = `q=${q}&category=${category}`;
    const response = await fetch(`/api/products?${query}`);
    return response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string) => {
  const response = await fetch(`/api/products?category=${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};