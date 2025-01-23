import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

interface DecodedToken {
  id: string;
  email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
   res.status(401).json({ error: 'Unauthorized: No token provided' });
  return ;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.user = decoded; // TypeScript now recognizes `req.user`
    next();
  } catch (error) {
     res.status(401).json({ error: 'Unauthorized: Invalid token' });
  return
  }
};
