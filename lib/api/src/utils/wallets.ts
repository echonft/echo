import { Wallet } from '@echo/model'

export const addWallet = (wallets: Wallet[], walletToAdd: Wallet) =>
  wallets
    .filter((wallet) => !(wallet.address === walletToAdd.address && wallet.chainId === walletToAdd.chainId))
    .concat([walletToAdd])

export const removeWallet = (wallets: Wallet[], walletToRemove: Wallet) =>
  wallets.filter((wallet) => !(wallet.address === walletToRemove.address && wallet.chainId === walletToRemove.chainId))
