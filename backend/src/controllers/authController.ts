import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    // Hash the password and save the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Validate the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      message: 'Login successful',
      token, 
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Logout a user
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Logout logic typically involves client-side token invalidation
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Error logging out user' });
  }
};
