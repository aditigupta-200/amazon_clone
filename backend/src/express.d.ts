import { JwtPayload } from 'jsonwebtoken';
import { User } from "../models/User"; 

declare global {
  namespace Express {
    interface Request {
      user?: User | JwtPayload; // Adjust type based on your implementation
    }
  }
}
