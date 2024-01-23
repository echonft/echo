import type { Offer } from '@echo/model/types/offer'

export function isOfferSender(offer: Offer, username: string) {
  return offer.sender.username === username
}
