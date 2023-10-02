import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import type { QuerySnapshot } from 'firebase-admin/lib/firestore'

export async function getUserSnapshotByUsername(username: string) {
  const querySnapshot = await firestoreApp().collection(CollectionName.USERS).where('username', '==', username).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot as QuerySnapshot<FirestoreUser>)
}
