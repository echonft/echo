import { userDataConverter } from '@echo/firestore/converters/user-data-converter'
import { getUserSnapshotById } from '@echo/firestore/crud/user/get-user-snapshot-by-id'
import { cleanAndUpdateDocumentRef } from '@echo/firestore/helpers/crud/clean-and-update-document-ref'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import type { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function updateUser(id: string, user: Partial<Omit<FirestoreUser, 'id'>>): Promise<WriteResult> {
  const documentSnapshot = await getUserSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid user id')
  }

  return cleanAndUpdateDocumentRef(documentSnapshot.ref, user, userDataConverter)
}
