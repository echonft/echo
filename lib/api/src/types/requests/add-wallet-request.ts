import { type WalletRequest } from '@echo/api/types/requests/wallet-request'
import { type Signature } from '@echo/utils/types/signature'

export interface AddWalletRequest {
  wallet: WalletRequest
  message: string
  signature: Signature
}
