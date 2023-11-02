import type { HexString } from '@echo/utils/types/hex-string'

export interface Wallet {
  chainId: number
  address: HexString
}
