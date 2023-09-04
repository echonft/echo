import { offerDataConverter } from '../../converters/offer-data-converter'
import { assertOffer } from '../../helpers/offer/assert-offer'
import { assertOfferState } from '../../helpers/offer/assert-offer-state'
import { getOfferSnapshotById } from './get-offer-snapshot-by-id'
import { OfferState } from '@echo/firestore-types'

export const rejectOffer = async (id: string) => {
  const documentSnapshot = await getOfferSnapshotById(id)
  const offer = documentSnapshot?.data()
  assertOffer(offer)
  const state: OfferState = 'REJECTED'
  assertOfferState(offer, state)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await documentSnapshot!.ref.update(offerDataConverter.toFirestore({ state }))
}
