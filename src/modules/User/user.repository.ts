import {prisma} from '../../config/prisma.js'
import type {User} from '@prisma/client'
import type {UserDTO} from "../../shared/types/types.js";

export class UserRepository {

    async register(data: UserDTO): Promise<User> {
        return prisma.user.create({data});
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({where: {email}});
    }

    async findUserById(id: string): Promise<User | null> {
        return prisma.user.findUnique({where: {id}});
    }
}