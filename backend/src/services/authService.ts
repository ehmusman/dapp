import { Op } from "sequelize";
import User from "../models/User";

class AuthService {
  async findUser(email: string, username?: string) {
    if (username) {
      return User.findOne({
        where: { [Op.or]: [{ email }, { username }] },
      });
    } else {
      return User.findOne({
        where: { email },
      });
    }
  }
  async createUser(username: string, email: string, hashedPassword: string) {
    return User.create({
      username,
      email,
      password_hash: hashedPassword,
    });
  }
  async findByPk(userId: string) {
    return User.findByPk(userId, {
      attributes: ["id", "username", "email", "created_at"],
    });
  }
}

export default new AuthService();
