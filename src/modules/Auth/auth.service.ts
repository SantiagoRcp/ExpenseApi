import argon2 from "argon2";
import type {IAuthRepo, IAuthResponse, Payload} from "./auth.types.js";
import type {UserDTO} from "../../shared/types/types.js";
import {BadRequestError, ConflictError} from "../../shared/errors/index.js";
import {generateJWT} from "../../shared/utils/jwt.util.js";
import type {LoginDTO} from "./auth.schema.js";

export class AuthService {
    constructor(private authRepo: IAuthRepo) {
    }

    async register(data: UserDTO): Promise<IAuthResponse> {
        const {password} = data;

        const existEmail = await this.authRepo.findUserByEmail(data.email);
        if (existEmail) {
            throw new ConflictError('User already registered');
        }

        const hashedPassword = await argon2.hash(password);
        const user = await this.authRepo.register({name: data.name, email: data.email, password: hashedPassword});

        const payload: Payload = {
            id: user.id,
            name: user.name,
            email: data.email,
        };
        const token = generateJWT(payload);

        return {
            status: "ok",
            message: "user successfully registered",
            user: {name: user.name, email: user.email},
            token,
        };
    }

    async login(data: LoginDTO): Promise<IAuthResponse> {
        const user = await this.authRepo.findUserByEmail(data.email);
        if (!user) {
            throw new BadRequestError('Incorrect Credentials');
        }

        const isPassword = await argon2.verify(user.password, data.password);
        if (!isPassword) {
            throw new BadRequestError('Incorrect Credentials');
        }

        const payload: Payload = {
            id: user.id,
            name: user.name,
            email: data.email,
        };
        const token = generateJWT(payload);

        return {
            status: "ok",
            message: "Login successful",
            user: {name: user.name, email: user.email},
            token,
        };
    }

}