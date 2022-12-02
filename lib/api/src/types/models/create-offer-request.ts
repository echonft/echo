import { ApiRequestWithUserId } from './api-request-with-user-id'
import { BodyWithUserId } from './body-with-user-id'
import { OfferItem } from '@echo/model'

type CreateOfferRequestBody = {
  type: string
  collectionId: string
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
} & BodyWithUserId

export interface CreateOfferRequest extends ApiRequestWithUserId {
  body: CreateOfferRequestBody
}
