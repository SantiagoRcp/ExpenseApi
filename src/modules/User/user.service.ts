import type {IUserRepo} from "./user.types.js";
import {BadRequestError} from "../../shared/errors/index.js";

export class UserService {
    constructor(private readonly userRepo: IUserRepo) {
    }

    async getMe(id: string) {
        const user = await this.userRepo.findUserById(id);
        if (!user) {
            throw new BadRequestError('User not found');
        }

        return user;
    }
}