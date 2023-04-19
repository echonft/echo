import { Wallet } from '../../types/wallet'
import { toLower } from 'ramda'

export const walletEquals = (source: Wallet) => (target: Wallet) =>
  source.chainId === target.chainId && toLower(source.address) === toLower(target.address)
