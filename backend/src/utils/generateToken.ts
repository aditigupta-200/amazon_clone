import jwt from "jsonwebtoken";

export const generateToken = (user: { _id: string; role: string }) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

export default generateToken;
