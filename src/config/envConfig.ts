import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("3000").transform(Number),
    HOST: z.string().min(2).default("localhost"),
    JWT_SECRET: z.string().min(36),
    JWT_EXPIRES_IN: z.string().default('1h'),
    DB_USER: z.string().min(2, "Username for the database is required"),
    DB_PASSWORD: z.string().min(2),
    DB_NAME: z.string().min(2),
    DATABASE_URL: z.string().url("The URL of the database is invalid"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error(JSON.stringify(_env.error.issues, null, 2));
    process.exit(1);
}
export const env = _env.data;
export type Env = z.infer<typeof _env.data>;
