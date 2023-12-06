import { NextFunction, Request, Response } from "express";
import { HTTP, mainError } from "./mainError";

const viewError = (err: mainError, res: Response) => {
  try {
    return res.status(HTTP.BAD).json({
      name: err.name,
      message: err.message,
      status: err.status,
      success: err.success,
      stack: err.stack,
      error: err,
    });
  } catch (error) {
    return error;
  }
};

export const errorHandler = (
  err: mainError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return viewError(err, res);
  } catch (error) {
    return error;
  }
};
