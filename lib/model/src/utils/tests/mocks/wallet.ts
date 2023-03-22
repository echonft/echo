import { Wallet } from '../../../types'
import { complement, isNil, mergeLeft, pickBy } from 'ramda'

export const mockWallet: Wallet = {
  chainId: 1,
  address: '0x1234567890'
}

export const generateMockWallet: (walletData: { address?: string; chainId?: number }) => Wallet = (walletData) =>
  mergeLeft(pickBy(complement(isNil), walletData), mockWallet)
