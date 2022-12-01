import { OfferItem } from '@echo/model'
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
