import { offerDataConverter } from '../../converters/offer-data-converter'
import { assertOfferIsNotExpired } from '../../helpers/offer/assert/assert-offer-is-not-expired'
import { assertOfferState } from '../../helpers/offer/assert/assert-offer-state'
import { getOfferSnapshotById } from './get-offer-snapshot-by-id'
import { OfferState } from '@echo/firestore-types'

export async function acceptOffer(id: string) {
  const documentSnapshot = await getOfferSnapshotById(id)
  const offer = documentSnapshot?.data()
  assertOfferIsNotExpired(offer)
  const state: OfferState = 'ACCEPTED'
  assertOfferState(offer, state)
  await documentSnapshot!.ref.update(offerDataConverter.toFirestore({ state }))
}
