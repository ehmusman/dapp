import { describe, it, expect, vi, beforeEach } from "vitest";
import AuthService from "../../src/services/authService";
import User from "../../src/models/User";
import { Op } from "sequelize";

// Mock the User model
vi.mock("../../src/models/User", () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn(),
    findByPk: vi.fn(),
  },
}));

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks(); 
    process.env.JWT_SECRET = "testSecretKey"; 

  });

  it("should find a user by email", async () => {
    const email = "test@example.com";
    const mockUser = { id: 1, email, username: "testuser" };
    (User.findOne as vi.Mock).mockResolvedValue(mockUser);

    const result = await AuthService.findUser(email);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
    expect(result).toEqual(mockUser);
  });

  it("should find a user by email or username", async () => {
    const email = "test@example.com";
    const username = "testuser";
    const mockUser = { id: 1, email, username };
    (User.findOne as vi.Mock).mockResolvedValue(mockUser);

    const result = await AuthService.findUser(email, username);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { [Op.or]: [{ email }, { username }] },
    });
    expect(result).toEqual(mockUser);
  });

  it("should create a new user", async () => {
    const username = "testuser";
    const email = "test@example.com";
    const hashedPassword = "hashedPassword";
    const mockUser = { id: 1, username, email, password_hash: hashedPassword };
    (User.create as vi.Mock).mockResolvedValue(mockUser);

    const result = await AuthService.createUser(username, email, hashedPassword);

    expect(User.create).toHaveBeenCalledWith({
      username,
      email,
      password_hash: hashedPassword,
    });
    expect(result).toEqual(mockUser);
  });

  it("should find a user by primary key", async () => {
    const userId = "1";
    const mockUser = { id: 1, username: "testuser", email: "test@example.com", created_at: new Date() };
    (User.findByPk as vi.Mock).mockResolvedValue(mockUser);

    const result = await AuthService.findByPk(userId);

    expect(User.findByPk).toHaveBeenCalledWith(userId, {
      attributes: ["id", "username", "email", "created_at"],
    });
    expect(result).toEqual(mockUser);
  });
});
