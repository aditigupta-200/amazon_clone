// // models/Product.ts
// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   featured: {
//     type: Boolean,
//     default: false,
//   },
//   bestSeller: {
//     type: Boolean,
//     default: false,
//   }
// }, {
//   timestamps: true
// });

// const Product = mongoose.model('Product', productSchema);
// export default Product;

import mongoose, { Schema, Document } from 'mongoose';
import { Product } from '../../../shared/types/product';  // Update the import path

const productSchema = new Schema<Product & Document>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.models.Product || mongoose.model<Product & Document>('Product', productSchema);