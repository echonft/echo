import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { isNil } from 'ramda'

export async function updateOffer(slug: Lowercase<string>, data: Partial<OfferDocument>): Promise<OfferDocument> {
  const snapshot = await getOfferSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  return updateReference<OfferDocument>({
    collectionReference: offersCollection(),
    id: snapshot.id,
    data
  })
}
