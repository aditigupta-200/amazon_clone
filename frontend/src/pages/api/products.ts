import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db';
import { ProductModel } from '../../models/Product';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

interface DecodedToken {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

// Middleware function to verify the token and return user info
const authMiddleware = (req: NextApiRequest): DecodedToken => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('Unauthorized: No token provided');

  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch {
    throw new Error('Unauthorized: Invalid token');
  }
};

// Function to check if the user has admin privileges
const isAdmin = (user: DecodedToken) => {
  if (user.role !== 'admin') throw new Error('Access Denied: Admins only');
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    if (req.method === 'POST') {
      // Authorization check
      const user = authMiddleware(req);
      isAdmin(user);

      // Validate request body
      const { name, category, price, description } = req.body;
      if (!name || !category || !price) {
        res.status(400).json({ error: 'Missing required fields: name, category, or price' });
        return;
      }

      const product = await ProductModel.create(req.body);
      res.status(201).json(product);
      return;
    }

    if (req.method === 'GET') {
      const { q, category } = req.query;
      const filter: any = {};

      // Search by name (case-insensitive)
      if (q) filter.name = { $regex: q.toString(), $options: 'i' };

      // Filter by category (ignore "All Categories")
      if (category && category !== 'All Categories') filter.category = category;

      const products = await ProductModel.find(filter);
      res.status(200).json(products);
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    if (error.message.includes('Unauthorized') || error.message.includes('Access Denied')) {
      res.status(403).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message || 'Unknown server error' });
    }
  }
}
