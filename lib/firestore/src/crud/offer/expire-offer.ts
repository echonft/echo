import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer'
import type { Slug } from '@echo/model/types/slug'

export function expireOffer(slug: Slug): Promise<Offer> {
  return updateOfferState({ slug, state: OfferState.Expired })
}
