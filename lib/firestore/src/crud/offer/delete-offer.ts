import { getOfferSnapshotById } from './get-offer-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export const deleteOffer = async (id: string): Promise<WriteResult> => {
  const documentSnapshot = await getOfferSnapshotById(id)
  return documentSnapshot.ref.delete()
}
