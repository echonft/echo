import { walletEquals } from '../../predicates'
import { Wallet } from '../../types'
import { addToArrayIfNotPresent } from '@echo/utils'
export const addWallet = (wallets: Wallet[], walletToAdd: Wallet): Wallet[] =>
  addToArrayIfNotPresent<Wallet>(wallets, walletToAdd, walletEquals)
