import { OfferResponse } from './model/offer-response'

export interface GetUserOffersResponse {
  offers: Array<Partial<OfferResponse>>
}
