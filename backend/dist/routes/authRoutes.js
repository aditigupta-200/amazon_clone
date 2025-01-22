"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import necessary types
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// POST route for user registration
router.post('/register', async (req, res) => {
    try {
        await (0, authController_1.registerUser)(req, res); // Use the controller function
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
// POST route for user login
router.post('/login', async (req, res) => {
    try {
        await (0, authController_1.loginUser)(req, res); // Use the controller function
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
