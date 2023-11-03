import type { OfferState } from '@echo/model/types/offer-state'

export function offerStateIsFinal(state: OfferState) {
  return state === 'REJECTED' || state === 'COMPLETED' || state === 'CANCELLED'
}
