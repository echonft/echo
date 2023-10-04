import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { assertOfferIsNotExpired } from '@echo/firestore/helpers/offer/assert/assert-offer-is-not-expired'
import { assertOfferState } from '@echo/firestore/helpers/offer/assert/assert-offer-state'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import dayjs from 'dayjs'

export async function cancelOffer(id: string) {
  const documentSnapshot = await getOfferSnapshotById(id)
  assertQueryDocumentSnapshot(documentSnapshot)
  const offer = documentSnapshot.data()
  assertOfferIsNotExpired(offer)
  const state: FirestoreOfferState = 'CANCELLED'
  assertOfferState(offer, state)
  await documentSnapshot.ref.update({ state, updatedAt: dayjs().unix() })
}
