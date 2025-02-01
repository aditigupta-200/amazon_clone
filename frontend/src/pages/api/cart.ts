import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/db";
import Cart from "../../models/Cart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await clientPromise;

  if (req.method === "POST") {
    const { productId } = req.body;
    const cartItem = await Cart.create({ productId });
    res.status(201).json(cartItem);
  }

  if (req.method === "GET") {
    const cartItems = await Cart.find().populate("productId");
    res.status(200).json(cartItems);
  }

  if (req.method === "DELETE") {
    const { cartId } = req.body;
    await Cart.findByIdAndDelete(cartId);
    res.status(204).end();
  }
}
