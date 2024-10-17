import { updateOffer } from '@echo/firestore/utils/offer/update-offer'
import { getOfferMockBySlug } from '@echo/model/mocks/offer/get-offer-mock-by-slug'
import type { Slug } from '@echo/model/types/slug'

export function resetOffer(slug: Slug) {
  return updateOffer(slug, getOfferMockBySlug(slug))
}
