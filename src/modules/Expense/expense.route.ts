import {Router} from 'express';
import {ExpenseRepository} from "./expense.repository.js";
import {CategoryRepository} from "../Category/category.repository.js";
import {WalletRepository} from "../Wallet/wallet.repository.js";
import {ExpenseService} from "./expense.service.js";
import {ExpenseController} from "./expense.controller.js";
import {authenticate} from "../../middlewares/authMiddleware.js";
import {validateZod} from "../../middlewares/validateZod.js";
import {ExpenseIdSchema, ExpenseParamsPagination, ExpenseSchema, ExpenseUpdateSchema} from "./expense.schema.js";

const expenseRoutes = Router();
const walletRepo = new WalletRepository()
const expenseRepo = new ExpenseRepository();
const catRepo = new CategoryRepository();
const expenseServ = new ExpenseService(expenseRepo, walletRepo, catRepo);
const expenseCtrl = new ExpenseController(expenseServ);

// Crear
expenseRoutes.post("/", authenticate, validateZod(ExpenseSchema), expenseCtrl.createExpense.bind(expenseCtrl));
// Obtener
expenseRoutes.get("/", authenticate, validateZod(ExpenseParamsPagination, "query"), expenseCtrl.getAllExpense.bind(expenseCtrl));
expenseRoutes.get("/:id", authenticate, validateZod(ExpenseIdSchema, "params"), expenseCtrl.getExpenseById.bind(expenseCtrl));
// Actualizar
expenseRoutes.put("/:id", authenticate, validateZod(ExpenseIdSchema, "params"),
    validateZod(ExpenseUpdateSchema), expenseCtrl.updateExpense.bind(expenseCtrl));
// Eliminación
expenseRoutes.delete("/:id", authenticate, validateZod(ExpenseIdSchema, "params"), expenseCtrl.deleteExpense.bind(expenseCtrl));

//
export default expenseRoutes;