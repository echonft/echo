import { getOfferSnapshotById } from './get-offer-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const deleteOffer = async (id: string): Promise<WriteResult> => {
  const documentSnapshot = await getOfferSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid offer id')
  }
  return documentSnapshot.ref.delete()
}
