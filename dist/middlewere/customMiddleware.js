"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestHandler = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const userAgent = req.get("user-Agent");
    console.log("method:", method, "url:", url, "userAgent:", userAgent);
};
const addTimeStampToRequest = (req, res, next) => {
    req.timeStamp = new Date().toISOString();
};
exports.default = {
    requestHandler,
    addTimeStampToRequest
};
