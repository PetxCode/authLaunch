import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotEnv from "dotenv";
import { dbConfig } from "./utils/dbConfig";
dotEnv.config();
import { mainApp } from "./mainApp";

const app: Application = express();
const port: number = parseInt(process.env.PORT!);

app.use(express.json());
app.use(cors());
// app.set("view engine", "ejs");

mainApp(app);
app.listen(port, () => {
  console.clear();
  console.log();
  dbConfig();
});
