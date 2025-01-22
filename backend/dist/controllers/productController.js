"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = exports.uploadProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
// Upload a product
const uploadProduct = async (req, res, next) => {
    try {
        const { name, description, price, imageUrl, category } = req.body;
        const product = new Product_1.default({
            name,
            description,
            price,
            imageUrl,
            category,
        });
        await product.save();
        return res.status(201).json({ product });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadProduct = uploadProduct;
// Get all products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product_1.default.find();
        return res.status(200).json({ products });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProducts = getAllProducts;
// Get a single product by ID
const getProductById = async (req, res, next) => {
    try {
        const product = await Product_1.default.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ product });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
