"use strict";
const User = require('../models/User'); // Adjust path as needed
const Product = require('../models/Product'); // Adjust path as needed
// Add to cart
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid product or quantity' });
    }
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const user = await User.findById(req.user._id);
        const existingItem = user.cart.find((item) => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            user.cart.push({ product: productId, quantity });
        }
        await user.save();
        res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Get cart items
const getCartItems = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product');
        res.status(200).json(user.cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = { addToCart, getCartItems };
