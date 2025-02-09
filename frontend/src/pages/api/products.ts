import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import { ProductModel } from "../../models/Product";
import jwt from "jsonwebtoken";
import { v2 as cloudinaryV2 } from "cloudinary";
import formidable, { IncomingForm } from "formidable";
import fs from "fs";
import { Readable } from "stream";

export const config = {
	api: {
		bodyParser: false, // Disable Next.js body parsing to allow formidable to handle it
	},
};

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

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

// Function to parse `formidable` form data
const parseForm = async (
	req: NextApiRequest
): Promise<{ fields: any; files: any }> => {
	const form = new IncomingForm({ multiples: false });
	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) reject(err);
			else resolve({ fields, files });
		});
	});
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect();

	try {
		if (req.method === "POST") {
			const user = authMiddleware(req);
			isAdmin(user);

			// Parse the form data
			const { fields, files } = await parseForm(req);

			const { name, category, price, description, stockQuantity } =
				fields;

			// Extract first value from array (if necessary)
			const productData = {
				name: Array.isArray(name) ? name[0] : name,
				category: Array.isArray(category) ? category[0] : category,
				price: Array.isArray(price) ? Number(price[0]) : Number(price),
				description: Array.isArray(description)
					? description[0]
					: description,
				stockQuantity: Array.isArray(stockQuantity)
					? Number(stockQuantity[0])
					: Number(stockQuantity),
			};

			if (
				!productData.name ||
				!productData.category ||
				!productData.price
			) {
				return res
					.status(400)
					.json({ error: "Missing required fields" });
			}

			
			const file = files.image?.[0];
			if (!file) {
				return res
					.status(400)
					.json({ error: "Image file is required" });
			}

			const fileBuffer = fs.readFileSync(file.filepath);

			// Upload image to Cloudinary
			const uploadPromise = new Promise<string>((resolve, reject) => {
				const uploadStream = cloudinaryV2.uploader.upload_stream(
					{ folder: "products" },
					(error, result) => {
						if (error || !result) {
							reject("Image upload failed");
						} else {
							resolve(result.secure_url);
						}
					}
				);
				Readable.from(fileBuffer).pipe(uploadStream);
			});

			const imageUrl = await uploadPromise;

			// Create product in DB
      const product = await ProductModel.create({
        ...productData,  // ✅ Correct - Uses extracted values
        imageUrl,
    });
    

			return res.status(201).json(product);
		}

		if (req.method === "GET") {
			const { q, category } = req.query;
			const filter: any = {};

			if (q) filter.name = { $regex: q.toString(), $options: "i" };
			if (category && category !== "All Categories")
				filter.category = category;

			const products = await ProductModel.find(filter);
			return res.status(200).json(products);
		}

		return res.status(405).json({ error: "Method not allowed" });
	} catch (error: any) {
		const errorMessage = error?.message || "Unknown server error";

		const statusCode =
			errorMessage.includes("Unauthorized") ||
			errorMessage.includes("Access Denied")
				? 403
				: 500;

		return res.status(statusCode).json({ error: errorMessage });
	}
}
