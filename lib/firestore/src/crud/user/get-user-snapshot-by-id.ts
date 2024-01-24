import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import type { User } from '@echo/firestore/types/model/user/user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { firestore } from 'firebase-admin'
import DocumentSnapshot = firestore.DocumentSnapshot

export async function getUserSnapshotById(id: string): Promise<undefined | DocumentSnapshot<User, UserDocumentData>> {
  const documentSnapshot = await getUsersCollectionReference().doc(id).get()
  if (!documentSnapshot.exists) {
    return undefined
  }
  return documentSnapshot
}
