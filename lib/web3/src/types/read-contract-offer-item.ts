import type { HexString } from '@echo/utils/types/hex-string'

export interface ReadContractOfferItem {
  readonly tokenAddress: HexString
  readonly tokenId: bigint
}
