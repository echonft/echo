import { getSwapSnapshotById } from '@echo/firestore/crud/swap/get-swap-snapshot-by-id'
import { type WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function deleteSwap(id: string): Promise<WriteResult> {
  const documentSnapshot = await getSwapSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`swap with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
