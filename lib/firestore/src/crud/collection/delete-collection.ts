import { getCollectionSnapshotById } from '@echo/firestore/crud/collection/get-collection-snapshot-by-id'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteCollection(id: string): Promise<WriteResult> {
  const documentSnapshot = await getCollectionSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid collection id')
  }
  return documentSnapshot.ref.delete()
}
