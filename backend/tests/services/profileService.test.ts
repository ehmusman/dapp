import { describe, it, expect, vi, beforeEach } from "vitest";
import ProfileService from "../../src/services/profileService";
import Data from "../../src/models/Data";

// Mock the Data model
vi.mock("../../src/models/Data", () => ({
  default: {
    findAll: vi.fn(),
  },
}));

describe("ProfileService", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it("should get data by username", async () => {
    const username = "testuser";
    const mockData = [{ id: 1, username, data: "some data" }];
    (Data.findAll as vi.Mock).mockResolvedValue(mockData);

    const result = await ProfileService.getDataByUsername(username);

    expect(Data.findAll).toHaveBeenCalledWith({ where: { username } });
    expect(result).toEqual(mockData);
  });
});
