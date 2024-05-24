import type { Wallet } from '@echo/model/types/wallet'
import { type HexString } from '@echo/utils/types/hex-string'

export interface AddWalletRequest {
  wallet: Wallet
  message: string
  signature: HexString
}
