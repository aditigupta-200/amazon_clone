import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';
import connectDB from '../config/db';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

interface ProductType {
  name: string;
  price: number;
  description: string;
  image: string;
}

// Product data to seed
const products: ProductType[] = [
  {
    name: 'Apple iPhone 14',
    price: 999,
    description: 'The latest iPhone with an advanced camera system and powerful performance.',
    image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone14pro',
  },
  {
    name: 'Sony WH-1000XM5',
    price: 399,
    description: 'Premium noise-canceling headphones with exceptional sound quality.',
    image: 'https://m.media-amazon.com/images/I/61+Q6Rh3OQL._AC_SY355_.jpg',
  },
  {
    name: 'Samsung Galaxy S23',
    price: 899,
    description: 'Samsung’s flagship smartphone with a stunning design and great performance.',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/galaxy-s23',
  },
];

const seedProducts = async () => {
  try {
    // Delete all existing products
    await Product.deleteMany();

    // Insert new product data
    await Product.insertMany(products);

    console.log('Products seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seeding script
seedProducts();
