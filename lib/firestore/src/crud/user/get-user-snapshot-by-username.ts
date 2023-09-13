import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDataConverter } from '@echo/firestore/converters/user-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export async function getUserSnapshotByUsername(username: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.USERS)
    .where('username', '==', username)
    .withConverter(userDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreUser>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
