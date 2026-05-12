import {Router} from 'express';
import {authenticate} from "../../middlewares/authMiddleware.js";
import {UserRepository} from "./user.repository.js";
import {UserService} from "./user.service.js";
import {UserController} from "./user.controller.js";
import {validateZod} from "../../middlewares/validateZod.js";
import {UserUpdate} from "./user.schema.js";

const userRouter = Router();
const userServ = new UserService(new UserRepository())
const userCtrl = new UserController(userServ)

userRouter.get("/profile/me", authenticate, userCtrl.getMe.bind(userCtrl));
userRouter.put('/profile/me', authenticate, validateZod(UserUpdate), userCtrl.userUpdate.bind(userCtrl));


export default userRouter;