import { getCollectionSwapsCountSnapshotById } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-snapshot-by-id'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteCollectionSwapsCount(id: string): Promise<WriteResult> {
  const documentSnapshot = await getCollectionSwapsCountSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`nft collection swaps count with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
