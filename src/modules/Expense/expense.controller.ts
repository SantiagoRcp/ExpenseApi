import type {Request, Response} from "express";
import type {ExpenseServ, UpdateExpense} from "./expense.types.js";
import {UnauthorizedError} from "../../shared/errors/index.js";
import type {ExpenseDTO} from "./expense.schema.js";

export class ExpenseController {
    constructor(private readonly expenseServ: ExpenseServ) {
    }

    async createExpense(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        const data = req.body as ExpenseDTO;

        if (!user) {
            throw new UnauthorizedError("Unauthorized User");
        }
        const expense = await this.expenseServ.createExpense({...data, userId: user.id});
        return res.status(201).json({message: "Expense created successfully", data: expense});
    }

    async getExpenseById(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        const id = req.params.id as string;
        if (!user) {
            throw new UnauthorizedError("Unauthorized User");
        }

        const expense = await this.expenseServ.getExpenseById(id, user.id);
        return res.status(200).json({message: "Expense found", data: expense});
    }

    async getAllExpense(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);

        if (!user) {
            throw new UnauthorizedError("Unauthorized User");
        }
        const result = await this.expenseServ.getAllExpenses(user.id, page, limit)
        return res.status(200).json({message: "Expenses found", data: result.data, meta: result.meta});
    }

    async updateExpense(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        const data = req.body as UpdateExpense;
        const id = req.params.id as string;

        if (!user) {
            throw new UnauthorizedError("Unauthorized User");
        }
        const expenseUpdated = await this.expenseServ.updateExpense({...data, userId: user.id, id});
        return res.status(200).json({message: "Expense updated successfully", data: expenseUpdated});
    }

    async deleteExpense(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        const id = req.params.id as string;
        if (!user) {
            throw new UnauthorizedError("Unauthorized User");
        }

        const expense = await this.expenseServ.deleteExpense(id, user.id);

        return res.status(200).json({message: "Expense deleted successfully", data: expense});
    }
}
