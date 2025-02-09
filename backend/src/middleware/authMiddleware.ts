import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface DecodedToken {
  id: string;
  email: string;
  role: "admin" | "user"; // Added role field
}

// Extend Request to include user object
interface AuthRequest extends Request {
  user?: DecodedToken;
}

// General authentication middleware
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided from auth middleware" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
    return;
  }
};

// Admin-only middleware
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user data found" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }

  next();
};
