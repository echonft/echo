import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { addSwap } from '@echo/firestore/crud/swaps/add-swap'
import { assertOfferIsNotExpired } from '@echo/firestore/helpers/offer/assert/assert-offer-is-not-expired'
import { assertOfferState } from '@echo/firestore/helpers/offer/assert/assert-offer-state'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'

export async function completeOffer(id: string, swapTransactionId: string) {
  const documentSnapshot = await getOfferSnapshotById(id)
  const offer = documentSnapshot?.data()
  assertOfferIsNotExpired(offer)
  const state: FirestoreOfferState = 'COMPLETED'
  assertOfferState(offer, state)
  await documentSnapshot!.ref.update(offerDataConverter.toFirestore({ state }))
  // add swap
  await addSwap(id, swapTransactionId)
}
