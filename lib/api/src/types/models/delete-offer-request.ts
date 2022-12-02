import { ApiRequestWithUserId } from './api-request-with-user-id'
import { BodyWithUserId } from './body-with-user-id'

type DeleteOfferRequestBody = {
  offerId: string
} & BodyWithUserId

export interface DeleteOfferRequest extends ApiRequestWithUserId {
  body: DeleteOfferRequestBody
}
