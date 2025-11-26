import { UserModel } from "../src/models";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import sessionService from "../src/services/session.services";
import { AppError } from "../src/errors";

jest.mock("../src/models");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const mockUser = {
  userId: "035481ce-9863-4511-8902-c7f219a39573",
  name: "John Doe",
  email: "user@example.com",
  password: "correct_password",
  cpf: "97185965004",
  admin: false,
  dataValues: {
    userId: "035481ce-9863-4511-8902-c7f219a39573",
    name: "John Doe",
    email: "user@example.com",
    cpf: "97185965004",
    admin: false,
  },
};

describe("Login Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SECRET_KEY = "secret";
    process.env.EXPIRES_IN = "1d";
  });

  it("should throw error for non-existent email", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      sessionService.createSession({
        email: "invalid@example.com",
        password: "any_password",
      })
    ).rejects.toThrow(new AppError("Invalid credentials", 401));
  });

  it("should throw error for incorrect password", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(
      sessionService.createSession({
        email: "user@example.com",
        password: "wrong_password",
      })
    ).rejects.toThrow(new AppError("Invalid credentials", 401));
  });

  it("should return token and user for valid credentials", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(true);
    (sign as jest.Mock).mockReturnValue("generated_token");

    const result = await sessionService.createSession({
      email: "user@example.com",
      password: "correct_password",
    });

    expect(result).toEqual({
      token: "generated_token",
      user: mockUser.dataValues,
    });

    expect(sign).toHaveBeenCalledWith({ admin: mockUser.admin }, process.env.SECRET_KEY, {
      subject: mockUser.userId.toString(),
      expiresIn: process.env.EXPIRES_IN,
    });
  });
});
