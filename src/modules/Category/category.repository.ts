import {prisma} from "../../config/prisma.js";
import {type Category, type CategoryType} from "@prisma/client"
import {type CategoryDTO, type UpdateCatDTO} from "./category.schema.js";
import {BadRequestError} from "../../shared/errors/index.js";

export class CategoryRepository {

    async getUserAndSystemCatByType(userId: string, type: CategoryType): Promise<Category[]> {
        return prisma.category.findMany({
            where: {OR: [{isDefault: true}, {userId}], ...(type && {type})},
            orderBy: [{isDefault: "desc"}, {name: "asc"}]
        });
    }

    async getCategoryById(catId: string): Promise<Category | null> {
        return prisma.category.findUnique({where: {id: catId}});
    }

    async addCategory(category: CategoryDTO): Promise<Category> {
        if (!category.userId) {
            throw new BadRequestError('userId is required');
        }
        return prisma.category.create({
            data: {
                userId: category.userId,
                name: category.name,
                icon: category.icon,
                type: category.type
            }
        });
    }

    async updateCategory(catId: string, data: UpdateCatDTO): Promise<Category> {
        return prisma.category.update({
            where: {id: catId},
            data: {
                ...(data.name && {name: data.name}),
                ...(data.icon && {icon: data.icon}),
                ...(data.type && {type: data.type}),
                ...(data.userId && {userId: data.userId}),
                isDefault: false
            },
        });
    }
}