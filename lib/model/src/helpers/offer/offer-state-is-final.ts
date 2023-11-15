import { OFFER_STATE_CANCELLED, OFFER_STATE_COMPLETED, OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import type { OfferState } from '@echo/model/types/offer-state'

export function offerStateIsFinal(state: OfferState) {
  return state === OFFER_STATE_REJECTED || state === OFFER_STATE_COMPLETED || state === OFFER_STATE_CANCELLED
}
