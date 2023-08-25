import { SiweMessage } from 'siwe'

export interface AddWalletRequest {
  wallet: {
    chainId: number
    address: string
  }
  message: SiweMessage
  signature: `0x${string}`
}
