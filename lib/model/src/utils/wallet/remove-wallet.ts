import { walletEquals } from '../../predicates/wallet/wallet-equals'
import { Wallet } from '../../types/wallet'
import { removeFromArrayIfPresent } from '@echo/utils'

export const removeWallet = (wallets: Wallet[], walletToRemove: Wallet): Wallet[] =>
  removeFromArrayIfPresent<Wallet>(wallets, walletToRemove, walletEquals)
