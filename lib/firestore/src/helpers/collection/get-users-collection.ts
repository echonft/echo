import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getUsersCollection() {
  return firestoreApp().collection(CollectionName.USERS) as CollectionReference<UserDocumentData>
}
