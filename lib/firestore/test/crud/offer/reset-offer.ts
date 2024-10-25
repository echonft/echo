import { OfferError } from '@echo/model/constants/errors/offer-error'
import type { Slug } from '@echo/model/types/slug'
import { updateOffer } from '@echo/test/firestore/crud/offer/update-offer'
import { offerDocumentMocks } from '@echo/test/firestore/initialize-db'
import { find, isNil, propEq } from 'ramda'

export function resetOffer(slug: Slug) {
  const offer = find(propEq(slug, 'slug'), offerDocumentMocks)
  if (isNil(offer)) {
    throw Error(OfferError.NotFound)
  }
  return updateOffer(slug, offer)
}
