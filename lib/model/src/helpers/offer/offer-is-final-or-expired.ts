import type { Offer } from '@echo/model/types/offer'

export function offerIsFinal(offer: Offer) {
  if (offer.expired) {
    return true
  }
  return offer.state === 'REJECTED' || offer.state === 'COMPLETED' || offer.state === 'CANCELLED'
}
