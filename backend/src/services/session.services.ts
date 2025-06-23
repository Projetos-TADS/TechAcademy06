import { compare } from "bcryptjs";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn } from "../interfaces";
import { sign, SignOptions } from "jsonwebtoken";
import { UserModel } from "../models";

const createSession = async ({ email, password }: SessionCreate): Promise<SessionReturn> => {
  const foundUser: UserModel | null = await UserModel.findOne({ where: { email } });

  if (!foundUser) {
    throw new AppError("Invalid credentials", 401);
  }

  const samePassword: boolean = await compare(password, foundUser.password);

  if (!samePassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign({ admin: foundUser.admin }, process.env.SECRET_KEY!, {
    subject: foundUser.userId.toString(),
    expiresIn: process.env.EXPIRES_IN!,
  } as SignOptions);

  return { token, user: foundUser.dataValues };
};

export default { createSession };
