import { normalizeSlug } from '@echo/firestore/helpers/converters/collection/normalize-slug'
import { normalizeSlugIfExists } from '@echo/firestore/helpers/converters/collection/to-firestore/normalize-slug-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { CollectionDocumentData } from '@echo/firestore/types/model/collection-document-data'
import type { Collection } from '@echo/model/types/collection/collection'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const collectionDataConverter: FirestoreDataConverter<Collection, CollectionDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<CollectionDocumentData, CollectionDocumentData>): Collection {
    return pipe<[QueryDocumentSnapshot<CollectionDocumentData, CollectionDocumentData>], Collection, Collection>(
      nonNullableReturn(getDocumentSnapshotData),
      normalizeSlug
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Collection>): WithFieldValue<CollectionDocumentData> {
    return normalizeSlugIfExists(modelObject)
  }
}
