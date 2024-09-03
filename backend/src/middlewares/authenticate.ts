import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token  = req.headers["authorization"]?.split("Bearer ")[1]; // Get the token from cookies
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authenticate;
