import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};
export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  return bcrypt.compare(password, hashPassword);
};
export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};
