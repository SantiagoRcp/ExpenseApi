import jwt, {type SignOptions} from "jsonwebtoken";
import {env} from "../../config/envConfig.js";
import {UnauthorizedError} from "../errors/index.js";
import type {Payload} from "../../modules/Auth/auth.types.js";

export function generateJWT(payload: object): string {
    return jwt.sign(payload, env.JWT_SECRET, {expiresIn: env.JWT_EXPIRES_IN} as SignOptions);
}

export function verifyJWT(token: string): any {
    try {
        return jwt.verify(token, env.JWT_SECRET) as Payload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new UnauthorizedError("Token expirado");
        }
        console.error(error);
        throw new UnauthorizedError("Invalid Token")
    }
}