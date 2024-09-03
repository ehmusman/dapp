import { Request, Response } from "express";
import { validationResult } from "express-validator";
import AuthService from "../services/authService";
import { asyncHandler } from "../utils/asyncHandler";
import User from "../models/User";
import { HttpError } from "../utils/HttpError";
import { comparePassword, generateToken, hashPassword } from "../utils/tokenHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false,  message: "Signup issue", errors: errors.array() });
  }

  const { username, email, password } = req.body;

  let user = await AuthService.findUser(email, username);
  if (user) {
    throw new HttpError("User already exists", 400);
  }
  const hashedPassword = await hashPassword(password);
  await AuthService.createUser(username, email, hashedPassword);
  res.status(201).json({success: true, message: "User registered successfully"});
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: "Login issue",errors: errors.array() });
  }

  const { email, password } = req.body;

  let user = await AuthService.findUser(email);
  if (!user) {
    throw new HttpError("User does not exists", 400);
  }
  let isEqual = await comparePassword(password, user.password_hash);
  if (!isEqual) {
    throw new HttpError("Invalid Credentials", 400);
  }
  const token = generateToken(user.id);
  res.json({
    success: true,
    message: "Login successful",
    token,
    data: {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
      },
    },
  });
});

export const session = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const user = await AuthService.findByPk(userId);
  if (!user) {
    throw new HttpError("User not found", 400);
  }
  res.json({
    success: true,
    message: "Fetched user data successfully",
    data: {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
      },
    }
  });
});

