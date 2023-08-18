import { getUserSnapshotById } from './get-user-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export const deleteUser = async (id: string): Promise<WriteResult> => {
  const documentSnapshot = await getUserSnapshotById(id)
  return documentSnapshot.ref.delete()
}
