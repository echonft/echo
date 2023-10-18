import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { assertOfferIsNotExpired } from '@echo/model/helpers/offer/assert/assert-offer-is-not-expired'
import { assertOfferState } from '@echo/model/helpers/offer/assert/assert-offer-state'
import { type OfferState } from '@echo/model/types/offer-state'
import dayjs from 'dayjs'

export async function updateOfferState(offerId: string, state: OfferState) {
  const documentSnapshot = await getOfferSnapshotById(offerId)
  assertQueryDocumentSnapshot(documentSnapshot)
  const offer = documentSnapshot.data()
  assertOfferIsNotExpired(offer)
  assertOfferState(offer, state)
  await documentSnapshot.ref.update({ state, updatedAt: dayjs().unix() })
}
