import { Request, Response } from "express";
import { HTTP, mainError } from "../error/mainError";
import bcrypt from "bcrypt";
import crypto from "crypto";
import userModel from "../model/userModel";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import { sendEmail } from "../utils/email";
dotEnv.config();

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const token = crypto.randomBytes(3).toString("hex");

    const user = await userModel.create({
      email,
      password: hashed,
      verifyToken: token,
    });

    sendEmail()
      .then((res) => {
        console.log("sent", res);
      })
      .catch((err) => {
        console.log(err);
      });

    return res.status(HTTP.CREATED).json({
      message: "created",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: new mainError({
        name: "createUser",
        message: "",
        status: HTTP.BAD,
        success: false,
      }),
    });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, verifyToken } = req.body;

    const emailCheck = await userModel.findOne({ email });
    const tokenCheck = await userModel.findOne({ verifyToken });

    if (emailCheck && tokenCheck) {
      await userModel.findByIdAndUpdate(
        emailCheck._id,
        {
          verify: true,
          verifyToken: "",
        },
        { new: true }
      );

      return res.status(HTTP.CREATED).json({
        message: "veried",
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: new mainError({
        name: "createUser",
        message: "",
        status: HTTP.BAD,
        success: false,
      }),
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const emailCheck = await userModel.findOne({ email });

    if (emailCheck) {
      const passwordChecker = await bcrypt.compare(
        password,
        emailCheck.password
      );
      if (passwordChecker) {
        if (emailCheck.verify && emailCheck.verifyToken === "") {
          const user = jwt.sign(
            { id: emailCheck._id, status: emailCheck.status },
            process.env.SECRET!,
            { expiresIn: process.env.DAY }
          );

          return res.status(HTTP.CREATED).json({
            message: "welcome back",
            data: user,
          });
        } else {
          return res.status(HTTP.BAD).json({
            message: "user hasn't been verified",
          });
        }
      } else {
        return res.status(HTTP.BAD).json({
          message: "password error",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: new mainError({
        name: "createUser",
        message: "",
        status: HTTP.BAD,
        success: false,
      }),
    });
  }
};
