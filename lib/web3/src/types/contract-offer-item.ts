import type { HexString } from '@echo/utils/types/hex-string'

export interface ContractOfferItem {
  tokenAddress: Lowercase<HexString>
  tokenId: number
}
