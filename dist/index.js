"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConfig_1 = require("./utils/dbConfig");
dotenv_1.default.config();
const mainApp_1 = require("./mainApp");
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.set("view engine", "ejs");
(0, mainApp_1.mainApp)(app);
app.listen(port, () => {
    console.clear();
    console.log();
    (0, dbConfig_1.dbConfig)();
});
