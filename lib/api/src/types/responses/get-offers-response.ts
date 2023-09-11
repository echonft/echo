import type { OfferResponse } from '@echo-api/types/responses/model/offer-response'

export interface GetOffersResponse {
  offers: Array<Partial<OfferResponse>>
}
