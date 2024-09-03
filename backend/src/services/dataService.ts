import Data from "../models/Data";

class DataService {
  async saveData(
    update_id: string,
    message_id: string,
    date: number,
    text: string,
    username: string,
    first_name: string
  ) {
    if (text) {
      return Data.create({
        update_id,
        date,
        username,
        first_name,
        message_id,
        text,
      });
    }
    return new Promise((res) => res)
  }
}

export default new DataService();
