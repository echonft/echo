import { Wallet } from '../../../../types/wallet'
import { mockWallet } from './mock-wallet'
import { complement, isNil, mergeLeft, pickBy } from 'ramda'

export const generateMockWallet: (walletData: { address?: string; chainId?: number }) => Wallet = (walletData) =>
  mergeLeft(pickBy(complement(isNil), walletData), mockWallet)
