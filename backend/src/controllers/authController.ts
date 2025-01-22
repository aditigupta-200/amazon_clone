import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'; // Import IUser type from the User model

const generateToken = (id: string) => jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
      res.status(201).json({
        _id: (user as IUser)._id, // Explicitly cast user to IUser
        name: user.name,
        email: user.email,
        token: generateToken((user as IUser)._id.toString()), // Ensure _id is converted to a string
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: (user as IUser)._id, // Explicitly cast user to IUser
        name: user.name,
        email: user.email,
        token: generateToken((user as IUser)._id.toString()), // Ensure _id is converted to a string
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
