import { describe, it, expect, beforeEach, vi } from "vitest";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateToken, comparePassword, hashPassword } from "../../src/utils/tokenHandler";

describe("Auth Utilities", () => {
  const userId = 1;
  const password = "password123";
  let hashedPassword: string;

  beforeEach(async () => {
    hashedPassword = await hashPassword(password);
    process.env.JWT_SECRET = "testSecretKey"; 
  });

  describe("generateToken", () => {
    it("should generate a valid JWT token", () => {
      const token = generateToken(userId);
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      expect(decoded).toHaveProperty("userId", userId);
    });

    it("should set the token to expire in 1 hour", () => {
      const token = generateToken(userId);
      const decoded = jwt.decode(token) as jwt.JwtPayload;

      expect(decoded.exp! - decoded.iat!).toBe(3600); // 3600 seconds = 1 hour
    });
  });

  describe("comparePassword", () => {
    it("should return true for a matching password", async () => {
      const isMatch = await comparePassword(password, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it("should return false for a non-matching password", async () => {
      const isMatch = await comparePassword("wrongPassword", hashedPassword);
      expect(isMatch).toBe(false);
    });
  });

  describe("hashPassword", () => {
    it("should hash the password", async () => {
      const hash = await hashPassword(password);
      expect(hash).not.toBe(password);
    });

    it("should generate a hash that can be verified with comparePassword", async () => {
      const isMatch = await comparePassword(password, hashedPassword);
      expect(isMatch).toBe(true);
    });
  });
});
