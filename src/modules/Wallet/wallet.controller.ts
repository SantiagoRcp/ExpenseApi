import type {Request, Response} from 'express';
import type {WalletDTO, UpdateWalletDTO} from "./wallet.schema.js";
import {UnauthorizedError} from "../../shared/errors/index.js";
import type {WalletInput, WalletServ, UpdateWallet} from "./wallet.types.js";

export class WalletController {
    constructor(private readonly walletServ: WalletServ) {
    }

    async createWallet(req: Request, res: Response): Promise<Response> {
        const userId = req.user?.id;
        const walletName = req.body as WalletDTO;

        if (!userId) {
            throw new UnauthorizedError('Unauthorized user');
        }

        const data: WalletInput = {
            name: walletName.name,
            userId,
        }
        const wallet = await this.walletServ.createWallet(data);
        return res.status(201).json({message: 'Wallet created successfully', data: wallet});
    }

    async getWalletById(req: Request, res: Response): Promise<Response> {
        const userId = req.user?.id;
        const walletId = req.params.walletId as string;

        if (!userId) {
            throw new UnauthorizedError('Unauthorized user');
        }

        const wallet = await this.walletServ.getWalletById(userId, walletId)
        return res.status(200).json({message: "Wallet found", data: wallet});
    }

    async getAllWallets(req: Request, res: Response): Promise<Response> {
        const user = req.user;

        if (!user) {
            throw new UnauthorizedError('Unauthorized user');
        }

        const wallets = await this.walletServ.getAllWallets(user.id);
        return res.status(200).json({message: "Wallets found", data: wallets});
    }

    async updateWallet(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        const walletId = req.params.walletId as string;
        const walletData = req.body as UpdateWalletDTO;

        if (!user) {
            throw new UnauthorizedError('Unauthorized user');
        }

        const wallet: UpdateWallet = {
            walletId: walletId,
            userId: user.id,
            name: walletData.name as string

        }
        const updatedWallet = await this.walletServ.updateWallet(user.id, wallet);
        return res.status(200).json({message: "Wallet updated successfully", data: updatedWallet})
    }
}
