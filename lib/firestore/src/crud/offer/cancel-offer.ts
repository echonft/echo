import { offerDataConverter } from '../../converters/offer-data-converter'
import { getOfferSnapshotById } from './get-offer-snapshot-by-id'

export const cancelOffer = async (id: string) => {
  const documentSnapshot = await getOfferSnapshotById(id)
  if (documentSnapshot.data().expired) {
    throw Error('offer expired')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return documentSnapshot.ref.update(offerDataConverter.toFirestore({ state: 'CANCELLED' }))
}
