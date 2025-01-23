import express, { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController';
// import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Utility function for handling async routes.
 * Ensures that any errors in async functions are passed to the Express error handler.
 */
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// Public routes
router.post('/register', asyncHandler(async (req, res, next) => {
  await registerUser(req, res);
}));
router.post('/login', asyncHandler(async (req, res, next) => {
  await loginUser(req, res);
}));

// Protected routes
router.post('/logout', asyncHandler(async (req, res, next) => {
  await logoutUser(req, res);
}));

export default router;
