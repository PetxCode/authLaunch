import { connect } from "mongoose";
import dotEnv from "dotenv";
dotEnv.config();

const URL: string | undefined = process.env.DATABASE_STRING;

export const dbConfig = () => {
  try {
    connect(URL!).then(() => {
      console.log("DB connected...!");
    });
  } catch (error) {
    return error;
  }
};
