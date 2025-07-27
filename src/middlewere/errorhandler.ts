import {
    Request, Response, NextFunction
 } from "express"
import { asyncHandlerFunctionType } from "../types/appTypes"

class APIError extends Error { 
    public status: number
    
    constructor(message: string, statusCode:number) { 
        super(message)
        this.status = statusCode
        this.name = "APIError"
    }
}


// asyncHnadler function takes in function and return another function, the returned function takes in the res, req and next as it arguments
export const asyncHandler = (fn: asyncHandlerFunctionType) => (req:Request, res:Response, next:NextFunction) => { 
    Promise.resolve(fn(req, res, next)).catch(next)
}
  
export const globalErrorHandler = (err: Error, req:Request, res:Response, next:NextFunction) => { 
    if (err instanceof APIError) {
        res.status(err.status).json({
            message: err.message,
            status: "error"
        })
    } else if (err.name == "validation error") {
        res.status(400).json({
            status: "error",
            message: "validation error"
        })
    }else { 
        res.status(500).json({
            status: "error",
            message:"unknown error"
        })
    }

}

export const urlVersioning = (version: string) => (req:Request, res:Response, next:NextFunction) => { 
    if (req.path.includes(`/api/${version}`)) {
        next()
     }
    else { 
        res.status(404).json({
            status: "Error",
            message:"Invalid API version"
        })
    }
}


export const contentTypeVersioning = (version: number) => (req:Request, res:Response, next:NextFunction) => { 
    const contentType = req.get("content-type")
    if (contentType && contentType.includes(`application/vnd.api.${version}+json`)) {
        next()
    }
    else { 
        res.status(404).json({
            status: "Error",
            message:"Invalid API version"
        })
    
    }
}