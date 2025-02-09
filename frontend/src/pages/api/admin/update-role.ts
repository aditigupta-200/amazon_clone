import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
import User from "../../../../../backend/src/models/User";
import { isAdmin } from "../../../../../backend/src/middleware/authMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await dbConnect();
  const { email, role } = req.body;

  const updatedUser = await User.findOneAndUpdate({ email }, { role }, { new: true });
  if (!updatedUser) return res.status(404).json({ message: "User not found" });

  res.json({ message: "User role updated", user: updatedUser });
}
