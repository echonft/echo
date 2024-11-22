import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { OfferState } from '@echo/model/constants/offer-state'

export function acceptOffer(slug: Lowercase<string>): Promise<OfferDocument> {
  return updateOfferState({ slug, state: OfferState.Accepted })
}
