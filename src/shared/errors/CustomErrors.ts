import {AppError, type Options} from "./AppError.js";

export class BadRequestError extends AppError {
    constructor(message: string = "Bad Request", options: Options = {}) {
        super(message, 400, options);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized", options: Options = {}) {
        super(message, 401, options);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = "Forbidden", options: Options = {}) {
        super(message, 403, options);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Not Found", options: Options = {}) {
        super(message, 404, options);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Conflict", options: Options = {}) {
        super(message, 409, options);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = "Internal Server", options: Options = {}) {
        super(message, 500, options);
    }
}