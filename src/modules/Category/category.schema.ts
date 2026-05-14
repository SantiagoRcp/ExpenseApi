import {z} from 'zod';

export const CategorySchema = z.object({
    name: z.string().min(3, 'Category Name is required'),
    icon: z.string().min(1, 'Icon is required'),
    type: z.enum(['Income', 'Expense']),
    userId: z.string().min(1, 'User ID is required').optional(),
});

export const CategoryParamsCatId = z.object({
    catId: z.string().min(3, 'Category ID is required')
})

export const UpdateCatSchema = CategorySchema.partial();

export type CategoryDTO = z.infer<typeof CategorySchema>;
export type UpdateCatDTO = z.infer<typeof UpdateCatSchema>;