import { offerDataConverter } from '../../converters/offer-data-converter'
import { assertOfferIsNotExpired } from '../../helpers/offer/assert/assert-offer-is-not-expired'
import { assertOfferState } from '../../helpers/offer/assert/assert-offer-state'
import { getOfferSnapshotById } from './get-offer-snapshot-by-id'
import { OfferState } from '@echo/firestore-types'

export const completeOffer = async (id: string, swapTransactionId: string) => {
  const documentSnapshot = await getOfferSnapshotById(id)
  const offer = documentSnapshot?.data()
  assertOfferIsNotExpired(offer)
  const state: OfferState = 'COMPLETED'
  assertOfferState(offer, state)
  await documentSnapshot!.ref.update(offerDataConverter.toFirestore({ state, swapTransactionId }))
}
