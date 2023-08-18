import { getListingSnapshotById } from './get-listing-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export const deleteListing = async (id: string): Promise<WriteResult> => {
  const documentSnapshot = await getListingSnapshotById(id)
  return documentSnapshot.ref.delete()
}
