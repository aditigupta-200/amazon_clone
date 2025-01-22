"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // Adjust based on your user model path
// Middleware to protect routes by checking if the user is authenticated
const protectRoute = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
    token = token.replace('Bearer ', ''); // Remove "Bearer " prefix if it's present
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); // Verify JWT using your secret
        req.user = decoded; // Attach user data to the request (optional)
        // Optionally, you can fetch the user from the database if needed
        const user = await User_1.default.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        next(); // User is authenticated, proceed to the next middleware/route handler
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};
exports.protectRoute = protectRoute;
