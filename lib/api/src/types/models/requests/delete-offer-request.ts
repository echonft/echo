import { RequestWithUserId } from '../requests/request-with-user-id'

export interface DeleteOfferRequest extends RequestWithUserId {
  offerId: string
}
