import type { HexString } from '@echo/utils/types/hex-string'

export interface WalletRequest {
  chainId: number
  address: Lowercase<HexString>
}
