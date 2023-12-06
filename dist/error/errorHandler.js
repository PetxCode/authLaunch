"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mainError_1 = require("./mainError");
const viewError = (err, res) => {
    try {
        return res.status(mainError_1.HTTP.BAD).json({
            name: err.name,
            message: err.message,
            status: err.status,
            success: err.success,
            stack: err.stack,
            error: err,
        });
    }
    catch (error) {
        return error;
    }
};
const errorHandler = (err, req, res, next) => {
    try {
        return viewError(err, res);
    }
    catch (error) {
        return error;
    }
};
exports.errorHandler = errorHandler;
