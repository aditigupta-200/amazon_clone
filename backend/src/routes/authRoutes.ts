import express, { Request, Response } from 'express';  // Import necessary types
import { registerUser, loginUser } from '../controllers/authController';

const router = express.Router();

// POST route for user registration
router.post('/register', async (req: Request, res: Response) => {
  try {
    await registerUser(req, res);  // Use the controller function
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route for user login
router.post('/login', async (req: Request, res: Response) => {
  try {
    await loginUser(req, res);  // Use the controller function
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;


