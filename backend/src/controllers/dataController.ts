import { Request, Response } from "express";
import DataService from "../services/dataService";
import { asyncHandler } from "../utils/asyncHandler";
import { emitSocketEvent } from "..";

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

  console.log(req.body)
  await DataService.saveData(update_id, message_id, date, text, username, first_name);
  const io = req.app.get("io")
  emitSocketEvent(io, username, {update_id, message_id, date, text, username, first_name})
  res.status(201).json({ success: true, message: "Data saved successfully" });
});