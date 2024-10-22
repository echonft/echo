import { getOfferMockBySlug } from '@echo/model/mocks/offer/get-offer-mock-by-slug'
import type { Slug } from '@echo/model/types/slug'
import { updateOffer } from '@echo/test/firestore/crud/offer/update-offer'

export function resetOffer(slug: Slug) {
  return updateOffer(slug, getOfferMockBySlug(slug))
}
