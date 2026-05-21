import {z} from "zod";
import {Recurring} from "@prisma/client"

export const IncomeSchema = z.object({
    name: z.string().min(1).max(30),
    amount: z.number().min(1),
    categoryId: z.string().min(1),
    walletId: z.string().min(1),
    description: z.string().min(1).optional(),
    date: z.coerce.date(),
    isRecurring: z.boolean(),
    recurringPeriod: z.enum(Recurring).optional(),
});

export const IncomeUpdateSchema = IncomeSchema.omit({date: true}).partial();
export const IncomeParamsId = z.object({
    id: z.string().min(1),
});

export const IncomeQueryPages = z.object({
    page: z.coerce.number().optional().default(1),
    limit: z.coerce.number().optional().default(10),
})
export type IncomeDTO = z.infer<typeof IncomeSchema>;
export type IncomeUpdateDTO = z.infer<typeof IncomeUpdateSchema>;