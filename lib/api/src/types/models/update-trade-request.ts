import { ApiRequestWithUserId } from './api-request-with-user-id'
import { DeleteTradeRequestBody } from './delete-trade-request'
import { OfferItem } from '@echo/model'

export interface UpdateTradeRequest extends ApiRequestWithUserId {
  body: {
    ownerItems: OfferItem[]
    counterpartyItems: OfferItem[]
  } & DeleteTradeRequestBody
}
