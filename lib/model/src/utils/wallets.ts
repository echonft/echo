import { Wallet } from 'index'

export const addWallet = (wallets: Wallet[], walletToAdd: Wallet) =>
  wallets.some((wallet) => wallet.address === walletToAdd.address && wallet.chainId === walletToAdd.chainId)
    ? wallets
    : wallets.concat(walletToAdd)

export const removeWallet = (wallets: Wallet[], walletToRemove: Wallet) =>
  wallets.filter((wallet) => !(wallet.address === walletToRemove.address && wallet.chainId === walletToRemove.chainId))
