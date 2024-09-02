// src/services/AuthService.ts

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/User";
import { HttpError } from "../utils/HttpError";

class AuthService {
  async register(username: string, email: string, password: string) {
    const user = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (user) {
      throw new HttpError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password_hash: hashedPassword,
    });

    return { message: "User registered successfully" };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new HttpError("Invalid credentials", 400);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return {
      token,
      user: {
        email: user.email,
        username: user.username,
        created_at: user.created_at,
      },
    };
  }

  async getProfile(userId: number) {
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "created_at"],
    });

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    return user;
  }
}

export default new AuthService();
