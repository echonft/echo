import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { assertOfferIsNotExpired } from '@echo/firestore/helpers/offer/assert/assert-offer-is-not-expired'
import { assertOfferState } from '@echo/firestore/helpers/offer/assert/assert-offer-state'
import type { FirestoreOfferState } from '@echo/firestore/types/model/firestore-offer-state'

export async function invalidateOffer(id: string) {
  const documentSnapshot = await getOfferSnapshotById(id)
  const offer = documentSnapshot?.data()
  assertOfferIsNotExpired(offer)
  const state: FirestoreOfferState = 'INVALID'
  assertOfferState(offer, state)
  await documentSnapshot!.ref.update(offerDataConverter.toFirestore({ state }))
}
