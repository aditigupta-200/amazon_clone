"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Product.ts
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
});
const ProductModel = (0, mongoose_1.model)('Product', productSchema);
exports.default = ProductModel;
