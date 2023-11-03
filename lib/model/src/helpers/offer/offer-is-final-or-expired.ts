import { offerStateIsFinal } from '@echo/model/helpers/offer/offer-state-is-final'
import type { Offer } from '@echo/model/types/offer'

export function offerIsFinalOrExpired(offer: Offer) {
  if (offer.expired) {
    return true
  }
  return offerStateIsFinal(offer.state)
}
