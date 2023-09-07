import { getListingSnapshotById } from './get-listing-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function deleteListing(id: string): Promise<WriteResult> {
  const documentSnapshot = await getListingSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid listing id')
  }
  return documentSnapshot.ref.delete()
}
