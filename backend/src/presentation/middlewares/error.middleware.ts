import { NextFunction, Request, Response } from "express";
import { statusCodes, messages } from "../../shared/constants/api.constant";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`${messages.NOT_FOUND} - ${req.originalUrl}`);
    console.log(`${messages.NOT_FOUND} - ${req.originalUrl}`)
    res.status(statusCodes.NOT_FOUND);
    next(error);
}


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = res.statusCode == statusCodes.OK ? statusCodes.INTERNAL_SERVER_ERROR : res.statusCode;
    let message = err.message;
    console.log(message);
    if (err.name === "CastError" && (err as any).kind === "ObjectId") {
        statusCode = statusCodes.NOT_FOUND;
        message = messages.NOT_FOUND;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })

}