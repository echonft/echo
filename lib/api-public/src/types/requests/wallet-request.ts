import { SiweMessage } from 'siwe'

interface Wallet {
  chainId: number
  address: string
}
export interface WalletRequest {
  wallet: Wallet | Wallet[]
  message?: SiweMessage
  signature?: `0x${string}`
}
