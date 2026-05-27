import type {Request, Response} from "express";
import type {IAuthService} from "./auth.types.js";
import type {UserDTO} from "../../shared/types/types.js";
import type {LoginDTO} from "./auth.schema.js";
import {env} from "../../config/envConfig.js";

export class AuthController {
    constructor(private readonly authService: IAuthService) {
    }

    async register(req: Request, res: Response) {
        const dataUser: UserDTO = req.body;
        const newUser = await this.authService.register(dataUser);

        res.cookie("token", newUser.token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({message: newUser.message, data: newUser.user});
        return;
    }

    async login(req: Request, res: Response) {
        const dataUser: LoginDTO = req.body;
        const response = await this.authService.login(dataUser);
        res.cookie("token", response.token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict"
        });
        res.status(200).json({message: response.message, data: response.user});
    }

    async logout(_req: Request, res: Response) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict"
        });
        res.status(200).json({message: "Logged out successfully"});
    }
}
