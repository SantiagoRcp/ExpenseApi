import jwt, {type SignOptions} from "jsonwebtoken";
import {env} from "../../config/envConfig.js";
import {BadRequestError} from "../errors/index.js";

export function generateJWT(payload: object): string {
    return jwt.sign(payload, env.JWT_SECRET, {expiresIn: env.JWT_EXPIRES_IN} as SignOptions);
}

export function verifyJWT(token: string): any {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
        console.error(error);
        throw new BadRequestError("Invalid Token")
    }
}