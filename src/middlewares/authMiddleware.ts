import {type NextFunction, type Request, type Response} from "express";
import {UnauthorizedError} from "../shared/errors/index.js";
import {verifyJWT} from "../shared/utils/jwt.util.js";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
    // 1 Extraer el token de la cookie
    const token = req.cookies.token;

    // 2 Validar el token
    if (!token) {
        throw new UnauthorizedError('No token provided');
    }

    // 3 Inyectar el token en req.user
    req.user = verifyJWT(token)  //
    next();
}
