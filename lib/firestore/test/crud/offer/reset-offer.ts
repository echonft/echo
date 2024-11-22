import { OfferError } from '@echo/model/constants/errors/offer-error'
import { updateOffer } from '@echo/test/firestore/crud/offer/update-offer'
import { offerDocumentMocks } from '@echo/test/firestore/mocks'
import { find, isNil, propEq } from 'ramda'

export function resetOffer(slug: Lowercase<string>) {
  const offer = find(propEq(slug, 'slug'), offerDocumentMocks)
  if (isNil(offer)) {
    throw Error(OfferError.NotFound)
  }
  return updateOffer(slug, offer)
}
