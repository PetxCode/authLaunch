"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const validator_1 = __importDefault(require("../utils/validator"));
const entryValidator_1 = require("../utils/entryValidator");
const router = (0, express_1.Router)();
router.route("/create-user").post((0, validator_1.default)(entryValidator_1.registerValidator), userController_1.createUser);
router.route("/sign-in-user").post(userController_1.signInUser);
router.route("/verify-user").patch(userController_1.verifyUser);
exports.default = router;
