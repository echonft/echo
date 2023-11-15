import { OFFER_STATE_ACCEPTED, OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { assertOfferIsNotExpired } from '@echo/model/helpers/offer/assert/assert-offer-is-not-expired'
import type { Offer } from '@echo/model/types/offer'

export function guarded_assertOfferIsOpen(offer: Offer) {
  try {
    assertOfferIsNotExpired(offer)
  } catch {
    return false
  }
  return offer.state === OFFER_STATE_OPEN || offer.state === OFFER_STATE_ACCEPTED
}
