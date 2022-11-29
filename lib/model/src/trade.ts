import { Offer } from './offer'
import { OfferItem } from './offer-item'
import { User } from './user'

// TODO Update status
export enum TradeStatus {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}

// TODO Validate data here
export interface Trade {
  id: string
  status: TradeStatus
  counterparty: User
  counterpartyItems: OfferItem[] | undefined
  ownerItems: OfferItem[] | undefined
  owner: User
  offer: Offer
  threadId?: string
}
