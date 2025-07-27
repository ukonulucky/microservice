"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRateLimiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
const apiRateLimiter = (maxRequest, timer) => {
    return (0, express_rate_limit_1.rateLimit)({
        windowMs: timer, // 15 minutes
        limit: maxRequest, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    });
};
exports.apiRateLimiter = apiRateLimiter;
