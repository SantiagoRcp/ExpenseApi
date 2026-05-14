import {Router} from 'express';
import {CategoryRepository} from "./category.repository.js";
import {CategoryService} from "./category.service.js";
import {CategoryController} from "./category.controller.js";
import {authenticate} from "../../middlewares/authMiddleware.js";
import {validateZod} from "../../middlewares/validateZod.js";
import {CategoryParamsCatId, CategorySchema, UpdateCatSchema} from "./category.schema.js";

const catRepo = new CategoryRepository();
const catServ = new CategoryService(catRepo);
const catCtrl = new CategoryController(catServ);

const categoryRoute = Router();

categoryRoute.get('/income', authenticate, catCtrl.getCategoriesIncome.bind(catCtrl));
categoryRoute.get('/expense', authenticate, catCtrl.getCategoriesExpense.bind(catCtrl));
categoryRoute.get('/:catId', authenticate, validateZod(CategoryParamsCatId, 'params'), catCtrl.getCategoryById.bind(catCtrl));
categoryRoute.post('/', authenticate, validateZod(CategorySchema), catCtrl.addCategory.bind(catCtrl));
categoryRoute.put("/:catId", authenticate, validateZod(CategoryParamsCatId, "params"), validateZod(UpdateCatSchema), catCtrl.updateCategory.bind(catCtrl));

export default categoryRoute;
