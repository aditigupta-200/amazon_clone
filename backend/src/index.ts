import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL, // Allow frontend's origin
  credentials: true, // Allow cookies if needed
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
