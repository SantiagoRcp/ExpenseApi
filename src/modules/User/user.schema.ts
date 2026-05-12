import {UserSchema} from "../../shared/types/schema.js";
import z from "zod";

export const UserUpdate = UserSchema.partial();

export type UserUpdateDTO = z.infer<typeof UserUpdate>