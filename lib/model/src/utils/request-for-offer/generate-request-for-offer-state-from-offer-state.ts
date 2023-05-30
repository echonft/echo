import { OfferState } from '../../types/offer-state'
import { RequestForOfferState } from '../../types/request-for-offer-state'

export function generateRequestForOfferStateFromOfferState(offerState: OfferState): RequestForOfferState {
  switch (offerState) {
    case OfferState.EXPIRED:
    case OfferState.OPEN:
    case OfferState.REJECTED:
    case OfferState.CANCELLED:
      return RequestForOfferState.OFFER_RECEIVED
    case OfferState.ACCEPTED:
      return RequestForOfferState.PARTIALLY_FULFILLED
    case OfferState.COMPLETED:
      return RequestForOfferState.FULFILLED
  }
}
