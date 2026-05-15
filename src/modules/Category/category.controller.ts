import {type Request, type Response} from "express";
import type {CategoryServ} from "./category.types.js";
import {UnauthorizedError} from "../../shared/errors/index.js";
import type {CategoryDTO, UpdateCatDTO} from "./category.schema.js";

export class CategoryController {
    constructor(private readonly catServ: CategoryServ) {
    }

    async getCategoriesIncome(req: Request, res: Response) {
        const user = req.user;
        if (!user) {
            throw new UnauthorizedError("Unauthorized user");
        }

        const incomeCat = await this.catServ.getUserAndSystemCatByType(user.id, "Income");
        res.status(200).json({income: incomeCat});
    }

    async getCategoriesExpense(req: Request, res: Response) {
        const user = req.user;
        if (!user) {
            throw new UnauthorizedError("Unauthorized user");
        }

        const expenseCat = await this.catServ.getUserAndSystemCatByType(user.id, "Expense");
        res.status(200).json({expense: expenseCat});
    }

    async getCategoryById(req: Request, res: Response) {
        const user = req.user;
        const catId = req.params.catId as string;

        if (!user) {
            throw new UnauthorizedError("Unauthorized user");
        }
        const category = await this.catServ.getCategoryById(user.id, catId);
        res.status(200).json({category: category});
    }

    async addCategory(req: Request, res: Response) {
        const user = req.user;
        const data = req.body as CategoryDTO;

        if (!user) {
            throw new UnauthorizedError("Unauthorized user");
        }

        data.userId = user.id;
        const newCat = await this.catServ.addCategory(data);
        res.status(200).json({message: "Category correctly registered", category: newCat});
    }

    async updateCategory(req: Request, res: Response) {
        const data = req.body as UpdateCatDTO;
        const user = req.user;
        const catId = req.params.catId as string;
        if (!user) {
            throw new UnauthorizedError("Unauthorized user");
        }
        data.userId = user.id
        const updatedCat = await this.catServ.updateCategory(user.id, catId, data);
        res.status(200).json({message: "Category updated correctly", category: updatedCat})
    }
}