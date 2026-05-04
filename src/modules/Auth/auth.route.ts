import {Router} from 'express';
import {AuthService} from "./auth.service.js";
import {AuthController} from "./auth.controller.js";
import {UserRepository} from "../User/user.repository.js";

const authRouter = Router();
const userRepo = new UserRepository();
const autService = new AuthService(userRepo);
const authCtrl = new AuthController(autService);

authRouter.post("/register", authCtrl.register.bind(authCtrl));
authRouter.post("/login", authCtrl.login.bind(authCtrl));
authRouter.post("/logout", authCtrl.logout.bind(authCtrl));

export default authRouter;