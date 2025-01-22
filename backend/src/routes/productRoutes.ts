// routes/productRoutes.ts
import express from 'express';
import { 
  getProducts, 
  getFeaturedProducts, 
  getBestSellers 
} from '../controllers/productController';

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/best-sellers', getBestSellers);

export default router;