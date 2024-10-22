import type { OfferState } from '@echo/model/constants/offer-state'

export interface OfferUpdatePostDocumentData {
  offerId: string
  state: OfferState
}
