import type { Offer } from '@echo/model/types/offer'
import type { Slug } from '@echo/model/types/slug'

export function serializeOffer<T extends Pick<Offer, 'slug'>>(offer: T): Slug {
  return offer.slug
}
