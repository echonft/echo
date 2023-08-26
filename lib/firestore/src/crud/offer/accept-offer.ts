import { offerDataConverter } from '../../converters/offer-data-converter'
import { assertOffer } from '../../helpers/offer/assert-offer'
import { OfferState } from '../../types/model/offer-state'
import { updateListingsWithOfferNewState } from '../listing/update-listings-with-offer-new-state'
import { getOfferSnapshotById } from './get-offer-snapshot-by-id'

export const acceptOffer = async (id: string) => {
  const documentSnapshot = await getOfferSnapshotById(id)
  assertOffer(documentSnapshot?.data())
  const state: OfferState = 'ACCEPTED'
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await documentSnapshot!.ref.update(offerDataConverter.toFirestore({ state }))
  await updateListingsWithOfferNewState(id, state)
}
