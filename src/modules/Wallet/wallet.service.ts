import type {WalletInput, UpdateWallet, WalletRepo} from "./wallet.types.js";
import type {Wallet} from "@prisma/client";
import {NotFoundError} from "../../shared/errors/index.js";

export class WalletService {
    constructor(private readonly walletRepo: WalletRepo) {
    }

    async createWallet(data: WalletInput): Promise<Wallet> {
        return await this.walletRepo.createWallet(data);
    }

    async getWalletById(userId: string, id: string): Promise<Wallet> {
        const wallet = await this.walletRepo.getWalletById(userId, id);

        if (!wallet) {
            throw new NotFoundError("Wallet not found");
        }
        return wallet;
    }

    async getAllWallets(userId: string): Promise<Wallet[]> {
        return await this.walletRepo.getAllWallets(userId);
    }

    async updateWallet(userId: string, data: UpdateWallet): Promise<Wallet> {
        const wallet = await this.walletRepo.getWalletById(userId, data.walletId);
        if (!wallet) {
            throw new NotFoundError("Wallet not found");
        }
        return this.walletRepo.updateWallet(data);
    }
}