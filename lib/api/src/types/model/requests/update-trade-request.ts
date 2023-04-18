import { DeleteTradeRequest } from './delete-trade-request'
import { OfferItem } from '@echo/model'

export interface UpdateTradeRequest extends DeleteTradeRequest {
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
}
