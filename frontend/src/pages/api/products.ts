import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db';
import { ProductModel } from '../../models/Product';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Define the decoded token structure
interface DecodedToken {
  id: string;
  email: string;
  role: 'admin' | 'user'; // Ensure role is part of the token
}

// Middleware function to verify token and attach user info
const authMiddleware = (req: NextApiRequest) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers
  if (!token) throw new Error('Unauthorized: No token provided from product.ts');
  
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken; // Verify and return decoded token
  } catch (error) {
    throw new Error('Unauthorized: Invalid token');
  }
};

// Middleware function to check if user is admin
const isAdmin = (user: DecodedToken) => {
  if (user.role !== 'admin') throw new Error('Access Denied: Admins only');
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  // Handle authentication and authorization
  try {
    if (req.method === 'POST') {
      // Perform authentication
      const user = authMiddleware(req);

      // Check if the user is an admin
      isAdmin(user);

      // Add product logic
      const product = await ProductModel.create(req.body);
      res.status(201).json(product);
      return;
    }

    if (req.method === 'GET') {
      const products = await ProductModel.find({});
      res.status(200).json(products);
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error: unknown) {
    // Type assertion to let TypeScript know that error is an instance of Error
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
