import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { assertOfferState } from '@echo/model/helpers/offer/assert/assert-offer-state'
import type { Offer } from '@echo/model/types/offer'
import { type OfferState } from '@echo/model/types/offer-state'
import { now } from '@echo/utils/helpers/now'
import { assoc, pipe } from 'ramda'

export async function updateOfferState(offerId: string, state: OfferState) {
  const documentSnapshot = await getOfferSnapshotById(offerId)
  assertQueryDocumentSnapshot(documentSnapshot)
  const offer = documentSnapshot.data()
  assertOfferState(offer, state)
  const updatedAt = now()
  await documentSnapshot.ref.update({ state, updatedAt })
  return pipe<[Offer], Offer, Offer>(assoc('state', state), assoc('updatedAt', updatedAt))(offer)
}
