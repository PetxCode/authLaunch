import { Application, NextFunction, Request, Response } from "express";
import { HTTP, mainError } from "./error/mainError";
import { errorHandler } from "./error/errorHandler";
import auth from "./router/userRouter";
import ejs from "ejs";

export const mainApp = (app: Application) => {
  try {
    app.use("/api/v1/auth", auth);

    app.get("/view", (req: Request, res: Response) => {
      try {
        const user = {
          userName: "Peter",
          email: "peter@test.com",
          _id: "445mpo099",
          token: "32556",
        };

        res.render("header", { user });
      } catch (error) {
        return res.status(404).json({
          message: "Error ",
        });
      }
    });

    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Default page ",
        });
      } catch (error: any) {
        return res.status(404).json({
          message: "Error ",
          date: error.message,
        });
      }
    });

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new mainError({
          name: "Route Error",
          message: `This route ${req.originalUrl} doesn't exist`,
          status: HTTP.BAD,
          success: false,
        })
      );
    });

    app.use(errorHandler);
  } catch (error) {
    return error;
  }
};
