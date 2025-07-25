import { Request, Response, NextFunction } from "express"

const requestHandler = (req:Request, res:Response, next:NextFunction) => { 
    const timeStamp = new Date().toISOString()
    const method = req.method
    const url = req.url
    const userAgent = req.get("user-Agent")
    console.log(
        "method:", method,
        "url:", url,
        "userAgent:", userAgent

    )
}

const addTimeStampToRequest = (req:Request, res:Response, next:NextFunction) => { 
   req.timeStamp = new Date().toISOString()
}

export default {
    requestHandler,
    addTimeStampToRequest
}