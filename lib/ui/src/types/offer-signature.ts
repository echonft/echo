import type { HexString } from '@echo/utils/types/hex-string'

export interface OfferSignature {
  id: string
  creator: HexString
  counterparty: HexString
  expiresAt: number
  creatorCollections: HexString[]
  creatorIds: number[]
  counterpartyCollections: HexString[]
  counterpartyIds: number[]
}
