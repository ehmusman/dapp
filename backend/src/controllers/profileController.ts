import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { HttpError } from "../utils/HttpError";
import profileService from "../services/profileService";
import authService from "../services/authService";

export const getDataForAuthenticatedUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const user = await authService.findByPk(userId);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    const data = await profileService.getDataByUsername(user.username);
    res.status(200).json({
      success: true,
      message: "Bot data fetched",
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        telegramBotData: data,
      },
    });
  }
);
