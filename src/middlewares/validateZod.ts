import {type ZodSchema} from "zod"
import type {Request, Response, NextFunction} from "express";
import {BadRequestError} from "../shared/errors/index.js";

export function validateZod(zodSchema: ZodSchema) {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            const data = zodSchema.safeParse(req.body);

            if (!data.success) {
                const errors = data.error.issues.map(error => ({message: error.message, path: error.path}));
                return next(new BadRequestError('Error validating data', {errors}));
            }
            req.body = data.data
            next();
        } catch (error) {
            next(error);
        }

    }
}