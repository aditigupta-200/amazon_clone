const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const fetchProducts = async () => {
  return [
    { id: 1, name: 'Product 1', price: '$50', imageUrl: 'https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 2, name: 'Product 2', price: '$75', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 3, name: 'Product 3', price: '$100', imageUrl: 'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' },
    
    { id: 4, name: 'Product 4', price: '$100', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' },
    
    { id: 5, name: 'Product 5', price: '$100', imageUrl: 'https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D' },
    { id: 6, name: 'Product 6', price: '$100', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D' },
    
    { id: 7, name: 'Product 7', price: '$100', imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww' },
    { id: 8, name: 'Product 8', price: '$100', imageUrl: 'https://media.istockphoto.com/id/611997004/photo/indian-traditional-gold-necklace.webp?a=1&b=1&s=612x612&w=0&k=20&c=zcnVZ-Pq6yBtf5i-phRy0C-KQmD8Z2JsA6LGHanAW-M=' },
    { id: 9, name: 'Product 9', price: '$100', imageUrl: 'https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D' },

    // Add more product data...
  ];
};

// frontend/utils/api.ts
import { Product } from '../types/product'
const API_PRODUCT_URL = '/api/products';
export const addProduct = async (productData: Omit<Product, '_id'>) => {
  try {
    const response = await fetch(API_PRODUCT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Failed to add product');
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(API_PRODUCT_URL);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};