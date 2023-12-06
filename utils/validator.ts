import { NextFunction, Request, Response } from "express";
import joi, { ObjectSchema } from "joi";
import { HTTP } from "../error/mainError";

export default (schema: ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error === undefined) {
      next();
    } else {
      return res.status(HTTP.BAD).json({
        message: "validation error",
        data: error,
      });
    }
  };
};
