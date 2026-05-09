import {type ZodSchema} from "zod"
import type {Request, Response, NextFunction} from "express";
import {BadRequestError} from "../shared/errors/index.js";

type Source = 'body' | 'params' | 'query'

export function validateZod(zodSchema: ZodSchema, source: Source = "body") {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            const data = zodSchema.safeParse(req[source]);

            if (!data.success) {
                const errors = data.error.issues.map(error => ({message: error.message, path: error.path}));
                return next(new BadRequestError('Error validating data', {errors}));
            }
            req[source] = data.data
            next();
        } catch (error) {
            next(error);
        }

    }
}