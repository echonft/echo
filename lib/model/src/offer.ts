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
  SELL = 'sell',
  HELLO = 'a'
}

export interface NewOffer {
  type: OfferType
  status: OfferStatus
  counterpartyItems: OfferItem[] | undefined
  ownerItems: OfferItem[] | undefined
  owner: User
  collection: Collection
}

export interface Offer extends NewOffer {
  id: string
  postedAt: Date | undefined
  counterparty: User | undefined
}
