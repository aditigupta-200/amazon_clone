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
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or sessionStorage
    console.log("token is ",token);
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(API_PRODUCT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach token
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to add product');
  }
};


export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_PRODUCT_URL);
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};