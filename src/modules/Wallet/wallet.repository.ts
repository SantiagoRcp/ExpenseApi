import type {Wallet} from "@prisma/client";
import {prisma} from "../../config/prisma.js";
import type {UpdateWallet, WalletInput} from "./wallet.types.js";

export class WalletRepository {
    async createWallet(data: WalletInput): Promise<Wallet> {
        return prisma.wallet.create({data})
    }

    async getWalletById(userId: string, id: string): Promise<Wallet | null> {
        return prisma.wallet.findFirst({where: {id, userId}});
    }

    async getWalletByName() {
    }

    async getAllWallets(userId: string) {
        return prisma.wallet.findMany({where: {userId: userId}});
    }

    async updateWallet(wallet: UpdateWallet) {
        return prisma.wallet.update({
            where: {id: wallet.walletId},
            data: {
                ...(wallet.name && {name: wallet.name})
            },
        })
    }
}