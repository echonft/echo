import { WalletRequest } from '@echo/api/types/requests/wallet-request'
import { Signature } from '@echo/utils/types/signature'

export interface AddWalletRequest {
  wallet: WalletRequest
  message: string
  signature: Signature
}
