import type { HexString } from '@echo/utils/types/hex-string'

export interface OfferSignature {
  createdAt: number
  id: string
  offerId: string
  signature: HexString
  userId: string
}
