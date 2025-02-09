// Backend: products.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db';
import { ProductModel } from '../../models/Product';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { Readable } from 'stream';
import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface DecodedToken {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

const authMiddleware = (req: NextApiRequest): DecodedToken => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Received Token:", token); 
  
  if (!token) throw new Error('Unauthorized: No token provided');

  try {
 const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    console.log("✅ Token Decoded Successfully:", decoded);
    return decoded;
  } catch {
    throw new Error('Unauthorized: Invalid token in products.ts');
  }
};

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
      const user = authMiddleware(req);
      isAdmin(user);


      const form = formidable({ multiples: false });

      const formData = req.body;
            console.log({form})

      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(400).json({ error: 'File upload error' });
          return;
        }

        console.log({fields})

        const { name, category, price, description, stockQuantity, image } = fields;
        if (!name || !category || !price) {
          res.status(400).json({ error: 'Missing required fields' });
          return;
        }

        const file = files.image?.[0];
        if (!file) {
  res.status(400).json({ error: 'Image file is required' });
  return;
        }
        const fileBuffer = fs.readFileSync(file.filepath);
        // const stream = Readable.from(file.buffer);
        const uploadStream = cloudinaryV2.uploader.upload_stream(
          { folder: 'products' },
          async (error, result) => {
            if (error || !result) {
              res.status(500).json({ error: 'Image upload failed' });
              return;
            }
            
            const product = await ProductModel.create({
              name,
              category,
              price,
              description,
              stockQuantity,
             image,
              imageUrl: result.secure_url,
            });

            res.status(201).json(product);
          }
        );
        
Readable.from(fileBuffer).pipe(uploadStream);
      });
      return;
    }

    if (req.method === 'GET') {
      const { q, category } = req.query;
      const filter: any = {};

      if (q) filter.name = { $regex: q.toString(), $options: 'i' };
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