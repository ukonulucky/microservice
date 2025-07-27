"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const corsConfig_1 = __importDefault(require("./config/corsConfig"));
dotenv_1.default.config();
const errorhandler_1 = require("./middlewere/errorhandler");
const apiRateLimiterMiddleware_1 = require("./middlewere/apiRateLimiterMiddleware");
const app = (0, express_1.default)();
// middleware 
app.use((0, apiRateLimiterMiddleware_1.apiRateLimiter)(100, 15 * 1000 * 60)); // allow only 100 request in 15 minutes
app.use(corsConfig_1.default);
app.use(express_1.default.json());
// helps as a guide to the frontend when to access only v1 version of the app
app.use("/api/v1", (0, errorhandler_1.urlVersioning)("v1"));
const PORT = process.env.PORT || 5000;
// error handler
app.use(errorhandler_1.globalErrorHandler);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
