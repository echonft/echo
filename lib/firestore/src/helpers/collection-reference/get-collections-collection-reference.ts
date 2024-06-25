import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { collectionDataConverter } from '@echo/firestore/converters/collection/collection-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { CollectionDocumentData } from '@echo/firestore/types/model/collection/collection-document-data'
import type { Collection } from '@echo/model/types/collection'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getCollectionsCollectionReference(): CollectionReference<Collection, CollectionDocumentData> {
  return firestoreApp()
    .collection(CollectionReferenceName.COLLECTIONS)
    .withConverter<Collection, CollectionDocumentData>(collectionDataConverter)
}
