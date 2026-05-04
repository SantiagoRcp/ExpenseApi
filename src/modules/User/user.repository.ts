import {prisma} from '../../config/prisma.js'
import type {User} from '@prisma/client'
import type {UserDTO} from "../../shared/types/types.js";

export class UserRepository {

    async register(data: UserDTO): Promise<User> {
        return await prisma.user.create({data})
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findOne({where: {email}})
    }

}