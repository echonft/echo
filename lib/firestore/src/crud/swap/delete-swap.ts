import { getSwapSnapshotById } from './get-swap-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const deleteSwap = async (id: string): Promise<WriteResult> => {
  const documentSnapshot = await getSwapSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid swap id')
  }
  return documentSnapshot.ref.delete()
}
