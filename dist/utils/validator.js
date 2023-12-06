"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainError_1 = require("../error/mainError");
exports.default = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error === undefined) {
            next();
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "validation error",
                data: error,
            });
        }
    };
};
