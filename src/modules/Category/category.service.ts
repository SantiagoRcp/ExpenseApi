import {type CategoryRepo} from "./category.types.js";
import {type Category, CategoryType} from "@prisma/client";
import type {CategoryDTO, UpdateCatDTO} from "./category.schema.js";
import {ForbiddenError, NotFoundError} from "../../shared/errors/index.js";

export class CategoryService {
    constructor(private readonly catRepo: CategoryRepo) {
    }

    async getUserAndSystemCatByType(userId: string, type: CategoryType): Promise<Category[]> {
        return await this.catRepo.getUserAndSystemCatByType(userId, type);
    }

    async getCategoryById(userId: string, catId: string): Promise<Category> {
        const category = await this.catRepo.getCategoryById(catId);
        if (!category) {
            throw new NotFoundError("Category not found");
        }

        if (category.userId !== userId) {
            throw new NotFoundError("Category not found");
        }
        return category;
    }

    async addCategory(category: CategoryDTO): Promise<Category> {
        return await this.catRepo.addCategory(category);
    }

    async updateCategory(userId: string, catId: string, data: UpdateCatDTO): Promise<Category> {
        const category = await this.getCategoryById(userId, catId);
        if (!category) {
            throw new NotFoundError("Category not found");
        }

        if (category.isDefault) {
            throw new ForbiddenError("You do not have permission to modify the category")
        }

        if (category.userId !== data.userId) {
            throw new ForbiddenError("You do not have permission to modify the category");
        }

        return await this.catRepo.updateCategory(category.id, data);
    }
}