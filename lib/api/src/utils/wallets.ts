import { Wallet } from '@echo/model'

export const addWallet = (wallets: Wallet[], walletToAdd: Wallet) =>
  wallets.filter((wallet) => wallet !== walletToAdd).concat(walletToAdd)

export const removeWallet = (wallets: Wallet[], walletToRemove: Wallet) =>
  wallets.filter((wallet) => wallet !== walletToRemove)
