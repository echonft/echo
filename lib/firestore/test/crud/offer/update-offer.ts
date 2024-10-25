import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { type Offer } from '@echo/model/types/offer'
import type { Slug } from '@echo/model/types/slug'
import { isNil } from 'ramda'

export async function updateOffer(slug: Slug, data: Partial<Offer>): Promise<Offer> {
  const snapshot = await getOfferSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  return updateReference({
    collectionReference: getOffersCollectionReference(),
    id: snapshot.id,
    data
  })
}
