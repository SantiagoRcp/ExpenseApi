import type {IUserRepo} from "./user.types.js";

export class UserService {
    constructor(private readonly userRepo: IUserRepo) {
    }
}