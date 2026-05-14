import {type Category, CategoryType} from "@prisma/client";
import {type CategoryDTO, type UpdateCatDTO} from "./category.schema.js";

export interface CategoryRepo {
    getUserAndSystemCatByType: (userId: string, type: CategoryType) => Promise<Category[]>;
    getCategoryById: (catId: string) => Promise<Category | null>;
    addCategory: (cat: CategoryDTO) => Promise<Category>;
    updateCategory: (catId: string, data: UpdateCatDTO) => Promise<Category>;
}

export interface CategoryServ {
    getUserAndSystemCatByType: (userId: string, type: CategoryType) => Promise<Category[]>;
    getCategoryById: (catId: string) => Promise<Category>;
    addCategory: (category: CategoryDTO) => Promise<Category>;
    updateCategory: (catId: string, data: UpdateCatDTO) => Promise<Category>;
}
