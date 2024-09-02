import { Request, Response } from "express";
import { validationResult } from "express-validator";
import AuthService from "../services/authService";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  const result = await AuthService.register(username, email, password);

  res.status(201).json(result);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const result = await AuthService.login(email, password);

  res.json(result);
});

export const profile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  const user = await AuthService.getProfile(userId);

  res.json(user);
});
