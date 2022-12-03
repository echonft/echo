import { UpdateOfferRequest } from '../requests/update-offer-request'
import { ApiRequestWithUserId } from './api-request-with-user-id'

export interface UpdateOfferApiRequest extends ApiRequestWithUserId {
  body: UpdateOfferRequest
}
