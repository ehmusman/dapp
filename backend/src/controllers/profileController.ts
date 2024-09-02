import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { HttpError } from "../utils/HttpError";
import User from "../models/User";
import profileService from "../services/profileService";

export const getDataForAuthenticatedUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId; // Get userId from the authenticated request
  const user = await User.findByPk(userId,{attributes: ["username", "email", "created_at"]});

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  const data = await profileService.getDataByUsername(user.username);

  res.json({user,data});
});
