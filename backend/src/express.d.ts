import { JwtPayload } from 'jsonwebtoken';
import { User } from "../models/User"; 

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust type based on your implementation
    }
  }
}
