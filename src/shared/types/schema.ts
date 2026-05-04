import {z} from 'zod'

export const UserSchema = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        'The password must be at least 8 characters long, and include one uppercase letter, one lowercase letter, one number, and one special character.'),

});