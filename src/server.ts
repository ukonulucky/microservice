import express from "express"
import dotenv from "dotenv"
import corseConfig from "./config/corsConfig";
dotenv.config()

import { 
    globalErrorHandler,
    urlVersioning
} from "./middlewere/errorhandler"
import { apiRateLimiter } from "./middlewere/apiRateLimiterMiddleware";

const app = express();



// middleware 
app.use(apiRateLimiter(100, 15 * 1000 * 60)) // allow only 100 request in 15 minutes
app.use(corseConfig)
app.use(express.json())

// helps as a guide to the frontend when to access only v1 version of the app
app.use("/api/v1",urlVersioning("v1"))

const PORT = process.env.PORT || 5000;

// error handler
app.use(globalErrorHandler)
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`)
})