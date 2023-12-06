import { Document, Schema, model } from "mongoose";

interface iUser {
  email: string;
  password: string;
  verify: boolean;
  verifyToken: string;
  status: string;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },

    status: {
      type: String,
      default: "user",
    },

    verifyToken: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
