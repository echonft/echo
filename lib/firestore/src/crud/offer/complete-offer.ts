import { offerDataConverter } from '../../converters/offer-data-converter'
import { assertOffer } from '../../helpers/offer/assert-offer'
import { assertOfferState } from '../../helpers/offer/assert-offer-state'
import { OfferState } from '../../types/model/offer-state'
import { getOfferSnapshotById } from './get-offer-snapshot-by-id'

export const completeOffer = async (id: string) => {
  const documentSnapshot = await getOfferSnapshotById(id)
  const offer = documentSnapshot?.data()
  assertOffer(offer)
  const state: OfferState = 'COMPLETED'
  assertOfferState(offer!, state)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await documentSnapshot!.ref.update(offerDataConverter.toFirestore({ state }))
}
