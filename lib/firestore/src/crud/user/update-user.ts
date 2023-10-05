import { getUserSnapshotById } from '@echo/firestore/crud/user/get-user-snapshot-by-id'
import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import dayjs from 'dayjs'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { assoc, isNil } from 'ramda'

export async function updateUser(
  userId: string,
  updateData: Partial<Omit<FirestoreUser, 'id' | 'updatedAt'>>
): Promise<WriteResult> {
  const documentSnapshot = await getUserSnapshotById(userId)
  if (isNil(documentSnapshot)) {
    throw Error(`user with id ${userId} does not exist`)
  }
  return await documentSnapshot.ref.update(assoc('updatedAt', dayjs().unix(), updateData))
}
