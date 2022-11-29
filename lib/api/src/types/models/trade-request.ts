import { OfferItem } from '@echo/model/offer-item'
import { NextApiRequest } from 'next'

interface InternalCreateTradeRequest {
  ownerId: string
  counterpartyId: string
  offerId: string
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
}

interface InternalDeleteTradeRequest {
  tradeId: string
  userId: string
}

interface InternalUpdateTradeRequest extends InternalDeleteTradeRequest {
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
}

export interface CreateTradeRequest extends NextApiRequest {
  body: InternalCreateTradeRequest
}

export interface DeleteTradeRequest extends NextApiRequest {
  body: InternalDeleteTradeRequest
}
export interface UpdateTradeRequest extends NextApiRequest {
  body: InternalUpdateTradeRequest
}
