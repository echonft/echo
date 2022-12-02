import { ApiRequestWithUserId } from './api-request-with-user-id'
import { BodyWithUserId } from './body-with-user-id'
import { OfferItem } from '@echo/model'

type UpdateOfferRequestBody = {
  offerId: string
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
} & BodyWithUserId

export interface UpdateOfferRequest extends ApiRequestWithUserId {
  body: UpdateOfferRequestBody
}
