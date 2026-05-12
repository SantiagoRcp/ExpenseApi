import {type User} from "@prisma/client";
import type {UserUpdateDTO} from "./user.schema.js";

/*
* No password returned
* */
export type GetUser = Omit<User, 'password'>


export interface IUserRepo {
    findUserById: (id: string) => Promise<User | null>;
    updateUser: (id: string, userData: UserUpdateDTO) => Promise<GetUser>;
}


export interface IUserServ {
    getMe: (id: string) => Promise<GetUser>;
    updateUser: (id: string, userData: UserUpdateDTO) => Promise<GetUser>;
}