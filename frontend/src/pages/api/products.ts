// api/products.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import { ProductModel } from "../../models/Product";
import jwt from "jsonwebtoken";
import { v2 as cloudinaryV2 } from "cloudinary";
import formidable, { IncomingForm } from "formidable";
import { Readable } from "stream";

export const config = {
    api: {
        bodyParser: false,
    },
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
            if (err) reject(new Error("Form parsing failed"));
            else resolve({ fields, files });
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
                Readable.from(file.filepath).pipe(uploadStream);
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
            const { name, category, price, description, stockQuantity } = fields;

            if (!name || !category || !price) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const imageFiles = files.images;
            if (!imageFiles) {
                return res.status(400).json({ error: "At least one image is required" });
            }

            const imageUrls = await uploadImagesToCloudinary(Array.isArray(imageFiles) ? imageFiles : [imageFiles]);

            const product = await ProductModel.create({
                name,
                category,
                price: Number(price),
                description,
                stockQuantity: Number(stockQuantity),
                imageUrls,
            });

            return res.status(201).json(product);
        }

        if (req.method === "GET") {
            const { q, category } = req.query;
            const filter: any = {};
            if (q) filter.name = { $regex: q.toString(), $options: "i" };
            if (category && category !== "All Categories") filter.category = category;

            const products = await ProductModel.find(filter).select("-__v"); // Excluding unneeded fields
            return res.status(200).json(products);
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error: any) {
        console.error("Error:", error.message);
        return res.status(error.message.includes("Unauthorized") ? 403 : 500).json({ error: error.message });
    }
}
