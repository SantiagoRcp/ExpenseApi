import type {GetUser, IUserRepo} from "./user.types.js";
import {BadRequestError, NotFoundError} from "../../shared/errors/index.js";
import type {UserUpdateDTO} from "./user.schema.js";

export class UserService {
    constructor(private readonly userRepo: IUserRepo) {
    }

    async getMe(id: string): Promise<GetUser> {
        const user = await this.userRepo.findUserById(id);
        if (!user) {
            throw new BadRequestError('User not found');
        }

        return user;
    }

    async updateUser(id: string, userData: UserUpdateDTO): Promise<GetUser> {
        const user = await this.userRepo.findUserById(id);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return await this.userRepo.updateUser(user.id, userData)
    }
}