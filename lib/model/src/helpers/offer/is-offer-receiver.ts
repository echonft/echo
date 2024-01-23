import type { Offer } from '@echo/model/types/offer'

export function isOfferReceiver(offer: Offer, username: string) {
  return offer.receiver.username === username
}
