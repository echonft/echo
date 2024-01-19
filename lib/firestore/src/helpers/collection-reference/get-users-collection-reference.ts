import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { userDataConverter } from '@echo/firestore/converters/user/user-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { User } from '@echo/firestore/types/model/user/user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getUsersCollectionReference(): CollectionReference<User, UserDocumentData> {
  return firestoreApp()
    .collection(CollectionReferenceName.USERS)
    .withConverter<User, UserDocumentData>(userDataConverter)
}
