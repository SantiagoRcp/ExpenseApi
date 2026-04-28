export interface Options {
    isOperational?: boolean
    errors?: Array<{
        message: string;
        path: (string | number | PropertyKey)[];
    }>
    cause?: unknown
}

export class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;
    readonly errors?: Array<{ message: string, path: (string | number)[] }> | unknown;

    constructor(message: string, statusCode: number, options: Options = {}) {
        super(message, {cause: options.cause});
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = options.isOperational ?? true;
        this.errors = options?.errors;

        Object.setPrototypeOf(this, new.target.prototype);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}