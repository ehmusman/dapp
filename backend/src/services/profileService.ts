import Data from "../models/Data";

class ProfileService {
  async getDataByUsername(username: string) {
    return Data.findAll({ where: { username } });
  }
}

export default new ProfileService();
