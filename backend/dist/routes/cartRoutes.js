"use strict";
const express = require('express');
const { addToCart, getCartItems } = require('../controllers/cartController');
const { protectRoute } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/add', protectRoute, addToCart); // Add to cart
router.get('/', protectRoute, getCartItems); // Get cart items
module.exports = router;
