"use strict";
// import nodemailer from "nodemailer";
// import path from "path";
// import ejs from "ejs";
// import { google } from "googleapis";
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
exports.sendEmail = void 0;
// // const GOOGLE_ID =
// //   "56883592068-u7a5efehhqtgciohe4ifkcrc16rl11n3.apps.googleusercontent.com";
// // const GOOGLE_SECRET = "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";
// // const GOOGLE_REFRESH =
// //   "1//04v0JTxDBuN8nCgYIARAAGAQSNwF-L9IrYngnCFwDR3GSEhSr2i9kMs2sKqSYSnJbkvIwG1pyywDZF47SZwh7CAyJlhzJu4BpYKQ";
// // const GOOGLE_URL = "https://developers.google.com/oauthplayground";
// // const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
// // oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });
// const GOOGLE_ID =
//   "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
// const GOOGLE_SECRET = "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";
// const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground";
// const GOOGLE_REFRESH =
//   "1//04niB3092spRHCgYIARAAGAQSNwF-L9IrqnK4LW9U4514wO3gQLRNlNgHUDQRFDx__vNUd9fUWcSjuPhFW1axNBa8waSwOqRkr-g";
// const oAuth = new google.auth.OAuth2(
//   GOOGLE_ID,
//   GOOGLE_SECRET,
//   GOOGLE_REDIRECT_URL
// );
// oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });
// export const sendMail = async () => {
//   try {
//     const accessToken: any = (await oAuth.getAccessToken()).token;
//     const transport = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "codelabbest@gmail.com",
//         clientId: GOOGLE_ID,
//         clientSecret: GOOGLE_SECRET,
//         refreshToken: GOOGLE_REFRESH,
//         accessToken,
//       },
//     });
//     const myPath = path.join(__dirname, "../views/index.ejs");
//     const html = await ejs.renderFile(myPath);
//     const mailerOption = {
//       from: "Welcome back <codelabbest@gmail.com>",
//       to: "shecodesaj@gmail.com",
//       subject: "Account Verification",
//       html,
//     };
//     await transport.sendMail(mailerOption);
//   } catch (error) {
//     return error;
//   }
// };
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
// const GOOGLE_ID =
//   "199704572461-g84htr0if8p5ej23l2ukvsgtq2rh288g.apps.googleusercontent.com";
// const GOOGLE_SECRET = "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";
// const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground";
// const GOOGLE_REFRESH =
//   "1//04YjCKwj61rd0CgYIARAAGAQSNwF-L9Ir3vxuuMwtJOuDWBxTPBmmcxcX1F6FWMEYBtSPx-_aU6N5_dXKT4zarEfisB5XRHVkz2c";
const GOOGLE_ID = "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESH = "1//04GgN8ydoI_ZdCgYIARAAGAQSNwF-L9IrKCOkFE95PncupZNTb3WCiygNcFb1vp20oW-1SMJTKzSWxnWw2B6nf4S85GXSTpgR44M";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT_URL);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });
// const url: string = "https://pick-be.onrender.com";
// const url: string = "http://localhost:5173";
const sendEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "codelabbest@gmail.com",
                clientSecret: GOOGLE_SECRET,
                clientId: GOOGLE_ID,
                refreshToken: GOOGLE_REFRESH,
                accessToken,
            },
        });
        // const token = jwt.sign(
        //   {
        //     id: user._id,
        //     email: user.email,
        //     name: user.firstName,
        //   },
        //   "secretCode"
        // );
        // let myURL = `${url}/${token}/sign-in`;
        const myPath = path_1.default.join(__dirname, "../views/index.ejs");
        const html = yield ejs_1.default.renderFile(myPath);
        const mailerOption = {
            from: "starting <codelabbest@gmail.com>",
            to: "codelabbest@gmail.com",
            subject: "Account Verification",
            html,
        };
        yield transporter.sendMail(mailerOption);
        console.log("done");
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendEmail = sendEmail;
