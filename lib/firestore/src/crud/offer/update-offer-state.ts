import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { shouldLockOffer } from '@echo/model/helpers/offer/should-lock-offer'
import type { Offer } from '@echo/model/types/offer'
import { isNil } from 'ramda'

export async function updateOfferState(args: Pick<Offer, 'slug' | 'state'>): Promise<Offer> {
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
    collectionReference: getOffersCollectionReference(),
    id: snapshot.id,
    data: { state, locked: shouldLockOffer(state) }
  })
}
