import type { HexString } from '@echo/utils/types/hex-string'

export interface OfferExecutedEvent {
  transactionHash: HexString
  offerId: HexString
}
