import type { HexString } from '@echo/utils/types/hex-string'

export interface OfferItemAbi {
  readonly tokenAddress: HexString
  readonly tokenId: bigint
}
