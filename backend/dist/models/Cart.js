"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Cart.ts
const mongoose_1 = require("mongoose");
const cartItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
});
const CartItemModel = (0, mongoose_1.model)('CartItem', cartItemSchema);
exports.default = CartItemModel;
