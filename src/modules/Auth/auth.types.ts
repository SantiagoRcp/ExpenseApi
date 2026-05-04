import type {User} from "@prisma/client";
import type {UserDTO} from "../../shared/types/types.js";

import type {LoginDTO} from "./auth.schema.js";

export interface IAuthRepo {
    register: (data: UserDTO) => Promise<User>;
    findUserByEmail: (email: string) => Promise<User | null>;
}

export interface IAuthService {
    register: (data: UserDTO) => Promise<IAuthResponse>;
    login: (data: LoginDTO) => Promise<IAuthResponse>;
    // logout: (email: string) => Promise<void>;
}

export type Payload = {
    id: string;
    email: string;
    name: string
}

export interface IAuthResponse {
    status: "ok";
    message: string;
    user: {
        id?: string;
        name: string;
        email: string;
    }
    token: string;
}

