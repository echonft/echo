import { CreateOfferRequest } from '../requests/create-offer-request'
import { ApiRequestWithUserId } from './api-request-with-user-id'

export interface CreateOfferApiRequest extends ApiRequestWithUserId {
  body: CreateOfferRequest
}
