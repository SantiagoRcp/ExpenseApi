import type {Category, Income, Recurring, Wallet} from "@prisma/client"

export interface IncomeRepo {
    createIncome: (data: IncomeInput) => Promise<Income>;
    getAllIncome: (userId: string, skip: number, limit: number) => Promise<IncomeAllPagination>;
    getIncomeById: (id: string, userId: string) => Promise<Income | null>;
    updateIncome: (data: IncomeUpdate) => Promise<Income>;
    deleteIncome: (incomeId: string, userId: string) => Promise<Income>;
}

export interface IncomeAndWalletRepo {
    getWalletById: (userId: string, walletId: string) => Promise<Wallet | null>;
}

export interface IncomeAndCatRepo {
    getCategoryById: (catId: string) => Promise<Category | null>;
}

export interface IncomeServ {
    createIncome: (data: IncomeInput) => Promise<Income>;
    getAllIncome: (userId: string, page: number, limit: number) => Promise<IncomeAllPagination>;
    getIncomeById: (id: string, userId: string) => Promise<Income>;
    updateIncome: (data: IncomeUpdate) => Promise<Income>;
    deleteIncome: (incomeId: string, userId: string) => Promise<Income>;
}

export type IncomeInput = {
    name: string,
    userId: string,
    amount: number,
    categoryId: string,
    walletId: string,
    description?: string | undefined,
    date: Date,
    isRecurring?: boolean,
    recurringPeriod?: Recurring | undefined
}

export type IncomeUpdate = Partial<Omit<IncomeInput, 'userId' | 'date'>> & Pick<IncomeInput, 'userId'> & { id: string };

export type IncomeAllPagination = {
    data: Income[],
    totalItem: number,
    totalPage: number,
}
