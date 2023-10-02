import { getUserSnapshotById } from '@echo/firestore/crud/user/get-user-snapshot-by-id'
import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function updateUser(userId: string, updateData: Partial<FirestoreUser>): Promise<WriteResult> {
  const documentSnapshot = await getUserSnapshotById(userId)
  if (isNil(documentSnapshot)) {
    throw Error(`user with id ${userId} does not exist`)
  }
  return await documentSnapshot.ref.update(updateData)
}
