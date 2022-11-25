import { OfferItem } from '@echo/model/offer-item'
import { NextApiRequest } from 'next'

export interface CreateOfferRequest extends NextApiRequest {
  body: {
    type: string
    userId: string
    collectionId: string
    ownerItems: OfferItem[]
    counterpartyItems: OfferItem[]
  }
}
