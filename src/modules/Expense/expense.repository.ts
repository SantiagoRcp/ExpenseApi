import type {ExpenseInput, ResultAllExpense, UpdateExpense} from "./expense.types.js";
import type {Expense} from "@prisma/client";
import {prisma} from "../../config/prisma.js";

export class ExpenseRepository {

    async createExpense(data: ExpenseInput): Promise<Expense> {
        return prisma.expense.create({
            data: {
                name: data.name,
                description: data.description ?? '',
                amount: data.amount,
                userId: data.userId,
                walletId: data.walletId,
                categoryId: data.categoryId,
                date: data.date,
                isRecurring: data.isRecurring ?? false,
                recurringPeriod: data.recurring ?? null
            }
        });
    }

    async getExpenseById(id: string, userId: string): Promise<Expense | null> {
        return prisma.expense.findFirst({where: {id, userId}, include: {category: true, wallet: true}});
    }

    async getAllExpenses(userId: string, page: number, limit: number): Promise<ResultAllExpense> {
        const [data, totalItem] = await prisma.$transaction([
            prisma.expense.findMany({
                where: {userId: userId},
                take: limit,
                skip: (page - 1) * limit,
            }),
            prisma.expense.count({where: {userId}}),
        ]);

        const totalPage = Math.ceil(totalItem / limit);
        return {data, pages: totalPage, totalItem};
    }

    async updateExpense(data: UpdateExpense): Promise<Expense> {
        return prisma.expense.update({
            where: {id: data.id, userId: data.userId},
            data: {
                ...(data.name !== undefined && {name: data.name}),
                ...(data.description !== undefined && {description: data.description}),
                ...(data.amount !== undefined && {amount: data.amount}),
                ...(data.categoryId !== undefined && {categoryId: data.categoryId}),
                ...(data.walletId !== undefined && {walletId: data.walletId}),
                ...(data.isRecurring !== undefined && {isRecurring: data.isRecurring}),
                ...(data.recurring !== undefined && {recurringPeriod: data.recurring}),
            },
        });
    }

    async deleteExpense(id: string, userId: string): Promise<Expense> {
        return prisma.expense.delete({where: {id, userId}});
    }
}