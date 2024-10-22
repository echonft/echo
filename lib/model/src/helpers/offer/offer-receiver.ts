import type { Offer } from '@echo/model/types/offer/offer'

export function offerReceiver(offer: Offer) {
  return offer.receiver
}
