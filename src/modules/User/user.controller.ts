import {type Request, type Response} from "express";
import type {IUserServ} from "./user.types.js";
import {UnauthorizedError} from "../../shared/errors/index.js";
import type {UserUpdateDTO} from "./user.schema.js";

export class UserController {
    constructor(private readonly userServ: IUserServ) {
    }

    async getMe(req: Request, res: Response) {

        const id = req.user?.id;

        if (!id) {
            throw new UnauthorizedError("unauthorized user");
        }

        const user = await this.userServ.getMe(id);
        res.status(200).send(user);
        return
    }

    async userUpdate(req: Request, res: Response) {
        const id = req.user?.id;
        const userData = req.body as UserUpdateDTO;

        if (!id) {
            throw new UnauthorizedError("unauthorized user");
        }
        const updateUser = await this.userServ.updateUser(id, userData);

        res.status(200).json({message: "user successfully updated", user: updateUser});
        return;
    }

}