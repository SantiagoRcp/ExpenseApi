import {prisma} from '../../config/prisma.js'
import type {User} from '@prisma/client'
import type {UserDTO} from "../../shared/types/types.js";
import type {UserUpdateDTO} from "./user.schema.js";
import type {GetUser} from "./user.types.js";

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

    async updateUser(id: string, userData: UserUpdateDTO): Promise<GetUser> {
        // Investigar sobre esto.
        const data = Object.fromEntries(
            Object.entries(userData).filter(([_, value]) => value !== undefined)
        );

        return prisma.user.update({
            where: {id},
            data,
            select: {name: true, id: true, email: true, updatedAt: true, currency: true, createdAt: true}
        });
    }
}