// controllers/productController.ts
import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ featured: true }).limit(3);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getBestSellers = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ bestSeller: true }).limit(3);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
