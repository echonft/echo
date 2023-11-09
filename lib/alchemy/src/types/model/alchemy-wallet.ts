import type { HexString } from '@echo/utils/types/hex-string'

export interface AlchemyWallet {
  chainId: number
  address: HexString
}
