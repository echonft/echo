import { offerDataConverter } from '../../converters/offer-data-converter'
import { OfferState } from '../../types/model/offer-state'
import { updateListingsWithOfferNewState } from '../listing/update-listings-with-offer-new-state'
import { getOfferSnapshotById } from './get-offer-snapshot-by-id'
import { isNil } from 'ramda'

export const cancelOffer = async (id: string) => {
  const documentSnapshot = await getOfferSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid offer id')
  }
  if (documentSnapshot.data().expired) {
    throw Error('offer expired')
  }

  const state: OfferState = 'CANCELLED'
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await documentSnapshot.ref.update(offerDataConverter.toFirestore({ state }))
  await updateListingsWithOfferNewState(id, state)
}
