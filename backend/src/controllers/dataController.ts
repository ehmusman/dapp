import { Request, Response } from "express";
import DataService from "../services/dataService";
import { asyncHandler } from "../utils/asyncHandler";

export const saveData = asyncHandler(async (req: Request, res: Response) => {
  const {
    update_id,
    message: {
      message_id,
      date,
      text,
      from: { first_name, username },
    },
  } = req.body;

  const result = await DataService.saveData(update_id, message_id, date, text, username, first_name);

  res.status(201).json(result);
});