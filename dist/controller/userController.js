"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUser = exports.verifyUser = exports.createUser = void 0;
const mainError_1 = require("../error/mainError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const email_1 = require("../utils/email");
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const token = crypto_1.default.randomBytes(3).toString("hex");
        const user = yield userModel_1.default.create({
            email,
            password: hashed,
            verifyToken: token,
        });
        (0, email_1.sendEmail)()
            .then((res) => {
            console.log("sent", res);
        })
            .catch((err) => {
            console.log(err);
        });
        return res.status(mainError_1.HTTP.CREATED).json({
            message: "created",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: new mainError_1.mainError({
                name: "createUser",
                message: "",
                status: mainError_1.HTTP.BAD,
                success: false,
            }),
        });
    }
});
exports.createUser = createUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, verifyToken } = req.body;
        const emailCheck = yield userModel_1.default.findOne({ email });
        const tokenCheck = yield userModel_1.default.findOne({ verifyToken });
        if (emailCheck && tokenCheck) {
            yield userModel_1.default.findByIdAndUpdate(emailCheck._id, {
                verify: true,
                verifyToken: "",
            }, { new: true });
            return res.status(mainError_1.HTTP.CREATED).json({
                message: "veried",
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "Error",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: new mainError_1.mainError({
                name: "createUser",
                message: "",
                status: mainError_1.HTTP.BAD,
                success: false,
            }),
        });
    }
});
exports.verifyUser = verifyUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const emailCheck = yield userModel_1.default.findOne({ email });
        if (emailCheck) {
            const passwordChecker = yield bcrypt_1.default.compare(password, emailCheck.password);
            if (passwordChecker) {
                if (emailCheck.verify && emailCheck.verifyToken === "") {
                    const user = jsonwebtoken_1.default.sign({ id: emailCheck._id, status: emailCheck.status }, process.env.SECRET, { expiresIn: process.env.DAY });
                    return res.status(mainError_1.HTTP.CREATED).json({
                        message: "welcome back",
                        data: user,
                    });
                }
                else {
                    return res.status(mainError_1.HTTP.BAD).json({
                        message: "user hasn't been verified",
                    });
                }
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "password error",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "Error",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: new mainError_1.mainError({
                name: "createUser",
                message: "",
                status: mainError_1.HTTP.BAD,
                success: false,
            }),
        });
    }
});
exports.signInUser = signInUser;
