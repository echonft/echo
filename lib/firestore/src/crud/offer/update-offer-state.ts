import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { OfferStateUpdateDocumentData } from '@echo/firestore/types/model/offer-update-document-data'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { assertOfferStateTransition } from '@echo/model/helpers/offer/assert-offer-state-transition'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Slug } from '@echo/model/types/slug'
import { dissoc, isNil } from 'ramda'

export type UpdateOfferStateArgs = Record<'slug', Slug> & OfferStateUpdateDocumentData['update']['args']

export async function updateOfferState(args: UpdateOfferStateArgs): Promise<Offer> {
  const { slug, state } = args
  const snapshot = await getOfferSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  const offer = snapshot.data()
  assertOfferStateTransition(offer, state)
  const updatedOffer = await updateReference({
    collectionReference: getOffersCollectionReference(),
    id: snapshot.id,
    data: { state }
  })
  await addOfferStateUpdate({ offerId: snapshot.id, args: dissoc('slug', args) })
  return updatedOffer
}
