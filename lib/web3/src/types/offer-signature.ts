import type { HexString } from '@echo/utils/types/hex-string'

// TODO This is a duplicate, not sure where it should be
// NOTE: numbers are represented by bigint here, but in fact their type is number
// we do so to avoid error with wagmi configs, but it seems that wagmi automatically convert number to bigint
// so it works at runtime
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
