export interface OfferSignature {
  id: string
  creator: string
  counterparty: string
  expiresAt: number
  creatorCollections: string[]
  creatorIds: number[]
  counterpartyCollections: string[]
  counterpartyIds: number[]
}
