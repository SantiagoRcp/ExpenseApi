import type {Wallet} from "@prisma/client";

export interface WalletRepo {
    createWallet: (data: WalletInput) => Promise<Wallet>;
    getWalletById: (userId: string, id: string) => Promise<Wallet | null>;
    getAllWallets: (userId: string) => Promise<Wallet[]>;
    updateWallet: (wallet: UpdateWallet) => Promise<Wallet>;
}

export interface WalletServ {
    createWallet: (data: WalletInput) => Promise<Wallet>;
    getWalletById: (UserId: string, walletId: string) => Promise<Wallet>;
    getAllWallets: (userId: string) => Promise<Wallet[]>;
    updateWallet: (userId: string, wallet: UpdateWallet) => Promise<Wallet>;
}

export type WalletInput = {
    name: string,
    userId: string,
}

export type UpdateWallet = {
    walletId: string,
    name?: string;
    userId: string,
}