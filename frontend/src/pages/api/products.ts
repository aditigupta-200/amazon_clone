// frontend/pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db';
import { ProductModel } from '../../models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const products = await ProductModel.find({});
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
      break;

    case 'POST':
      try {
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
