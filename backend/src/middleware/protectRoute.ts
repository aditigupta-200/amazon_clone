import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';  // Adjust based on your user model path

interface JwtPayload {
  userId: string;
}

// Middleware to protect routes by checking if the user is authenticated
export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
 let token = req.headers.authorization?.split(' ')[1];   
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  token = token.replace('Bearer ', '');  // Remove "Bearer " prefix if it's present

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;  // Verify JWT using your secret
    req.user = decoded;  // Attach user data to the request (optional)
    
    // Optionally, you can fetch the user from the database if needed
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next();  // User is authenticated, proceed to the next middleware/route handler
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
