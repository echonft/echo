import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import type { QuerySnapshot } from 'firebase-admin/lib/firestore'

export async function getAllUsers() {
  const querySnapshot = await firestoreApp().collection(CollectionName.USERS).get()
  return getQuerySnapshotDocumentsData(querySnapshot as QuerySnapshot<FirestoreUser>)
}
