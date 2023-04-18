import { walletEquals } from '../../predicates/wallet/wallet-equals'
import { Wallet } from '../../types/wallet'
import { addToArrayIfNotPresent } from '@echo/utils'
export const addWallet = (wallets: Wallet[], walletToAdd: Wallet): Wallet[] =>
  addToArrayIfNotPresent<Wallet>(wallets, walletToAdd, walletEquals)
