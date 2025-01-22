"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = __importDefault(require("../models/Product"));
const db_1 = __importDefault(require("../config/db"));
// Load environment variables
dotenv_1.default.config();
// Connect to the database
(0, db_1.default)();
// Product data to seed
const products = [
    {
        name: 'Apple iPhone 14',
        price: 999,
        description: 'The latest iPhone with an advanced camera system and powerful performance.',
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone14pro',
    },
    {
        name: 'Sony WH-1000XM5',
        price: 399,
        description: 'Premium noise-canceling headphones with exceptional sound quality.',
        image: 'https://m.media-amazon.com/images/I/61+Q6Rh3OQL._AC_SY355_.jpg',
    },
    {
        name: 'Samsung Galaxy S23',
        price: 899,
        description: 'Samsung’s flagship smartphone with a stunning design and great performance.',
        image: 'https://images.samsung.com/is/image/samsung/p6pim/in/galaxy-s23',
    },
];
const seedProducts = async () => {
    try {
        // Delete all existing products
        await Product_1.default.deleteMany();
        // Insert new product data
        await Product_1.default.insertMany(products);
        console.log('Products seeded successfully');
        process.exit();
    }
    catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};
// Run the seeding script
seedProducts();
