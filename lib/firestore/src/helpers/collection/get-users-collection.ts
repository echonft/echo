import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getUsersCollection() {
  return firestoreApp().collection(CollectionName.USERS) as CollectionReference<FirestoreUser>
}
