import type { HexString } from '@echo/utils/types/hex-string'

export interface OfferSignature {
  id: string
  creator: HexString
  counterparty: HexString
  expiresAt: bigint
  creatorCollections: HexString[]
  creatorIds: bigint[]
  counterpartyCollections: HexString[]
  counterpartyIds: bigint[]
}
