import { RequestWithUserId } from '../requests/request-with-user-id'
import { OfferItem } from '@echo/model'

export interface CreateTradeRequest extends RequestWithUserId {
  counterpartyId: string
  offerId: string
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
}
