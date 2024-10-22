import { normalizeSlugIfExists } from '@echo/firestore/helpers/converters/collection/to-firestore/normalize-slug-if-exists'
import type { CollectionDocumentData } from '@echo/firestore/types/model/collection-document-data'
import type { Collection } from '@echo/model/types/collection/collection'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'

export const collectionDataConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot<CollectionDocumentData, CollectionDocumentData>): Collection {
    return snapshot.data()
  },
  toFirestore(modelObject: WithFieldValue<Collection>): WithFieldValue<CollectionDocumentData> {
    return normalizeSlugIfExists(modelObject)
  }
}
