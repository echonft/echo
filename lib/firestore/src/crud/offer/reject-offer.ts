import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { assertSnapshot } from '@echo/firestore/helpers/crud/assert-snapshot'
import { assertOfferIsNotExpired } from '@echo/firestore/helpers/offer/assert/assert-offer-is-not-expired'
import { assertOfferState } from '@echo/firestore/helpers/offer/assert/assert-offer-state'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import dayjs from 'dayjs'

export async function rejectOffer(id: string) {
  const documentSnapshot = await getOfferSnapshotById(id)
  assertSnapshot(documentSnapshot)
  const offer = documentSnapshot.data()
  assertOfferIsNotExpired(offer)
  const state: FirestoreOfferState = 'REJECTED'
  assertOfferState(offer, state)
  await documentSnapshot.ref.update(offerDataConverter.toFirestore({ state, updatedAt: dayjs() }))
}
