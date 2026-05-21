import {type Income} from "@prisma/client";
import type {
    IncomeInput,
    IncomeRepo,
    IncomeAndWalletRepo,
    IncomeAndCatRepo,
    IncomeAllPagination, IncomeUpdate
} from "./income.types.js";
import {NotFoundError} from "../../shared/errors/index.js";

export class IncomeService {
    constructor(private readonly incomeRepo: IncomeRepo, private readonly walletRepo: IncomeAndWalletRepo, private readonly catRepo: IncomeAndCatRepo) {
    }

    async createIncome(data: IncomeInput): Promise<Income> {
        const wallet = await this.walletRepo.getWalletById(data.userId, data.walletId);
        const category = await this.catRepo.getCategoryById(data.categoryId);

        if (!wallet) {
            throw new NotFoundError("Wallet not found");
        }

        if (!category) {
            throw new NotFoundError("Category not found");
        }

        if (!category.isDefault && category.userId !== data.userId) {
            throw new NotFoundError("Category not found");
        }
        return await this.incomeRepo.createIncome(data);
    }

    async getAllIncome(userId: string, page: number, limit: number): Promise<IncomeAllPagination> {
        const skip = (page - 1) * limit;
        return await this.incomeRepo.getAllIncome(userId, skip, limit);
    }

    async getIncomeById(id: string, userId: string): Promise<Income> {
        const income = await this.incomeRepo.getIncomeById(id, userId);
        if (!income) {
            throw new NotFoundError("Income not found");
        }
        return income
    }

    async updateIncome(data: IncomeUpdate): Promise<Income> {
        if (data.walletId) {
            const wallet = await this.walletRepo.getWalletById(data.userId, data.walletId);
            if (!wallet) {
                throw new NotFoundError("Wallet not found");
            }
        }

        if (data.categoryId) {
            const category = await this.catRepo.getCategoryById(data.categoryId!);
            if (!category) {
                throw new NotFoundError("Category not found");
            }

            if (!category.isDefault && category.userId !== data.userId) {
                throw new NotFoundError("Category not found");
            }
        }

        return await this.incomeRepo.updateIncome(data);
    }

    async deleteIncome(incomeId: string, userId: string): Promise<Income> {
        const income = await this.incomeRepo.getIncomeById(incomeId, userId);
        if (!income) {
            throw new NotFoundError("Income not found");
        }
        return await this.incomeRepo.deleteIncome(incomeId, userId);
    }
}