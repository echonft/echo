import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import { DocumentSnapshot } from 'firebase-admin/lib/firestore'

export async function getUserSnapshotById(id: string) {
  const documentSnapshot = await firestoreApp().collection(CollectionName.USERS).doc(id).get()
  if (!documentSnapshot.exists) {
    return undefined
  }
  return documentSnapshot as DocumentSnapshot<FirestoreUser>
}
