import { OfferResponse } from './model/offer-response'

export interface GetOffersResponse {
  offers: Array<Partial<OfferResponse>>
}
