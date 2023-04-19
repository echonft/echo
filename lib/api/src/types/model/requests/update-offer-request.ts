import { RequestWithUserId } from '../requests/request-with-user-id'
import { OfferItem } from '@echo/model'

export interface UpdateOfferRequest extends RequestWithUserId {
  offerId: string
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
}
