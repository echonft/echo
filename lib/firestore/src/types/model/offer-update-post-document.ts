import type { OfferState } from '@echo/model/constants/offer-state'

export interface OfferUpdatePostDocument {
  offerId: string
  state: OfferState
}
