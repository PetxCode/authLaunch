"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URL = process.env.DATABASE_STRING;
const dbConfig = () => {
    try {
        (0, mongoose_1.connect)(URL).then(() => {
            console.log("DB connected...!");
        });
    }
    catch (error) {
        return error;
    }
};
exports.dbConfig = dbConfig;
