import { OfferItem } from '@echo/model'
import { NextApiRequest } from 'next'

interface RequestWithUserId {
  userId: string
}

interface InternalCreateOfferRequest extends RequestWithUserId {
  type: string
  collectionId: string
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
}

interface InternalDeleteOfferRequest extends RequestWithUserId {
  offerId: string
}

interface InternalUpdateOfferRequest extends InternalDeleteOfferRequest {
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
}

// TODO Move if needed
export interface ApiRequestWithUserId extends NextApiRequest {
  body: RequestWithUserId
}

export interface OfferRequest extends NextApiRequest {
  body: InternalCreateOfferRequest
}

export interface DeleteOfferRequest extends NextApiRequest {
  body: InternalDeleteOfferRequest
}
export interface UpdateOfferRequest extends NextApiRequest {
  body: InternalUpdateOfferRequest
}
