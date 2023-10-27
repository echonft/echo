import { assertOfferIsNotExpired } from '@echo/model/helpers/offer/assert/assert-offer-is-not-expired'
import type { Offer } from '@echo/model/types/offer'

export function assertOfferIsOpen(offer: Offer) {
  try {
    assertOfferIsNotExpired(offer)
  } catch {
    return false
  }
  return offer.state === 'OPEN' || offer.state === 'ACCEPTED'
}
