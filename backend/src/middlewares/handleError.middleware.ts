import { NextFunction, Request, Response } from "express";
import AppError from "../errors/App.error";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";
import Logger from "../config/logger";

const handleError = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppError) {
    Logger.warn(`AppError: ${error.message} (Status: ${error.status})`);
    return response.status(error.status).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    Logger.warn(`Validation Error: ${JSON.stringify(error.flatten().fieldErrors)}`);
    return response.status(400).json({ message: error.flatten().fieldErrors });
  }

  if (error instanceof JsonWebTokenError) {
    Logger.warn(`JWT Error: ${error.message}`);
    return response.status(401).json({ message: error.message });
  }

  Logger.error(`Internal Server Error: ${error instanceof Error ? error.stack : error}`);

  return response.status(500).json({ message: "Internal server error" });
};

export default handleError;
