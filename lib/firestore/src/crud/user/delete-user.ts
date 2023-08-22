import { getUserSnapshotById } from './get-user-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const deleteUser = async (id: string): Promise<WriteResult> => {
  const documentSnapshot = await getUserSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid user id')
  }
  return documentSnapshot.ref.delete()
}
