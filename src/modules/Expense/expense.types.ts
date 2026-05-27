import {type Category, type Expense, Recurring, type Wallet} from "@prisma/client"

export interface ExpenseRepo {
    createExpense: (data: ExpenseInput) => Promise<Expense>
    getAllExpenses: (userId: string, page: number, limit: number) => Promise<ResultAllExpense>
    getExpenseById: (id: string, userId: string) => Promise<Expense | null>
    updateExpense: (data: UpdateExpense) => Promise<Expense>
    deleteExpense: (id: string, userId: string) => Promise<Expense>
}

export interface WalletRepo {
    getWalletById: (UserId: string, walletId: string) => Promise<Wallet | null>;
}

export interface CatRepo {
    getCategoryById: (id: string) => Promise<Category | null>;
}

export interface ExpenseServ {
    createExpense: (data: ExpenseInput) => Promise<Expense>
    getAllExpenses: (userId: string, page: number, limit: number) => Promise<ResultAllExpense>;
    getExpenseById: (id: string, userId: string) => Promise<Expense>
    updateExpense: (data: UpdateExpense) => Promise<Expense>
    deleteExpense: (id: string, userId: string) => Promise<Expense>
}

export type ExpenseInput = {
    name: string;
    description?: string;
    amount: number;
    userId: string;
    walletId: string;
    categoryId: string;
    date: Date;
    isRecurring?: boolean;
    recurring?: Recurring;
}

export type UpdateExpense = Partial<Omit<ExpenseInput, "userId">> & Pick<ExpenseInput, 'userId'> & { id: string }

export type ResultAllExpense = {
    data: Expense[];
    pages: number;
    totalItem: number;
}