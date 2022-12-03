import { DeleteOfferRequest } from '../requests/delete-offer-request'
import { ApiRequestWithUserId } from './api-request-with-user-id'

export interface DeleteOfferApiRequest extends ApiRequestWithUserId {
  body: DeleteOfferRequest
}
