import { getUserSnapshotById } from '@echo/firestore/crud/user/get-user-snapshot-by-id'
import { type WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function deleteUser(id: string): Promise<WriteResult> {
  const documentSnapshot = await getUserSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`user with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
