// // api/products.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "../../lib/db";
// import { ProductModel } from "../../models/Product";
// import jwt from "jsonwebtoken";
// import { v2 as cloudinaryV2 } from "cloudinary";
// import formidable, { IncomingForm } from "formidable";
// import { Readable } from "stream";
// import { createReadStream } from "fs";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };


// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
// if (!JWT_SECRET) throw new Error("JWT secret is missing!");;

// cloudinaryV2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// interface DecodedToken {
//     id: string;
//     email: string;
//     role: "admin" | "user";
    
// }

// const authMiddleware = (req: NextApiRequest): DecodedToken => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) throw new Error("Unauthorized: No token provided");
    

//     try {
//         return jwt.verify(token, JWT_SECRET) as DecodedToken;
//     } catch {
//         throw new Error("Unauthorized: Invalid token");
//     }
   
// };

// const isAdmin = (user: DecodedToken) => {
//     if (user.role !== "admin") throw new Error("Access Denied: Admins only");
// };



// const parseForm = async (req: NextApiRequest) => {
//     const form = new IncomingForm({ multiples: true });

//     return new Promise<{ fields: any; files: any }>((resolve, reject) => {
//         form.parse(req, (err, fields, files) => {
//             if (err) {
//                 console.error("Form parsing error:", err);
//                 reject(new Error("Form parsing failed"));
//             } else {
//                 console.log("Parsed fields:", fields);
//                 console.log("Parsed files:", files);
//                 resolve({ fields, files });
//             }
//         });
//     });
// };



// const uploadImagesToCloudinary = async (files: any[]): Promise<string[]> => {
//     return Promise.all(
//         files.map((file) => {
//             console.log("Hello world");
            
//             return new Promise<string>((resolve, reject) => {
//                  console.log("Uploading file:", file.filepath);
//                 const uploadStream = cloudinaryV2.uploader.upload_stream(
//                     { folder: "products" },
//                     (error, result) => {
//                         if (error || !result) {
//                             console.log("Cloudinary upload error");
                            
//                             reject(new Error("Image upload failed"));
//                         } else {
//                              console.log("Cloudinary Upload Success:", result.secure_url);
//                             resolve(result.secure_url);
//                         }
//                     }
//                 );

                
//                       try {
//                     const fileStream = createReadStream(file.filepath);
//                     fileStream.pipe(uploadStream);
//                 } catch (err) {
//                     console.error("Error reading file stream:", err);
//                     reject(new Error("Failed to read file stream"));
//                 }
//             });
//         })
//     );
// };


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     await dbConnect();

//     try {
//         if (req.method === "POST") {
//             const user = authMiddleware(req);
//             isAdmin(user);
 

//             const { fields, files } = await parseForm(req);
//             // console.log("fields", fields);
//             const name = fields.name?.[0];  // Extract first element
//             const category = fields.category?.[0];
//             const price = Number(fields.price?.[0]);  // Convert string to number
//             const description = fields.description?.[0];
//             const stockQuantity = Number(fields.stockQuantity?.[0]);

//             if (!name || !category || !price) {
//                 return res.status(400).json({ error: "Missing required fields" });
//             }


//             const imageFiles = files.images;
// console.log("Parsed Image Files:", imageFiles);

//             if (!imageFiles || (Array.isArray(imageFiles) && imageFiles.length === 0)) {
    
//     return res.status(400).json({ error: "At least one image is required" });
// }


//             const imageUrl = await uploadImagesToCloudinary(Array.isArray(imageFiles) ? imageFiles : [imageFiles]);

//             const product = await ProductModel.create({
//                 name,
//                 category,
//                 price: Number(price),
//                 description,
//                 stockQuantity: Number(stockQuantity),
//                 imageUrl,
//             });
//     console.log("Products ", product);

//             return res.status(201).json(product);
//         }
        

//         if (req.method === "GET") {
//             const { q, category } = req.query;
//             const filter: any = {};
//             if (q) filter.name = { $regex: q.toString(), $options: "i" };
//             if (category && category !== "All Categories") filter.category = category;
        
//             const products = await ProductModel.find(filter).select("-__v"); // Excluding unneeded fields
//             return res.status(200).json(products);
//         }
//         return res.status(405).json({ error: "Method not allowed" });
//     } catch (error: any) {
//         console.error("Error:", error.message);
//         return res.status(typeof error.message === "string" && error.message.includes("Unauthorized") ? 403 : 500).json({ error: error.message });
//     }

//     if (req.method === "PATCH") {
//     try {
//         const user = authMiddleware(req); // Authenticate user
//         isAdmin(user); // Only admins can edit
        
//         const { productId } = req.query; // Get product ID
//         const { fields, files } = await parseForm(req); // Parse form data
        
//         const product = await ProductModel.findById(productId);
//         if (!product) return res.status(404).json({ error: "Product not found" });

//         if (product.uploadedBy.toString() !== user.id) {
//             return res.status(403).json({ error: "Unauthorized: You can only edit your own products" });
//         }

//         // Update fields if provided
//         product.name = fields.name?.[0] || product.name;
//         product.category = fields.category?.[0] || product.category;
//         product.price = Number(fields.price?.[0]) || product.price;
//         product.description = fields.description?.[0] || product.description;
//         product.stockQuantity = Number(fields.stockQuantity?.[0]) || product.stockQuantity;

//         // Handle image updates
//         if (files.images) {
//             const newImageUrls = await uploadImagesToCloudinary(Array.isArray(files.images) ? files.images : [files.images]);
//             product.imageUrl = newImageUrls;
//         }

//         await product.save();
//         return res.status(200).json(product);
//     } catch (error: any) {
//         return res.status(500).json({ error: error.message });
//     }
// }

    
    
//     if (req.method === "DELETE") {
//     try {
//         const user = authMiddleware(req); // Authenticate user
//         isAdmin(user); // Only admins can delete

//         const { productId } = req.query;
//         const product = await ProductModel.findById(productId);
//         if (!product) return res.status(404).json({ error: "Product not found" });

//         if (product.uploadedBy.toString() !== user.id) {
//             return res.status(403).json({ error: "Unauthorized: You can only delete your own products" });
//         }

//         await ProductModel.findByIdAndDelete(productId);
//         return res.status(200).json({ message: "Product deleted successfully" });
//     } catch (error: any) {
//         return res.status(500).json({ error: error.message });
//     }
// }

// }

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import { ProductModel } from "../../models/Product";
import jwt from "jsonwebtoken";
import { v2 as cloudinaryV2 } from "cloudinary";
import formidable, { IncomingForm } from "formidable";
import { createReadStream } from "fs";

export const config = {
    api: { bodyParser: false },
};

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
if (!JWT_SECRET) throw new Error("JWT secret is missing!");

cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface DecodedToken {
    id: string;
    email: string;
    role: "admin" | "user";
}

const authMiddleware = (req: NextApiRequest): DecodedToken => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized: No token provided");

    try {
        return jwt.verify(token, JWT_SECRET) as DecodedToken;
    } catch {
        throw new Error("Unauthorized: Invalid token");
    }
};

const isAdmin = (user: DecodedToken) => {
    if (user.role !== "admin") throw new Error("Access Denied: Admins only");
};

const parseForm = async (req: NextApiRequest) => {
    const form = new IncomingForm({ multiples: true });

    return new Promise<{ fields: any; files: any }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error("Form parsing error:", err);
                reject(new Error("Form parsing failed"));
            } else {
                resolve({ fields, files });
            }
        });
    });
};

const uploadImagesToCloudinary = async (files: any[]): Promise<string[]> => {
    return Promise.all(
        files.map((file) => {
            return new Promise<string>((resolve, reject) => {
                const uploadStream = cloudinaryV2.uploader.upload_stream(
                    { folder: "products" },
                    (error, result) => {
                        if (error || !result) {
                            reject(new Error("Image upload failed"));
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                );

                try {
                    const fileStream = createReadStream(file.filepath);
                    fileStream.pipe(uploadStream);
                } catch (err) {
                    reject(new Error("Failed to read file stream"));
                }
            });
        })
    );
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    try {
        if (req.method === "POST") {
            const user = authMiddleware(req);
            isAdmin(user);

            const { fields, files } = await parseForm(req);
            const name = fields.name?.[0];
            const category = fields.category?.[0];
            const price = Number(fields.price?.[0]);
            const description = fields.description?.[0];
            const stockQuantity = Number(fields.stockQuantity?.[0]);

            if (!name || !category || !price) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const imageFiles = files.images;
            if (!imageFiles || (Array.isArray(imageFiles) && imageFiles.length === 0)) {
                return res.status(400).json({ error: "At least one image is required" });
            }

            const imageUrl = await uploadImagesToCloudinary(Array.isArray(imageFiles) ? imageFiles : [imageFiles]);

            const product = await ProductModel.create({
                name,
                category,
                price,
                description,
                stockQuantity,
                imageUrl,
                uploadedBy: user.id, // Assign vendor ID
            });

            return res.status(201).json(product);
        }

        if (req.method === "GET") {
            const { q, category } = req.query;
            const filter: any = {};
            if (q) filter.name = { $regex: q.toString(), $options: "i" };
            if (category && category !== "All Categories") filter.category = category;

            const products = await ProductModel.find(filter).select("-__v");
            return res.status(200).json(products);
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }

    // PATCH: Update product
    if (req.method === "PATCH") {
        try {
            const user = authMiddleware(req);
            isAdmin(user);

            const { productId } = req.query;
            if (!productId) return res.status(400).json({ error: "Product ID is required" });

            const product = await ProductModel.findById(productId);
            if (!product) return res.status(404).json({ error: "Product not found" });

            if (product.uploadedBy.toString() !== user.id) {
                return res.status(403).json({ error: "Unauthorized: You can only edit your own products" });
            }

            const { fields, files } = await parseForm(req);
            product.name = fields.name?.[0] || product.name;
            product.category = fields.category?.[0] || product.category;
            product.price = Number(fields.price?.[0]) || product.price;
            product.description = fields.description?.[0] || product.description;
            product.stockQuantity = Number(fields.stockQuantity?.[0]) || product.stockQuantity;

            if (files.images) {
                const newImageUrls = await uploadImagesToCloudinary(Array.isArray(files.images) ? files.images : [files.images]);
                product.imageUrl = newImageUrls;
            }

            await product.save();
            return res.status(200).json(product);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // DELETE: Remove product
    if (req.method === "DELETE") {
        try {
            const user = authMiddleware(req);
            isAdmin(user);

            const { productId } = req.query;
            if (!productId) return res.status(400).json({ error: "Product ID is required" });

            const product = await ProductModel.findById(productId);
            if (!product) return res.status(404).json({ error: "Product not found" });

            if (product.uploadedBy.toString() !== user.id) {
                return res.status(403).json({ error: "Unauthorized: You can only delete your own products" });
            }

            await ProductModel.findByIdAndDelete(productId);
            return res.status(200).json({ message: "Product deleted successfully" });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
