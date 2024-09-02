// src/services/DataService.ts

import Data from "../models/Data";
import { HttpError } from "../utils/HttpError";

class ProfileService {
  async getDataByUsername(username: string) {
    const data = await Data.findAll({ where: { username } });
    if (!data || data.length === 0) {
      throw new HttpError("No data found for the user", 404);
    }
    return data;
  }
}

export default new ProfileService();
