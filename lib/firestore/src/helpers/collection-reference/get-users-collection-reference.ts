import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getUsersCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.USERS) as CollectionReference<UserDocumentData>
}
