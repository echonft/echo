import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { isNil } from 'ramda'

export async function updateOfferState(args: Pick<OfferDocument, 'slug' | 'state'>): Promise<OfferDocument> {
  const { slug, state } = args
  const snapshot = await getOfferSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  const offer = snapshot.data()
  if (offer.state === state) {
    return offer
  }
  if (offer.locked) {
    return Promise.reject(Error(OfferError.Locked))
  }
  return updateReference({
    collectionReference: offersCollection(),
    id: snapshot.id,
    data: { state, locked: true }
  })
}
