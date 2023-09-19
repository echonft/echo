import { WalletRequest } from '@echo/api/types/requests/wallet-request'
import type { SiweMessage } from 'siwe'

export interface AddWalletRequest {
  wallet: WalletRequest
  message: SiweMessage
  signature: `0x${string}`
}
