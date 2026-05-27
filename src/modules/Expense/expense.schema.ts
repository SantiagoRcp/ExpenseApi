import {z} from 'zod';
import {Recurring} from "@prisma/client"

export const ExpenseSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1).optional(),
    amount: z.number().min(1),
    categoryId: z.string().min(1),
    walletId: z.string().min(1),
    date: z.coerce.date(),
    isRecurring: z.boolean().optional(),
    recurringPeriod: z.enum(Recurring).optional(),
});

export const ExpenseIdSchema = z.object({
    id: z.string().min(1),
});

export const ExpenseParamsPagination = z.object({
    limit: z.coerce.number().optional().default(10),
    page: z.coerce.number().optional().default(1),
});

export const ExpenseUpdateSchema = ExpenseSchema.partial();

export type ExpenseDTO = z.infer<typeof ExpenseSchema>;
export type ExpenseUpdateDTO = z.infer<typeof ExpenseUpdateSchema>;