import type {NextFunction, Request, Response} from "express";
import {ZodError} from "zod";
import {AppError} from "../shared/errors/AppError.js";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
//     manejo de errores de zod
    if (err instanceof ZodError) {
        new AppError("Validation Error", 400, {
            errors: err.issues.map(issue => ({
                message: issue.message, path: issue.path
            }))
        });
    }
//     manejo de errores propios
    if (err instanceof AppError) {
        if (err.isOperational) {
            console.warn(err);
        } else {
            console.error(err);
        }

        res.status(err.statusCode).json({
            statusCode: err.statusCode,
            name: err.name,
            message: err.message,
            errors: err.errors
        });
        return;
    }
//     manejo de error 500
    console.error(err);
    res.status(500).json({message: 'Internal Server Error'})
}
