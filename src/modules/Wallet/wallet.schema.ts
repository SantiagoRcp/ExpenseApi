import {z} from 'zod';

export const WalletSchema = z.object({
    name: z.string().min(1, 'Name is required').max(25, 'The name is very long')
});

export const UpdateWalletSchema = WalletSchema.partial();

export const WalletParamsSchema = z.object({
    walletId: z.string().min(1, 'Required Id'),
});

export type WalletDTO = z.infer<typeof WalletSchema>;
export  type  UpdateWalletDTO = z.infer<typeof UpdateWalletSchema>;