import type { WithId } from '@echo/model/types/with-id'
import type { HexString } from '@echo/utils/types/hex-string'

export interface OfferSignature extends WithId {
  createdAt: number
  offerId: string
  signature: HexString
  userId: string
}
