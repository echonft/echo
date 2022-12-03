import { Collection } from './collection'
import { OfferItem } from './offer-item'
import { User } from './user'

export enum OfferStatus {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}

export enum OfferType {
  BUY = 'buy',
  SELL = 'sell'
}

export interface Offer {
  id: string
  postedAt: Date | undefined
  counterparty: User | undefined
  type: OfferType
  status: OfferStatus
  counterpartyItems: OfferItem[] | undefined
  ownerItems: OfferItem[]
  owner: User
  collection: Collection
}
