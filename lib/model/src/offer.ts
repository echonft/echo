import { Collection } from '@echo/model/collection'
import { User } from '@echo/model/user'

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
  status: OfferStatus
  buying: string | undefined
  selling: string
  buyer: User | undefined
  seller: User
  postedAt: Date | undefined
  collection: Collection
}
