import { Wallet } from '../../../../types/wallet'
import { mockWallet } from './mock-wallet'
import { mergeLeft } from 'ramda'

export const generateMockWallet: (walletData: { address?: string; chainId?: number }) => Wallet = (walletData) =>
  mergeLeft(walletData, mockWallet)
