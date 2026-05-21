import type {IncomeAllPagination, IncomeInput, IncomeUpdate} from "./income.types.js";
import type {Income} from "@prisma/client";
import {prisma} from "../../config/prisma.js";

export class IncomeRepository {

    async createIncome(data: IncomeInput): Promise<Income> {
        return prisma.income.create({
            data: {
                name: data.name,
                userId: data.userId,
                amount: data.amount,
                categoryId: data.categoryId,
                walletId: data.walletId,
                date: data.date,
                description: data.description ?? null,
                isRecurring: data.isRecurring ?? false,
                recurringPeriod: data.recurringPeriod ?? null,
            }
        });
    }

    async getAllIncome(userId: string, skip: number, limit: number): Promise<IncomeAllPagination> {
        const [data, totalItem] = await prisma.$transaction([
            prisma.income.findMany({
                where: {userId},
                skip, take:
                limit,
                include:
                    {
                        wallet: {select: {name: true, currency: true}},
                        category: {select: {name: true, icon: true, type: true}},
                    }
            },),
            prisma.income.count({where: {userId}})
        ]);

        const totalPage = Math.ceil(totalItem / limit);
        return {data, totalItem, totalPage}
    }

    async getIncomeById(id: string, userId: string): Promise<Income | null> {
        return prisma.income.findUnique({where: {id, userId}});
    }

    async updateIncome(data: IncomeUpdate): Promise<Income> {
        return prisma.income.update({
            where: {id: data.id, userId: data.userId},
            data: {
                ...(data.name !== undefined && {name: data.name}),
                ...(data.categoryId !== undefined && {categoryId: data.categoryId}),
                ...(data.walletId !== undefined && {walletId: data.walletId}),
                ...(data.description !== undefined && {description: data.description}),
                ...(data.amount !== undefined && {amount: data.amount}),
                ...(data.isRecurring !== undefined && {isRecurring: data.isRecurring}),
                ...(data.recurringPeriod !== undefined && {recurringPeriod: data.recurringPeriod}),
            },
        });
    }

    async deleteIncome(incomeId: string, userId: string): Promise<Income> {
        return prisma.income.delete({where: {id: incomeId, userId}});
    }
}