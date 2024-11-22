import type { Offer } from '@echo/model/types/offer'

export function serializeOffer<T extends Pick<Offer, 'slug'>>(offer: T): Lowercase<string> {
  return offer.slug
}
