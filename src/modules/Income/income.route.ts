import {Router} from "express";
import {IncomeRepository} from "./income.repository.js";
import {IncomeService} from "./income.service.js";
import {IncomeController} from "./income.controller.js";
import {authenticate} from "../../middlewares/authMiddleware.js";
import {validateZod} from "../../middlewares/validateZod.js";
import {WalletRepository} from "../Wallet/wallet.repository.js";

import {IncomeParamsId, IncomeQueryPages, IncomeSchema, IncomeUpdateSchema} from "./income.schema.js";
import {CategoryRepository} from "../Category/category.repository.js";

const incomeRouter = Router();
const incomeRepo = new IncomeRepository();
const walletRepo = new WalletRepository();
const catRepo = new CategoryRepository()
const incomeServ = new IncomeService(incomeRepo, walletRepo, catRepo);
const incomeCtrl = new IncomeController(incomeServ);

//crear
incomeRouter.post("/", authenticate, validateZod(IncomeSchema), incomeCtrl.createIncome.bind(incomeCtrl));
//Obtener
// incomeRouter.get("/", authenticate, incomeCtrl.getAllIncome.bind(incomeCtrl));
incomeRouter.get("/", authenticate, validateZod(IncomeQueryPages, "query"), incomeCtrl.getAllIncome.bind(incomeCtrl));
incomeRouter.get("/:id", authenticate, validateZod(IncomeParamsId, "params"), incomeCtrl.getIncomeById.bind(incomeCtrl));
//Actualizar
incomeRouter.put("/:id", authenticate, validateZod(IncomeParamsId, "params"), validateZod(IncomeUpdateSchema),
    incomeCtrl.updateIncome.bind(incomeCtrl));
//Eliminar
incomeRouter.delete("/:id", authenticate, validateZod(IncomeParamsId, "params"), incomeCtrl.deleteIncome.bind(incomeCtrl));


export default incomeRouter;