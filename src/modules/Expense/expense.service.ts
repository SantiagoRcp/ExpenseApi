import type {CatRepo, ExpenseInput, ExpenseRepo, ResultAllExpense, UpdateExpense, WalletRepo} from "./expense.types.js";
import type {Expense} from "@prisma/client";
import {BadRequestError, NotFoundError} from "../../shared/errors/index.js";

export class ExpenseService {
    constructor(private readonly expenseRepo: ExpenseRepo, private readonly walletRepo: WalletRepo, private readonly catRepo: CatRepo) {
    }

    async createExpense(data: ExpenseInput): Promise<Expense> {
        const wallet = await this.walletRepo.getWalletById(data.userId, data.walletId);
        const category = await this.catRepo.getCategoryById(data.categoryId);

        if (!wallet) {
            throw new NotFoundError("Wallet not found");
        }

        if (wallet.userId !== data.userId) {
            throw new NotFoundError("Wallet not found");
        }

        if (!category) {
            throw new NotFoundError("Category not found") ;
        }

        if (category.type !== "Expense") {
            throw new BadRequestError("Invalid category");
        }

        if (!category.isDefault && category.userId !== data.userId) {
            throw new NotFoundError("Category not found");
        }
        return await this.expenseRepo.createExpense(data);
    }

    async getExpenseById(id: string, userId: string): Promise<Expense> {
        const expense = await this.expenseRepo.getExpenseById(id, userId);

        if (!expense) {
            throw new NotFoundError("Expense not found");
        }
        return expense;
    }

    async getAllExpenses(userId: string, page: number, limit: number): Promise<ResultAllExpense> {
        return await this.expenseRepo.getAllExpenses(userId, page, limit);
    }

    async updateExpense(data: UpdateExpense): Promise<Expense> {
        if (data.walletId) {
            const wallet = await this.walletRepo.getWalletById(data.userId, data.walletId);
            if (!wallet) {
                throw new NotFoundError("Wallet not found");
            }
        }

        if (data.categoryId) {
            const category = await this.catRepo.getCategoryById(data.categoryId);
            if (!category) {
                throw new NotFoundError("Category not found");
            }

            if (!category.isDefault && category.userId !== data.userId) {
                throw new BadRequestError("Invalid category");
            }
        }
        return await this.expenseRepo.updateExpense(data);
    }

    async deleteExpense(id: string, userId: string): Promise<Expense> {
        const expense = await this.getExpenseById(id, userId);
        return await this.expenseRepo.deleteExpense(expense.id, expense.userId)
    }
}