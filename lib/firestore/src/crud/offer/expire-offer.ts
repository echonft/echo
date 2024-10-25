import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { OfferState } from '@echo/model/constants/offer-state'
import type { Slug } from '@echo/model/types/slug'

export function expireOffer(slug: Slug): Promise<OfferDocument> {
  return updateOfferState({ slug, state: OfferState.Expired })
}
