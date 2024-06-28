import { normalizeSlug } from '@echo/firestore/helpers/converters/collection/normalize-slug'
import { normalizeSlugIfExists } from '@echo/firestore/helpers/converters/collection/to-firestore/normalize-slug-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { Collection } from '@echo/model/types/collection'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const collectionDataConverter: FirestoreDataConverter<Collection, Collection> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<Collection>): Collection {
    return pipe<[QueryDocumentSnapshot<Collection>], Collection, Collection>(
      nonNullableReturn(getDocumentSnapshotData<Collection>),
      normalizeSlug
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Collection>): WithFieldValue<Collection> {
    return normalizeSlugIfExists(modelObject)
  }
}
