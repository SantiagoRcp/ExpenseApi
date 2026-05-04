import {z} from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        'The password must be at least 8 characters long, and include one uppercase letter, one lowercase letter, one number, and one special character.'),
});

export type LoginDTO = z.infer<typeof LoginSchema>;

