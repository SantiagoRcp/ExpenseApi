import type {IUserServ} from "./user.types.js";

export class UserController {
    constructor(private readonly userServ: IUserServ) {
    }
}