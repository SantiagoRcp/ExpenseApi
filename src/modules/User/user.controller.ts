import {type Request, type Response} from "express";
import type {IUserServ} from "./user.types.js";

export class UserController {
    constructor(private readonly userServ: IUserServ) {
    }

    async getMe(req: Request, res: Response) {

        const id = req.user?.id;

        if (!id) {
            return
        }

        const user = await this.userServ.getMe(id);
        res.status(200).send(user);
    }

}