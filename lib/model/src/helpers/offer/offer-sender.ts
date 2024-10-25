import type { Offer } from '@echo/model/types/offer'

export function offerSender(offer: Offer) {
  return offer.sender
}
