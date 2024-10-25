import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import type { User } from '@echo/model/types/user'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getUsersCollectionReference(): CollectionReference<User, UserDocumentData> {
  return firestoreApp().collection(CollectionReferenceName.Users) as CollectionReference<User, UserDocumentData>
}
