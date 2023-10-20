import { type WalletRequest } from '@echo/api/types/requests/wallet-request'
import { type HexString } from '@echo/utils/types/hex-string'

export interface AddWalletRequest {
  wallet: WalletRequest
  message: string
  signature: HexString
}
