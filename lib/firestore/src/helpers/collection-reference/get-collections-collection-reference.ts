import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { Collection } from '@echo/model/types/collection'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getCollectionsCollectionReference(): CollectionReference<Collection, Collection> {
  return firestoreApp().collection(CollectionReferenceName.COLLECTIONS) as CollectionReference<Collection, Collection>
}
