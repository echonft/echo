import { offerDataConverter } from '../../converters/offer-data-converter'
import { Offer } from '../../types/model/offer'
import { getOfferSnapshotById } from './get-offer-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const updateOffer = async (
  id: string,
  offer: Omit<Offer, 'id'> | Partial<Omit<Offer, 'id'>>
): Promise<WriteResult> => {
  const documentSnapshot = await getOfferSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid offer id')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return documentSnapshot.ref.update(offerDataConverter.toFirestore(offer))
}
