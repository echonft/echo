import { OfferError } from '@echo/firestore/constants/errors/offer/offer-error'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Offer } from '@echo/model/types/offer'
import { isNil } from 'ramda'

export async function updateOffer(slug: string, data: Partial<Offer>): Promise<Offer> {
  const snapshot = await getOfferSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(OfferError.NOT_FOUND))
  }
  return updateReference({
    collectionReference: getOffersCollectionReference(),
    id: snapshot.id,
    data
  })
}
