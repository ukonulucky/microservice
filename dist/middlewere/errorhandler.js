"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentTypeVersioning = exports.urlVersioning = exports.globalErrorHandler = exports.asyncHandler = void 0;
class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
        this.name = "APIError";
    }
}
// asyncHnadler function takes in function and return another function, the returned function takes in the res, req and next as it arguments
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncHandler = asyncHandler;
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof APIError) {
        res.status(err.status).json({
            message: err.message,
            status: "error"
        });
    }
    else if (err.name == "validation error") {
        res.status(400).json({
            status: "error",
            message: "validation error"
        });
    }
    else {
        res.status(500).json({
            status: "error",
            message: "unknown error"
        });
    }
};
exports.globalErrorHandler = globalErrorHandler;
const urlVersioning = (version) => (req, res, next) => {
    if (req.path.includes(`/api/${version}`)) {
        next();
    }
    else {
        res.status(404).json({
            status: "Error",
            message: "Invalid API version"
        });
    }
};
exports.urlVersioning = urlVersioning;
const contentTypeVersioning = (version) => (req, res, next) => {
    const contentType = req.get("content-type");
    if (contentType && contentType.includes(`application/vnd.api.${version}+json`)) {
        next();
    }
    else {
        res.status(404).json({
            status: "Error",
            message: "Invalid API version"
        });
    }
};
exports.contentTypeVersioning = contentTypeVersioning;
