import {Router} from 'express';
import {authenticate} from "../../middlewares/authMiddleware.js";
import {validateZod} from "../../middlewares/validateZod.js";
import {UpdateWalletSchema, WalletParamsSchema, WalletSchema} from "./wallet.schema.js";
import {WalletRepository} from "./wallet.repository.js";
import {WalletService} from "./wallet.service.js";
import {WalletController} from "./wallet.controller.js";

const walletRoute = Router();
const walletServ = new WalletService(new WalletRepository());
const walletCtrl = new WalletController(walletServ);

walletRoute.post('/', authenticate, validateZod(WalletSchema), walletCtrl.createWallet.bind(walletCtrl));
walletRoute.get('/:walletId', authenticate, validateZod(WalletParamsSchema, "params"), walletCtrl.getWalletById.bind(walletCtrl));
walletRoute.get('/', authenticate, walletCtrl.getAllWallets.bind(walletCtrl));
walletRoute.put('/:walletId', authenticate, validateZod(WalletParamsSchema, "params"), validateZod(UpdateWalletSchema), walletCtrl.updateWallet.bind(walletCtrl));

export default walletRoute;