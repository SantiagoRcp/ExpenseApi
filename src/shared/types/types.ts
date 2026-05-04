import {z} from 'zod';
import {UserSchema} from "./schema.js";

export type UserDTO = z.infer<typeof UserSchema>;