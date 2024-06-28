import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { collectionDataConverter } from '@echo/firestore/converters/collection/collection-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { Collection } from '@echo/model/types/collection'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getCollectionsCollectionReference(): CollectionReference<Collection, Collection> {
  return firestoreApp()
    .collection(CollectionReferenceName.COLLECTIONS)
    .withConverter<Collection, Collection>(collectionDataConverter)
}
