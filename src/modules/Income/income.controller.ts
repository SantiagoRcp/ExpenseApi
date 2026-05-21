import type {Request, Response} from "express";
import type {IncomeInput, IncomeServ, IncomeUpdate} from "./income.types.js";
import type {IncomeDTO, IncomeUpdateDTO} from "./income.schema.js";
import {UnauthorizedError} from "../../shared/errors/index.js";

export class IncomeController {

    constructor(private readonly incomeServ: IncomeServ) {
    }

    async createIncome(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        const data = req.body as IncomeDTO;

        if (!user) {
            throw new UnauthorizedError("Unauthorized User");
        }

        const incomeData: IncomeInput = {
            ...data, userId: user.id
        }
        const newIncome = await this.incomeServ.createIncome(incomeData);
        return res.status(201).json({message: "Income created successfully.", Income: newIncome});
    }

    async getAllIncome(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);

        if (!user) {
            throw new UnauthorizedError("Unauthorized User");
        }
        const Incomes = await this.incomeServ.getAllIncome(user.id, page, limit);
        return res.status(200).json({message: "Income", Incomes})
    }

    async getIncomeById(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        const id = req.params.id as string;

        if (!user) {
            throw new UnauthorizedError("Unauthorized User");
        }

        const income = await this.incomeServ.getIncomeById(id, user.id);
        return res.status(200).json({message: "Income fine", income})
    }

    async updateIncome(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        const data = req.body as IncomeUpdateDTO;
        const id = req.params.id as string;

        if (!user) {
            throw new UnauthorizedError("Unauthorized User");
        }

        const incomeData: IncomeUpdate = {
            ...data,
            userId: user.id,
            id
        }
        const income = await this.incomeServ.updateIncome(incomeData);
        return res.status(200).json({message: "Income updated successfully ", Income: income})
    }

    async deleteIncome(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        const incomeId = req.params.id as string;

        if (!user) {
            throw new UnauthorizedError("Unauthorized User");
        }
        const income = await this.incomeServ.deleteIncome(incomeId, user.id);
        return res.status(200).json({message: "Income deleted successfully.", deleteIncome: income});
    }
}