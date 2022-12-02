import { ApiRequestWithUserId } from './api-request-with-user-id'
import { BodyWithUserId } from './body-with-user-id'
import { OfferItem } from '@echo/model'

export interface CreateTradeRequest extends ApiRequestWithUserId {
  body: {
    counterpartyId: string
    offerId: string
    ownerItems: OfferItem[]
    counterpartyItems: OfferItem[]
  } & BodyWithUserId
}
