import {type User} from "@prisma/client";

// import {Prisma} from "@prisma/client/";
export type GetUser = Omit<User, 'password'>


export interface IUserRepo {
    findUserById: (id: string) => Promise<GetUser | null>;
}


export interface IUserServ {
    getMe: (id: string) => Promise<GetUser>;
}